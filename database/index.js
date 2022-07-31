require("dotenv").config();
const path = require('path');


const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
////const client = new MongoClient( `mongodb://localhost:27017/${process.env.DB_NAME}`);

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Establish and verify connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to server");


//     const database = client.db("qa");
//     const questions = database.collection("questions");
//     // Query for a movie that has the title 'The Room'
//     const query = { "product_id": 1 };
//     const options = {
//       // sort matched documents in descending order by rating
//       sort: { "helpful": -1 },
//       // Include only the `title` and `imdb` fields in the returned document

//     };
//     const question = await questions.findOne(query, options);
//     // since this method returns the matched document, not a cursor, print it directly
//     console.log(question);

//    const merged = await database.questions.aggregate([
//     {
//             $lookup:
//               {
//                 from: "answers",
//                 localField: "id",
//                foreignField: "question_id",
//                 as: "answers"
//              }
//           },

//        ]);
//        console.log(merged)
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);



mongoose.connect(
  `mongodb://localhost:27017/${process.env.DB_NAME}`
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

let questionSchema = mongoose.Schema ({
id: {type: Number},
product_id: {type: Number},
body: {type: String},
date_written: {type: Date},
asker_name: {type: String},
asker_email: {type: String},
reported: {type: Boolean, default: false},
helpful: {type: Number, default: 0}
})



let answerSchema = mongoose.Schema({
id: {type: Number},
question_id: {type: Number},
body: {type: String},
date_written: {type: Date},
answerer_name: {type: String},
answerer_email: {type: String},
reported: {type: Boolean, default: false},
helpful: {type: Number, default: 0}
})


let allInfoSchema = mongoose.Schema({
  id: {type: Number},
product_id: {type: Number},
body: {type: String},
date_written: {type: Date},
asker_name: {type: String},
asker_email: {type: String},
reported: {type: Boolean, default: false},
helpful: {type: Number, default: 0},
answers: [{id: Number,
  question_id: Number,
  body: String,
  date_written: Date,
  answerer_name: String,
  answerer_email: String,
  reported: {type: Boolean, default: false},
  helpful: {type: Number, default: 0},
   photos: [{id: Number, answer_id: Number, url: String}]}]
})
let AllInfo = mongoose.model('AllInfo', allInfoSchema, 'allInfo');
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







module.exports.AllInfo = AllInfo;
module.exports.Answer = Answer;
module.exports.Question = Question;
