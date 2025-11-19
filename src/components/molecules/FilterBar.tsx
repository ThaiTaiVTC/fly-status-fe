import { Button } from "@/components/atoms/Button";
import { DatePicker, Select } from "antd";
import { Download } from "lucide-react";
import dayjs, { Dayjs } from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";

const { RangePicker } = DatePicker;

interface FilterBarProps {
  showDateRange?: boolean;
}

export function FilterBar({ showDateRange = true }: FilterBarProps) {
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

  return (
    <div className="relative bg-card/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-2xl border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 group">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex flex-col gap-3 sm:gap-4 relative z-10">
        {/* Filters row - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {showDateRange && (
            <RangePicker
              className="w-full lg:col-span-2 hover:shadow-md transition-shadow"
              placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
              format="DD/MM/YYYY"
              disabledDate={disabledDate}
              size="large"
              popupClassName="mobile-date-picker"
              getPopupContainer={(trigger) => trigger.parentElement || document.body}
              placement="bottomLeft"
            />
          )}

          {/* <Select
            className="w-full hover:shadow-md transition-shadow"
            placeholder="Tất cả tuyến"
            size="large"
            options={[
              { value: "", label: "Tất cả tuyến" },
              { value: "HAN-SGN", label: "HAN → SGN" },
              { value: "SGN-DAD", label: "SGN → DAD" },
              { value: "HAN-PQC", label: "HAN → PQC" },
            ]}
          /> */}

          <Select
            className="w-full hover:shadow-md transition-shadow"
            placeholder="Tất cả máy bay"
            size="large"
            options={[
              { value: "B787", label: "Boeing 787" },
              { value: "A321", label: "Airbus A321" },
              { value: "A350", label: "Airbus A350" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
