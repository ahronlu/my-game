import mongoose, { Schema, Document, Model } from "mongoose";

export interface IScore extends Document {
  name: string;
  level: number;
  additionalData: Record<string, any>;
}

const ScoreSchema: Schema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  additionalData: { type: Schema.Types.Mixed, required: true },
});

const ScoreModel: Model<IScore> = mongoose.model<IScore>("Score", ScoreSchema);

export default ScoreModel;
