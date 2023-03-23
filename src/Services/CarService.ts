import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import Service from './Service';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';
import ExceptionWithErrorCode from '../Errors/NotFoundException';
import HTTPStatusCode from '../utils/HTTPStatusCode';

class CarService extends Service<CarODM> {
  constructor() {
    const odm = new CarODM();
    super(odm);
  }

  public async createOne(carFromReq: ICar): Promise<Car> {
    const createdCar = await this.odm.createOne(carFromReq);
    const car = this.mapCar(createdCar);
    return car;
  }

  public async getAll(): Promise<Car[]> {
    const carListFromDB = await this.odm.getAll();
    const carList = carListFromDB.map((car) => this.mapCar(car));
    return carList;
  }

  public async getById(carId: string): Promise<Car> {
    this.validateCarIdFromReq(carId);
    const carFromDB = await this.odm.getById(carId);
    this.validateCarExistence(carFromDB);
    const car = this.mapCar(carFromDB as ICar);
    return car;
  }

  public async updateById(carId: string, patch: Partial<ICar>): Promise<Car> {
    this.validateCarIdFromReq(carId);
    const updatedCarFromDB = await this.odm.updateOne(carId, patch);
    this.validateCarExistence(updatedCarFromDB);
    const car = this.mapCar(updatedCarFromDB as ICar);
    return car;
  }

  private mapCar(carFromDB: ICar) {
    const mappedCar = new Car(carFromDB);
    return mappedCar;
  }

  private validateCarIdFromReq(id: string): void {
    if (!isValidObjectId(id)) {
      throw new ExceptionWithErrorCode(HTTPStatusCode.UNPROCESSABLE_ENTITY, 'Invalid mongo id');
    }
  }

  private validateCarExistence(car: ICar | null): void {
    if (!car) {
      throw new ExceptionWithErrorCode(HTTPStatusCode.NOT_FOUND, 'Car not found');
    }
  }
}

export default CarService;