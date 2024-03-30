import { Model, Document } from "mongoose";

export const modelJson = (data: any & Model<any> & { _id?: string }) => {
  return JSON.parse(JSON.stringify(data?.toJSON() || data));

  /* // DONT refactor back to this, the nested _id's will not populate
  const json = data.toJSON();
  json._id = data._id.toString() || json._id.toString();
   */
};

export const modelJsons = <T>(
  data: Document<Model<any> & { _id?: string }>[],
): T => {
  return JSON.parse(JSON.stringify(data.map((model) => model.toJSON())));

  /* // DONT refactor back to this, the nested _id's will not populate
  return data.map((model) => {
    const json = model.toJSON();
    json._id = model._id?.toString() || json._id.toString();

    return json;
  }) as T;*/
};
