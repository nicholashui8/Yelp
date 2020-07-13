'use strict';
/*
    This is the server
    This file isn't seen or sent to the user. We can authenticate API key safely here
*/
//importing express
const express = require('express');

const app = express();

//setting port number
app.listen(3000, () => console.log('listening at 3000!'));

app.use(express.static('public'));

//limits size of body request, needed to understand incoming JSON 
app.use(express.json({limit: '1mb'}));
//app.post recives data from user
//request contains all the information we have on the user
//response is the information we send back to the user
app.post('/api', (request, response) => {
    console.log(request.body);
    let lat = request.body.lat;
    let lon = request.body.lon;
    let term = request.body.term;
    let cost = request.body.cost;
    let rad = request.body.radius;
    //check how user wants data sorted
    let sortType = request.body.sort;

    const yelp = require('yelp-fusion');
    const client = yelp.client('AxlBBW-l1ZYoMhMgKIU7I242FMDe33DEpU_ULlXo3g-POX87QJ_3f4FMj3E8xaiKOQ3rAYKQNRsVQQhk_ZBvTzGlMgk0qgIB4obsVNF64tfiNnjrHiFGUASAl7_IXnYx');

    client.search({
    term: term,
    latitude: lat,
    longitude: lon,
    price: cost,
    radius: rad,
    limit: 15,
    sort_by: sortType,
    }).then(res => {
    
    for(let i = 0; i < 10; i++){
        console.log(res.jsonBody.businesses[i].name);
    }
    
    response.json(res);
    }).catch(e => {
    console.log(e);
    });
});


