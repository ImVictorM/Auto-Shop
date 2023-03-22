import ICar from '../Interfaces/ICar';
import Service from './Service';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';

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

  private mapCar(carFromDB: ICar) {
    const mappedCar = new Car(carFromDB);
    return mappedCar;
  }
}

export default CarService;