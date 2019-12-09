import React from "react";

interface Options {
  options: Array<Option>;
  caption: string;
  id: string;
  value: string;
  changeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const HTMLDropdown: React.FC<Options> = ({
  options,
  caption,
  id,
  value,
  changeHandler
}) => {
  return (
    <div className="html-dropdown">
      <label className="col-form-label" htmlFor={id}>
        {caption}
      </label>
      <select
        className="form-control"
        name={id}
        id={id}
        value={value || ""}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          changeHandler(event)
        }
      >
        {options.map((option: Option, index: number) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
