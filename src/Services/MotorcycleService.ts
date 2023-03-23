import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import Service from './Service';

class MotorcycleService extends Service <MotorcycleODM> {
  constructor() {
    const odm = new MotorcycleODM();
    super(odm);
  }

  public async createOne(motoFromReq: IMotorcycle): Promise<Motorcycle> {
    const createdMoto = await this.odm.createOne(motoFromReq);
    const moto = this.mapMotorcycle(createdMoto);
    return moto;
  }

  private mapMotorcycle(motoFromDB: IMotorcycle): Motorcycle {
    const mappedMoto = new Motorcycle(motoFromDB);
    return mappedMoto;
  }
}

export default MotorcycleService;