import { useState } from "react";

interface RangeButtonProps {
  title: string;
  range: any[];
  selectedValue: any;
  setValue: (e: any) => void;
}

export function RangeButton({ 
  title, 
  range, 
  selectedValue, 
  setValue,
} : RangeButtonProps) {
  
  return (
    <div className="wrapperInput">
      <h4 className="inputLabel">{title}</h4>
      <div className="contentInputButton">
        {range.map((item: {text: string}, index: number) => (
          (selectedValue != item.text) ? (
            <button 
              key={index}
              value={item.text}
              onClick={(e: any) => setValue(parseInt(e.target.value))}
              className="'mt-2 rounded-full border-2 px-4 py-2 mr-2 active:bg-blue-200 hover:bg-blue-400 transition'"
            >
              {item.text}
            </button>
          ) : (
            <button 
              key={index}
              value={item.text}
              onClick={(e: any) => setValue(parseInt(e.target.value))}
              className="'mt-2 rounded-full bg-blue-500 px-4 py-2 mr-2 active:bg-blue-200 hover:bg-blue-400 transition'"
            >
              {item.text}
            </button>
          )
        ))}
      </div>
    </div>
  );
}