import React, { PureComponent, Fragment } from 'react';
import Input from './Input';
import Fieldset from './Fieldset';

class Options extends PureComponent {
  state = { ...this.props.options };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleChangeOptions(this.props.options);
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
      <Fragment>
        <div className="uk-flex-middle" uk-grid="">
          <div>
            <h2 className="uk-text-lead uk-text-uppercase uk-margin-remove">
              options
            </h2>
          </div>
          <div>
            <h4
              className="uk-margin-remove uk-text-muted"
              style={{ fontWeight: 300 }}
            >
              Be careful, what you modify here will affect the matching results.
            </h4>
          </div>
        </div>
        <hr />
        <form
          className="uk-text-left uk-form-horizontal"
          onSubmit={this.handleSubmit}
        >
          <div className="uk-grid-small" uk-grid="">
            <div className="uk-width-1-2@s">
              <Fieldset label="mentor spreadsheet">
                <Input
                  labelText="spreadsheet ID"
                  name="mentorSpreadsheetId"
                  type="text"
                  required
                  value={mentorSpreadsheetId}
                  onChange={this.handleChange}
                />
                <Input
                  labelText="spreadsheet range"
                  name="mentorRange"
                  type="text"
                  required
                  value={mentorRange}
                  onChange={this.handleChange}
                />
              </Fieldset>
              <Fieldset label="mentor data position">
                <Input
                  labelText="email"
                  name="mentorEmail"
                  type="number"
                  required
                  value={mentorEmail}
                  onChange={this.handleChange}
                />
                <Input
                  labelText="college"
                  name="mentorCollege"
                  type="number"
                  required
                  value={mentorCollege}
                  onChange={this.handleChange}
                />
                <Input
                  labelText="major"
                  name="mentorMajor"
                  type="number"
                  required
                  value={mentorMajor}
                  onChange={this.handleChange}
                />
              </Fieldset>
            </div>
            <div className="uk-width-1-2@s">
              <Fieldset label="mentee spreadsheet">
                <Input
                  labelText="spreadsheet ID"
                  name="menteeSpreadsheetId"
                  type="text"
                  required
                  value={menteeSpreadsheetId}
                  onChange={this.handleChange}
                />

                <Input
                  labelText="spreadsheet range"
                  name="menteeRange"
                  type="text"
                  required
                  value={menteeRange}
                  onChange={this.handleChange}
                />
              </Fieldset>
              <Fieldset label="mentee data position">
                <Input
                  labelText="email"
                  name="menteeEmail"
                  type="number"
                  required
                  value={menteeEmail}
                  onChange={this.handleChange}
                />
                <Input
                  labelText="college"
                  name="menteeCollege"
                  type="number"
                  required
                  value={menteeCollege}
                  onChange={this.handleChange}
                />
                <Input
                  labelText="major"
                  name="menteeMajor"
                  type="number"
                  required
                  value={menteeMajor}
                  onChange={this.handleChange}
                />
              </Fieldset>
            </div>
          </div>
          <Fieldset label="match criteria">
            <Input
              labelText="match by majors"
              name="matchByMajors"
              checked={matchByMajors}
              onChange={this.handleChange}
            />
            <Input
              labelText="match by colleges"
              name="matchByColleges"
              checked={matchByColleges}
              onChange={this.handleChange}
            />
          </Fieldset>
          <div className="uk-grid-small" uk-grid="">
            <div className="uk-width-1-2@s">
              <input
                className="uk-button uk-button-danger"
                type="submit"
                value="Save & Match"
              />
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default Options;
