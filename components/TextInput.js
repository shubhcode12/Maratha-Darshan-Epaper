import React from "react";

function TextInput({ id, name, label, type, invalid, onChangeValue, ...props }) {
  if (!type) type = "text";

  const onChangeHandler = e => {
    if (type === "number") onChangeValue && onChangeValue(e.target.valueAsNumber);
    else onChangeValue && onChangeValue(e.target.value);
  };

  return (
    <div className="form-group">
      <div className={`input-text__parent${invalid ? " invalid" : ""}`}>
        <input className="input-text__input" name={name} id={id} type={type} onChange={onChangeHandler} {...props} />
        {label && (
          <label className="input-text__label" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    </div>
  );
}

export default TextInput;
