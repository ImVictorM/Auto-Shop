import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import Service from './Service';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';
import ExceptionWithErrorCode from '../Errors/NotFoundException';
import HTTPStatusCode from '../utils/HTTPStatusCode';

class CarService extends Service<ICar, Car> {
  constructor() {
    const odm = new CarODM();
    super(odm);
  }

  public mapDoc(carFromDB: ICar): Car {
    const mappedCar = new Car(carFromDB);
    return mappedCar;
  }

  public validateIdFromRequest(id: string): void {
    if (!isValidObjectId(id)) {
      throw new ExceptionWithErrorCode(HTTPStatusCode.UNPROCESSABLE_ENTITY, 'Invalid mongo id');
    }
  }

  public validateDocExistence(car: ICar | null): void {
    if (!car) {
      throw new ExceptionWithErrorCode(HTTPStatusCode.NOT_FOUND, 'Car not found');
    }
  }
}

export default CarService;