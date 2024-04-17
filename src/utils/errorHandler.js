import HttpStatusMessages from './constants/httpStatusCodes';

class ErrorHandler {
  static handleServiceError(error) {
    console.error('Service Error:', error.response);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else if (error.response) {
      const message = HttpStatusMessages[error.response.status] || HttpStatusMessages.DEFAULT;
      throw new Error(message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }

  static handleUIError(error, setAlert) {
    console.error('UI Error:', error);
    setAlert({
      show: true,
      type: 'error',
      message: error.message
    });
  }
}

export default ErrorHandler;
