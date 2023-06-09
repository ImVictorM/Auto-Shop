import Car from '../../src/Domains/Car';

export const VALID_CAR_FROM_REQ = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

export const ALL_CARS = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Tempra',
    year: 1995,
    color: 'Black',
    status: false,
    buyValue: 39,
    doorsQty: 2,
    seatsQty: 5,
  },
];

export const VALID_ID = '634852326b35b59438fbea31';

export const VALID_CAR_FROM_DB = {
  ...ALL_CARS[1],
};

export const VALID_CAR_FROM_SERVICE = new Car(VALID_CAR_FROM_DB);

export const ALL_CARS_FROM_SERVICE = ALL_CARS.map((car) => new Car(car));