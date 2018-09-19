import React from 'react';

export default ({ children }) => (
  <div
    className="uk-flex uk-flex-center uk-flex-middle"
    data-uk-height-viewport
  >
    {children}
  </div>
);
