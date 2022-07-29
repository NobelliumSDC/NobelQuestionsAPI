
require("dotenv").config();

const { Answer, Question} = require('../database/index.js')
const express = require('express');

let app = express();


app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}!`));

app.use(express.json());

//qa/questions/?product_id=${productId}
app.get('/qa/answers', (req, res) => {

   Answer.find({}).limit(50).then((answers) => {
    res.send(answers)
   })

});

app.get('/qa/questions', (req, res) => {
   Question.find({product_id: 3}).limit(50).then((questions) =>{
    res.send(questions)
   })
})