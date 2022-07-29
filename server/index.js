
require("dotenv").config();

const { Answer, Question} = require('../database/index.js')
const express = require('express');

let app = express();


app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}!`));

app.use(express.json());

//getting all answers for a specific question
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

//getting all questions for a specific product
app.get(`/qa/questions/:product_id&count=:count&page=:page`, (req, res) => {

  let page;
  if (req.params.page <= 0) {
     page = 1
  } else {
     page = req.params.page
  }
  let count;
  if (req.params.count <= 0) {
    count = 5
  } else {
    count = req.params.count
  }

  console.log(req.params)
   Question.find({product_id: req.params.product_id}).limit(50).then((questions) =>{
    for (var i = 0; i < questions.length; i++) {
      console.log(questions[i].id)
      let id = questions[i].id;
      Answer.find({question_id: id}).limit(50).then((answers) => {
        console.log('answers:', answers)
      })
    }
    //res.send(questions)
   }).catch((error) => {
    console.log('error:', error)
   })
})

//I want a route that gives me all Q&As for a specific product
app.get(`/qa/questions/&count=:count&page=:page`, (req, res) => {
  console.log(req.params)
   Question.find({}).limit(50).then((questions) =>{
    console.log(questions);
    res.send(questions)
   }).catch((error) => {
    console.log('error:', error)
   })
})