import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Plane, Clock, MapPin, Eye, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "@/components/organisms/BottomNavigation";

interface Flight {
  id: string;
  flightNumber: string;
  departure: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  aircraft: string;
  status: "scheduled" | "boarding" | "departed" | "arrived" | "cancelled" | "delayed";
  gate: string;
  passengers: number;
}

const mockFlights: Flight[] = [
  {
    id: "1",
    flightNumber: "VN203",
    departure: "HAN",
    destination: "SGN",
    departureTime: "08:30",
    arrivalTime: "10:45",
    aircraft: "Boeing 787-9",
    status: "departed",
    gate: "A12",
    passengers: 248,
  },
  {
    id: "2",
    flightNumber: "VN156",
    departure: "SGN",
    destination: "DAD",
    departureTime: "14:15",
    arrivalTime: "15:30",
    aircraft: "Airbus A321",
    status: "boarding",
    gate: "B5",
    passengers: 186,
  },
  {
    id: "3",
    flightNumber: "VN412",
    departure: "HAN",
    destination: "PQC",
    departureTime: "16:00",
    arrivalTime: "18:15",
    aircraft: "Airbus A350",
    status: "scheduled",
    gate: "C8",
    passengers: 305,
  },
  {
    id: "4",
    flightNumber: "VN789",
    departure: "SGN",
    destination: "NRT",
    departureTime: "22:30",
    arrivalTime: "06:15",
    aircraft: "Boeing 787-10",
    status: "delayed",
    gate: "D3",
    passengers: 367,
  },
  {
    id: "5",
    flightNumber: "VN524",
    departure: "HAN",
    destination: "BKK",
    departureTime: "09:45",
    arrivalTime: "11:30",
    aircraft: "Airbus A321",
    status: "arrived",
    gate: "A7",
    passengers: 178,
  },
  {
    id: "6",
    flightNumber: "VN301",
    departure: "SGN",
    destination: "HAN",
    departureTime: "12:00",
    arrivalTime: "14:15",
    aircraft: "Boeing 787-9",
    status: "scheduled",
    gate: "B12",
    passengers: 256,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "departed":
      return "default";
    case "boarding":
      return "warning";
    case "scheduled":
      return "default";
    case "arrived":
      return "success";
    case "cancelled":
      return "danger";
    case "delayed":
      return "danger";
    default:
      return "default";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "departed":
      return "Đã khởi hành";
    case "boarding":
      return "Đang lên máy bay";
    case "scheduled":
      return "Đã lên lịch";
    case "arrived":
      return "Đã đến";
    case "cancelled":
      return "Đã hủy";
    case "delayed":
      return "Trễ giờ";
    default:
      return status;
  }
};

export default function RealtimeMonitoringPage() {
  const navigate = useNavigate();
  const [flights] = useState(mockFlights);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFlights = flights.filter(
    (flight) =>
      flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.departure.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFlights = flights.length;
  const departedFlights = flights.filter((f) => f.status === "departed").length;
  const scheduledFlights = flights.filter((f) => f.status === "scheduled").length;
  const delayedFlights = flights.filter((f) => f.status === "delayed").length;

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản lý Chuyến Bay</h1>
            <p className="text-muted-foreground">Danh sách tất cả các chuyến bay</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tổng số chuyến bay</p>
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
                  <p className="text-sm text-muted-foreground mb-1">Đã khởi hành</p>
                  <p className="text-3xl font-bold">{departedFlights}</p>
                </div>
                <Plane className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Đã lên lịch</p>
                  <p className="text-3xl font-bold">{scheduledFlights}</p>
                </div>
                <Clock className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Trễ giờ</p>
                  <p className="text-3xl font-bold">{delayedFlights}</p>
                </div>
                <Clock className="h-10 w-10 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm theo số hiệu chuyến bay, điểm đi, điểm đến..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Flights Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Danh sách chuyến bay ({filteredFlights.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
              {filteredFlights.map((flight) => (
                <div key={flight.id} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-xl mb-1">{flight.flightNumber}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {flight.departure} → {flight.destination}
                        </span>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(flight.status)}>{getStatusText(flight.status)}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Giờ khởi hành</p>
                      <p className="text-sm font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {flight.departureTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Giờ đến</p>
                      <p className="text-sm font-medium">{flight.arrivalTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Máy bay</p>
                      <p className="text-sm font-medium">{flight.aircraft}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Cổng</p>
                      <Badge variant="default" className="text-xs">{flight.gate}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Hành khách</p>
                      <p className="text-sm font-medium">{flight.passengers}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate(`/flights/${flight.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Xem chi tiết
                  </Button>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Chuyến bay</th>
                    <th className="text-left py-3 px-4 font-semibold">Tuyến bay</th>
                    <th className="text-left py-3 px-4 font-semibold">Giờ bay</th>
                    <th className="text-left py-3 px-4 font-semibold">Máy bay</th>
                    <th className="text-left py-3 px-4 font-semibold">Cổng</th>
                    <th className="text-left py-3 px-4 font-semibold">Hành khách</th>
                    <th className="text-left py-3 px-4 font-semibold">Trạng thái</th>
                    <th className="text-left py-3 px-4 font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFlights.map((flight) => (
                    <tr key={flight.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-semibold text-lg">{flight.flightNumber}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {flight.departure} → {flight.destination}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div className="flex flex-col">
                            <span className="text-sm">Đi: {flight.departureTime}</span>
                            <span className="text-sm text-muted-foreground">Đến: {flight.arrivalTime}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{flight.aircraft}</td>
                      <td className="py-3 px-4">
                        <Badge variant="default">{flight.gate}</Badge>
                      </td>
                      <td className="py-3 px-4">{flight.passengers}</td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusColor(flight.status)}>{getStatusText(flight.status)}</Badge>
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

            {filteredFlights.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">Không tìm thấy chuyến bay nào</div>
            )}
          </CardContent>
        </Card>
        <BottomNavigation />
      </div>
    </div>
  );
}
