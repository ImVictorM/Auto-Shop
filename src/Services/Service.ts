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

  public async getById(id: string): Promise<Domain> {
    this.validateIdFromRequest(id);
    const docFromDB = await this.odm.getById(id);
    this.validateDocExistence(docFromDB);
    const mappedDoc = this.mapDoc(docFromDB as DataInterface);
    return mappedDoc;
  }

  public async updateById(id: string, patch: Partial<DataInterface>): Promise<Domain> {
    this.validateIdFromRequest(id);
    const updatedDocFromDB = await this.odm.updateOne(id, patch);
    this.validateDocExistence(updatedDocFromDB);
    const car = this.mapDoc(updatedDocFromDB as DataInterface);
    return car;
  }

  public async deleteById(id: string): Promise<void> {
    this.validateIdFromRequest(id);
    const deletedDoc = await this.odm.deleteOne(id);
    this.validateDocExistence(deletedDoc);
  }

  abstract validateIdFromRequest(id: string): void;

  abstract validateDocExistence(doc: DataInterface | null): void;

  abstract mapDoc(vehicle: DataInterface): Domain; 
}

export default Service;