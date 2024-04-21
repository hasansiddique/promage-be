import managersModel from './managers.model';
import asyncHandler from '../../../middleware/async';

// @desc      create employee
// @route     POST /v1/employee/create
// @access    Private
export const addManager = asyncHandler(async (ctx) => {
  ctx.assert(ctx.request.body, 400, 'Please enter the  required fields');
  // save manager data
  await managersModel.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = { success: true, status: 'Manager Successfully Created' };
});

// @desc      get all manager
// @route     Get /v1/manager/
// @access    Public
export const getAllManagers = asyncHandler(async (ctx) => {
  const managers = await managersModel.find();
  ctx.status = 200;
  ctx.body = { success: true, length: managers.length, managers };
});

// @desc      get single manager
// @route     Get /v1/manager/:id
// @access    Private
export const getSingleManager = asyncHandler(async (ctx) => {
  const manager = await managersModel.findById(ctx.params.id);
  ctx.assert(manager, 404, 'Manager not found with this id');
  ctx.status = 200;
  ctx.body = { success: true, manager };
});

// @desc      update single manager
// @route     PUT /v1/manager/:id
// @access    Private
export const updateManager = asyncHandler(async (ctx) => {
  const manager = await managersModel.findById(ctx.params.id);
  ctx.assert(manager, 404, 'Manager not found with this id');

  await managersModel.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
    new: true, runValidators: true });
  ctx.status = 200;
  ctx.body = { success: true, status: 'Manager Successfully Updated' };
});

// @desc      Delete single manager
// @route     DELETE /v1/manager/:id
// @access    Private
export const deleteManager = asyncHandler(async (ctx) => {
  const manager = await managersModel.findById(ctx.params.id);
  ctx.assert(manager, 404, 'Manager not found with this id');
  manager.remove();
  ctx.status = 200;
  ctx.body = { success: true, status: 'Manager Successfully Deleted' };
});
