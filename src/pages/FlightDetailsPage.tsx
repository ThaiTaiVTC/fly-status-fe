import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { ArrowLeft, Plane, Users, Wifi, Activity, Clock, DollarSign, Package, TrendingUp, TrendingDown, Smartphone, Tablet, Laptop, ShoppingCart, Percent } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";

// Dữ liệu băng thông theo thời gian
const bandwidthData = [
  { time: "00:00", value: 8.2, devices: 45 },
  { time: "01:00", value: 9.1, devices: 67 },
  { time: "02:00", value: 12.5, devices: 98 },
  { time: "03:00", value: 15.2, devices: 134 },
  { time: "04:00", value: 13.8, devices: 151 },
  { time: "05:00", value: 11.4, devices: 142 },
];

// Dữ liệu thiết bị kết nối
const deviceData = [
  { type: "Phone", count: 89, percentage: 59 },
  { type: "Tablet", count: 34, percentage: 23 },
  { type: "Laptop", count: 28, percentage: 18 },
];

// Dữ liệu gói cước
const packageData = [
  { name: "Free WiFi", sold: 85, revenue: 0, color: "#94a3b8" },
  { name: "Basic (30min)", sold: 42, revenue: 42 * 5, color: "#60a5fa" },
  { name: "Standard (1h)", sold: 38, revenue: 38 * 10, color: "#34d399" },
  { name: "Premium (Full)", sold: 35, revenue: 35 * 20, color: "#f59e0b" },
  { name: "Business Class", sold: 20, revenue: 20 * 30, color: "#a78bfa" },
];

// Dữ liệu doanh thu theo giờ
const revenueData = [
  { time: "00:00", revenue: 45, packages: 8 },
  { time: "01:00", revenue: 120, packages: 15 },
  { time: "02:00", revenue: 280, packages: 32 },
  { time: "03:00", revenue: 450, packages: 48 },
  { time: "04:00", revenue: 520, packages: 56 },
  { time: "05:00", revenue: 610, packages: 65 },
];

// Dữ liệu sử dụng bandwidth theo gói
const bandwidthByPackage = [
  { package: "Free", avgBandwidth: 2.1, users: 85 },
  { package: "Basic", avgBandwidth: 5.5, users: 42 },
  { package: "Standard", avgBandwidth: 8.2, users: 38 },
  { package: "Premium", avgBandwidth: 12.5, users: 35 },
  { package: "Business", avgBandwidth: 15.8, users: 20 },
];

// Danh sách thiết bị
const devices = [
  { id: "1", type: "phone", os: "iOS 17.2", bandwidth: 2.5, duration: 45, package: "Premium", revenue: 20, seat: "12A" },
  { id: "2", type: "laptop", os: "Windows 11", bandwidth: 8.3, duration: 120, package: "Premium", revenue: 20, seat: "15C" },
  { id: "3", type: "tablet", os: "Android 14", bandwidth: 4.1, duration: 28, package: "Basic", revenue: 5, seat: "8B" },
  { id: "4", type: "phone", os: "Android 13", bandwidth: 1.8, duration: 52, package: "Standard", revenue: 10, seat: "22D" },
  { id: "5", type: "phone", os: "iOS 16.5", bandwidth: 3.2, duration: 75, package: "Standard", revenue: 10, seat: "5A" },
  { id: "6", type: "laptop", os: "macOS 14", bandwidth: 12.1, duration: 110, package: "Business", revenue: 30, seat: "3B" },
];

const getDeviceIcon = (type: string) => {
  switch (type) {
    case "phone":
      return Smartphone;
    case "tablet":
      return Tablet;
    case "laptop":
      return Laptop;
    default:
      return Smartphone;
  }
};

const COLORS = ["#94a3b8", "#60a5fa", "#34d399", "#f59e0b", "#a78bfa"];

export default function FlightDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const flight = {
    flightNumber: "VN203",
    aircraft: "Boeing 787-9",
    route: "HAN → SGN",
    departure: "08:30",
    arrival: "10:45",
    status: "active" as const,
    passengers: 248,
    connectedDevices: 151,
    bandwidth: 12.8,
    quality: "excellent" as const,
    downtime: 0.2,
    complaints: 0,
  };

  // Tính toán thống kê
  const totalPackagesSold = packageData.reduce((sum, p) => sum + p.sold, 0);
  const totalRevenue = packageData.reduce((sum, p) => sum + p.revenue, 0);
  const conversionRate = (((totalPackagesSold - packageData[0].sold) / flight.passengers) * 100).toFixed(1);
  const avgRevenuePerPassenger = (totalRevenue / flight.passengers).toFixed(2);
  const paidUsers = totalPackagesSold - packageData[0].sold;

  const qualityColor = {
    excellent: "bg-success",
    good: "bg-primary",
    fair: "bg-warning",
    poor: "bg-danger",
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/realtime")} className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">Chi tiết chuyến bay</h1>
              <p className="text-sm sm:text-base text-muted-foreground truncate">Phân tích chi tiết chuyến bay {flight.flightNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-11 sm:ml-0">
            <Badge variant={flight.status === "active" ? "success" : "default"} className="shrink-0">
              {flight.status === "active" ? "Đang bay" : "Hoàn thành"}
            </Badge>
          </div>
        </div>

        {/* Flight Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Thông tin chuyến bay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Số hiệu</p>
                <p className="text-xl font-semibold">{flight.flightNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Máy bay</p>
                <p className="text-xl font-semibold">{flight.aircraft}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tuyến bay</p>
                <p className="text-xl font-semibold">{flight.route}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Thời gian</p>
                <p className="text-xl font-semibold">
                  {flight.departure} - {flight.arrival}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue & Package Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-8 w-8 text-green-500" />
                <div className="text-right">
                  <p className="text-2xl font-bold">${totalRevenue}</p>
                  <p className="text-sm text-muted-foreground">Tổng doanh thu</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
                <TrendingUp className="h-3 w-3" />
                <span>${avgRevenuePerPassenger}/khách</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <ShoppingCart className="h-8 w-8 text-blue-500" />
                <div className="text-right">
                  <p className="text-2xl font-bold">{totalPackagesSold}</p>
                  <p className="text-sm text-muted-foreground">Gói đã bán</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-blue-600 mt-2">
                <Package className="h-3 w-3" />
                <span>{paidUsers} gói trả phí</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Percent className="h-8 w-8 text-purple-500" />
                <div className="text-right">
                  <p className="text-2xl font-bold">{conversionRate}%</p>
                  <p className="text-sm text-muted-foreground">Tỷ lệ chuyển đổi</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-purple-600 mt-2">
                <TrendingUp className="h-3 w-3" />
                <span>
                  {paidUsers}/{flight.passengers} khách mua
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-orange-500" />
                <div className="text-right">
                  <p className="text-2xl font-bold">{flight.connectedDevices}</p>
                  <p className="text-sm text-muted-foreground">Thiết bị kết nối</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-orange-600 mt-2">
                <Activity className="h-3 w-3" />
                <span>{((flight.connectedDevices / flight.passengers) * 100).toFixed(0)}% hành khách</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Wifi className="h-8 w-8 text-primary" />
                <div className="text-right">
                  <p className="text-2xl font-bold">{flight.bandwidth} Mbps</p>
                  <p className="text-sm text-muted-foreground">Băng thông TB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Activity className={`h-8 w-8 ${qualityColor[flight.quality]}`} />
                <div className="text-right">
                  <p className="text-2xl font-bold capitalize">{flight.quality === "excellent" ? "Xuất sắc" : flight.quality}</p>
                  <p className="text-sm text-muted-foreground">Chất lượng</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-8 w-8 text-primary" />
                <div className="text-right">
                  <p className="text-2xl font-bold">{flight.downtime}%</p>
                  <p className="text-sm text-muted-foreground">Downtime</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-8 w-8 text-green-500" />
                <div className="text-right">
                  <p className="text-2xl font-bold">{flight.complaints}</p>
                  <p className="text-sm text-muted-foreground">Khiếu nại</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Package Distribution & Revenue Charts */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Phân bố gói cước
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={packageData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, sold, percent }) => `${name.split(" ")[0]}: ${sold} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={90}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="sold"
                    paddingAngle={2}
                  >
                    {packageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="hsl(var(--background))" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value: number) => [`${value} gói`, "Số lượng"]}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Doanh thu theo gói cước
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={packageData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" angle={-25} textAnchor="end" height={80} fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value: number) => [`$${value}`, "Doanh thu"]}
                    cursor={{ fill: "hsl(var(--accent))", opacity: 0.3 }}
                  />
                  <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[8, 8, 0, 0]} maxBarSize={60}>
                    {packageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} opacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div> */}

        {/* Bandwidth & Revenue Over Time */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Băng thông & Thiết bị theo thời gian</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={bandwidthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="value" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.6} name="Băng thông (Mbps)" />
                  <Area yAxisId="right" type="monotone" dataKey="devices" stroke="#34d399" fill="#34d399" fillOpacity={0.6} name="Thiết bị" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo thời gian</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#34d399" strokeWidth={2} name="Doanh thu ($)" />
                  <Line yAxisId="right" type="monotone" dataKey="packages" stroke="#f59e0b" strokeWidth={2} name="Gói đã bán" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bandwidth by Package & Device Types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Băng thông trung bình theo gói</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bandwidthByPackage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="package" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="avgBandwidth" fill="#60a5fa" name="Băng thông TB (Mbps)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loại thiết bị kết nối</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deviceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" name="Số lượng" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Package Sales Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Chi tiết gói cước đã bán
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Gói cước</th>
                    <th className="text-left py-3 px-4 font-semibold">Số lượng bán</th>
                    <th className="text-left py-3 px-4 font-semibold">Tỷ lệ</th>
                    <th className="text-left py-3 px-4 font-semibold">Doanh thu</th>
                    <th className="text-left py-3 px-4 font-semibold">Giá/gói</th>
                  </tr>
                </thead>
                <tbody>
                  {packageData.map((pkg, index) => (
                    <tr key={index} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pkg.color }}></div>
                          <span className="font-semibold">{pkg.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{pkg.sold}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(pkg.sold / totalPackagesSold) * 100}%`,
                                backgroundColor: pkg.color,
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{((pkg.sold / totalPackagesSold) * 100).toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-green-600">${pkg.revenue}</span>
                      </td>
                      <td className="py-3 px-4">${pkg.revenue > 0 ? (pkg.revenue / pkg.sold).toFixed(0) : 0}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-border font-bold">
                    <td className="py-3 px-4">Tổng cộng</td>
                    <td className="py-3 px-4">{totalPackagesSold}</td>
                    <td className="py-3 px-4">100%</td>
                    <td className="py-3 px-4 text-green-600">${totalRevenue}</td>
                    <td className="py-3 px-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Device List with Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách thiết bị đang kết nối</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Thiết bị</th>
                    <th className="text-left py-3 px-4 font-semibold">Hệ điều hành</th>
                    <th className="text-left py-3 px-4 font-semibold">Ghế</th>
                    <th className="text-left py-3 px-4 font-semibold">Băng thông</th>
                    <th className="text-left py-3 px-4 font-semibold">Thời gian</th>
                    <th className="text-left py-3 px-4 font-semibold">Gói dịch vụ</th>
                    <th className="text-left py-3 px-4 font-semibold">Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => {
                    const DeviceIcon = getDeviceIcon(device.type);
                    return (
                      <tr key={device.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <DeviceIcon className="h-5 w-5 text-primary" />
                            <span className="capitalize">{device.type}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{device.os}</td>
                        <td className="py-3 px-4">
                          <Badge variant="default">{device.seat}</Badge>
                        </td>
                        <td className="py-3 px-4">{device.bandwidth} Mbps</td>
                        <td className="py-3 px-4">{device.duration} phút</td>
                        <td className="py-3 px-4">
                          <Badge variant={device.package === "Premium" || device.package === "Business" ? "success" : "default"}>{device.package}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-green-600">${device.revenue}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
