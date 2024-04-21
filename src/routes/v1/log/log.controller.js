import logModel from './log.model';
import asyncHandler from '../../../middleware/async';

export const addLog = asyncHandler(async (payload) => {
  await logModel.create(payload);
});

export const getAllLogs = asyncHandler(async (ctx) => {
  const logs = await logModel.find();
  ctx.status = 200;
  ctx.body = { success: true, length: logs.length, logs };
});
