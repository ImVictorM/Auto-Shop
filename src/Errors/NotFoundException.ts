import HTTPStatusCode from '../utils/HTTPStatusCode';

class NotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.stack = HTTPStatusCode.NOT_FOUND.toString();
  }
}

export default NotFoundException;