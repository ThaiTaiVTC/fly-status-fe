import { MetricCard } from "@/components/molecules/MetricCard";

const metricsData = [
  {
    title: "CHUYẾN BAY",
    value: "342",
    change: 2.3,
    subtitle: "90% có IFC",
    icon: "plane" as const,
    type: "increase" as const,
  },
  {
    title: "HÀNH KHÁCH",
    value: "12k",
    change: 5.7,
    subtitle: "68% kết nối",
    icon: "users" as const,
    type: "increase" as const,
  },
  {
    title: "DOANH THU",
    value: "3.2M",
    change: 12.1,
    subtitle: "ARPU: 249k",
    icon: "dollar" as const,
    type: "increase" as const,
  },
  {
    title: "THỜI GIAN TB",
    value: "47 phút",
    change: -3.2,
    subtitle: "Mỗi khách",
    icon: "clock" as const,
    type: "decrease" as const,
  },
  {
    title: "DOWNTIME",
    value: "0.8%",
    change: -0.3,
    subtitle: "Mục tiêu <1%",
    icon: "wifi" as const,
    type: "increase" as const,
  },
  {
    title: "LATENCY",
    value: "245ms",
    change: 0,
    subtitle: "Tốt",
    icon: "activity" as const,
    type: "warning" as const,
  },
];

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {metricsData.map((metric, index) => (
        <MetricCard key={index} title={metric.title} value={metric.value} change={metric.change} subtitle={metric.subtitle} icon={metric.icon} type={metric.type} />
      ))}
    </div>
  );
}
