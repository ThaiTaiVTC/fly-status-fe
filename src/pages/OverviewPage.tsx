import { Header } from "@/components/organisms/Header";
import { MetricsGrid } from "@/components/organisms/MetricsGrid";
import { BottomNavigation } from "@/components/organisms/BottomNavigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { StatCard } from "@/components/molecules/StatCard";
import { FilterBar } from "@/components/molecules/FilterBar";
import { toast } from "@/hooks/use-toast";

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2" />

      <Header />

      <main className="container mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10 relative z-10">
        {/* Filter Bar with animation */}
        <div className="animate-fade-in">
          <FilterBar />
        </div>

        {/* Metrics Grid with animation */}
        <div className="animate-fade-in-up">
          <MetricsGrid />
        </div>

        {/* Aircraft Section with animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 animate-slide-up">
          <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-primary/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                Máy bay
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <StatCard label="Hoạt động" value="47/50" valueClassName="text-success" />
              <StatCard label="Số chuyến" value="342" valueClassName="text-primary" />
              <StatCard label="Lỗi" value="1" valueClassName="text-danger" />
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-primary/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                Chất lượng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <StatCard label="Tốc độ TB" value="12.8 Mbps" valueClassName="text-primary" />
              <StatCard label="Khiếu nại" value="0.3%" valueClassName="text-warning" />
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
