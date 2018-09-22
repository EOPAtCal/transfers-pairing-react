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
    mentorName: Options.convertArrToString(this.props.options.mentorName),
    menteeName: Options.convertArrToString(this.props.options.menteeName),
    userOptions: [
      {
        name: 'college',
        mentor: this.props.options.mentorCollege,
        mentee: this.props.options.menteeCollege,
        matchBy: this.props.options.matchByCollege
      },
      {
        name: 'major',
        mentor: this.props.options.mentorMajor,
        mentee: this.props.options.menteeMajor,
        matchBy: this.props.options.matchByMajor
      }
    ],
    randomMatch: this.props.options.randomMatch,
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
      [attributes[index]]: parseInt(event.target.value, 10)
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

  getName = (key, name) => key + name.charAt(0).toUpperCase() + name.slice(1);

  static convertArrToString = arr => arr.join(',');

  convertStringToArrInts = str => str.split(',').map(num => parseInt(num, 10));

  handleSubmit = e => {
    e.preventDefault();
    const options = JSON.parse(JSON.stringify(this.state));
    options.userOptions.forEach(obj => {
      Object.keys(obj).forEach(key => {
        if (key !== 'name') {
          options[this.getName(key, obj.name)] = obj[key];
        }
      });
    });
    options.mentorName = this.convertStringToArrInts(options.mentorName);
    options.menteeName = this.convertStringToArrInts(options.menteeName);
    delete options.userOptions;
    this.props.handleChangeOptions(options);
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
              Be careful, what you change here will affect the matching results.
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
            <div className="uk-width-1-2@s">
              <Fieldset label="mentee spreadsheet">
                <InputText
                  label="spreadsheet ID"
                  name="menteeSpreadsheetId"
                  type="text"
                  required
                  value={menteeSpreadsheetId}
                  handleChange={this.handleChange}
                />
                <InputText
                  label="spreadsheet range"
                  name="menteeRange"
                  type="text"
                  required
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
