const request = require('request')


const geocode = (address, callback) => {

    const searchUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGVtaXRlbWFpbGxpbmVuZXQiLCJhIjoiY2swYmNzdmJkMHQyaDNjbXFzdjkwbThpZiJ9.ACxVDa-iFGKSLQ_kMXBDqg'

    request({
        url: searchUrl,
        json: true
    }, (error, respose) => {

        if (error) {
            callback("unable to connect", undefined)
        } else if (respose.body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            // const longitude = respose.body.features[0].center[0]
            // const latitude = respose.body.features[0].center[1]
            // console.log(longitude + ' , ' + latitude)

            callback(undefined, {
                longitude: respose.body.features[0].center[0],
                latitude: respose.body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode