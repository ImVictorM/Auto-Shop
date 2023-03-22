abstract class Service <ODMType> {
  protected odm: ODMType;
  constructor(odm: ODMType) {
    this.odm = odm;
  }
}

export default Service;