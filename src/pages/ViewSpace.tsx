import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  limit
} from "firebase/firestore";
import { firestore, auth } from "@/integrations/firebase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  FileText,
  Link as LinkIcon,
  Folder,
  List,
  AlertCircle,
  Share2,
  Eye,
  Star,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";

type BlockType = "file" | "link" | "text" | "folder" | "list" | "importantTopics";

interface BaseBlock {
  id: string;
  type: BlockType;
  createdAt: string;
}

interface UploadedFile {
  id: string;
  name: string;
  url: string;
}

interface FileBlock extends BaseBlock {
  type: "file";
  file: UploadedFile;
}

interface LinkBlock extends BaseBlock {
  type: "link";
  title: string;
  url: string;
}

interface TextBlock extends BaseBlock {
  type: "text";
  content: string;
}

interface ListBlock extends BaseBlock {
  type: "list" | "importantTopics";
  title: string;
  items: string[];
}

interface FolderBlock extends BaseBlock {
  type: "folder";
  name: string;
  children: BaseBlock[];
}

interface PublishedWorkspace {
  title: string;
  ownerUid: string;
  ownerDisplayName: string;
  blocks: BaseBlock[];
  publishedAt: string;
  isPublic: boolean;
  viewCount: number;
}

interface Rating {
  id?: string;
  workspaceId: string;
  userId?: string;
  userFingerprint: string;
  rating: number;
  comment?: string;
  createdAt: string;
  userDisplayName?: string;
}

interface WorkspaceStats {
  totalRatings: number;
  averageRating: number;
  ratingDistribution: { [key: number]: number };
}

const ViewSpace = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [workspace, setWorkspace] = useState<PublishedWorkspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [folderOpen, setFolderOpen] = useState<Record<string, boolean>>({});

  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [existingRating, setExistingRating] = useState<Rating | null>(null);
  const [workspaceStats, setWorkspaceStats] = useState<WorkspaceStats>({
    totalRatings: 0,
    averageRating: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [recentRatings, setRecentRatings] = useState<Rating[]>([]);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [submittingRating, setSubmittingRating] = useState(false);

  const generateFingerprint = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillText("anonymous", 2, 2);
    const fp = [
      navigator.userAgent,
      navigator.language,
      screen.width + "x" + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join("|");
    return btoa(fp).substring(0, 20);
  };

  useEffect(() => {
    if (id) {
      fetchWorkspace();
      fetchRatingStats();
      fetchRecentRatings();
      checkExistingRating();
    }
  }, [id]);

  const fetchWorkspace = async () => {
    if (!id) {
      setError("Invalid workspace ID");
      setLoading(false);
      return;
    }
    try {
      const docRef = doc(firestore, "published_spaces", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setWorkspace({
          ...data,
          blocks: JSON.parse(data.blocks || "[]")
        } as PublishedWorkspace);
        await updateDoc(docRef, { viewCount: increment(1) });
      } else {
        setError("Workspace not found");
      }
    } catch {
      setError("Failed to load workspace");
    } finally {
      setLoading(false);
    }
  };

  const fetchRatingStats = async () => {
    if (!id) return;
    try {
      const q = query(collection(firestore, "workspace_ratings"), where("workspaceId", "==", id));
      const snap = await getDocs(q);
      let total = 0,
        count = 0;
      const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as { [k: number]: number };
      snap.forEach((d) => {
        const r = (d.data() as Rating).rating;
        total += r;
        count++;
        dist[r] = (dist[r] || 0) + 1;
      });
      setWorkspaceStats({
        totalRatings: count,
        averageRating: count ? total / count : 0,
        ratingDistribution: dist
      });
    } catch {
      // no-op
    }
  };

  const fetchRecentRatings = async () => {
    if (!id) return;
    try {
      const q = query(
        collection(firestore, "workspace_ratings"),
        where("workspaceId", "==", id),
        orderBy("createdAt", "desc"),
        limit(5)
      );
      const snap = await getDocs(q);
      const arr: Rating[] = [];
      snap.forEach((d) => {
        const data = d.data() as Rating;
        if (data.comment && data.comment.trim() !== "") {
          arr.push({ id: d.id, ...data });
        }
      });
      setRecentRatings(arr);
    } catch {
      // no-op
    }
  };

  const checkExistingRating = async () => {
    if (!id) return;
    const fp = generateFingerprint();
    const userId = auth.currentUser?.uid;
    const ratingsRef = collection(firestore, "workspace_ratings");
    const q = userId
      ? query(ratingsRef, where("workspaceId", "==", id), where("userId", "==", userId))
      : query(ratingsRef, where("workspaceId", "==", id), where("userFingerprint", "==", fp));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const d = snap.docs[0];
      const data = { id: d.id, ...d.data() } as Rating;
      setExistingRating(data);
      setUserRating(data.rating);
      setUserComment(data.comment || "");
    }
  };

  const submitRating = async () => {
    if (!id || userRating === 0) {
      toast.error("Please select a rating");
      return;
    }
    setSubmittingRating(true);
    try {
      const fp = generateFingerprint();
      const userId = auth.currentUser?.uid;
      const disp = auth.currentUser?.displayName;
      const ratingData: Omit<Rating, "id"> = {
        workspaceId: id,
        rating: userRating,
        comment: userComment.trim(),
        createdAt: new Date().toISOString(),
        userFingerprint: fp,
        ...(userId && { userId, userDisplayName: disp })
      };
      if (existingRating) {
        const rRef = doc(firestore, "workspace_ratings", existingRating.id!);
        await updateDoc(rRef, {
          rating: userRating,
          comment: userComment.trim(),
          createdAt: new Date().toISOString()
        });
        toast.success("Rating updated");
      } else {
        await addDoc(collection(firestore, "workspace_ratings"), ratingData);
        toast.success("Rating submitted");
      }
      await fetchRatingStats();
      await fetchRecentRatings();
      await checkExistingRating();
      setShowRatingForm(false);
    } catch {
      toast.error("Failed to submit rating");
    } finally {
      setSubmittingRating(false);
    }
  };

  const StarRating = ({
    rating,
    onRatingChange,
    onHover,
    readonly = false
  }: {
    rating: number;
    onRatingChange?: (r: number) => void;
    onHover?: (r: number) => void;
    readonly?: boolean;
  }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-6 h-6 transition-colors ${
            n <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-300"
          } ${readonly ? "cursor-default" : "cursor-pointer hover:fill-yellow-300 hover:text-yellow-300"}`}
          onClick={() => !readonly && onRatingChange?.(n)}
          onMouseEnter={() => !readonly && onHover?.(n)}
          onMouseLeave={() => !readonly && onHover?.(0)}
        />
      ))}
    </div>
  );

  const toggleFolder = (id: string) => {
    setFolderOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShareLink = () => {
    if (!id) return;
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Workspace link copied to clipboard!");
  };

  const isInsideAnyFolder = (all: BaseBlock[], id: string) =>
    all.some((b) => b.type === "folder" && (b as FolderBlock).children.some((c) => c.id === id));

  const getRootBlocks = (blocks: BaseBlock[]) => blocks.filter((b) => !isInsideAnyFolder(blocks, b.id));

  const renderReadOnlyBlock = (block: BaseBlock): JSX.Element => {
    switch (block.type) {
      case "file": {
        const f = block as FileBlock;
        return (
          <Card key={block.id} className="glass-card hover:shadow-elegant transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold">{f.file.name}</h4>
              </div>
              <Button variant="hero" className="w-full" onClick={() => window.open(f.file.url, "_blank")}>
                <LinkIcon className="w-4 h-4 mr-2" /> Open File
              </Button>
            </CardContent>
          </Card>
        );
      }
      case "text": {
        const t = block as TextBlock;
        return (
          <Card key={block.id} className="glass-card">
            <CardContent className="p-5">
              <p className="leading-relaxed whitespace-pre-wrap">{t.content}</p>
            </CardContent>
          </Card>
        );
      }
      case "link": {
        const l = block as LinkBlock;
        return (
          <Card key={block.id} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <LinkIcon className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold">{l.title}</h4>
              </div>
              <Button variant="secondary" className="w-full" onClick={() => l.url && window.open(l.url, "_blank")}>
                Visit Link
              </Button>
            </CardContent>
          </Card>
        );
      }
      case "list":
      case "importantTopics": {
        const lb = block as ListBlock;
        const imp = block.type === "importantTopics";
        return (
          <Card key={block.id} className="glass-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                {imp ? <AlertCircle className="w-5 h-5 text-red-600" /> : <List className="w-5 h-5 text-gray-700" />}
                <h4 className="font-semibold">{lb.title}</h4>
              </div>
              <ul className="list-disc pl-6 space-y-1">
                {lb.items.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      }
      case "folder": {
        const fb = block as FolderBlock;
        const open = folderOpen[fb.id];
        return (
          <Card key={fb.id} className="glass-card">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <Folder className="w-5 h-5 text-amber-600" />
                  <h4 className="font-semibold">{fb.name}</h4>
                </div>
                <Button size="sm" variant="outline" onClick={() => toggleFolder(fb.id)}>
                  {open ? "Close" : "Open"}
                </Button>
              </div>
              {open && (
                <div className="border-l-2 border-amber-200 pl-4 space-y-3">
                  {fb.children.length > 0 ? fb.children.map((c) => renderReadOnlyBlock(c)) : (
                    <p className="text-sm italic text-gray-500">This folder is empty</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      }
      default:
        return <div key={block.id}>Unknown block</div>;
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center animate-pulse">
        Loading workspace...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-12 h-12 text-red-600 mb-3" />
        <p className="font-semibold mb-2">{error}</p>
        <Button onClick={() => navigate("/dashboard")} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Go to Dashboard
        </Button>
      </div>
    );
  if (!workspace)
    return (
      <div className="min-h-screen flex items-center justify-center">Workspace not found</div>
    );

  const rootBlocks = getRootBlocks(workspace.blocks);

  return (
    <div className="min-h-screen gradient-subtle">
      <header className="border-b bg-white/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          {/* Back now routes to dashboard and does NOT touch auth */}
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button variant="outline" onClick={handleShareLink}>
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{workspace.title}</h1>
          <div className="flex justify-center gap-4 text-sm text-gray-600 mb-6">
            <span>By {workspace.ownerDisplayName}</span>
            <span>•</span>
            <span>Published {new Date(workspace.publishedAt).toLocaleDateString()}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {workspace.viewCount} views
            </div>
          </div>

          {/* Rating summary */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(workspaceStats.averageRating)} readonly />
              <span className="text-lg font-semibold">{workspaceStats.averageRating.toFixed(1)}</span>
              <span className="text-gray-600">({workspaceStats.totalRatings} ratings)</span>
            </div>
          </div>
          <Button
            onClick={() => setShowRatingForm(!showRatingForm)}
            variant={existingRating ? "outline" : "default"}
            className="mb-6"
          >
            <Star className="w-4 h-4 mr-2" />
            {existingRating ? "Update Rating" : "Rate This Workspace"}
          </Button>
        </div>

        {/* Rating form */}
        {showRatingForm && (
          <Card className="max-w-md mx-auto mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {existingRating ? "Update Your Rating" : "Rate This Workspace"}
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Rating</label>
                <StarRating
                  rating={hoveredRating || userRating}
                  onRatingChange={setUserRating}
                  onHover={setHoveredRating}
                />
                <p className="text-sm text-gray-600 mt-1">
                  {hoveredRating > 0
                    ? ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][hoveredRating]
                    : userRating > 0
                    ? ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][userRating]
                    : "Click to rate"}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Comment (Optional)</label>
                <textarea
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-3 border rounded-md h-24 resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{userComment.length}/500</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={submitRating} disabled={userRating === 0 || submittingRating} className="flex-1">
                  {submittingRating ? "Submitting..." : existingRating ? "Update" : "Submit"}
                </Button>
                <Button variant="outline" onClick={() => setShowRatingForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent reviews */}
        {recentRatings.length > 0 && (
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" /> Recent Reviews
            </h3>
            <div className="space-y-4">
              {recentRatings.map((r) => (
                <Card key={r.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={r.rating} readonly />
                        <span className="font-medium">{r.userDisplayName || "Anonymous"}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {r.comment && <p className="text-gray-700">{r.comment}</p>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Blocks display */}
        {rootBlocks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rootBlocks.map((b) => renderReadOnlyBlock(b))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-4 00" />
            <p>This workspace is empty</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewSpace;
