import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Plane, Users, Wifi, Activity, TrendingUp, Navigation, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "@/components/organisms/BottomNavigation";

interface ActiveFlight {
  id: string;
  flightNumber: string;
  route: string;
  aircraft: string;
  passengers: number;
  connectedDevices: number;
  bandwidth: number;
  quality: "excellent" | "good" | "fair" | "poor";
  altitude: string;
  speed: string;
}

const mockFlights: ActiveFlight[] = [
  {
    id: "1",
    flightNumber: "VN203",
    route: "HAN → SGN",
    aircraft: "Boeing 787-9",
    passengers: 248,
    connectedDevices: 151,
    bandwidth: 12.8,
    quality: "excellent",
    altitude: "35,000 ft",
    speed: "850 km/h",
  },
  {
    id: "2",
    flightNumber: "VN156",
    route: "SGN → DAD",
    aircraft: "Airbus A321",
    passengers: 186,
    connectedDevices: 98,
    bandwidth: 8.4,
    quality: "good",
    altitude: "32,000 ft",
    speed: "780 km/h",
  },
  {
    id: "3",
    flightNumber: "VN412",
    route: "HAN → PQC",
    aircraft: "Airbus A350",
    passengers: 305,
    connectedDevices: 187,
    bandwidth: 15.2,
    quality: "excellent",
    altitude: "38,000 ft",
    speed: "890 km/h",
  },
  {
    id: "4",
    flightNumber: "VN789",
    route: "SGN → NRT",
    aircraft: "Boeing 787-10",
    passengers: 367,
    connectedDevices: 215,
    bandwidth: 10.5,
    quality: "good",
    altitude: "41,000 ft",
    speed: "920 km/h",
  },
  {
    id: "5",
    flightNumber: "VN524",
    route: "HAN → BKK",
    aircraft: "Airbus A321",
    passengers: 178,
    connectedDevices: 89,
    bandwidth: 6.8,
    quality: "fair",
    altitude: "36,000 ft",
    speed: "800 km/h",
  },
];

const getQualityColor = (quality: string) => {
  switch (quality) {
    case "excellent":
      return "success";
    case "good":
      return "default";
    case "fair":
      return "warning";
    case "poor":
      return "danger";
    default:
      return "default";
  }
};

const getQualityText = (quality: string) => {
  switch (quality) {
    case "excellent":
      return "Xuất sắc";
    case "good":
      return "Tốt";
    case "fair":
      return "Trung bình";
    case "poor":
      return "Kém";
    default:
      return quality;
  }
};

export default function RealtimeMonitoringPage() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState(mockFlights);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFlights((prev) =>
        prev.map((flight) => ({
          ...flight,
          connectedDevices: flight.connectedDevices + Math.floor(Math.random() * 5) - 2,
          bandwidth: Math.max(5, Math.min(20, flight.bandwidth + (Math.random() - 0.5) * 2)),
        }))
      );
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalFlights = flights.length;
  const totalPassengers = flights.reduce((sum, f) => sum + f.passengers, 0);
  const totalDevices = flights.reduce((sum, f) => sum + f.connectedDevices, 0);
  const avgBandwidth = (flights.reduce((sum, f) => sum + f.bandwidth, 0) / flights.length).toFixed(1);

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Giám sát Real-time</h1>
            <p className="text-muted-foreground">Theo dõi trực tiếp các chuyến bay đang hoạt động</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="h-4 w-4 animate-pulse text-success" />
            <span>Cập nhật: {lastUpdate.toLocaleTimeString("vi-VN")}</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Chuyến bay</p>
                  <p className="text-3xl font-bold">{totalFlights}</p>
                </div>
                <Plane className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Hành khách</p>
                  <p className="text-3xl font-bold">{totalPassengers.toLocaleString()}</p>
                </div>
                <Users className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Thiết bị</p>
                  <p className="text-3xl font-bold">{totalDevices}</p>
                </div>
                <Wifi className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Băng thông TB</p>
                  <p className="text-3xl font-bold">{avgBandwidth} Mbps</p>
                </div>
                <TrendingUp className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Flights Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Chuyến bay đang hoạt động
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Chuyến bay</th>
                    <th className="text-left py-3 px-4 font-semibold">Tuyến</th>
                    <th className="text-left py-3 px-4 font-semibold">Máy bay</th>
                    <th className="text-left py-3 px-4 font-semibold">Thiết bị</th>
                    <th className="text-left py-3 px-4 font-semibold">Băng thông</th>
                    <th className="text-left py-3 px-4 font-semibold">Độ cao</th>
                    <th className="text-left py-3 px-4 font-semibold">Tốc độ</th>
                    <th className="text-left py-3 px-4 font-semibold">Chất lượng</th>
                    <th className="text-left py-3 px-4 font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {flights.map((flight) => (
                    <tr key={flight.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-semibold">{flight.flightNumber}</span>
                      </td>
                      <td className="py-3 px-4">{flight.route}</td>
                      <td className="py-3 px-4">{flight.aircraft}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {flight.connectedDevices}/{flight.passengers}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Wifi className="h-4 w-4 text-muted-foreground" />
                          <span>{flight.bandwidth.toFixed(1)} Mbps</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{flight.altitude}</td>
                      <td className="py-3 px-4">{flight.speed}</td>
                      <td className="py-3 px-4">
                        <Badge variant={getQualityColor(flight.quality)}>{getQualityText(flight.quality)}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/flights/${flight.id}`)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Chi tiết
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <BottomNavigation />
      </div>
    </div>
  );
}
