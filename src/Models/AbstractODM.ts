import { Model, Schema, models, model } from 'mongoose';

abstract class AbstractODM <T> {
  private _schema: Schema;
  protected model: Model<T>;

  constructor(schema: Schema, modelName: string) {
    this._schema = schema;
    this.model = models[modelName] || model(modelName, this._schema);
  }

  protected async createOne(documentFromRequest: T): Promise<T> {
    const documentCreated = await this.model.create(documentFromRequest);
    return documentCreated;
  }
}

export default AbstractODM;