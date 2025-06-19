const sequelize = require('../config/config');
const User = require('./user')(sequelize);
const Patient = require('./patient')(sequelize);
const Doctor = require('./doctor')(sequelize);
// const Mapping = require('./mapping')(sequelize);

// Relations
// User.hasMany(Patient);
// Patient.belongsTo(User);

// Patient.belongsToMany(Doctor, { through: Mapping });
// Doctor.belongsToMany(Patient, { through: Mapping });

module.exports = {
  sequelize,
  User,
  Patient,
  Doctor,
//   Mapping
};
