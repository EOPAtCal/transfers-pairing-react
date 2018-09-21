import React from 'react';

const InputText = ({ label, value, handleChange }) => (
  <div className="uk-grid uk-flex-middle">
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor="form-stacked-text">
        {label}
      </label>
      <div className="uk-form-controls">
        <input
          className="uk-input uk-form-width-small"
          type="text"
          required
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  </div>
);

const InputTextUserOptions = ({ label, handleChange, value, handleRemove }) => (
  <div className="uk-grid uk-flex-middle">
    <div className="uk-margin">
      <input
        className="uk-input uk-form-blank uk-form-width-small"
        type="text"
        value={label}
        onChange={handleChange}
      />

      <div className="uk-form-controls">
        <input
          className="uk-input uk-form-width-small"
          type="text"
          required
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>

    <div>
      <button
        className="uk-icon-button"
        uk-icon="minus"
        onClick={handleRemove}
      />
    </div>
  </div>
);

const InputCheckbox = ({ label, handleChange, checked }) => {
  return (
    <div className="uk-margin">
      <label>
        <input
          className="uk-checkbox uk-margin-small-right"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        {label}
      </label>
    </div>
  );
};

export { InputText, InputCheckbox, InputTextUserOptions };
