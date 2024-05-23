import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

const InputDate = ({ label, value, helperText, onChange, error, format = "DD-MM-YYYY", ...props }) => {
  const formattedValue = value ? dayjs(value) : null;

  const handleChange = (newValue) => {
    const formattedDate = newValue ? newValue.format(format) : "";
    onChange({ target: { value: formattedDate } });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={formattedValue}
        onChange={handleChange}
        format={format}
        slotProps={{
          textField: {
            error: error,
            helperText: helperText,
          },
        }}
        sx={{ width: "100%" }}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default InputDate;
