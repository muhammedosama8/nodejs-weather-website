const request = require("postman-request")

const weatherstack = (latitude, longitude, callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=9303edd98e40166ad5926f0b0d56da47&query="+ latitude+","+longitude
    request({url, json: true}, (error, data) => {
        if(error){
            callback('Can\'t get Weather', undefined)
        } else{
            callback(undefined, data.body)
        }
    })
}

module.exports= weatherstack