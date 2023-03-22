import ICar from '../Interfaces/ICar';
import Service from './Service';
import CarODM from '../Models/CarODM';

class CarService extends Service<CarODM> {
  constructor() {
    const odm = new CarODM();
    super(odm);
  }

  public async createOne(carFromReq: ICar): Promise<ICar> {
    const createdCar = this.odm.create(carFromReq);
    return createdCar;
  } 
}

export default CarService;