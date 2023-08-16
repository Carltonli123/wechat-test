var express = require("express");
var router = express.Router();
var request = require('request');
const dotenv = require('dotenv');
dotenv.config();

router.post("/session", function (req, res) {

    var options = {
        'method': 'POST',
        'url': 'https://7cc06625ff786a83-TestCompany-checkout-live.adyenpayments.com/checkout/v69/sessions',
        'headers': {
            'Content-Type': 'application/json',
            'X-API-Key': 'AQEthmfxJonHYxVEw0m/n3Q5qf3VfI5eGbBFVXVXyGG8WrqW0bsxH4w8q7WrwquWEMFdWw2+5HzctViMSCJMYAc=-KbwBH0iWPM5UtILAsCuA9o1RPKF8Fnagi4uX8euIbgU=-Aaw^}j4?#,{+^uxk'
        },
        body: JSON.stringify(req.body)

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        var result = JSON.parse(response.body);
        console.log(result);
        res.send(response.body);
    });

});

module.exports = router;