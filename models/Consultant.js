var mongoose = require('mongoose');

var ConsultantSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  address: String,
  biography: String,
  supervisorFirstName: String,
  supervisorLastName: String,
  supervisorEmail: String,
  supervisorPhone: String,
  companyName: String,
  isActive: Boolean,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Consultant', ConsultantSchema);
