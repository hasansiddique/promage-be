import mongoose from 'mongoose';

export const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Project name should be unique'],
    required: [true, 'please add a name'],
    maxlength: [20, 'Name cannot be longer than 20 characters'],
    trim: true,
  },
  description: {
    trim: true,
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
  is_running: {
    type: Boolean,
    default: false,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'manager',
    required: true,
  },
});

const projectsModel = mongoose.model('project', projectSchema);

export default projectsModel;
