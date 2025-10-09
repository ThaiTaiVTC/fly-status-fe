import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { ArrowLeft, Plane, Users, Wifi, Activity, Clock, AlertTriangle, Smartphone, Tablet, Laptop } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const bandwidthData = [
  { time: '00:00', value: 8.2 },
  { time: '01:00', value: 9.1 },
  { time: '02:00', value: 12.5 },
  { time: '03:00', value: 15.2 },
  { time: '04:00', value: 13.8 },
  { time: '05:00', value: 11.4 },
];

const deviceData = [
  { type: 'Phone', count: 89 },
  { type: 'Tablet', count: 34 },
  { type: 'Laptop', count: 28 },
];

const devices = [
  { id: '1', type: 'phone', os: 'iOS 17.2', bandwidth: 2.5, duration: 45, package: 'Premium' },
  { id: '2', type: 'laptop', os: 'Windows 11', bandwidth: 8.3, duration: 32, package: 'Premium' },
  { id: '3', type: 'tablet', os: 'Android 14', bandwidth: 4.1, duration: 28, package: 'Basic' },
  { id: '4', type: 'phone', os: 'Android 13', bandwidth: 1.8, duration: 52, package: 'Basic' },
];

const getDeviceIcon = (type: string) => {
  switch (type) {
    case 'phone': return Smartphone;
    case 'tablet': return Tablet;
    case 'laptop': return Laptop;
    default: return Smartphone;
  }
};

export default function FlightDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const flight = {
    flightNumber: 'VN203',
    aircraft: 'Boeing 787-9',
    route: 'HAN → SGN',
    departure: '08:30',
    arrival: '10:45',
    status: 'active' as const,
    passengers: 248,
    connectedDevices: 151,
    bandwidth: 12.8,
    quality: 'excellent' as const,
    downtime: 0.2,
    complaints: 0,
  };

  const qualityColor = {
    excellent: 'bg-success',
    good: 'bg-primary',
    fair: 'bg-warning',
    poor: 'bg-danger',
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Chi tiết chuyến bay</h1>
              <p className="text-muted-foreground">Giám sát chi tiết chuyến bay {flight.flightNumber}</p>
            </div>
          </div>
          <Badge variant={flight.status === 'active' ? 'success' : 'default'}>
            {flight.status === 'active' ? 'Đang bay' : 'Hoàn thành'}
          </Badge>
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
                <p className="text-xl font-semibold">{flight.departure} - {flight.arrival}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-primary" />
                <div className="text-right">
                  <p className="text-2xl font-bold">{flight.connectedDevices}/{flight.passengers}</p>
                  <p className="text-sm text-muted-foreground">Thiết bị kết nối</p>
                </div>
              </div>
            </CardContent>
          </Card>

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
                  <p className="text-2xl font-bold capitalize">{flight.quality === 'excellent' ? 'Xuất sắc' : flight.quality}</p>
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
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Băng thông theo thời gian</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={bandwidthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thiết bị kết nối</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={deviceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Device List */}
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
                    <th className="text-left py-3 px-4 font-semibold">Băng thông</th>
                    <th className="text-left py-3 px-4 font-semibold">Thời gian</th>
                    <th className="text-left py-3 px-4 font-semibold">Gói dịch vụ</th>
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
                        <td className="py-3 px-4">{device.bandwidth} Mbps</td>
                        <td className="py-3 px-4">{device.duration} phút</td>
                        <td className="py-3 px-4">
                          <Badge variant={device.package === 'Premium' ? 'success' : 'default'}>
                            {device.package}
                          </Badge>
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
