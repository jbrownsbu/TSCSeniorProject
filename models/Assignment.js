/*
Assignment data will be created and edited within the Consultant Tracker System. An assignment is a piece of work on a
project with a specified time period, testament, medium, and set of roles.
 */

var  mongoose =require('mongoose');

var AssignmentSchema = new mongoose.Schema({
  // This is supposed to link to the consultant schema, but it isn't quite working. So I'm just going to give it a name.
  // this is temporary so that I can ensure that the connection is being made
  // consultantID: [{type: Schema.Types.ObjectId, ref: 'Consultant'}],
  assignmentName: String,
  projectId: String,
  projectName: String,
  consultantId: String,
  consultantName: String,
  startDate: String,
  endDate: String,
  role: String,
  language: String,
  testament: String,
  media: String,
  translationRegion: String
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
