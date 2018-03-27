var  mongoose =require('mongoose');

var ProjectSchema = new mongoose.Schema({
  projectName: String,
  startDate: Date,
  endDate: Date,
  role: String,
  language: String,
  testament: String,
  media: String,
  translationRegion: String
});

module.exports = mongoose.model('Project', ProjectSchema);
