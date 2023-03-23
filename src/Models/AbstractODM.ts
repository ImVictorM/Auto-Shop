import { Model, Schema, models, model } from 'mongoose';

abstract class AbstractODM <T> {
  private _schema: Schema;
  protected model: Model<T>;

  constructor(schema: Schema, modelName: string) {
    this._schema = schema;
    this.model = models[modelName] || model(modelName, this._schema);
  }

  public async createOne(documentFromRequest: T): Promise<T> {
    const documentCreated = await this.model.create(documentFromRequest);
    return documentCreated;
  }

  public async getAll(): Promise<T[]> {
    const documentList = await this.model.find();
    return documentList;
  }

  public async getById(id: string): Promise<T | null> {
    const document = await this.model.findById(id);
    return document;
  }
}

export default AbstractODM;