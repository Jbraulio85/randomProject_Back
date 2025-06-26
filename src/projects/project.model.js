import { Schema, model } from 'mongoose';

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del proyecto es obligatorio'],
      trim: true,
    },
    repositoryBack: {
      type: String,
      required: [true, 'El repositorio Backend es obligatorio'],
      trim: true,
    },
    repositoryFront: {
      type: String,
      required: [true, 'El repositorio Frontend es obligatorio'],
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('Projects', projectSchema);