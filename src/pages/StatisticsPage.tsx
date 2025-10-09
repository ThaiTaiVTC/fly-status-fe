import React, { useState } from 'react';
import { Header } from '@/components/organisms/Header';
import { BottomNavigation } from '@/components/organisms/BottomNavigation';
import { ChartCard } from '@/components/molecules/ChartCard';
import { Button } from '@/components/atoms/Button';
import { FilterBar } from '@/components/molecules/FilterBar';
import { toast } from '@/hooks/use-toast';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const hourlyData = [
  { time: '00:00', connections: 85 },
  { time: '04:00', connections: 45 },
  { time: '08:00', connections: 78 },
  { time: '12:00', connections: 92 },
  { time: '16:00', connections: 95 },
  { time: '20:00', connections: 80 },
];

const revenueData = [
  { month: 'T1', revenue: 2100000 },
  { month: 'T2', revenue: 1900000 },
  { month: 'T3', revenue: 2300000 },
  { month: 'T4', revenue: 2800000 },
  { month: 'T5', revenue: 2650000 },
  { month: 'T6', revenue: 3200000 },
];

const packageQuantityData = [
  { package: 'Cơ bản', value: 2500 },
  { package: 'Cao cấp', value: 8900 },
  { package: 'Premium', value: 1200 },
];

const packageRevenueData = [
  { package: 'Cơ bản', value: 125000000 },
  { package: 'Cao cấp', value: 2230000000 },
  { package: 'Premium', value: 480000000 },
];

export default function StatisticsPage() {
  const [activeTab, setActiveTab] = useState<'quantity' | 'revenue'>('quantity');

  const handleExport = () => {
    toast({
      title: "Đang xuất dữ liệu",
      description: "File Excel sẽ được tải xuống sau giây lát...",
    });
  };

  const packageData = activeTab === 'quantity' ? packageQuantityData : packageRevenueData;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Filter Bar */}
        <FilterBar onExport={handleExport} />

        {/* Connections by Hour Chart */}
        <ChartCard 
          title="Kết nối theo giờ"
          description="Số lượng kết nối trong ngày"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar 
                dataKey="connections" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Revenue 6 Months Chart */}
        <ChartCard 
          title="Doanh thu 6 tháng"
          description="Xu hướng doanh thu qua các tháng"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, 3600000]}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M VNĐ`, 'Doanh thu']}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Service Packages Chart */}
        <ChartCard 
          title="Gói dịch vụ"
          description="So sánh các gói dịch vụ"
        >
          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'quantity' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('quantity')}
              >
                Số lượng
              </Button>
              <Button
                variant={activeTab === 'revenue' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('revenue')}
              >
                Doanh thu
              </Button>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={packageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="package" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => {
                    if (activeTab === 'revenue') {
                      return `${(value / 1000000).toFixed(0)}M`;
                    }
                    return value;
                  }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => {
                    if (activeTab === 'revenue') {
                      return [`${(value / 1000000).toFixed(0)}M VNĐ`, 'Doanh thu'];
                    }
                    return [`${value} gói`, 'Số lượng'];
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </main>

      <BottomNavigation />
    </div>
  );
}