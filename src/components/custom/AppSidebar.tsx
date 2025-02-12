import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { UseGame } from "@/contexts/GameContext";
import {
  Ship,
  LayoutDashboard,
  FileText,
  Rocket,
  RotateCcw,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavItem {
  title: string;
  icon: LucideIcon;
  url: string;
}

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Fleet",
    icon: Ship,
    url: "/fleet",
  },
  {
    title: "Contracts",
    icon: FileText,
    url: "/contracts",
  },
  {
    title: "Systems",
    icon: Rocket,
    url: "/systems",
  },
];

const AppSidebar = () => {
  const { resetGame } = UseGame();
  const navigate = useNavigate();

  const handleNewGame = () => {
    setTimeout(() => resetGame(), 1000);
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  data-active={location.pathname === item.url}
                >
                  <a href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleNewGame}>
              <RotateCcw className="h-4 w-4" />
              <span>New Game</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
