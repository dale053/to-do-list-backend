import { Schema, model, Document, Types } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  desc: string;
  state: boolean;
  deadline: Date | null;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ITodo>('Todo', todoSchema);
