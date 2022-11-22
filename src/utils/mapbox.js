const request = require("postman-request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoibXVoYW1tZWRvc2FtYSIsImEiOiJjbGFwbnFmZDUxYWs3M3F0YXV4aTQzcWtuIn0.w2NH9VCiduMZv0JoJ035RQ"
    request({url, json: true}, (error, data) => {
        if(error){
            callback('Can\'t connect with Server', undefined)
        } else if(data.body.features.length == 0){
            callback("Can\'t find location", undefined)
        }
        else {
            callback(undefined, {
                latitude: data.body.features[0].center[1],
                longitude: data.body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode