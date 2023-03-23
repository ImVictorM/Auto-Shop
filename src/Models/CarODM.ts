import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

class CarODM extends AbstractODM<ICar> {
  constructor() {
    const carSchema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    const modelName = 'cars';
    super(carSchema, modelName);
  }

  public async getAll(): Promise<ICar[]> {
    const carList = await this.model.find();
    return carList;
  }

  public async getById(carId: string): Promise<ICar | null> {
    const car = await this.model.findById(carId);
    return car;
  }

  public async updateOne(carId: string, patch: Partial<ICar>): Promise<ICar | null> {
    const updatedCar = await this.model.findOneAndUpdate(
      { _id: carId }, 
      patch,
      { new: true },
    );
    return updatedCar;
  }
}

export default CarODM;