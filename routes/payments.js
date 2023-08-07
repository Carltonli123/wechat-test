var express = require("express");
var router = express.Router();
var request = require('request');
const dotenv = require('dotenv');
dotenv.config();

router.post("/payments", function(req,res){
    console.log('you called /payments');
    console.log("remember this body(backend):");
    console.log(req.body);


            var options = {
            'method': 'POST',
            'url': 'https://checkout-test.adyen.com/v70/payments',
            'headers': {
                'Content-Type': 'application/json',
                'X-API-Key': 'AQEyhmfxLorGaRxCw0m/n3Q5qf3VaY9UCJ1+XWZe9W27jmlZig5yljrb4hAKiRMRHKZD1gEQwV1bDb7kfNy1WIxIIkxgBw==-LkkZe9+JfR2vz39IxgEUX0nssD5NDktbGfH31I0GoM0=-L&GCzb9tnt#Z#jXm'
            },
            body: JSON.stringify(req.body)

            };
            request(options, function (error, response) {
            console.log('after the /payments call');

            if (error) throw new Error(error);
            
            console.log(JSON.parse(response.body));
            res.send(response.body);
            });

});

module.exports = router;