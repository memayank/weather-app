const request = require('request')

const weather = (longitude, latitude, callback) => {

    const requestUrl = 'https://api.darksky.net/forecast/7efae3a07dae4b91615dcb3de7980b62/'+longitude+','+latitude+'?units=si'


    request({
        url: requestUrl,
        json: true
    }, (error, response) => {

        if (error) {
            callback("Unable to connect", undefined)
        } else if (response.body.error) {
            console.log(response.body.error)
            console.log(requestUrl)
            callback("Unable to find location data", undefined)
        } else {
            callback(undefined, {
                Temprature: response.body.currently.temperature,
                Precipitation: response.body.currently.precipProbability
            })
        }
    })

}

module.exports = weather