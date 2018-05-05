import React from 'react';

const SurveyFormReview = ({ onCancel }) => {
  return (
    <div>
      <h5>Please confirm your email</h5>
      <button className="yellow btn-flat" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default SurveyFormReview;
