import React from 'react';

export default ({ children, label }) => {
  return (
    <fieldset className="uk-fieldset">
      <legend className="uk-legend uk-text-capitalize">{label}</legend>
      {children}
    </fieldset>
  );
};
