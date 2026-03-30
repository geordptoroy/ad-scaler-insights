import {
  LayoutDashboard,
  TrendingUp,
  Search,
  Clock,
  Star,
  FileText,
  Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Anúncios Escalados", url: "/scaled-ads", icon: TrendingUp },
  { title: "Pesquisa Avançada", url: "/search", icon: Search },
  { title: "Monitoramento", url: "/monitoring", icon: Clock },
  { title: "Meus Favoritos", url: "/favorites", icon: Star },
  { title: "Relatórios", url: "/reports", icon: FileText },
];

const settingsItem = { title: "Configurações", url: "/settings", icon: Settings };

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent">
            <TrendingUp className="h-4 w-4 text-accent-foreground" />
          </div>
          {!collapsed && (
            <span className="text-sm font-light tracking-[0.2em] uppercase text-foreground truncate">
              Forte Media
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="gap-3"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive(settingsItem.url)}
              tooltip={settingsItem.title}
            >
              <NavLink
                to={settingsItem.url}
                className="gap-3"
                activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
              >
                <settingsItem.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{settingsItem.title}</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
