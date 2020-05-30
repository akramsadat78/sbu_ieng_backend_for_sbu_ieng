/* require */
const express = require('express')
const app = express()
const dotenv = require("dotenv");
dotenv.config();
const logger = require('morgan');
var cors = require('cors');
app.use(cors());
var items = require('./descriptor.json');
const PORT = process.env.PORT || 5000;

/* app.use */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* use for sending titles's forms for frontend */
app.get('/api/forms', function(req, res) {
    res.json(items);
})

/* use for sending details of forms for frontend */
app.get('/api/forms/:id', function(req, res) {

    var isThere = true;

    for (var i = 0; i < items.items.length; i++) {
        if (items.items[i].id === req.params.id) {
            isThere = false;
            res.json(items.items[i]);
        }
    }

    if (isThere) {
        res.json("there is not any id");
    }

})

/* use for getting information from frontend */
app.post('/getData', function(req, res) {

    const enteredForm = {
        nameField: req.body.nameField,
        valueNameField: req.body.valueNameField,
        valueNumberField: req.body.valueNumberField,
        valueDateField: req.body.valueDateField,
        numberField: req.body.numberField,
        dateField: req.body.dateField,
        selectedOptionText: req.body.selectedOptionText,
        selectedOptionLocation: req.body.selectedOptionLocation,
        selectText: req.body.selectText,
        selectLocation: req.body.selectLocation,
    };

    if (enteredForm.valueNameField != '') {
        console.log(enteredForm.nameField + ":" + enteredForm.valueNameField);
    }
    if (enteredForm.valueNumberField != '') {
        console.log(enteredForm.numberField + ":" + enteredForm.valueNumberField);
    }
    if (enteredForm.valueDateField != '') {
        console.log(enteredForm.dateField + ":" + enteredForm.valueDateField);
    }
    if (enteredForm.selectedOptionText != '') {
        console.log(enteredForm.selectText + ":" + enteredForm.selectedOptionText);
    }
    if (enteredForm.selectedOptionLocation != '') {
        console.log(enteredForm.selectLocation + ":" + enteredForm.selectedOptionLocation.lat + " , " + enteredForm.selectedOptionLocation.long);
    }

});

app.listen(PORT);