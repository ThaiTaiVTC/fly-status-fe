import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/atoms/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Plane, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@vietnam-airlines.com");
  const [password, setPassword] = useState("admin123");
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn đến với hệ thống IFC!",
        });
      } else {
        toast({
          title: "Đăng nhập thất bại",
          description: "Email hoặc mật khẩu không chính xác.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Lỗi hệ thống",
        description: "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Top Gradient Background */}
      <div className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-br from-primary via-primary-hover to-blue-900 rounded-b-[3rem]" />

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 pt-8 pb-24">
        {/* Welcome Text with fade-in animation */}
        <div className="flex items-center justify-center p-4 animate-fade-in">
          <span className="text-white font-medium">Chào mừng</span>
        </div>

        {/* Logo Section with animation */}
        <div className="text-center space-y-6 mb-12 animate-fade-in-up">
          <div className="mx-auto w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl animate-float">
            <Plane className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Vietnam Airlines
            <br />
            IFC Analyst
          </h1>
        </div>

        {/* Sign In Form with slide-up animation */}
        <div className="w-full max-w-sm animate-slide-up">
          {/* Enhanced Glass Morphism Container with gradient border */}
          <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-6 relative">
              {/* Input Fields */}
              <div className="space-y-5">
                {/* Email Input with Icon */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <Mail className={`w-5 h-5 transition-colors duration-200 ${emailFocused ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className={`bg-white/95 backdrop-blur-md border-0 rounded-2xl h-14 pl-12 pr-4 text-foreground placeholder:text-muted-foreground shadow-lg transition-all duration-300 focus:ring-2 focus:ring-white/60 focus:shadow-[0_0_20px_rgba(255,255,255,0.5)] focus:scale-[1.02] ${
                      emailFocused ? "ring-2 ring-white/60 shadow-[0_0_20px_rgba(255,255,255,0.5)]" : ""
                    }`}
                    required
                    autoFocus
                  />
                  {/* Animated label */}
                  {email && <label className="absolute -top-2 left-3 bg-white/90 px-2 text-xs text-primary font-medium rounded animate-fade-in">Email</label>}
                </div>

                {/* Password Input with Icon */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <Lock className={`w-5 h-5 transition-colors duration-200 ${passwordFocused ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <Input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className={`bg-white/95 backdrop-blur-md border-0 rounded-2xl h-14 pl-12 pr-4 text-foreground placeholder:text-muted-foreground shadow-lg transition-all duration-300 focus:ring-2 focus:ring-white/60 focus:shadow-[0_0_20px_rgba(255,255,255,0.5)] focus:scale-[1.02] ${
                      passwordFocused ? "ring-2 ring-white/60 shadow-[0_0_20px_rgba(255,255,255,0.5)]" : ""
                    }`}
                    required
                  />
                  {/* Animated label */}
                  {password && <label className="absolute -top-2 left-3 bg-white/90 px-2 text-xs text-primary font-medium rounded animate-fade-in">Mật khẩu</label>}
                </div>
              </div>

              {/* Login Button with enhanced loading state */}
              <div className="flex flex-col items-center gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/50 hover:scale-[1.05] text-white font-bold rounded-2xl h-14 shadow-lg transition-all duration-300 text-lg disabled:opacity-70 disabled:hover:scale-100 relative overflow-hidden group"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Đang đăng nhập...
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10">Đăng nhập</span>
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
