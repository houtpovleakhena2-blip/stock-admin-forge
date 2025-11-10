import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Logout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
          toast({
            variant: "destructive",
            title: "Logout Failed",
            description: error.message,
          });
          navigate("/");
          return;
        }

        toast({
          title: "Logged Out",
          description: "You have been successfully logged out.",
        });
        
        // Redirect to home page after logout
        navigate("/");
      } catch (error) {
        console.error("Logout error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred during logout.",
        });
        navigate("/");
      }
    };

    handleLogout();
  }, [navigate, toast]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground">Logging out...</p>
      </div>
    </div>
  );
};

export default Logout;
