import ICar from '../Interfaces/ICar';

class Car {
  protected id?: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;
  private _doorsQty: number;
  private _seatsQty: number;

  constructor(car: ICar) {
    this.id = car.id;
    this.model = car.model;
    this.year = car.year;
    this.color = car.color;
    this.status = car.status || false;
    this.buyValue = car.buyValue;
    this._doorsQty = car.doorsQty;
    this._seatsQty = car.seatsQty;
  }
}

export default Car;