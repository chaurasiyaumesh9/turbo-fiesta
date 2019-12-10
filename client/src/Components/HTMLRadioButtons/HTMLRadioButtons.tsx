import React from "react";

interface Options {
  options: Array<Option>;
  caption: string;
  id: string;
  name: string;
  value: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const HTMLRadioButtons: React.FC<Options> = ({
  options,
  caption,
  id,
  name,
  value,
  changeHandler
}) => {
  return (
    <div className="html-radio-buttons">
      <label className="form-label" htmlFor={id}>
        {caption}
      </label>
      {options.map((option: Option, index: number) => {
        return (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={id + "_" + index}
              value={option.value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                changeHandler(event)
              }
            />
            <label className="form-check-label" htmlFor={id + "_" + index}>
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};
