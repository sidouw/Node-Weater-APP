const request = require('request')


const Weather=(alt,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/70e50c817d48db88e085f50093763263/'+alt+','+long+'?units=si'
    request({url,json:true},(error,{body})=>{

        if (error) {
            callback('Unable to connect to web server',undefined)
        }else if(body.error){
            callback('Wrong Corrdinates , please try again',undefined)
        }else{
            callback(undefined,{
                currenttemp:body.currently.temperature,
                rainprob:body.currently.precipProbability,
                sumarry:body.daily.data[0].summary,
                maxtemp:body.daily.data[0].temperatureHigh,
                mintemp:body.daily.data[0].temperatureLow
            })
        }
        
    })
}

const geocode = (adress,callback)=>{
const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?access_token=pk.eyJ1Ijoic2lkb3V3IiwiYSI6ImNrNjhlM2o5cjAzeGczbXBtc21ia21wYnUifQ.D4oF_WIvlWhdKa4r98kEGg&limit=1'
request({url,json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect to web server',undefined)
    }else if(body.features.length==0){
        callback('Unable to find Location , please try again',undefined)
    }else{
        callback(undefined,{
            Alt : body.features[0].center[1],
            Long : body.features[0].center[0],
            Location : body.features[0].place_name
            })
        }
    })
}
module.exports={
    Weather : Weather,
    geocode : geocode

}