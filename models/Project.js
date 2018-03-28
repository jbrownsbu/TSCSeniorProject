/*
Project data will be sourced from The Seed Company's project database when The Seed Company actually implements this
application. For development, out project collection in the database only stores project data relevant to the project-
consultant matching process.
*/

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
