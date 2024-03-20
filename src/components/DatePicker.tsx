import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";



const DatePicker: React.FC = () => {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    return (
        <Datepicker
            asSingle={true}
            primaryColor={"amber"}
            useRange={false}
            popoverDirection="down"
            value={value}
            onChange={handleValueChange}
            displayFormat={"DD/MM/YYYY"}
        />
    )
}

export default DatePicker;