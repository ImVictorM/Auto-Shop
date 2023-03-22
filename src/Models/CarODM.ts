import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import ODM from './ODM';

class CarODM extends ODM<ICar> {
  constructor() {
    const carSchema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    const modelName = 'cars';
    super(carSchema, modelName);
  }

  public async createOne(carFromReq: ICar): Promise<ICar> {
    const createdCar = await this.model.create(carFromReq);
    return createdCar;
  }

  public async getAll(): Promise<ICar[]> {
    const carList = await this.model.find();
    return carList;
  }
}

export default CarODM;