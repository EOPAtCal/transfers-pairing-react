import React, { PureComponent, Fragment } from 'react';
import Input from './Input';
import Fieldset from './Fieldset';

class Options extends PureComponent {
  state = { ...this.props.options };

  state = {
    mentorSpreadsheetId: this.props.options.mentorSpreadsheetId,
    mentorRange: this.props.options.mentorRange,
    menteeSpreadsheetId: this.props.options.menteeSpreadsheetId,
    menteeRange: this.props.options.menteeRange,
    mentorDataPositions: {
      mentorEmail: {
        labelText: 'email',
        name: 'mentorEmail',
        type: 'number',
        required: true,
        value: this.props.options.mentorEmail
      },
      mentorCollege: {
        labelText: 'college',
        name: 'mentorCollege',
        type: 'number',
        required: false,
        value: this.props.options.mentorCollege,
        matchBy: this.props.options.matchByMajors
      },
      mentorMajor: {
        labelText: 'major',
        name: 'mentorMajor',
        type: 'number',
        required: false,
        value: this.props.options.mentorMajor,
        matchBy: this.props.options.matchByMajors
      }
    },
    menteeDataPositions: {
      menteeEmail: {
        labelText: 'email',
        name: 'menteeEmail',
        type: 'number',
        required: true,
        value: this.props.options.menteeEmail
      },
      menteeCollege: {
        labelText: 'college',
        name: 'menteeCollege',
        type: 'number',
        required: false,
        value: this.props.options.menteeCollege,
        matchBy: this.props.options.matchByMajors
      },
      menteeMajor: {
        labelText: 'major',
        name: 'menteeMajor',
        type: 'number',
        required: false,
        value: this.props.options.menteeMajor,
        matchBy: this.props.options.matchByMajors
      }
    },
    randomMatch: this.props.options.randomMatch
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleChangeOptions(...this.state);
  };

  handleAdd = name => {};

  handleRemove = index => {};

  render() {
    const {
      mentorSpreadsheetId,
      mentorRange,
      menteeSpreadsheetId,
      menteeRange,
      randomMatch
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
                {mentorDataPositions.map(
                  ({ labelText, name, type, required, value }, idx) => (
                    <Input
                      labelText={labelText}
                      name={name}
                      type={type}
                      required={required}
                      value={value}
                      onChange={this.handleChange}
                      handleRemove={this.handleRemove}
                    />
                  )
                )}
                {/* <Input
                  labelText="email"
                  name="mentorEmail"
                  type="number"
                  required
                  value={mentorEmail}
                  onChange={this.handleChange}
                  handleRemove={this.handleRemove}
                />
                <Input
                  labelText="college"
                  name="mentorCollege"
                  type="number"
                  value={mentorCollege}
                  onChange={this.handleChange}
                />
                <Input
                  labelText="major"
                  name="mentorMajor"
                  type="number"
                  value={mentorMajor}
                  onChange={this.handleChange}
                /> */}
                <div className="uk-margin-large">
                  <button
                    className="uk-button uk-button-default"
                    onClick={this.handleAdd()}
                  >
                    <span
                      uk-icon="icon: plus"
                      className="uk-margin-small-right"
                    />
                    add
                  </button>
                </div>
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
                  value={menteeCollege}
                  onChange={this.handleChange}
                />
                <Input
                  labelText="major"
                  name="menteeMajor"
                  type="number"
                  value={menteeMajor}
                  onChange={this.handleChange}
                />
                <div className="uk-margin-large">
                  <button
                    className="uk-button uk-button-default"
                    onClick={this.handleAdd()}
                  >
                    <span
                      uk-icon="icon: plus"
                      className="uk-margin-small-right"
                    />
                    add
                  </button>
                </div>
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
            <Input
              labelText="randomly match all unmatched"
              name="randomMatch"
              checked={randomMatch}
              onChange={this.handleChange}
            />
          </Fieldset>
          <div className="uk-grid-small" uk-grid="">
            <div className="uk-width-1-2@s">
              <button
                type="submit"
                className="uk-button uk-button-danger"
                onClick={this.handleSubmit}
              >
                <span uk-icon="check" className="uk-margin-small-right" /> Save
              </button>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default Options;
