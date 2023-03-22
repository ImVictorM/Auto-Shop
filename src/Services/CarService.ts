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
    const createdCar = await this.odm.create(carFromReq);
    const car = this.mapCar(createdCar);
    return car;
  } 

  private mapCar(carFromReq: ICar) {
    const mappedCar = new Car(carFromReq);
    return mappedCar;
  }
}

export default CarService;