import React, { PureComponent } from 'react';

class Options extends PureComponent {
  state = { ...this.props.options.value };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleChangeOptions(this.props.options.key, this.state.options);
  };

  handleReset = e => {
    e.preventDefault();
    this.props.handleResetAllToDefaults(this.props.options.key);
  };

  render() {
    const {
      mentorSpreadsheetId,
      mentorRange,
      mentorEmail,
      mentorCollege,
      mentorMajor,
      matchByMajors,
      matchByColleges,
      menteeSpreadsheetId,
      menteeRange,
      menteeEmail,
      menteeCollege,
      menteeMajor
    } = this.state;
    return (
      <div>
        <h2 className="uk-text-capitalize">options</h2>
        <h4>Be careful: what you modify here will affect matching</h4>
        <hr className="uk-divider-icon" />
        <form
          className="uk-text-left uk-form-horizontal"
          onSubmit={this.handleSubmit}
        >
          <div className="uk-grid-small" uk-grid="">
            <div className="uk-width-1-2@s">
              <fieldset className="uk-fieldset">
                <legend className="uk-legend uk-text-capitalize">
                  mentor spreadsheet
                </legend>
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="form-stacked-text">
                    spreadsheet id
                  </label>
                  <div className="uk-form-controls">
                    <input
                      name="mentorSpreadsheetId"
                      className="uk-input uk-form-width-small"
                      type="text"
                      required
                      value={mentorSpreadsheetId}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="form-stacked-text">
                    spreadsheet range
                  </label>
                  <div className="uk-form-controls">
                    <input
                      name="mentorRange"
                      className="uk-input uk-form-width-small"
                      type="text"
                      required
                      value={mentorRange}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="uk-fieldset">
                <legend className="uk-legend uk-text-capitalize">
                  mentor data index
                </legend>

                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="form-stacked-text">
                    email
                  </label>
                  <div className="uk-form-controls">
                    <input
                      name="mentorEmail"
                      className="uk-input uk-form-width-small"
                      type="number"
                      required
                      value={mentorEmail}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="form-stacked-text">
                    college
                  </label>
                  <div className="uk-form-controls">
                    <input
                      name="mentorCollege"
                      className="uk-input uk-form-width-small"
                      type="number"
                      required
                      value={mentorCollege}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="form-stacked-text">
                    major
                  </label>
                  <div className="uk-form-controls">
                    <input
                      name="mentorMajor"
                      className="uk-input uk-form-width-small"
                      type="number"
                      required
                      value={mentorMajor}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="uk-width-1-2@s">
              <fieldset className="uk-fieldset">
                <legend className="uk-legend uk-text-capitalize">
                  mentee spreadsheet
                </legend>
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="form-stacked-text">
                    spreadsheet id
                  </label>
                  <div className="uk-form-controls">
                    <input
                      name="menteeSpreadsheetId"
                      className="uk-input uk-form-width-small"
                      type="text"
                      required
                      value={menteeSpreadsheetId}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="form-stacked-text">
                    spreadsheet range
                  </label>
                  <div className="uk-form-controls">
                    <input
                      name="menteeRange"
                      className="uk-input uk-form-width-small"
                      type="text"
                      required
                      value={menteeRange}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="uk-fieldset">
                <legend className="uk-legend uk-text-capitalize">
                  mentee data index
                </legend>

                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="form-stacked-text">
                    email
                  </label>
                  <div className="uk-form-controls">
                    <input
                      name="menteeEmail"
                      className="uk-input uk-form-width-small"
                      type="number"
                      required
                      value={menteeEmail}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="form-stacked-text">
                    college
                  </label>
                  <div className="uk-form-controls">
                    <input
                      name="menteeCollege"
                      className="uk-input uk-form-width-small"
                      type="number"
                      required
                      value={menteeCollege}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="form-stacked-text">
                    major
                  </label>
                  <div className="uk-form-controls">
                    <input
                      name="menteeMajor"
                      className="uk-input uk-form-width-small"
                      type="number"
                      required
                      value={menteeMajor}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <fieldset className="uk-fieldset">
            <legend className="uk-legend uk-text-capitalize">
              match criteria
            </legend>
            <div className="uk-margin">
              <label>
                <input
                  name="matchByMajors"
                  className="uk-checkbox uk-margin-small-right"
                  type="checkbox"
                  checked={matchByMajors}
                  onChange={this.handleChange}
                  disabled
                />
                match by majors
              </label>
            </div>
            <div className="uk-margin">
              <label>
                <input
                  name="matchByColleges"
                  className="uk-checkbox uk-margin-small-right"
                  type="checkbox"
                  checked={matchByColleges}
                  onChange={this.handleChange}
                  disabled
                />
                match by colleges
              </label>
            </div>
          </fieldset>
          <div className="uk-grid-small" uk-grid="">
            <div className="uk-width-1-2@s">
              <button
                className="uk-button uk-button-default"
                onClick={this.handleReset}
              >
                reset all to defaults
              </button>
            </div>
            <div className="uk-width-1-2@s">
              <input
                className="uk-button uk-button-primary"
                type="submit"
                value="Save Changes"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Options;
