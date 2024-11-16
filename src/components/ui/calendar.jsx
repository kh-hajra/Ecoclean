import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export const Calendar = ({ selected, onSelect, className }) => (
  <DayPicker
    mode="single"
    selected={selected}
    onSelect={onSelect}
    className={className}
  />
);

Calendar.defaultProps = {
  selected: undefined,
  className: '',
};

export default Calendar;
