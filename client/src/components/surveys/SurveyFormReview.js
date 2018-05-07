import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router';

import FIELDS from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(FIELDS, ({ label, name }) => {
    return (
      <div key={label}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h5>Please confirm your email</h5>
      <div>{reviewFields}</div>
      <button
        className="btn waves-effect waves-light red left"
        onClick={onCancel}
      >
        Cancel
        <i className="material-icons right">close</i>
      </button>
      <button
        className="teal accent-2 btn waves-effect waves-light red right"
        onClick={() => submitSurvey(formValues, history)}
      >
        Confirm
        <i className="material-icons right">check</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
