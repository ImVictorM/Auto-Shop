import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import Service from './Service';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';
import UnprocessableEntityException from '../Errors/UnprocessableEntityException';
import NotFoundException from '../Errors/NotFoundException';

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

  private validateCarIdFromReq(id: string): void {
    if (!isValidObjectId(id)) {
      throw new UnprocessableEntityException('Invalid mongo id');
    }
  }

  private validateCarExistence(car: ICar | null): ICar {
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }

  private mapCar(carFromDB: ICar) {
    const mappedCar = new Car(carFromDB);
    return mappedCar;
  }
}

export default CarService;