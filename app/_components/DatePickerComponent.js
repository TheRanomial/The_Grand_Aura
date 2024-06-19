"use client"

import { format } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerComponent() {
  const [startDate, setStartDate] = useState(new Date());

  const today = new Date();
  const formattedToday = format(today, 'dd/MM/yyyy');

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        maxDate={new Date()}
        dateFormat="dd/MM/yyyy"
        isClearable
        showYearDropdown
        scrollableMonthYearDropdown
        placeholderText={formattedToday}
        className="w-full px-4 py-2 border text-primary-800 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
}

export default DatePickerComponent;
