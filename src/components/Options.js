import React, { PureComponent, Fragment } from 'react';
import { InputText, InputTextUserOptions, InputCheckbox } from './Input';
import Fieldset from './Fieldset';

class Options extends PureComponent {
  state = {
    mentorSpreadsheetId: this.props.options.mentorSpreadsheetId,
    mentorRange: this.props.options.mentorRange,
    menteeSpreadsheetId: this.props.options.menteeSpreadsheetId,
    menteeRange: this.props.options.menteeRange,
    menteeEmail: this.props.options.menteeEmail,
    mentorEmail: this.props.options.mentorEmail,
    mentorName: this.props.options.mentorName,
    menteeName: this.props.options.menteeName,
    userOptions: this.props.options.userOptions,
    randomMatch: this.props.options.randomMatch,
    mentorLimit: this.props.options.mentorLimit,
    index: 0
  };

  handleChange = event => {
    const target = event.target;
    let value;
    if (target.type === 'checkbox') value = target.checked;
    else if (target.type === 'number') value = parseInt(target.value, 10);
    else value = event.target.value;
    this.setState({
      [target.name]: value
    });
  };

  handleChangeUserOptions = idx => index => event => {
    const elem = this.state.userOptions[idx];
    const attributes = ['mentor', 'mentee', 'name'];
    Object.assign(elem, {
      [attributes[index]]:
        event.target.type === 'number'
          ? parseInt(event.target.value, 10)
          : event.target.value
    });
    this.setState({
      userOptions: [...this.state.userOptions]
    });
  };

  handleChangeMatchBy = idx => e => {
    const elem = this.state.userOptions[idx];
    elem.matchBy = e.target.checked;
    this.setState({
      userOptions: [...this.state.userOptions]
    });
  };

  isValidState = state => {
    if (state.mentorEmail < 0 || state.menteeEmail < 0 || state.mentorLimit < 0)
      return false;
    for (const { mentor, mentee } of state.userOptions)
      if (mentor < 0 || mentee < 0) return false;
    return true;
  };

  handleSave = e => {
    e.preventDefault();
    this.props.handleChangeOptions(this.state, this.isValidState(this.state));
  };

  handleAdd = () => {
    const { userOptions, index } = this.state;
    userOptions.push({
      name: 'label' + index,
      mentor: -1,
      mentee: -1,
      matchBy: false
    });
    this.setState({
      userOptions: [...userOptions],
      index: index + 1
    });
  };

  handleRemove = index => () => {
    const userOptions = this.state.userOptions.filter(
      (_, idx) => idx !== index
    );
    this.setState({
      userOptions
    });
  };

  render() {
    const {
      mentorSpreadsheetId,
      mentorRange,
      menteeSpreadsheetId,
      menteeRange,
      mentorEmail,
      menteeEmail,
      userOptions,
      mentorName,
      menteeName,
      randomMatch,
      mentorLimit
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
            <h4 className="uk-margin-remove uk-text-muted fontweight-300">
              Be careful, what you change here will affect the matching results.
            </h4>
          </div>
        </div>
        <hr />
        <form
          className="uk-text-left uk-form-stacked"
          onSubmit={this.handleSave}
        >
          <div className="uk-grid-small uk-child-width-1-2@s" uk-grid="">
            <div>
              <Fieldset label="mentor spreadsheet">
                <InputText
                  label="spreadsheet ID"
                  name="mentorSpreadsheetId"
                  type="text"
                  value={mentorSpreadsheetId}
                  handleChange={this.handleChange}
                />
                <InputText
                  label="spreadsheet range"
                  name="mentorRange"
                  type="text"
                  value={mentorRange}
                  handleChange={this.handleChange}
                />
              </Fieldset>
              <Fieldset label="mentor data position">
                <InputText
                  label="name"
                  name="mentorName"
                  type="text"
                  value={mentorName}
                  handleChange={this.handleChange}
                />
                <InputText
                  label="email"
                  name="mentorEmail"
                  type="number"
                  value={mentorEmail}
                  handleChange={this.handleChange}
                />
                <InputText
                  label="mentor limit"
                  name="mentorLimit"
                  type="number"
                  value={mentorLimit}
                  handleChange={this.handleChange}
                />
                {userOptions.map(({ name, mentor }, idx) => (
                  <InputTextUserOptions
                    key={idx}
                    label={name}
                    value={mentor}
                    isMentor={true}
                    handleChange={this.handleChangeUserOptions(idx)}
                    handleRemove={this.handleRemove(idx)}
                  />
                ))}
                <div className="uk-margin-large">
                  <button
                    type="button"
                    className="uk-button uk-button-default"
                    onClick={this.handleAdd}
                  >
                    <span
                      uk-icon="icon: plus"
                      className="uk-margin-small-right"
                    />
                    new field
                  </button>
                </div>
              </Fieldset>
            </div>
            <div>
              <Fieldset label="mentee spreadsheet">
                <InputText
                  label="spreadsheet ID"
                  name="menteeSpreadsheetId"
                  type="text"
                  value={menteeSpreadsheetId}
                  handleChange={this.handleChange}
                />
                <InputText
                  label="spreadsheet range"
                  name="menteeRange"
                  type="text"
                  value={menteeRange}
                  handleChange={this.handleChange}
                />
              </Fieldset>
              <Fieldset label="mentee data position">
                <InputText
                  label="name"
                  name="menteeName"
                  type="text"
                  value={menteeName}
                  handleChange={this.handleChange}
                />
                <InputText
                  label="email"
                  name="menteeEmail"
                  type="number"
                  value={menteeEmail}
                  handleChange={this.handleChange}
                />
                <div className="uk-margin uk-invisible">
                  <label className="uk-form-label">label</label>
                  <div className="uk-form-controls">
                    <input
                      className="uk-input uk-form-width-small"
                      type="number"
                      required
                      value="value"
                      name="name"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                {userOptions.map(({ name, mentee }, idx) => (
                  <InputTextUserOptions
                    key={idx}
                    label={name}
                    value={mentee}
                    isMentor={false}
                    handleChange={this.handleChangeUserOptions(idx)}
                    handleRemove={this.handleRemove(idx)}
                  />
                ))}
              </Fieldset>
            </div>
          </div>
          <Fieldset label="match criteria">
            {userOptions.map(({ name, matchBy }, idx) => (
              <InputCheckbox
                key={idx}
                label={`match by ${name}`}
                checked={matchBy}
                handleChange={this.handleChangeMatchBy(idx)}
              />
            ))}
            <InputCheckbox
              label="randomly match all unmatched"
              name="randomMatch"
              checked={randomMatch}
              handleChange={this.handleChange}
            />
          </Fieldset>
          <div className="uk-grid-small" uk-grid="">
            <div className="uk-width-1-2@s">
              <button type="submit" className="uk-button uk-button-danger">
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
