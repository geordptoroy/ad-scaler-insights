import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Plug, Key, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Configurações
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie seu perfil e preferências
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="profile" className="data-[state=active]:bg-secondary">
            <User className="h-4 w-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-secondary">
            <Bell className="h-4 w-4 mr-2" />
            Preferências
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-secondary">
            <Plug className="h-4 w-4 mr-2" />
            Integrações
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-secondary">
            <Key className="h-4 w-4 mr-2" />
            API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card className="bg-card border-border p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Nome</label>
              <Input
                defaultValue="Usuário Demo"
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">E-mail</label>
              <Input
                defaultValue="demo@fortemedia.com"
                className="bg-secondary border-border"
              />
            </div>
            <Button className="bg-primary text-primary-foreground">
              Salvar Alterações
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <Card className="bg-card border-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">
                  Notificações por e-mail
                </p>
                <p className="text-xs text-muted-foreground">
                  Receba alertas de novos anúncios escalados
                </p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Moeda</label>
              <Select defaultValue="BRL">
                <SelectTrigger className="bg-secondary border-border w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="BRL">R$ (BRL)</SelectItem>
                  <SelectItem value="USD">$ (USD)</SelectItem>
                  <SelectItem value="EUR">€ (EUR)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Score mínimo padrão
              </label>
              <Input
                type="number"
                defaultValue="18"
                className="bg-secondary border-border w-40"
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <Card className="bg-card border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Meta Ad Library API</p>
                <p className="text-xs text-muted-foreground">
                  Conexão para coleta de dados de anúncios
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-accent text-accent-foreground bg-accent/10"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Conectado
              </Badge>
            </div>
            <Button variant="outline" className="border-border">
              Testar Conexão
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <Card className="bg-card border-border p-6 space-y-4">
            <div>
              <p className="text-sm text-foreground">API Key</p>
              <p className="text-xs text-muted-foreground">
                Use para integrar com sistemas externos (em breve)
              </p>
            </div>
            <Input
              readOnly
              value="••••••••••••••••••••"
              className="bg-secondary border-border font-mono"
            />
            <Button variant="outline" className="border-border" disabled>
              Gerar Nova Chave
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
