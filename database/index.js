require("dotenv").config();
const path = require('path');


const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
////const client = new MongoClient( `mongodb://localhost:27017/${process.env.DB_NAME}`);




mongoose.connect(
  `mongodb://${process.env.MONGO_HOST}:27017/${process.env.DB_NAME}`
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

mongoose.set('setDefaultsOnInsert', true);
// const autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(connection);


// allInfoSchema.plugin(autoIncrement.plugin, {
//   model: 'AllInfo',
//   field: 'id'
// });


let questionSchema = mongoose.Schema ({
id: {type: Number, index: true},
product_id: {type: Number},
body: {type: String},
date_written: {type: Date, default: Date.now},
asker_name: {type: String},
asker_email: {type: String},
reported: {type: Boolean, default: false},
helpful: {type: Number, default: 0}
})



let answerSchema = mongoose.Schema({
id: {type: Number, required: true, index: true},
question_id: {type: Number},
body: {type: String},
date_written: {type: Date, default: Date.now},
answerer_name: {type: String},
answerer_email: {type: String},
reported: {type: Boolean, default: false},
helpful: {type: Number, default: 0},
photos: []
})


let allInfoSchema = mongoose.Schema({
id: {type: Number, required: true, index: true},
product_id: {type: Number},
body: {type: String},
date_written: {type: Date, default: Date.now},
asker_name: {type: String},
asker_email: {type: String},
reported: {type: Boolean, default: false},
helpful: {type: Number, default: 0},
answers: []
})


let AllInfo = mongoose.model('AllInfo', allInfoSchema, 'allInfo');
let Question = mongoose.model('Question', questionSchema );
let Answer = mongoose.model('Answer', answerSchema);







module.exports.AllInfo = AllInfo;
module.exports.Answer = Answer;
module.exports.Question = Question;
