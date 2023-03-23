import AbstractODM from '../Models/AbstractODM';

abstract class Service <DataInterface, Domain> {
  protected odm: AbstractODM<DataInterface>;
  constructor(odm: AbstractODM<DataInterface>) {
    this.odm = odm;
  }

  public async createOne(documentFromReq: DataInterface): Promise<Domain> {
    const createdDoc = await this.odm.createOne(documentFromReq);
    const mappedDoc = this.mapDoc(createdDoc);
    return mappedDoc;
  }

  public async getAll(): Promise<Domain[]> {
    const docsFromDB = await this.odm.getAll();
    const mappedDocs = docsFromDB.map((doc) => this.mapDoc(doc));
    return mappedDocs;
  }

  abstract mapDoc(vehicle: DataInterface): Domain; 
}

export default Service;