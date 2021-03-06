import { openNotification } from '../../shared/helpers/notification-helper';

const reducer = (state = {
  feedbackParameters: [],
  facultiesFeedbackSummary: {},
  facultyFeedback: {},
  isFacultiesFeedbackSummaryLoading: false,
  isFacultyFeedbackLoading: false,
}, action) => {
  switch (action.type) {
    case 'GET_FEEDBACK_PARAMETERS':
      return {
        ...state,
        loading: true,
      };
    case 'SUBMIT_FEEDBACK':
      return {
        ...state,
        isFeedbackSubmissionInProgress: true,
      };
    case 'FEEDBACK_PARAMETERS_RECEIVED':
      return { ...state, feedbackParameters: action.payload.feedbackParameters, loading: false };
    case 'SUBMIT_FEEDBACK_DONE': {
      let type; let message; let
        description;
      if (action.payload.feedbackResponse.data) {
        type = 'success';
        message = 'Success';
        description = 'Feedback submitted successfully.';
      } else {
        type = 'error';
        message = 'Failed';
        description = (action.payload.feedbackResponse.error
          ? action.payload.feedbackResponse.error.message
          : 'Error while submitting feedback.');
      }
      openNotification(type, message, description);
      return {
        ...state,
        isFeedbackSubmissionInProgress: false,
      };
    }
    case 'GET_FACULTIES_FEEDBACK_SUMMARY':
      return {
        ...state,
        isFacultiesFeedbackSummaryLoading: true,
      };
    case 'GET_FACULTY_FEEDBACK':
      return {
        ...state,
        isFacultyFeedbackLoading: true,
      };
    case 'FACULTIES_FEEDBACK_SUMMARY_RECEIVED':
      return {
        ...state,
        facultiesFeedbackSummary: {
          ...state.facultiesFeedbackSummary,
          [action.payload.departmentCode]: {
            ...state.facultiesFeedbackSummary[action.payload.departmentCode],
            [action.payload.classCode]: action.payload.facultiesFeedbackSummary,
          },
        },
        isFacultiesFeedbackSummaryLoading: false,
      };
    case 'FACULTY_FEEDBACK_RECEIVED':
      return {
        ...state,
        facultyFeedback: {
          ...state.facultyFeedback,
          [action.payload.departmentCode]: {
            ...state.facultyFeedback[action.payload.departmentCode],
            [action.payload.classCode]: {
              ...(state.facultyFeedback[action.payload.departmentCode] || {})[action.payload.classCode],
              [action.payload.facultyId]: action.payload.facultyFeedback,
            },
          },
        },
        isFacultyFeedbackLoading: false,
      };
    default:
      return state;
  }
};
export default reducer;
