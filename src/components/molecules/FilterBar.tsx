import { Button } from '@/components/atoms/Button';
import { DatePicker, Select } from 'antd';
import { Download } from 'lucide-react';
import dayjs, { Dayjs } from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

interface FilterBarProps {
  onExport?: () => void;
  showDateRange?: boolean;
}

export function FilterBar({
  onExport,
  showDateRange = true,
}: FilterBarProps) {
  // Disable dates outside of 3 months range
  const disabledDate: RangePickerProps['disabledDate'] = (current, { from }) => {
    if (!current) return false;

    // If selecting the end date and start date is selected
    if (from) {
      const threeMonthsLater = from.add(3, 'month');
      const threeMonthsEarlier = from.subtract(3, 'month');
      return current.isAfter(threeMonthsLater) || current.isBefore(threeMonthsEarlier);
    }

    return false;
  };

  return (
    <div className="bg-card p-2.5 sm:p-3 md:p-4 rounded-lg border border-border">
      <div className="flex flex-col gap-2 sm:gap-3">
        {/* Filters row - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {showDateRange && (
            <RangePicker
              className="w-full lg:col-span-2"
              placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
              format="DD/MM/YYYY"
              disabledDate={disabledDate}
              size="large"
              popupClassName="mobile-date-picker"
              getPopupContainer={(trigger) => trigger.parentElement || document.body}
              placement="bottomLeft"
            />
          )}

          <Select
            className="w-full"
            placeholder="Tất cả tuyến"
            size="large"
            options={[
              { value: '', label: 'Tất cả tuyến' },
              { value: 'HAN-SGN', label: 'HAN → SGN' },
              { value: 'SGN-DAD', label: 'SGN → DAD' },
              { value: 'HAN-PQC', label: 'HAN → PQC' },
            ]}
          />

          <Select
            className="w-full"
            placeholder="Tất cả máy bay"
            size="large"
            options={[
              { value: '', label: 'Tất cả máy bay' },
              { value: 'B787', label: 'Boeing 787' },
              { value: 'A321', label: 'Airbus A321' },
              { value: 'A350', label: 'Airbus A350' },
            ]}
          />
        </div>

        {onExport && (
          <Button onClick={onExport} variant="outline" className="w-full sm:w-auto sm:self-start">
            <Download className="h-4 w-4 mr-2" />
            Xuất Excel
          </Button>
        )}
      </div>
    </div>
  );
}
