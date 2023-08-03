const express = require('express')
const app = express()
const port = 80

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello World! Welcome to Adyen\'s wechat portal! it will be modified today!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})