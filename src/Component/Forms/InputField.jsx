import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const InputField = ({ name, label, text, placeholder }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="mb-3 text-start">
          <label htmlFor={label} className="form-label ">
            {text}
          </label>
          <input
            type="text"
            className="form-control"
            id={label}
            placeholder={placeholder}
            {...field}
            required
          />
        </div>
      )}
    />
  );
};

export default InputField;
