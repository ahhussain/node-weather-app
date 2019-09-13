const request = require('request')


const weatherforcast = ({latitude,longitude}, callback)=>{
    const url = 'https://api.darksky.net/forecast/073825ec0d67d73c0cd252d13fd6fb96/'+latitude+','+longitude+'?units=si'
    
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to the internet', undefined, undefined, undefined)
        }else if(body.error){
            callback('Unable to find the location from server', undefined,undefined,undefined)
        }else{
            
            
            callback(undefined ,{
                summary: body.daily.data[0]. summary,
                hightemp: body.daily.data[0].temperatureHigh,
                temprature : body.currently.temperature,
                prec: body.currently.precipProbability
            })
        }
    })


}

module.exports = weatherforcast