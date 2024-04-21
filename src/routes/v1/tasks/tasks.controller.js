import tasksModel from './tasks.model';
import asyncHandler from '../../../middleware/async';

// @desc      create employee
// @route     POST /v1/employee/create
// @access    Private
export const addTask = asyncHandler(async (ctx) => {
  ctx.assert(ctx.request.body, 400, 'Please enter the  required fields');
  // save task data
  const task = await tasksModel.create(ctx.request.body);
  const newTask = await tasksModel.findById(task.id);

  ctx.status = 201;
  ctx.body = { success: true, status: 'Task Successfully Created', task: newTask };
});

// @desc      get all task
// @route     Get /v1/task/
// @access    Public
export const getAllTasks = asyncHandler(async (ctx) => {
  const tasks = await tasksModel.find();
  ctx.status = 200;
  ctx.body = { success: true, length: tasks.length, tasks };
});

// @desc      get all task
// @route     Get /v1/task/
// @access    Public
export const getAllTasksByProjectId = asyncHandler(async (ctx) => {
  const tasks = await tasksModel.find({ project: ctx.params.id });
  ctx.status = 200;
  ctx.body = { success: true, length: tasks.length, tasks };
});

// @desc      get single task
// @route     Get /v1/task/:id
// @access    Private
export const getSingleTask = asyncHandler(async (ctx) => {
  const task = await tasksModel.findById(ctx.params.id);
  ctx.assert(task, 404, 'Task not found with this id');
  ctx.status = 200;
  ctx.body = { success: true, task };
});

// @desc      update single task
// @route     PUT /v1/task/:id
// @access    Private
export const updateTask = asyncHandler(async (ctx) => {
  const task = await tasksModel.findById(ctx.params.id);
  ctx.assert(task, 404, 'Task not found with this id');

  const newTask = await tasksModel.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
    new: true, runValidators: true });
  ctx.status = 200;
  ctx.body = { success: true, status: 'Task Successfully Updated', task: newTask };
});

// @desc      Delete single task
// @route     DELETE /v1/task/:id
// @access    Private
export const deleteTask = asyncHandler(async (ctx) => {
  const task = await tasksModel.findById(ctx.params.id);
  ctx.assert(task, 404, 'Task not found with this id');
  task.remove();
  ctx.status = 200;
  ctx.body = { success: true, status: 'Task Successfully Deleted' };
});
