const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=7287eb5ec1f6436ebe963000222103&q='+latitude+','+longitude+'&aqi=no' 

    request({url:url,json:true},(error,response) => {
        if(error){
            callback('Unable to connect to weather sercvice!',undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,'It is currently '+ response.body.current.temp_f + ' degrees out. There is a ' + response.body.current.cloud + '% chance of rain.')
        }
    })
}

module.exports = forecast