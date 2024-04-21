import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  Actor: mongoose.Mixed,
  StartTime: mongoose.Mixed,
  Method: mongoose.Mixed,
  metrics_type: mongoose.Mixed,
  message: mongoose.Mixed,
  level: mongoose.Mixed,
  TotalTime: mongoose.Mixed,
});

const logModel = mongoose.model('log', logSchema);

export default logModel;
