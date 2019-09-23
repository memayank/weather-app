const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')


const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');
const port = process.env.PORT || 3000;

const app = express()

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Mayank sahu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mayank sahu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mayank sahu'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address is must"
        })
    }

    geocode(req.query.address, (error, data) => {

        if (error) {
            return res.send({
                error: "Unable to connnect"
            })
        }
        console.log(data)
        weather(data.latitude, data.longitude, (error, response) => {
            res.send({
                error: error,
                response: response
            })
        })
    })
})

//404 error page
app.get('*', (req, res) => {
    res.render('error404page', {
        title: "404",
        name: "Mayank Sahu"
    })

})

app.listen(port, () => {
    console.log("server started on port " + port)
});