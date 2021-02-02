const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 3000;

app.use(cors())

app.use(bodyParser.json({type:"application/json"}));

app.post("/", (request, response)=>{
    console.log(request.body)
    response.status(200).end();
})

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})