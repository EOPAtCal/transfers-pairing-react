import React from 'react';

const InputText = ({ label, value, handleChange, name, type }) => (
  <div className="uk-grid uk-flex-middle">
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor="form-stacked-text">
        {label}
      </label>
      <div className="uk-form-controls">
        <input
          className={
            'uk-input uk-form-width-small' +
            ((type === 'number' && (value < 0 || isNaN(value))) ||
            (type === 'text' && !value)
              ? ' uk-form-danger'
              : '')
          }
          type={type}
          required
          value={value}
          name={name}
          onChange={handleChange}
        />
      </div>
    </div>
  </div>
);

const InputTextUserOptions = ({
  label,
  handleChange,
  value,
  handleRemove,
  isMentor
}) => (
  <div className="uk-grid uk-flex-middle">
    <div className="uk-margin">
      <input
        className="uk-input uk-form-blank uk-form-width-small"
        style={{
          borderColor: '#f0506e!important'
        }}
        type="text"
        value={label}
        onChange={handleChange(2)}
        required
      />
      <div className="uk-form-controls">
        <input
          className={
            'uk-input uk-form-width-small' +
            (value < 0 || isNaN(value) ? ' uk-form-danger' : '')
          }
          type="number"
          value={value}
          onChange={handleChange(isMentor ? 0 : 1)}
        />
      </div>
    </div>
    <div>
      <button
        type="button"
        className="uk-icon-button"
        uk-icon="minus"
        onClick={handleRemove}
      />
    </div>
  </div>
);

const InputCheckbox = ({ label, handleChange, checked, name }) => (
  <div className="uk-margin">
    <label>
      <input
        name={name}
        className="uk-checkbox uk-margin-small-right"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      {label}
    </label>
  </div>
);

export { InputText, InputCheckbox, InputTextUserOptions };
