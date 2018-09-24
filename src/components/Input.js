import React from 'react';

const InputText = ({ label, value, handleChange, name, type }) => (
  <div className="uk-margin">
    <label className="uk-form-label">{label}</label>
    <div className="uk-form-controls">
      <input
        className={
          'uk-input uk-form-width-small' +
          ((type === 'number' && value < 0) || (value !== 0 && !value)
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
);

const InputTextUserOptions = ({
  label,
  handleChange,
  value,
  handleRemove,
  isMentor
}) => (
  <div className="uk-grid" uk-grid="">
    <div className="uk-form-label">
      <input
        className={
          'uk-input uk-form-blank uk-form-width-small' +
          (!label ? ' input-error' : '')
        }
        type="text"
        value={label}
        onChange={handleChange(2)}
        required
      />
    </div>
    <div className="uk-flex uk-flex-middle uk-flex-between">
      <div className="uk-form-controls">
        <input
          className={
            'uk-input uk-form-width-small' +
            (value < 0 || (value !== 0 && !value) ? ' uk-form-danger' : '')
          }
          type="number"
          value={value}
          onChange={handleChange(isMentor ? 0 : 1)}
        />
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
