import HTTPStatusCode from '../utils/HTTPStatusCode';

class UnprocessableEntityException extends Error {
  constructor(message: string) {
    super(message);
    this.stack = HTTPStatusCode.UNPROCESSABLE_ENTITY.toString();
  }
}

export default UnprocessableEntityException;