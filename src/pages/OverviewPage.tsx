import { Header } from "@/components/organisms/Header";
import { MetricsGrid } from "@/components/organisms/MetricsGrid";
import { BottomNavigation } from "@/components/organisms/BottomNavigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { StatCard } from "@/components/molecules/StatCard";
import { FilterBar } from "@/components/molecules/FilterBar";
import { toast } from "@/hooks/use-toast";

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-hover to-blue-900 pb-20 relative overflow-hidden border-none">
      {/* Top White Background - covers Header and FilterBar */}
      <div className="absolute top-0 left-0 right-0 h-[16%] bg-white rounded-b-[3rem]" />

      <Header title="Tổng quan thông tin " />

      <main className="container border-none mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-6 relative z-10">
        {/* Filter Bar with animation */}
        <div className="animate-fade-in">
          <FilterBar />
        </div>

        {/* Metrics Grid with animation */}
        <div className="animate-fade-in-up">
          <MetricsGrid />
        </div>

        {/* Aircraft Section with animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
          <div className="p-2.5 bg-gradient-to-br from-gray-100/60 to-gray-50/40 rounded-[1.75rem]">
            <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-0 bg-white rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-extrabold flex items-center gap-3">
                  <span className="w-1.5 h-7 bg-gradient-to-b from-primary to-secondary rounded-full" />
                  Máy bay
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <StatCard label="Hoạt động" value="47/50" valueClassName="text-success" />
                <StatCard label="Số chuyến" value="342" valueClassName="text-primary" />
                <StatCard label="Lỗi" value="1" valueClassName="text-danger" />
              </CardContent>
            </Card>
          </div>

          <div className="p-2.5 bg-gradient-to-br from-gray-100/60 to-gray-50/40 rounded-[1.75rem]">
            <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-0 bg-white rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-extrabold flex items-center gap-3">
                  <span className="w-1.5 h-7 bg-gradient-to-b from-primary to-secondary rounded-full" />
                  Chất lượng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <StatCard label="Tốc độ TB" value="12.8 Mbps" valueClassName="text-primary" />
                <StatCard label="Khiếu nại" value="0.3%" valueClassName="text-warning" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
