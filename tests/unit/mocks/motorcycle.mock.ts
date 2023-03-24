import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

export const ALL_MOTOS = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Honda Cbr 1000rr',
    year: 2011,
    color: 'Orange',
    status: true,
    buyValue: 59.900,
    category: 'Street',
    engineCapacity: 1000,
  },
] as IMotorcycle[];

export const VALID_MOTO_FROM_REQ = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
} as IMotorcycle;

export const VALID_ID = '634852326b35b59438fbea2f';

export const VALID_MOTO_FROM_DB = ALL_MOTOS[0] as IMotorcycle;

export const VALID_MOTO_FROM_SERVICE = new Motorcycle(VALID_MOTO_FROM_DB);

export const ALL_MOTOS_FROM_SERVICE = ALL_MOTOS.map((moto) => new Motorcycle(moto));
