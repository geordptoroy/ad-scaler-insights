import { Search, RefreshCw, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function TopBar() {
  const { data: syncStatus } = useQuery({
    queryKey: ["sync-status"],
    queryFn: api.sync.status,
    refetchInterval: 60000,
  });

  const lastSync = syncStatus?.lastSync
    ? new Date(syncStatus.lastSync).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background px-4">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar anúncios, páginas... (Ctrl+K)"
          className="pl-9 h-9 bg-card border-border text-sm placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Sync status */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className="h-3 w-3" />
          <span>Sync: {lastSync}</span>
          <span
            className={`h-2 w-2 rounded-full ${
              syncStatus?.status === "running" ? "bg-warning animate-pulse" : "bg-success"
            }`}
          />
        </div>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-border">
              <User className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
