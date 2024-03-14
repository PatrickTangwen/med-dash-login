import { useState, useCallback } from 'react'
import { getDays } from '@/utils/core'
import { day } from '@/utils/day'
import { Button, Dropdown } from 'antd'
import DateRangePicker from '@/components/DatePicker'
import Chart from '@/components/Chart'
import ShowData from '@/components/ShowData'
import SvgIcon from '@/components/SvgIcon'




function Visualization() {
  const DISABLED_RANGE = 31
  const defaultDateRange = [day().subtract(DISABLED_RANGE, 'days'), day()]
  const [currentDate, setCurrentDate] = useState(defaultDateRange)
  const handleDateChange = useCallback((dateRange) => {
    setCurrentDate(dateRange)
  })



  return (
    <div className="mt-20 py-4 px-8">
      <section className="flex justify-between items-center">
        <div className="flex gap-4">
          <Button>
            <div className="flex gap-2">
              <span>Download</span>
              <SvgIcon iconName="download" size={14} />
            </div>
          </Button>
          <Button>
            <div className="flex gap-2">
              <span>Save</span>
              <SvgIcon iconName="save" size={14} />
            </div>
          </Button>
        </div>
      </section>

      <section className="mt-8 flex justify-end items-center">
        <DateRangePicker
          defaultDates={defaultDateRange}
          disabledRange={DISABLED_RANGE}
          onChange={handleDateChange}
        />
      </section>

      <section className="mt-4 p-4 bg-white rounded-lg max-w-screen-lg">
        <Chart dateRange={getDays(currentDate[0], currentDate[1])} />
      </section>

      <section className="mt-4">
        <ShowData />
      </section>
    </div>
  )
}

export default Visualization;
