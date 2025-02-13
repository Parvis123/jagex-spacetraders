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
import { useWaypointsWithShipyard } from "@/hooks/react-query-hooks/useShipyard";
import {
  Pickaxe,
  LayoutDashboard,
  FileText,
  Rocket,
  LogOut,
  ShipWheel,
  Wrench,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavItem {
  title: string;
  icon: LucideIcon;
  url: string;
  disabled?: boolean;
}

const AppSidebar = () => {
  const { resetGame, gameState } = UseGame();
  const navigate = useNavigate();
  const { ships } = gameState;

  const handleNewGame = () => {
    setTimeout(() => resetGame(), 1000);
    navigate("/");
  };

  const systemSymbol = ships[0]?.nav.systemSymbol;

  const { data: waypoints } = useWaypointsWithShipyard(
    systemSymbol ?? "",
    gameState.token ?? ""
  );

  const hasShipyardInSystem = waypoints && waypoints.length > 0;

  const mainNavItems: NavItem[] = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/dashboard",
    },
    {
      title: "Fleet",
      icon: ShipWheel,
      url: "/fleet",
    },
    {
      title: "Shipyard",
      url: "/shipyard",
      disabled: !hasShipyardInSystem,
      icon: Wrench,
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
    {
      title: "Mine Asteroid",
      icon: Pickaxe,
      url: "/mining",
    },
  ];

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
                    <item.icon className="h-5 w-5" />
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
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
