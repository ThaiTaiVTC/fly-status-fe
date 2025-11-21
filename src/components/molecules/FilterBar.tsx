import { Button } from "@/components/atoms/Button";
import { DatePicker, Select, Drawer, Badge, Modal } from "antd";
import { Filter, X, Calendar } from "lucide-react";
import dayjs, { Dayjs } from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import { useState } from "react";

const { RangePicker } = DatePicker;

type DateFilterType = "today" | "7days" | "30days" | "3months" | "custom";

interface FilterBarProps {
  showDateRange?: boolean;
}

export function FilterBar({ showDateRange = true }: FilterBarProps) {
  // State management
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [dateFilterType, setDateFilterType] = useState<DateFilterType | undefined>(undefined);
  const [customDateRange, setCustomDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [aircraft, setAircraft] = useState<string | undefined>(undefined);

  // Temporary state for drawer (before applying)
  const [tempAircraft, setTempAircraft] = useState<string | undefined>(undefined);

  // Temporary state for date modal
  const [tempCustomDateRange, setTempCustomDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  // Calculate actual date range based on filter type
  const getDateRangeFromFilter = (filterType: DateFilterType | undefined): [Dayjs, Dayjs] | null => {
    if (!filterType) return null;

    const today = dayjs();
    switch (filterType) {
      case "today":
        return [today.startOf("day"), today.endOf("day")];
      case "7days":
        return [today.subtract(7, "days").startOf("day"), today.endOf("day")];
      case "30days":
        return [today.subtract(30, "days").startOf("day"), today.endOf("day")];
      case "3months":
        return [today.subtract(3, "months").startOf("day"), today.endOf("day")];
      case "custom":
        return customDateRange as [Dayjs, Dayjs] | null;
      default:
        return null;
    }
  };

  // Count active filters (excluding date filter from main count)
  const activeFilterCount = [aircraft].filter(Boolean).length;

  // Disable dates outside of 3 months range
  const disabledDate: RangePickerProps["disabledDate"] = (current, { from }) => {
    if (!current) return false;

    // If selecting the end date and start date is selected
    if (from) {
      const threeMonthsLater = from.add(3, "month");
      const threeMonthsEarlier = from.subtract(3, "month");
      return current.isAfter(threeMonthsLater) || current.isBefore(threeMonthsEarlier);
    }

    return false;
  };

  // Handle date filter change
  const handleDateFilterChange = (value: DateFilterType) => {
    if (value === "custom") {
      setTempCustomDateRange(customDateRange);
      setDateModalOpen(true);
    } else {
      setDateFilterType(value);
    }
  };

  // Handle custom date modal confirm
  const handleCustomDateConfirm = () => {
    if (tempCustomDateRange && tempCustomDateRange[0] && tempCustomDateRange[1]) {
      setCustomDateRange(tempCustomDateRange);
      setDateFilterType("custom");
    }
    setDateModalOpen(false);
  };

  // Handle drawer open - copy current filters to temp
  const handleOpenDrawer = () => {
    setTempAircraft(aircraft);
    setDrawerOpen(true);
  };

  // Apply filters from drawer
  const handleApplyFilters = () => {
    setAircraft(tempAircraft);
    setDrawerOpen(false);
  };

  // Reset all filters in drawer
  const handleResetFilters = () => {
    setTempAircraft(undefined);
  };

  // Clear all applied filters
  const handleClearAll = () => {
    setDateFilterType(undefined);
    setCustomDateRange(null);
    setAircraft(undefined);
    setTempAircraft(undefined);
  };

  // Get date filter display text
  const getDateFilterLabel = (type: DateFilterType | undefined): string => {
    if (!type) return "";
    switch (type) {
      case "today":
        return "Hôm nay";
      case "7days":
        return "7 ngày qua";
      case "30days":
        return "30 ngày qua";
      case "3months":
        return "3 tháng qua";
      case "custom":
        if (customDateRange && customDateRange[0] && customDateRange[1]) {
          return `${customDateRange[0].format("DD/MM")} - ${customDateRange[1].format("DD/MM")}`;
        }
        return "Tùy chỉnh";
      default:
        return "";
    }
  };

  return (
    <>
      {/* Mobile View - Filter Button */}
      <div className="md:hidden">
        <div className="relative bg-card/80 backdrop-blur-sm p-4 rounded-2xl border border-primary/10 shadow-lg">
          {/* First Row: Date Filter Select */}
          {showDateRange && (
            <div className="mb-3">
              <Select
                className="w-full"
                placeholder="Chọn khoảng thời gian"
                size="large"
                value={dateFilterType}
                onChange={handleDateFilterChange}
                allowClear
                suffixIcon={<Calendar className="w-4 h-4" />}
                options={[
                  { value: "today", label: "Hôm nay" },
                  { value: "7days", label: "7 ngày qua" },
                  { value: "30days", label: "30 ngày qua" },
                  { value: "3months", label: "3 tháng qua" },
                  {
                    value: "custom",
                    label: dateFilterType === "custom" && customDateRange
                      ? `${customDateRange[0]?.format("DD/MM")} - ${customDateRange[1]?.format("DD/MM")}`
                      : "Tùy chỉnh..."
                  },
                ]}
              />
            </div>
          )}

          {/* Second Row: Filter Button and Clear */}
          <div className="flex items-center justify-between gap-3">
            <Badge count={activeFilterCount} color="#0066CC" showZero={false}>
              <Button
                onClick={handleOpenDrawer}
                className="flex items-center gap-2 px-6 py-2.5 text-base"
              >
                <Filter className="w-5 h-5" />
                Bộ lọc khác
              </Button>
            </Badge>

            {(activeFilterCount > 0 || dateFilterType) && (
              <Button
                onClick={handleClearAll}
                variant="outline"
                className="flex items-center gap-2 px-4 py-2.5"
              >
                <X className="w-4 h-4" />
                Xóa tất cả
              </Button>
            )}
          </div>

          {/* Active filters summary */}
          {activeFilterCount > 0 && (
            <div className="mt-3 pt-3 border-t border-primary/10">
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {aircraft && (
                  <span className="px-3 py-1 bg-primary/10 rounded-full">
                    {aircraft === "B787" ? "Boeing 787" : aircraft === "A321" ? "Airbus A321" : "Airbus A350"}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop View - Original Grid Layout */}
      <div className="hidden md:block">
        <div className="relative bg-card/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-2xl border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 group">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="flex flex-col gap-3 sm:gap-4 relative z-10">
            {/* Filters row - Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {showDateRange && (
                <Select
                  className="w-full lg:col-span-2 hover:shadow-md transition-shadow"
                  placeholder="Chọn khoảng thời gian"
                  size="large"
                  value={dateFilterType}
                  onChange={handleDateFilterChange}
                  allowClear
                  options={[
                    { value: "today", label: "Hôm nay" },
                    { value: "7days", label: "7 ngày qua" },
                    { value: "30days", label: "30 ngày qua" },
                    { value: "3months", label: "3 tháng qua" },
                    {
                      value: "custom",
                      label: dateFilterType === "custom" && customDateRange
                        ? `${customDateRange[0]?.format("DD/MM/YYYY")} - ${customDateRange[1]?.format("DD/MM/YYYY")}`
                        : "Tùy chỉnh..."
                    },
                  ]}
                />
              )}

              <Select
                className="w-full hover:shadow-md transition-shadow"
                placeholder="Tất cả máy bay"
                size="large"
                value={aircraft}
                onChange={setAircraft}
                allowClear
                options={[
                  { value: "B787", label: "Boeing 787" },
                  { value: "A321", label: "Airbus A321" },
                  { value: "A350", label: "Airbus A350" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer - Other Filters */}
      <Drawer
        title={
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Filter className="w-5 h-5" />
            Bộ lọc khác
          </div>
        }
        placement="bottom"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        height="auto"
        className="mobile-filter-drawer"
        styles={{
          body: { paddingBottom: 80 },
        }}
      >
        <div className="flex flex-col gap-6 pb-4">
          {/* Aircraft Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Loại máy bay</label>
            <Select
              className="w-full"
              placeholder="Chọn loại máy bay"
              size="large"
              value={tempAircraft}
              onChange={setTempAircraft}
              allowClear
              options={[
                { value: "B787", label: "Boeing 787" },
                { value: "A321", label: "Airbus A321" },
                { value: "A350", label: "Airbus A350" },
              ]}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border flex gap-3">
          <Button
            onClick={handleResetFilters}
            variant="outline"
            className="flex-1 py-6 text-base"
          >
            Đặt lại
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="flex-1 py-6 text-base bg-primary hover:bg-primary/90"
          >
            Áp dụng
          </Button>
        </div>
      </Drawer>

      {/* Custom Date Range Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Calendar className="w-5 h-5" />
            Chọn khoảng thời gian tùy chỉnh
          </div>
        }
        open={dateModalOpen}
        onCancel={() => setDateModalOpen(false)}
        footer={null}
        centered
        className="mobile-date-modal"
      >
        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Chọn ngày bắt đầu và kết thúc</label>
            <RangePicker
              className="w-full"
              placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
              format="DD/MM/YYYY"
              disabledDate={disabledDate}
              size="large"
              value={tempCustomDateRange}
              onChange={(dates) => setTempCustomDateRange(dates as [Dayjs | null, Dayjs | null] | null)}
              popupClassName="mobile-date-picker"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => setDateModalOpen(false)}
              variant="outline"
              className="flex-1 py-5 text-base"
            >
              Hủy
            </Button>
            <Button
              onClick={handleCustomDateConfirm}
              className="flex-1 py-5 text-base bg-primary hover:bg-primary/90"
              disabled={!tempCustomDateRange || !tempCustomDateRange[0] || !tempCustomDateRange[1]}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
