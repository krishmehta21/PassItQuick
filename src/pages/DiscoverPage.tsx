import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { firestore, auth } from "@/integrations/firebase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Star, Eye, Clock, Globe, Folder } from "lucide-react";

const DiscoverPage = () => {
  const [publicSpaces, setPublicSpaces] = useState<any[]>([]);
  const [myPublished, setMyPublished] = useState<any[]>([]);
  const [localSpaces, setLocalSpaces] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<string>("rating");

  // 🔹 Load top-rated public spaces
  useEffect(() => {
    const fetchPublicSpaces = async () => {
      const spacesRef = collection(firestore, "published_spaces");
      const q = query(
        spacesRef,
        where("isPublic", "==", true),
        orderBy("rating", "desc")
      );
      const snap = await getDocs(q);
      setPublicSpaces(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchPublicSpaces();
  }, []);

  // 🔹 Load user's published spaces
  useEffect(() => {
    const fetchMyPublished = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const spacesRef = collection(firestore, "published_spaces");
      const q = query(spacesRef, where("ownerUid", "==", user.uid));
      const snap = await getDocs(q);
      setMyPublished(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchMyPublished();
  }, []);

  // 🔹 Load local (unpublished) spaces
  useEffect(() => {
    const stored = localStorage.getItem("localSpaces");
    if (stored) {
      setLocalSpaces(JSON.parse(stored));
    }
  }, []);

  // 🔹 Sorting logic
  const sortedPublic = [...publicSpaces].sort((a, b) => {
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "views") return (b.viewCount || 0) - (a.viewCount || 0);
    if (sortBy === "date")
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-3 sm:mb-0">Discover MySpaces</h1>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">⭐ Rating</SelectItem>
            <SelectItem value="views">👁️ Views</SelectItem>
            <SelectItem value="date">🕒 Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🔸 Top Public Spaces */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" /> Top-Rated Public Spaces
        </h2>
        {sortedPublic.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPublic.map((space) => (
              <Card key={space.id} className="glass-card hover:shadow-xl transition-all p-4">
                <CardContent>
                  <h3 className="font-bold text-lg mb-1">{space.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    By {space.ownerDisplayName}
                  </p>
                  <div className="flex justify-between items-center text-sm mb-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" /> {space.rating?.toFixed(1) || "—"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-blue-500" /> {space.viewCount || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-500" />{" "}
                      {new Date(space.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Link
                    to={`/view/${space.id}`}
                    className="text-blue-600 underline text-sm"
                  >
                    View Space →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No public spaces available yet.</p>
        )}
      </section>

      {/* 🔸 Your Published Spaces */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" /> Your Published Spaces
        </h2>
        {myPublished.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPublished.map((space) => (
              <Card key={space.id} className="p-4 hover:shadow-md transition">
                <CardContent>
                  <h3 className="font-bold text-lg mb-1">{space.title}</h3>
                  <p className="text-sm mb-2 text-muted-foreground">
                    Views: {space.viewCount || 0} | Rating:{" "}
                    {space.rating?.toFixed(1) || "—"}
                  </p>
                  <Link
                    to={`/view/${space.id}`}
                    className="text-blue-600 underline text-sm"
                  >
                    View Space →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">You haven’t published any spaces yet.</p>
        )}
      </section>

      {/* 🔸 Local Spaces */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Folder className="w-5 h-5 text-green-600" /> Local Drafts
        </h2>
        {localSpaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {localSpaces.map((space) => (
              <Card key={space.id} className="p-4 hover:shadow-md transition">
                <CardContent>
                  <h3 className="font-bold text-lg mb-1">{space.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">Unpublished Draft</p>
                  <Link
                    to={`/edit/${space.id}`}
                    className="text-blue-600 underline text-sm"
                  >
                    Continue Editing →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No local drafts available.</p>
        )}
      </section>
    </div>
  );
};

export default DiscoverPage;
