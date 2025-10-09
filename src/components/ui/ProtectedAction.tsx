// components/ProtectedAction.tsx
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProtectedActionProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  fallbackPath?: string;
  onUnauthorized?: () => void;
}

export const ProtectedAction: React.FC<ProtectedActionProps> = ({
  children,
  requireAuth = true,
  fallbackPath = "/auth",
  onUnauthorized
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (requireAuth && !user) {
      if (onUnauthorized) {
        onUnauthorized();
      } else {
        toast.error("Please sign in to access this feature");
        navigate(fallbackPath);
      }
      return;
    }
    // Allow the action to proceed
  };

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
};
