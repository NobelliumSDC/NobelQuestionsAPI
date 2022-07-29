require("dotenv").config();


const mongoose = require('mongoose');

mongoose.connect(
  `mongodb://localhost:27017/${process.env.DB_NAME}`
);

let questionSchema = mongoose.Schema ({
id: {type: Number, required: true},
product_id: {type: Number, required: true},
body: {type: String, required: true},
date_written: {type: Date, required: true},
asker_name: {type: String, required: true},
asker_email: {type: String, required: true},
reported: {type: Boolean, default: false},
helpful: {type: Number, default: 0}
})



let answerSchema = mongoose.Schema({
id: {type: Number, required: true},
question_id: {type: Number, required: true},
body: {type: String, required: true},
date_written: {type: Date, required: true},
answerer_name: {type: String, required: true},
answerer_email: {type: String, required: true},
reported: {type: Boolean, default: false},
helpful: {type: Number, default: 0}
})

let Question = mongoose.model('Question', questionSchema );
let Answer = mongoose.model('Answer', answerSchema);

// let findAll = function(cb) {
//   Question.find({}, function(err, questions) {
//     if (err) {
//       console.log('Err when finding questions', err)
//     } else {
//       cb(questions)
//     }
//   }).limit(50);


  // Answer.find({}, function(err, answers) {
  //   if (err) {
  //     console.log('Err when finding questions', err)
  //   } else {
  //     cb(answers)
  //   }
  // }).limit(50).catch((err) => {console.log('error in answer find func:', error)})
//}





//module.exports.findAll = findAll;
module.exports.Answer = Answer;
module.exports.Question = Question;
