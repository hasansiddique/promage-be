import mongoose from 'mongoose';

const managerSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'please add a name'],
    maxlength: [40, 'Name cannot be longer than 20 characters'],
    trim: true,
  },
  designation: {
    type: String,
    required: [true, 'please add a designation'],
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

const managersModel = mongoose.model('manager', managerSchema);

export default managersModel;
