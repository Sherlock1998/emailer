import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmail';
import FIELDS from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          type="text"
          key={name}
          component={SurveyField}
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
          autoComplete="off"
        >
          {this.renderFields()}
          <Link
            to="/surveys"
            className="btn waves-effect waves-light red left"
            type="submit"
            name="action"
          >
            Cancel
            <i className="material-icons right">close</i>
          </Link>
          <button
            className="btn waves-effect waves-light right"
            type="submit"
            name="action"
          >
            Next
            <i className="material-icons right">navigate_next</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = `Please provide a ${name}`;
    }
    if (!values.recipients) {
      errors.recipients = 'Please provide emails';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
