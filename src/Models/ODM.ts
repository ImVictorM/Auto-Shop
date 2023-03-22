import { Model, Schema, models, model } from 'mongoose';

abstract class ODM <T> {
  protected schema: Schema;
  protected model: Model<T>;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.model = models[modelName] || model(modelName, this.schema);
  }
}

export default ODM;