import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import ChangePasswordForm from "@/components/ChangePasswordForm";

const ChangePassword = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Change Password</h1>
              <p className="text-muted-foreground">
                Update your password to keep your account secure
              </p>
            </div>
            <ChangePasswordForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChangePassword;
