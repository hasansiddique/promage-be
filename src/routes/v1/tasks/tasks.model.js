import mongoose from 'mongoose';

export const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'please add a description'],
  },
  start_date: {
    type: Date,
    default: Date.now,
    required: [true, 'please add start date'],
  },
  end_date: {
    type: Date,
    default: Date.now,
    required: [true, 'please add end date'],
  },
  status: {
    type: String,
    required: [true, 'please add task status'],
    enum: ['STARTED', 'COMPLETED', 'REJECTED'],
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: true,
  },
});

const tasksModel = mongoose.model('task', taskSchema);

export default tasksModel;
