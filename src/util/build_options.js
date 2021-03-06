import {buildInclude, buildWhere, buildPage, buildOrderby, buildSelect} from './options';

export const buildOptions = (mode, model, database, args = {}) => {
  const {models, db: {relationships}} = database;

  const include = buildInclude(args, mode, model, models, relationships);
  const where = buildWhere(args, models, relationships, database);
  const page = buildPage(args);
  const order = buildOrderby(args, models, relationships);
  const attributes = buildSelect(args, model);

  return {include, where, order, ...page, attributes};
};

export const buildOptionsForCount = (mode, model, database, args = {}) => {
  const {models, db: {relationships}} = database;

  const include = buildInclude(args, mode, model, models, relationships, {where: true});
  const where = buildWhere(args, models, relationships, database);

  return {include, where};
};
