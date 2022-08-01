
require("dotenv").config();

const { Answer, Question, AllInfo } = require('../database/index.js')
const express = require('express');

let app = express();


app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}!`));

app.use(express.json());


///////////////////////////// ROUTES ///////////////////////////////////

//////// Getting all answers (answer data only) for a specific question ////////
///////////////////////////////////////////////////////////////////////////////
app.get('/qa/questions/:question_id/answers', (req, res) => {

     console.log('answer get request', req.params)
      let page = 1;
     if (req.params.page <= 0) {
       page = 1
    } else {
       page = req.params.page
    }
      let count = 5;
    if (req.params.count <= 0) {
       count = 5
    } else {
      count = req.params.count
    }
    Answer.find({question_id: req.params.question_id}).limit(Number(count)).skip(Number(page)).then((answers) => {
      console.log(answers)
    res.send(answers)
   }).catch((error) => {
    console.log('error:', error)
   })

});


///// Getting all (questions/answers/photos) for a specific product ////
///////////////////////////////////////////////////////////////////////
app.get(`/qa/questions/:product_id`, (req, res) => {

  let page = 1;
  if (req.params.page <= 0) {
     page = 1
  } else {
     page = req.params.page
  }
  let count = 5;
  if (req.params.count <= 0) {
    count = 5
  } else {
    count = req.params.count
  }

  console.log(req.params)

 AllInfo.find({product_id: req.params.product_id}).limit(Number(count)).skip(Number(page)).then((data) => {
  console.log('data', data)
  res.send(data)
 })

})

///////// Updating Helpful Field for Question /////////////
////////////////////////////////////////////////////////
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  console.log(req.params.question_id)
  AllInfo.find({id: req.params.question_id}).then((data) => {
    console.log(data)
      res.sendStatus(204);

  }).catch((err) => {
    console.log('err', err);
  });
})


app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  AllInfo.update({"answers.id" : req.params.answer_id}, {$inc : {"answers.$.helpful": 1}}).then((data) => {
    console.log(req.params);
    console.log('data', data);
    //WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
    res.send(data)
  })

})


// .update( {"StudentDetails.StudentSubjectName":"Math"}, { $inc : {
//   "StudentDetails.$.StudentMathMarks" : 1 } });
//   WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
//////////////////////////////////////////////
 //    FOR Merging data via Shell         //
//////////////////////////////////////////////
//        db.questions.aggregate([
//    {
//      $lookup:
//        {
//          from: "answersAndPhotos",
//          localField: "id",
//          foreignField: "question_id",
//          as: "answers"
//        }
//    },
//        {$out : "allInfo" }
//  ]);


//  db.answers.aggregate([
//   {
//     $lookup:
//       {
//         from: "photos",
//         localField: "id",
//         foreignField: "answer_id",
//         as: "photos"
//       }
//   },
//       {$out : "answersAndPhotos" }
// ]);
