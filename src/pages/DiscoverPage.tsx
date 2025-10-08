import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { firestore } from "@/integrations/firebase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const DiscoverPage = () => {
  const [spaces, setSpaces] = useState<any[]>([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      const spacesRef = collection(firestore, "published_spaces");
      const q = query(spacesRef, where("isPublic", "==", true), orderBy("viewCount", "desc"));
      const snap = await getDocs(q);
      setSpaces(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchSpaces();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Discover Top MySpaces</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <Card key={space.id} className="glass-card p-4 hover:shadow-lg transition">
            <CardContent>
              <h3 className="font-bold text-lg">{space.title}</h3>
              <p className="text-muted-foreground mb-2">By {space.ownerDisplayName}</p>
              <p className="text-sm mb-3">Views: {space.viewCount}</p>
              <Link to={`/view/${space.id}`} className="text-blue-600 underline">
                View Space →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
