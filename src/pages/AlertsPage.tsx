import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { AlertTriangle, AlertCircle, Info, CheckCircle, Filter } from "lucide-react";
import { Alert } from "@/types";
import { BottomNavigation } from "@/components/organisms/BottomNavigation";

const alerts: Alert[] = [
  {
    id: "1",
    type: "error",
    title: "Mất kết nối",
    message: "Máy bay VN-A861 mất kết nối vệ tinh trong 2 phút",
    flightNumber: "VN203",
    timestamp: "2024-01-15T08:45:00",
    status: "resolved",
  },
  {
    id: "2",
    type: "warning",
    title: "Băng thông thấp",
    message: "Băng thông trung bình giảm xuống dưới 8 Mbps",
    flightNumber: "VN156",
    timestamp: "2024-01-15T09:12:00",
    status: "active",
  },
  {
    id: "3",
    type: "warning",
    title: "Downtime cao",
    message: "Downtime vượt mục tiêu 1% (hiện tại: 1.2%)",
    flightNumber: "VN412",
    timestamp: "2024-01-15T09:30:00",
    status: "active",
  },
  {
    id: "4",
    type: "info",
    title: "Bảo trì hệ thống",
    message: "Hệ thống sẽ được bảo trì vào 02:00 AM ngày 16/01",
    timestamp: "2024-01-15T10:00:00",
    status: "active",
  },
  {
    id: "5",
    type: "error",
    title: "Lỗi thiết bị",
    message: "Router chính trên VN-A872 gặp sự cố",
    flightNumber: "VN789",
    timestamp: "2024-01-15T07:20:00",
    status: "resolved",
  },
];

const getAlertIcon = (type: Alert["type"]) => {
  switch (type) {
    case "error":
      return AlertCircle;
    case "warning":
      return AlertTriangle;
    case "info":
      return Info;
  }
};

const getAlertColor = (type: Alert["type"]) => {
  switch (type) {
    case "error":
      return "text-danger";
    case "warning":
      return "text-warning";
    case "info":
      return "text-primary";
  }
};

export default function AlertsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | Alert["type"]>("all");

  const filteredAlerts = alerts.filter((alert) => {
    if (filter !== "all" && alert.status !== filter) return false;
    if (typeFilter !== "all" && alert.type !== typeFilter) return false;
    return true;
  });

  const activeCount = alerts.filter((a) => a.status === "active").length;
  const errorCount = alerts.filter((a) => a.type === "error" && a.status === "active").length;
  const warningCount = alerts.filter((a) => a.type === "warning" && a.status === "active").length;

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cảnh báo & Thông báo</h1>
          <p className="text-muted-foreground">Theo dõi và quản lý các cảnh báo hệ thống</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Cảnh báo đang hoạt động</p>
                  <p className="text-3xl font-bold">{activeCount}</p>
                </div>
                <AlertCircle className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Lỗi nghiêm trọng</p>
                  <p className="text-3xl font-bold text-danger">{errorCount}</p>
                </div>
                <AlertCircle className="h-10 w-10 text-danger" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Cảnh báo</p>
                  <p className="text-3xl font-bold text-warning">{warningCount}</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Lọc:</span>
              </div>

              <div className="flex gap-2">
                <Button variant={filter === "all" ? "primary" : "outline"} size="sm" onClick={() => setFilter("all")}>
                  Tất cả
                </Button>
                <Button variant={filter === "active" ? "primary" : "outline"} size="sm" onClick={() => setFilter("active")}>
                  Đang hoạt động
                </Button>
                <Button variant={filter === "resolved" ? "primary" : "outline"} size="sm" onClick={() => setFilter("resolved")}>
                  Đã giải quyết
                </Button>
              </div>

              <div className="h-6 w-px bg-border" />

              <div className="flex gap-2">
                <Button variant={typeFilter === "all" ? "primary" : "outline"} size="sm" onClick={() => setTypeFilter("all")}>
                  Tất cả loại
                </Button>
                <Button variant={typeFilter === "error" ? "danger" : "outline"} size="sm" onClick={() => setTypeFilter("error")}>
                  Lỗi
                </Button>
                <Button variant={typeFilter === "warning" ? "warning" : "outline"} size="sm" onClick={() => setTypeFilter("warning")}>
                  Cảnh báo
                </Button>
                <Button variant={typeFilter === "info" ? "primary" : "outline"} size="sm" onClick={() => setTypeFilter("info")}>
                  Thông tin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            const AlertIcon = getAlertIcon(alert.type);
            const alertColor = getAlertColor(alert.type);
            const date = new Date(alert.timestamp);

            return (
              <Card key={alert.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${alert.type === "error" ? "bg-danger/10" : alert.type === "warning" ? "bg-warning/10" : "bg-primary/10"}`}>
                      <AlertIcon className={`h-6 w-6 ${alertColor}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{alert.title}</h3>
                          <p className="text-muted-foreground">{alert.message}</p>
                        </div>
                        <Badge variant={alert.status === "active" ? "warning" : "success"}>{alert.status === "active" ? "Đang hoạt động" : "Đã giải quyết"}</Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                        <span>
                          {date.toLocaleDateString("vi-VN")} {date.toLocaleTimeString("vi-VN")}
                        </span>
                        {alert.flightNumber && (
                          <>
                            <span>•</span>
                            <span>
                              Chuyến bay: <span className="font-semibold text-foreground">{alert.flightNumber}</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {alert.status === "resolved" && <CheckCircle className="h-6 w-6 text-success" />}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredAlerts.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Không có cảnh báo nào phù hợp với bộ lọc</p>
            </CardContent>
          </Card>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
}
