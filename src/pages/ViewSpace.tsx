import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/integrations/firebase/client";

const ViewSpace = () => {
  const { id } = useParams<{ id: string }>();
  const [workspace, setWorkspace] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkspace = async () => {
      if (!id) return;
      try {
        const docRef = doc(firestore, "published_spaces", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setWorkspace({
            ...data,
            blocks: JSON.parse(data.blocks || "[]"),
          });
        } else {
          setError("Workspace not found");
        }
      } catch (err) {
        console.error("Error fetching workspace:", err);
        setError("Failed to load workspace");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspace();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!workspace) return <div>Workspace not found</div>;

  return (
    <div className="min-h-screen gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{workspace.title}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          By {workspace.ownerDisplayName} • Published{" "}
          {new Date(workspace.publishedAt).toLocaleDateString()}
        </p>

        {/* Display blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspace.blocks.map((block: any) => (
            <div
              key={block.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <p>{block.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSpace;
