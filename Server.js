const express = require('express');
const cors = require('cors');
const app = express();
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const filter = new Filter()

const db = monk('localhost/thoughts');

const vals = db.get('vals');


app.use(cors());
app.use(express.json())


function isValid(d){
    return d.name && d.name.toString().trim() !== '' && d.name.toString().trim().length <= 50 &&
    d.content && d.content.toString().trim() !== '' && d.content.toString().trim().length <= 140;
}
app.get('/',(req,res)=>{
    res.json({
        message: "penny for your thoughts"
    });
});

app.get('/thoughts',(req,res)=>{
    vals
    .find()
    .then(vals =>{
        res.json(vals)
    })
});

app.post('/val',(req,res)=>{
    if(isValid(req.body)){

    const val = {
        name: filter.clean(req.body.name.toString()),
        content: filter.clean(req.body.content.toString()),
        createDate: new Date()
    };

    vals
    .insert(val)
    
    res.json(val);
    
    
}
    else {
        res.status(422);
        res.json({
          message: 'Hey! Name and Content are required! Name cannot be longer than 50 characters. Content cannot be longer than 140 characters.'
        });
}
});
app.use(rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 2
  }));

app.listen(5000, ()=>{
    console.log('listening on http://localhost:5000');
});