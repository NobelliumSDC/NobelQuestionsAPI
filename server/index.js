
require("dotenv").config();

const {findAll} = require('../database/index.js')
const express = require('express');

let app = express();


app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}!`));

app.use(express.json());

//qa/questions/?product_id=${productId}
app.get('/', (req, res) => {




    findAll((questions) => {
      console.log('inside findAll in app', questions)

      res.send(questions);
    })

});