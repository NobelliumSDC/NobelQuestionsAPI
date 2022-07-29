
require("dotenv").config();

const { Answer, Question} = require('../database/index.js')
const express = require('express');

let app = express();


app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}!`));

app.use(express.json());

//getting all answers for a specific question
app.get('/qa/questions/:question_id/answers', (req, res) => {
     console.log(req.params)


    Answer.find(req.params).limit(50).then((answers) => {
      console.log(answers)
    res.send(answers)
   }).catch((error) => {
    console.log('error:', error)
   })

});

//getting all questions for a specific product
app.get(`/qa/questions/:product_id`, (req, res) => {
  console.log(req.params)
   Question.find(req.params).limit(50).then((questions) =>{
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
app.get(`/qa/questions/`, (req, res) => {
  console.log(req.params)
   Question.find({}).limit(50).then((questions) =>{
    console.log(questions);
    res.send(questions)
   }).catch((error) => {
    console.log('error:', error)
   })
})