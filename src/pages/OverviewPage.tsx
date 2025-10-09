import { Header } from '@/components/organisms/Header';
import { MetricsGrid } from '@/components/organisms/MetricsGrid';
import { BottomNavigation } from '@/components/organisms/BottomNavigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms/Card';
import { StatCard } from '@/components/molecules/StatCard';
import { FilterBar } from '@/components/molecules/FilterBar';
import { toast } from '@/hooks/use-toast';

export default function OverviewPage() {
  const handleExport = () => {
    toast({
      title: "Đang xuất dữ liệu",
      description: "File Excel sẽ được tải xuống sau giây lát...",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-8">
        {/* Filter Bar */}
        <FilterBar onExport={handleExport} />

        {/* Metrics Grid */}
        <MetricsGrid />

        {/* Aircraft Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">Máy bay</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <StatCard 
                label="Hoạt động" 
                value="47/50" 
                valueClassName="text-success"
              />
              <StatCard 
                label="Số chuyến" 
                value="342" 
                valueClassName="text-primary"
              />
              <StatCard 
                label="Lỗi" 
                value="1" 
                valueClassName="text-danger"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">Chất lượng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <StatCard 
                label="Tốc độ TB" 
                value="12.8 Mbps" 
                valueClassName="text-primary"
              />
              <StatCard 
                label="Khiếu nại" 
                value="0.3%" 
                valueClassName="text-warning"
              />
            </CardContent>
          </Card>
        </div>

        {/* Top Routes Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">Top tuyến</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { route: 'SGN - HAN', passengers: '2,340', flights: '12' },
                { route: 'SGN - DAD', passengers: '1,890', flights: '8' },
                { route: 'HAN - DAD', passengers: '1,560', flights: '6' },
                { route: 'SGN - CXR', passengers: '1,234', flights: '5' },
                { route: 'HAN - BMV', passengers: '987', flights: '4' },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                  <div>
                    <span className="font-bold text-base">{item.route}</span>
                    <p className="text-sm text-muted-foreground mt-1">{item.flights} chuyến</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg text-primary">{item.passengers}</span>
                    <p className="text-xs text-muted-foreground mt-1">hành khách</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
}