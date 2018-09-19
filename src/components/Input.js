import React from 'react';

export default ({
  labelText,
  name,
  type,
  isRequired,
  value,
  onChange,
  checked
}) => {
  return value ? (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor="form-stacked-text">
        {labelText}
      </label>
      <div className="uk-form-controls">
        <input
          name={name}
          className="uk-input uk-form-width-small"
          type={type}
          required={isRequired}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  ) : (
    <div className="uk-margin">
      <label>
        <input
          name={name}
          className="uk-checkbox uk-margin-small-right"
          type="checkbox"
          required={isRequired}
          checked={checked}
          onChange={onChange}
        />
        match by colleges
      </label>
    </div>
  );
};
