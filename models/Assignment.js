var  mongoose =require('mongoose');

var AssignmentSchema = new mongoose.Schema({
  // This is supposed to link to the consultant schema, but it isn't quite working. So I'm just going to give it a name.
  // this is temporary so that I can ensure that the connection is being made
  // consultantID: [{type: Schema.Types.ObjectId, ref: 'Consultant'}],
  consultantName: String,
  name: String,
  startDate: Date,
  endDate: Date,
  consultantRole: String,
  language: String,
  region: String
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
