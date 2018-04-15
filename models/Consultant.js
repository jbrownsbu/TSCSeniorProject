/*
Consultant data will be inserted and maintained by Consultant managers, and eventually, consultants themselves.
Consultant data includes a consultant's contact information, supervisor information, and translation proficiencies.
TODO: Comment on structure of language proficiencies when complete.
*/

var mongoose = require('mongoose');

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
  proficiencies: [{
    language: String,
    reading: Number,
    writing: Number,
    speaking: Number,
    listening: Number
  }],
  notes: String,
  // Testaments
  isOldTestament: Boolean,
  isNewTestament: Boolean,
  // Region
  translationRegion: String,
  // Media
  isWrittenMedia: Boolean,
  isAudioMedia: Boolean,
  isStorytellingMedia: Boolean,
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
