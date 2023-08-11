const express = require('express')
const app = express()
const port = 80
const bodyParser = require("body-parser")
const fs = require('fs')
const path = require('path')
const HmacCheck = require('./utils/hmaccheck');

//view engine
app.set('view engine', 'ejs');

//serve files in the "public" foler
app.use(express.static('public'))

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
app.post('/adyen/notify', HmacCheck.isHmacVerified, (req,res,next) =>{

    console.log(JSON.stringify(req.body, null, 4)+",\r\n")

    if (checkIfIsTransEvent(req.body.notificationItems[0].NotificationRequestItem.success)) {
      writeToLogs(__dirname + "/views/logs/transactionEvents.log", req.body);
    } else if (checkIfIsDisputeEvent(req.body.notificationItems[0].NotificationRequestItem.eventCode)) {
      writeToLogs(__dirname + "/views/logs/disputeEvents.log", req.body);
    } else if (checkIfIsPayoutEvent(req.body.notificationItems[0].NotificationRequestItem.eventCode)) {
      writeToLogs(__dirname + "/views/logs/payoutEvents.log", req.body);
    } else {
      writeToLogs(__dirname + "/views/logs/otherEvents.log", req.body);
    };

     //response
     res.send("[accepted]" );
})

// show the logs
app.get('/translogs',(req,res) =>{
  // truncateFile(__dirname + "/views/logs/transactionEvents.log");
  fs.readFile(__dirname + "/views/logs/transactionEvents.log", 'utf8', function(err, data){
    res.render('logs/logPage',{ data : data });
    // Display the file content
    console.log(data);
  });
})

app.get('/disputelogs',(req,res) =>{
  // truncateFile(__dirname + "/views/logs/disputeEvents.log");
  fs.readFile(__dirname + "/views/logs/disputeEvents.log", 'utf8', function(err, data){
    res.render('logs/logPage',{ data : data });
    // Display the file content
    console.log(data);
  });
})

app.get('/payoutlogs',(req,res) =>{
  // truncateFile(__dirname + "/views/logs/payoutEvents.log");
  fs.readFile(__dirname + "/views/logs/payoutEvents.log", 'utf8', function(err, data){
    res.render('logs/logPage',{ data : data });
    // Display the file content
    console.log(data);
  });
})

app.get('/otherlogs',(req,res) =>{
  // truncateFile(__dirname + "/views/logs/otherEvents.log");
  fs.readFile(__dirname + "/views/logs/otherEvents.log", 'utf8', function(err, data){
    res.render('logs/logPage',{ data : data });
    // Display the file content
    console.log(data);
  });
})

//check if webhook is working
app.get('/adyen/notify',(req,res) =>{
  res.send('the webhook is working');
})

//googlepay page
app.get('/pm/googlepay',(req,res) =>{
  res.render('neteast-game-club/googlepay');
})

app.get('/googlepay-apionly', (req,res) =>{
  res.render('googlepayapionly');
})

app.get('/googlepay-component', (req, res) => {
  res.render('googlepaycomponent');
})

var payments = require("./routes/payments");
app.use(payments);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//miscellenious functions
function checkIfIsTransEvent(event){
  if(event='AUTHORISATION'||'CAPTURE'||'REFUND'){
    return true;
  }else{
    return false;
 }
};

function checkIfIsDisputeEvent(event){
  if(event='CHARGEBACK'||'NOTIFICATION_OF_CHARGEBACK'||'NOTIFICATION_OF_FRAUD'){
    return true;
  }else{
    return false;
 }
};

function checkIfIsPayoutEvent(event){
  if(event='PAYOUT_EXPIRE'||'PAYOUT_DECLINE'||'PAIDOUT_REVERSED'){
    return true;
  }else{
    return false;
 }
};

function writeToLogs(path, data){
          //write log files
          fs.writeFile(path, JSON.stringify(data, null, 4), function (err) {
            if (err) throw err;
            console.log('Webhook message has been saved to log file');
          });
}

function truncateFile(fileName){
  fs.readFile(fileName, 'utf8', function(err, data){
    if (err){
        throw err;
    }
    var linesCount = data.split("\n").length;
    var wantedLines = data.split("\n").slice(~240+1);//keep 240 lines
    fs.writeFile(fileName, wantedLines.join(), (err) => err && console.error(err));
});
}