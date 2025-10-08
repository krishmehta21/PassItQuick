import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  UploadCloud,
  FileText,
  Link as LinkIcon,
  Trash2,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { firestore, auth } from "@/integrations/firebase/client";
import {
  collection,
  doc as firestoreDoc,
  setDoc,
  getDoc,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SCOPES =
  "https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.file";

declare global {
  interface Window {
    google: any;
    gapi: any;
  }
}

// ---------- Block Types ----------
type BlockType =
  | "file"
  | "link"
  | "text"
  | "folder"
  | "list"
  | "importantTopics";

interface BaseBlock {
  id: string;
  type: BlockType;
  createdAt: string;
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

// ---------- Uploaded File ----------
interface UploadedFile {
  id: string;
  name: string;
  url: string;
}

// ---------- Editable Components ----------
const EditableText = ({
  text,
  onSave,
  placeholder,
  className,
}: {
  text: string;
  onSave: (value: string) => void;
  placeholder?: string;
  className?: string;
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(text);

  useEffect(() => {
    setValue(text);
  }, [text]);

  const handleBlur = () => {
    setEditing(false);
    if (value.trim() !== text) onSave(value.trim());
  };

  return editing ? (
    <input
      autoFocus
      className={`border rounded px-2 py-1 w-full ${className ?? ""}`}
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => e.key === "Enter" && handleBlur()}
    />
  ) : (
    <p
      className={`cursor-pointer ${className ?? ""}`}
      onClick={() => setEditing(true)}
    >
      {text || <span className="text-muted-foreground">{placeholder}</span>}
    </p>
  );
};

const EditableList = ({
  title: initialTitle,
  items: initialItems,
  onSave,
}: {
  title: string;
  items: string[];
  onSave: (title: string, items: string[]) => void;
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [items, setItems] = useState(initialItems);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setTitle(initialTitle);
    setItems(initialItems);
    setTouched(false);
  }, [initialTitle, initialItems]);

  const commit = useCallback(() => {
    const filtered = items.filter((i) => i.trim() !== "");
    onSave(title.trim(), filtered);
    setTouched(false);
  }, [title, items, onSave]);

  const handleAddItem = () => {
    setItems((prev) => [...prev, ""]);
    setTouched(true);
  };

  const handleChangeItem = (idx: number, value: string) => {
    setItems((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
    setTouched(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTouched(true);
  };

  const onContainerBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const nextTarget = e.relatedTarget as Node | null;
    if (!e.currentTarget.contains(nextTarget)) {
      if (touched) commit();
    }
  };

  return (
    <div className="flex flex-col gap-2" onBlur={onContainerBlur} tabIndex={-1}>
      <input
        className="border rounded px-2 py-1 font-bold"
        value={title}
        onChange={handleTitleChange}
      />
      {items.map((item, idx) => (
        <input
          key={idx}
          className="border rounded px-2 py-1"
          value={item}
          onChange={(e) => handleChangeItem(idx, e.target.value)}
        />
      ))}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleAddItem}>
          + Item
        </Button>
        <Button variant="default" size="sm" onClick={commit}>
          Save
        </Button>
      </div>
    </div>
  );
};

// ---------- DnD helpers ----------
const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const isInsideAnyFolder = (all: BaseBlock[], id: string): boolean => {
  for (const b of all) {
    if (b.type === "folder") {
      const fb = b as FolderBlock;
      if (fb.children.some((c) => c.id === id)) return true;
    }
  }
  return false;
};

const getContainerItems = (all: BaseBlock[], containerId: string): BaseBlock[] => {
  if (containerId === "root") {
    return all.filter((b) => !isInsideAnyFolder(all, b.id));
  }
  const folderId = containerId.replace("folder-", "");
  const folder = all.find((b) => b.id === folderId && b.type === "folder") as
    | FolderBlock
    | undefined;
  return folder?.children ?? [];
};

const setContainerItems = (
  all: BaseBlock[],
  containerId: string,
  items: BaseBlock[]
): BaseBlock[] => {
  if (containerId === "root") {
    const folderMap = new Map<string, FolderBlock>();
    for (const b of all) {
      if (b.type === "folder") folderMap.set(b.id, b as FolderBlock);
    }
    return items.map((it) =>
      it.type === "folder" && folderMap.has(it.id)
        ? { ...(folderMap.get(it.id) as FolderBlock) }
        : it
    );
  }

  const folderId = containerId.replace("folder-", "");
  const movingIds = new Set(items.map((i) => i.id));
  return all.map((b) => {
    if (b.id === folderId && b.type === "folder") {
      return { ...(b as FolderBlock), children: items };
    }
    if (b.type === "folder") {
      const fb = b as FolderBlock;
      return { ...fb, children: fb.children.filter((c) => !movingIds.has(c.id)) };
    }
    return b;
  });
};

// ---------- Component ----------
const MySpace = () => {
  const navigate = useNavigate();

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [tokenClient, setTokenClient] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<BaseBlock[]>([]);
  const [folderOpen, setFolderOpen] = useState<Record<string, boolean>>({});
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishTitle, setPublishTitle] = useState("");
  const [makePublic, setMakePublic] = useState(true);

  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  const getLocalKey = (uid?: string) =>
    `myspace_backup_${uid ?? "guest"}`;

  // ------------------- Google Scripts -------------------
  useEffect(() => {
    const gsiScript = document.createElement("script");
    gsiScript.src = "https://accounts.google.com/gsi/client";
    gsiScript.async = true;
    gsiScript.onload = initializeGsi;
    document.body.appendChild(gsiScript);

    const gapiScript = document.createElement("script");
    gapiScript.src = "https://apis.google.com/js/api.js";
    gapiScript.async = true;
    gapiScript.onload = initializeGapi;
    document.body.appendChild(gapiScript);

    if (auth.currentUser) {
      loadWorkspaceFromFirestore(auth.currentUser.uid);
      fetchFilesFromDB();
    } else {
      const cached = localStorage.getItem(getLocalKey(undefined));
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as BaseBlock[];
          setBlocks(parsed);
        } catch {
          // ignore
        }
      }
    }

    return () => {
      if (gsiScript.parentNode) document.body.removeChild(gsiScript);
      if (gapiScript.parentNode) document.body.removeChild(gapiScript);
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const guestKey = getLocalKey(undefined);
        const guestData = localStorage.getItem(guestKey);
        if (guestData) {
          try {
            const parsed = JSON.parse(guestData) as BaseBlock[];
            const remoteDoc = await getDoc(firestoreDoc(firestore, "user_workspaces", user.uid));
            if (!remoteDoc.exists()) {
              await setDoc(firestoreDoc(firestore, "user_workspaces", user.uid), {
                blocks: JSON.stringify(parsed),
                updatedAt: new Date().toISOString(),
                ownerUid: user.uid,
              });
              setBlocks(parsed);
              localStorage.removeItem(guestKey);
              toast.success("Local backup saved to your account.");
            }
          } catch (err) {
            console.error("Error syncing guest data:", err);
          }
        }

        await loadWorkspaceFromFirestore(user.uid);
        await fetchFilesFromDB();
      } else {
        const cached = localStorage.getItem(getLocalKey(undefined));
        if (cached) {
          try {
            setBlocks(JSON.parse(cached));
          } catch {
            // ignore
          }
        }
      }
    });
    return () => unsub?.();
  }, []);

  const initializeGsi = () => {
    if (!window?.google?.accounts?.oauth2?.initTokenClient) return;
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (tokenResponse: any) => {
        if (tokenResponse && tokenResponse.access_token) {
          setAccessToken(tokenResponse.access_token);
          toast.success("Signed in & permissions granted!");
        }
      },
    });
    setTokenClient(client);
  };

  const initializeGapi = () => {
    if (!window?.gapi) return;
    window.gapi.load("client:picker", () => {
      window.gapi.client.load(
        "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
      );
    });
  };

  // ------------------- Fetch Files -------------------
  const fetchFilesFromDB = async () => {
    if (!auth.currentUser) return;
    try {
      const q = query(
        collection(firestore, "user_files"),
        where("uid", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const files: UploadedFile[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        files.push({
          id: data.id || doc.id,
          name: data.name || "Unknown File",
          url: data.url || "",
        });
      });
      setUploadedFiles(files);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  // ------------------- Firestore workspace load/save -------------------
  const loadWorkspaceFromFirestore = async (uid: string) => {
    try {
      const docRef = firestoreDoc(firestore, "user_workspaces", uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        if (data?.blocks) {
          const parsed = JSON.parse(data.blocks) as BaseBlock[];
          setBlocks(parsed);
          localStorage.setItem(getLocalKey(uid), JSON.stringify(parsed));
        }
      } else {
        const cached = localStorage.getItem(getLocalKey(uid));
        if (cached) {
          try {
            setBlocks(JSON.parse(cached));
          } catch {
            // ignore
          }
        }
      }
    } catch (err) {
      console.error("Failed to load workspace from Firestore:", err);
      toast.error("Failed to load workspace from server. Using local data if present.");
      const cached = localStorage.getItem(getLocalKey(uid));
      if (cached) {
        try {
          setBlocks(JSON.parse(cached));
        } catch {
          // ignore
        }
      }
    }
  };

  const saveWorkspaceToFirestore = async (uid: string, blocksToSave: BaseBlock[]) => {
    try {
      await setDoc(
        firestoreDoc(firestore, "user_workspaces", uid),
        {
          blocks: JSON.stringify(blocksToSave),
          updatedAt: new Date().toISOString(),
          ownerUid: uid,
        },
        { merge: true }
      );
      localStorage.setItem(getLocalKey(uid), JSON.stringify(blocksToSave));
    } catch (err) {
      console.error("Failed to save to Firestore", err);
      toast.error("Failed to save workspace to server. Saved locally instead.");
      localStorage.setItem(getLocalKey(uid), JSON.stringify(blocksToSave));
    }
  };

  // Autosave
  useEffect(() => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }
    saveTimer.current = setTimeout(async () => {
      const uid = auth.currentUser?.uid;
      if (uid) {
        await saveWorkspaceToFirestore(uid, blocks);
      } else {
        localStorage.setItem(getLocalKey(undefined), JSON.stringify(blocks));
      }
    }, 1400);

    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, [blocks]);

  // ------------------- Google Drive Auth -------------------
  const handleAuthClick = () => {
    if (tokenClient) tokenClient.requestAccessToken();
    else toast.error("Google Auth is not ready yet.");
  };

  // ------------------- Google Picker -------------------
  const showPicker = useCallback(() => {
    if (!accessToken) return toast.error("Please sign in first.");
    if (!window.google?.picker) return toast.error("Google Picker is not loaded yet.");

    const view = new window.google.picker.View(window.google.picker.ViewId.DOCS);
    view.setMimeTypes(
      "application/pdf,image/png,image/jpeg,application/vnd.google-apps.document"
    );

    const picker = new window.google.picker.PickerBuilder()
      .setAppId(CLIENT_ID?.split("-")[0] ?? "")
      .setOAuthToken(accessToken)
      .setDeveloperKey(API_KEY)
      .addView(view)
      .addView(new window.google.picker.DocsUploadView())
      .setCallback(pickerCallback)
      .build();
    picker.setVisible(true);
  }, [accessToken]);

  const pickerCallback = async (data: any) => {
    if (data[window.google.picker.Response.ACTION] === window.google.picker.Action.PICKED) {
      const pickedDoc = data[window.google.picker.Response.DOCUMENTS][0];
      const fileId = pickedDoc[window.google.picker.Document.ID];
      const fileName = pickedDoc[window.google.picker.Document.NAME];

      setLoading(true);
      toast.info(`Processing ${fileName}...`);

      try {
        const permRes = await fetch(
          `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({ role: "reader", type: "anyone" }),
          }
        );
        if (!permRes.ok) throw new Error("Failed to set file permissions.");

        const fileUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
        if (!auth.currentUser) throw new Error("User not authenticated.");

        const newFile: UploadedFile = { id: fileId, name: fileName, url: fileUrl };

        await setDoc(firestoreDoc(firestore, "user_files", fileId), {
          ...newFile,
          uid: auth.currentUser.uid,
          uploadedAt: new Date().toISOString(),
        });

        const newFileBlock: FileBlock = {
          id: fileId,
          type: "file",
          file: newFile,
          createdAt: new Date().toISOString(),
        };

        setBlocks((prev) => [...prev, newFileBlock]);
        setUploadedFiles((prev) => [...prev, newFile]);
        toast.success("File successfully added!");
      } catch (err: any) {
        console.error("Error processing file:", err);
        toast.error(err.message || "Failed to process selected file.");
      } finally {
        setLoading(false);
      }
    }
  };

  // ------------------- Block Handlers -------------------
  const handleDeleteBlock = async (block: BaseBlock) => {
    if (block.type === "file") await handleDeleteFile((block as FileBlock).file.id);

    setBlocks((prev) =>
      prev
        .filter((b) => b.id !== block.id)
        .map((b) =>
          b.type === "folder"
            ? { ...b, children: (b as FolderBlock).children.filter((c) => c.id !== block.id) }
            : b
        )
    );
  };

  const handleDeleteFile = async (id: string) => {
    if (!auth.currentUser) return;
    try {
      await deleteDoc(firestoreDoc(firestore, "user_files", id));
      setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
      toast.success("File removed successfully.");
    } catch (err) {
      console.error("Failed to delete file:", err);
      toast.error("Failed to remove file record.");
    }
  };

  // ------------------- Add Blocks -------------------
  const handleAddText = () => {
    const newText: TextBlock = {
      id: Date.now().toString(),
      type: "text",
      content: "Click to edit text",
      createdAt: new Date().toISOString(),
    };
    setBlocks((prev) => [...prev, newText]);
  };

  const handleAddLink = () => {
    const newLink: LinkBlock = {
      id: Date.now().toString(),
      type: "link",
      url: "https://",
      title: "Click to edit link",
      createdAt: new Date().toISOString(),
    };
    setBlocks((prev) => [...prev, newLink]);
  };

  const handleAddList = () => {
    const newList: ListBlock = {
      id: Date.now().toString(),
      type: "list",
      title: "New List",
      items: ["Click to edit item"],
      createdAt: new Date().toISOString(),
    };
    setBlocks((prev) => [...prev, newList]);
  };

  const handleAddImportantTopics = () => {
    const newImpBlock: ListBlock = {
      id: Date.now().toString(),
      type: "importantTopics",
      title: "IMPORTANT TOPICS",
      items: ["Topic 1", "Topic 2", "Topic 3"],
      createdAt: new Date().toISOString(),
    };
    setBlocks((prev) => [...prev, newImpBlock]);
  };

  const handleAddFolder = () => {
    const id = Date.now().toString();
    const newFolder: FolderBlock = {
      id,
      type: "folder",
      name: "New Folder",
      children: [],
      createdAt: new Date().toISOString(),
    };
    setBlocks((prev) => [...prev, newFolder]);
    setFolderOpen((m) => ({ ...m, [id]: true }));
  };

  const toggleFolder = (id: string) =>
    setFolderOpen((m) => ({ ...m, [id]: !m[id] }));

  // ------------------- DnD: drag end -------------------
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceId = source.droppableId;
    const destId = destination.droppableId;

    const srcItems = getContainerItems(blocks, sourceId).slice();
    const destItems = getContainerItems(blocks, destId).slice();

    const [moved] = srcItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, moved);

    setBlocks((prev) => {
      let mid = setContainerItems(prev, sourceId, srcItems);
      const next = setContainerItems(mid, destId, destItems);
      return next;
    });
  };

  // ------------------- Publish Flow -------------------
  const handlePublish = async () => {
    if (!auth.currentUser) {
      return toast.error("You must be logged in to publish.");
    }
    if (!publishTitle.trim()) {
      return toast.error("Please enter a title for your space.");
    }

    try {
      const publishedSpace = {
        title: publishTitle,
        ownerUid: auth.currentUser.uid,
        ownerDisplayName: auth.currentUser.displayName || "Anonymous",
        blocks: JSON.stringify(blocks),
        publishedAt: new Date().toISOString(),
        isPublic: makePublic,
        viewCount: 0,
      };

      const docRef = await addDoc(collection(firestore, "published_spaces"), publishedSpace);

      const shareableLink = `${window.location.origin}/view/${docRef.id}`;

      toast.success("Workspace Published!", {
        description: `Link: ${shareableLink}`,
        action: {
          label: "Copy Link",
          onClick: () => navigator.clipboard.writeText(shareableLink),
        },
      });

      setIsPublishing(false);
      setPublishTitle("");
    } catch (error) {
      console.error("Failed to publish:", error);
      toast.error("Something went wrong. Could not publish your workspace.");
    }
  };

  // ------------------- Render Blocks -------------------
  const renderBlockContent = (block: BaseBlock) => {
    switch (block.type) {
      case "file":
        return (
          <Card key={block.id} className="glass-card flex flex-col justify-between">
            <CardContent className="p-4">
              <div className="flex items-start gap-4 mb-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <h4 className="font-semibold break-all">
                  {(block as FileBlock).file.name}
                </h4>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    window.open((block as FileBlock).file.url, "_blank")
                  }
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Open Link
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteBlock(block)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "text":
        return (
          <Card key={block.id} className="glass-card p-4">
            <EditableText
              text={(block as TextBlock).content}
              placeholder="Type some text..."
              onSave={(val) =>
                setBlocks((prev) =>
                  prev.map((b) =>
                    b.id === block.id ? { ...b, content: val } : b
                  )
                )
              }
            />
            <div className="mt-3 flex justify-end">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteBlock(block)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        );

      case "link":
        return (
          <Card key={block.id} className="glass-card p-4">
            <EditableText
              text={(block as LinkBlock).title}
              placeholder="Link title"
              onSave={(val) =>
                setBlocks((prev) =>
                  prev.map((b) =>
                    b.id === block.id ? { ...(b as LinkBlock), title: val } : b
                  )
                )
              }
            />
            <EditableText
              text={(block as LinkBlock).url}
              placeholder="https://..."
              onSave={(val) =>
                setBlocks((prev) =>
                  prev.map((b) =>
                    b.id === block.id ? { ...(b as LinkBlock), url: val } : b
                  )
                )
              }
              className="mt-2"
            />
            <div className="mt-3 flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  const url = (block as LinkBlock).url;
                  if (url && url !== "https://") window.open(url, "_blank");
                }}
              >
                Open Link
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteBlock(block)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        );

      case "list":
      case "importantTopics":
        return (
          <Card key={block.id} className="glass-card p-4">
            <EditableList
              title={(block as ListBlock).title}
              items={(block as ListBlock).items}
              onSave={(title, items) =>
                setBlocks((prev) =>
                  prev.map((b) =>
                    b.id === block.id ? { ...(b as ListBlock), title, items } : b
                  )
                )
              }
            />
            <div className="mt-3 flex justify-end">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteBlock(block)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        );

      case "folder":
        return (
          <Card key={block.id} className="glass-card p-4">
            <div className="flex items-center justify-between">
              <EditableText
                text={(block as FolderBlock).name}
                placeholder="Folder name"
                onSave={(val) =>
                  setBlocks((prev) =>
                    prev.map((b) =>
                      b.id === block.id ? { ...(b as FolderBlock), name: val } : b
                    )
                  )
                }
                className="font-semibold"
              />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => toggleFolder(block.id)}>
                  {folderOpen[block.id] ? "Close" : "Open"}
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteBlock(block)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {folderOpen[block.id] && (
              <Droppable droppableId={`folder-${block.id}`} type="BLOCK">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="pl-2 mt-3 flex flex-col gap-3"
                  >
                    {(block as FolderBlock).children.map((child, idx) => (
                      <Draggable key={child.id} draggableId={child.id} index={idx}>
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                          >
                            {renderBlockContent(child)}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <div className="mt-2 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const childText: TextBlock = {
                            id: Date.now().toString(),
                            type: "text",
                            content: "New folder note",
                            createdAt: new Date().toISOString(),
                          };
                          setBlocks((prev) =>
                            prev.map((b) =>
                              b.id === block.id && b.type === "folder"
                                ? { ...(b as FolderBlock), children: [...(b as FolderBlock).children, childText] }
                                : b
                            )
                          );
                        }}
                      >
                        + Add Note
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const childLink: LinkBlock = {
                            id: Date.now().toString(),
                            type: "link",
                            title: "New link",
                            url: "https://",
                            createdAt: new Date().toISOString(),
                          };
                          setBlocks((prev) =>
                            prev.map((b) =>
                              b.id === block.id && b.type === "folder"
                                ? { ...(b as FolderBlock), children: [...(b as FolderBlock).children, childLink] }
                                : b
                            )
                          );
                        }}
                      >
                        + Add Link
                      </Button>
                    </div>
                  </div>
                )}
              </Droppable>
            )}
          </Card>
        );

      default:
        return null;
    }
  };

  // ------------------- Render -------------------
  return (
    <div className="min-h-screen gradient-subtle">
      <header className="border-b bg-white/50 dark:bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex gap-2 items-center">
            <Button onClick={() => {
              const uid = auth.currentUser?.uid;
              localStorage.setItem(getLocalKey(uid), JSON.stringify(blocks));
              toast.success("Local backup saved.");
            }}>
              Save Local
            </Button>

            <Button onClick={() => setIsPublishing(true)} variant="secondary">
              Publish & Share
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="glass-card p-6 w-full max-w-lg mx-auto mb-6">
          <CardContent className="flex flex-col gap-4 items-center text-center">
            <UploadCloud className="h-12 w-12 text-primary mb-2" />
            <h3 className="text-xl font-semibold">Add Files from Drive</h3>
            <p className="text-muted-foreground text-sm">
              {!accessToken
                ? "Sign in to connect your Google Drive."
                : "Your Drive is connected. You can now select files."}
            </p>
            {!accessToken ? (
              <Button onClick={handleAuthClick} disabled={!tokenClient}>
                Sign In & Connect Drive
              </Button>
            ) : (
              <Button onClick={showPicker} disabled={loading} className="w-full">
                Select from Google Drive
              </Button>
            )}
            {loading && (
              <p className="text-muted-foreground mt-2 animate-pulse">
                Processing file...
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card p-4 mb-6 max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">Add New Block</h4>
            <div className="flex gap-2 flex-wrap">
              <Button onClick={handleAddText} size="sm" variant="ghost">
                + Text
              </Button>
              <Button onClick={handleAddLink} size="sm" variant="ghost">
                + Link
              </Button>
              <Button onClick={handleAddList} size="sm" variant="ghost">
                + List
              </Button>
              <Button onClick={handleAddImportantTopics} size="sm" variant="ghost">
                + IMPORTANT
              </Button>
              <Button onClick={handleAddFolder} size="sm" variant="ghost">
                <Plus className="mr-2 h-4 w-4" />
                Folder
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Tip: drag blocks to reorder. Drag into a folder to nest.
          </p>
        </Card>

        {blocks.length > 0 ? (
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center">Your Workspace</h3>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="root" type="BLOCK">
                {(provided) => {
                  const rootItems = getContainerItems(blocks, "root");
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {rootItems.map((block, index) => (
                        <Draggable key={block.id} draggableId={block.id} index={index}>
                          {(dragProvided) => (
                            <div
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                            >
                              {renderBlockContent(block)}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </DragDropContext>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="mb-4">Your workspace is empty — add a block to get started.</p>
            <div className="flex justify-center gap-2">
              <Button onClick={handleAddText}>+ Text</Button>
              <Button onClick={handleAddFolder}>+ Folder</Button>
            </div>
          </div>
        )}
      </main>

      <Dialog open={isPublishing} onOpenChange={setIsPublishing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Your Workspace</DialogTitle>
            <DialogDescription>
              Create a shareable, read-only snapshot of your workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                value={publishTitle}
                onChange={(e) => setPublishTitle(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Project Phoenix Plan"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="isPublic" 
                checked={makePublic} 
                onCheckedChange={(checked) => setMakePublic(Boolean(checked))} 
              />
              <Label htmlFor="isPublic">Make this publicly visible in the gallery</Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handlePublish}>Publish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MySpace;
