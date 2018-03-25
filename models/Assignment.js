var  mongoose =require('mongoose');

var AssignmentSchema = new mongoose.Schema({
  // This is supposed to link to the consultant schema, but it isn't quite working. So I'm just going to give it a name.
  // this is temporary so that I can ensure that the connection is being made
  // consultantID: [{type: Schema.Types.ObjectId, ref: 'Consultant'}],
  consultantId: String,
  consultantName: String,
  name: String,
  startDate: Date,
  endDate: Date,
  role: String,
  language: String,
  testament: String,
  media: String,
  translationRegion: String
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
