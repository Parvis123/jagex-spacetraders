import AppSidebar from "@/components/custom/sideBar/AppSidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

const SidebarChevron = () => {
  const { toggleSidebar, state } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-background p-1.5 shadow-md hover:bg-accent z-50"
    >
      <ChevronLeft
        className={cn(
          "h-4 w-4 transition-transform duration-200",
          state === "collapsed" && "rotate-180"
        )}
      />
    </button>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="relative flex-1 w-full">
          <SidebarChevron />
          <main className="w-full p-6 max-w-none overflow-x-hidden">
            {children}
          </main>
          <Toaster />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
