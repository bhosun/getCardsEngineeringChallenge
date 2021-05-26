const express = require("express");
const fetch = require("node-fetch");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/calculatePrice", async(req, res) => {
    let { type, margin, exchangeRate } = req.body;
    let rate, answer;
    try {
        fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
        .then(res => res.json())
        .then(json => {
            rate = json["bpi"]["USD"]["rate"];
            if(type === "buy") {
                answer = parseFloat(rate.replace(/,/g, '')) + parseFloat(margin);
            } else {
                answer = parseFloat(rate.replace(/,/g, '')) + parseFloat(margin);
            }
            if(exchangeRate === "USD") {
                return res.status(200).json(`a bitcoin is ${answer.toFixed(3)} dollars today`);
            } else {
                return res.status(200).json(`a bitcoin is ${(answer/0.0024).toFixed(3)} naira today`);
            }
        });
    } catch(e) {
        console.log(e);
    }
});

app.listen('3000', () => 
    console.log('app running on port 3000')
);