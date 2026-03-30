import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock auth — will be replaced with real backend
    await new Promise((r) => setTimeout(r, 800));

    localStorage.setItem("forte-media-auth", JSON.stringify({ email, name: name || email.split("@")[0] }));

    toast({
      title: isSignUp ? "Conta criada com sucesso!" : "Login realizado!",
      description: "Bem-vindo ao Forte Media.",
    });

    setLoading(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
            <TrendingUp className="h-6 w-6 text-accent-foreground" />
          </div>
          <h1 className="text-lg font-light tracking-[0.2em] uppercase text-foreground">
            Forte Media
          </h1>
          <p className="text-sm text-muted-foreground">
            {isSignUp ? "Crie sua conta" : "Acesse sua conta"}
          </p>
        </div>

        <Card className="bg-card border-border p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-muted-foreground text-xs">Nome</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="bg-secondary border-border"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground text-xs">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="bg-secondary border-border pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground text-xs">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-secondary border-border pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <button type="button" className="text-xs text-accent-foreground hover:underline">
                Esqueceu a senha?
              </button>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Aguarde..." : isSignUp ? "Criar conta" : "Entrar"}
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          {isSignUp ? "Já tem conta?" : "Não tem conta?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-accent-foreground hover:underline"
          >
            {isSignUp ? "Fazer login" : "Criar conta"}
          </button>
        </p>
      </div>
    </div>
  );
}
