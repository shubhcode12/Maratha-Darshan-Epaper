import React from "react";

function DateInput({ id, name, label, invalid, onChangeValue, ...props }) {
  const onChangeHandler = e => onChangeValue && onChangeValue(e.target.value);

  return (
    <div className="form-group">
      <div className={`input-date__parent${invalid ? " invalid" : ""}`}>
        <input className="input-date__input" name={name} id={id} type="date" onChange={onChangeHandler} {...props} />
        {label && (
          <label className="input-date__label" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    </div>
  );
}

export default DateInput;
