var mongoose = require('mongoose');

var proficiencySchema = new mongoose.Schema({
  language: String,
  reading: Number,
  writing: Number,
  speaking: Number,
  listening: Number
});

var ConsultantSchema = new mongoose.Schema({
  // Contact Info
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  address: String,
  biography: String,
  companyName: String,
  isActive: Boolean,
  // Supervisor Contact Info
  supervisorFirstName: String,
  supervisorLastName: String,
  supervisorEmail: String,
  supervisorPhone: String,
  // Translation Proficiencies
  proficiencies: [ proficiencySchema ], //This only works in mongoose >=4.2.0
  notes: String,
  // Testaments
  isOldTestament: Boolean,
  isNewTestament: Boolean,
  // Region
  region: String,
  // Media
  isWrittenMedia: Boolean,
  isAudioMedia: Boolean,
  isStoryTellingMedia: Boolean,
  // Roles
  isAudioToAudioRole: Boolean,
  isGuestScholarRole: Boolean,
  isLinguisticConsultantRole: Boolean,
  isManagerRole: Boolean,
  isStoryCheckerRole: Boolean,
  isTranslationConsultantInTrainingRole: Boolean,
  isTranslationConsultantRole: Boolean,
  updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consultant', ConsultantSchema);
