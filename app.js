const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const res = require("express/lib/response");
mongoose.connect('mongodb://localhost/contactDance');
const bodyparser = require('body-parser');
//mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});

var Contact = mongoose.model('Contact',contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/Contact', (req, res)=>{
    
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been send to data base ");
}).catch(()=>{
    res.status(400).send("Item was not saved to the database ")
})
    //res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});