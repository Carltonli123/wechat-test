var express = require("express");
var router = express.Router();
var request = require('request');
const dotenv = require('dotenv');
dotenv.config();

router.post("/payments-live", function (req, res) {
    console.log('you called /payments-live');
    console.log("remember this body(backend):");
    console.log(req.body);


    var options = {
        'method': 'POST',
        'url': 'https://7cc06625ff786a83-TestCompany-checkout-live.adyenpayments.com/checkout/v70/payments',
        'headers': {
            'Content-Type': 'application/json',
            'X-API-Key': 'AQEthmfxJonHYxVEw0m/n3Q5qf3VfI5eGbBFVXVXyGG8WrqW0bsxH4w8q7WrwquWEMFdWw2+5HzctViMSCJMYAc=-KbwBH0iWPM5UtILAsCuA9o1RPKF8Fnagi4uX8euIbgU=-Aaw^}j4?#,{+^uxk'
        },
        body: JSON.stringify(req.body)

    };
    request(options, function (error, response) {
        console.log('after the /payments-live call');

        if (error) throw new Error(error);

        console.log(JSON.parse(response.body));
        res.send(response.body);
    });

});

module.exports = router;