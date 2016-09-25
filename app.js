var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 3000;

mongoose.connect('mongodb://localhost/introtonode');
var contactSchema = mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});
var Contact = mongoose.model('contact', contactSchema);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
})
app.get('/about', function(req, res) {
    res.sendFile('public/about.html', { root: __dirname });
})
app.get('/contact', function(req, res) {
    res.sendFile('public/contact.html', { root: __dirname });
})
app.get('/products', function(req, res) {
    res.sendFile('public/products.html', { root: __dirname });
});
app.post('/api/newcontact', function(req, res) {
    var newContact = new Contact(req.body);
    newContact.save(function(err) {
        if (!err) {
            res.send('Contact saved');
        } else {
            console.log(err.toString());
        }
    })

})
app.listen(port, function(req, res) {
    console.log('server running on: ', port);
});