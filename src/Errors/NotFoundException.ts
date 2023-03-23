import HTTPStatusCode from '../utils/HTTPStatusCode';

class ExceptionWithErrorCode extends Error {
  constructor(errorCode: HTTPStatusCode, message: string) {
    super(message);
    this.stack = errorCode.toString();
  }
}

export default ExceptionWithErrorCode;