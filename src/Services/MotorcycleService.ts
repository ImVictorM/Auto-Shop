import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import ExceptionWithErrorCode from '../Errors/NotFoundException';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import HTTPStatusCode from '../utils/HTTPStatusCode';
import Service from './Service';

class MotorcycleService extends Service <IMotorcycle, Motorcycle> {
  constructor() {
    const odm = new MotorcycleODM();
    super(odm);
  }

  public async getById(motoId: string): Promise<Motorcycle> {
    this.validateMotoIdFromReq(motoId);
    const motoFromDB = await this.odm.getById(motoId);
    this.validateMotoExistence(motoFromDB);
    const motorcycle = this.mapDoc(motoFromDB as IMotorcycle);
    return motorcycle;
  }

  public mapDoc(motoFromDB: IMotorcycle): Motorcycle {
    const mappedMoto = new Motorcycle(motoFromDB);
    return mappedMoto;
  }

  private validateMotoIdFromReq(id: string): void {
    if (!isValidObjectId(id)) {
      throw new ExceptionWithErrorCode(HTTPStatusCode.UNPROCESSABLE_ENTITY, 'Invalid mongo id');
    }
  }

  private validateMotoExistence(motorcycle: IMotorcycle | null): void {
    if (!motorcycle) {
      throw new ExceptionWithErrorCode(HTTPStatusCode.NOT_FOUND, 'Motorcycle not found');
    }
  }
}

export default MotorcycleService;