import React from "react";

function ImageInput({ id, name, label, invalid, onChangeValue, ...props }) {
  const onChangeHandler = (e) => onChangeValue && onChangeValue(e.target.files[0]);

  return (
    <div className="form-group">
      <div className={`input-text__parent${invalid ? " invalid" : ""}`}>
        <input className="input-text__input" name={name} id={id} type="file" onChange={onChangeHandler} {...props} />
        {label && (
          <label className="input-text__label img" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    </div>
  );
}

export default ImageInput;
