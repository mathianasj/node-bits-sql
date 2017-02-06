import _ from 'lodash';

export const defineRelationships = (models, db) => {
  const logic = {
    ONE_TO_ONE: (model, reference, rel) => {
      const options = { as: rel.as };
      model.belongsTo(reference, options);
    },

    ONE_TO_MANY: (model, reference, rel) => {
      const options = {
        foreignKey: rel.as,
        sourceKey: rel.from,
      };
      reference.hasMany(model, options);
    },

    MANY_TO_MANY: (model, reference, rel) => {
      const options = {
        as: rel.as,
        through: rel.through || `${model.getTableName()}_${reference.getTableName()}`,
      };

      return model.belongsToMany(reference, options);
    },
  };

  _.forEach(db.relationships, (rel) => {
    const model = models[rel.model];
    const reference = models[rel.references];
    const apply = logic[rel.type];

    if (!model || !reference || !apply) {
      logWarning(`This relationship has not been added due to a misconfiguration
        ${JSON.stringify(rel)}`);
      return;
    }

    logic[rel.type](model, reference, rel);
  });
};
