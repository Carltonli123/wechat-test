const express = require('express')
const app = express()
const port = 80
var bodyParser = require("body-parser")

//view engine
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World! Welcome to Adyen\'s wechat portal!')
})

app.get('/netease-game-club', (req, res) => {
  res.render("neteast-game-club/index");
})

//webhook
app.post('/adyen/notify',(req,res) =>{
     console.log(req.body);
     res.send("[accepted]" );
})

app.get('/adyen/notify',(req,res) =>{
  res.send('the webhook is working');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})