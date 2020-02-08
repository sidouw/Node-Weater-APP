const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./Utils')



const app = express()
const PublicPath = path.join(__dirname,'../Public')
const partialsdir = path.join(__dirname,'../templates/partials')
const viewsdir = path.join(__dirname,'../templates/views')


app.use(express.static(PublicPath))
app.set('views',viewsdir)
app.set('view engine','hbs')

hbs.registerPartials(partialsdir)

app.get('',(req,res)=>{

    res.render('index',{
        title:'Weather',
        name : "sidah"
    })

})
app.get('/about',(req,res)=>{

    res.render('About',{
        title:'About',
        name : "sidah"
    })

})
app.get('/help',(req,res)=>{

    res.render('Help',{
        title:'Help',
        paragraph : "Happiness in one pic :')"
    })

})
app.get('/weather',(req,res)=>{
    if( !req.query.adress){
        return res.send("Error you must provied an adress")
    }
    forecast.geocode(req.query.adress,(error,{Alt,Long,Location}={})=>{
        if (error) {
            return res.send({error})
        }else{
            forecast.Weather(Alt,Long,(error,{sumarry,currenttemp})=>{
                if (error) {
                    return res.send({error})
                }else {
                    res.send({
                        forecast: sumarry + "it is currently "+ currenttemp +" outside",
                        Location,
                        adress : req.query.adress
                    })
                }                
            })
        }
    })
})
app.get('/help/*',(req,res)=>{

    res.render('404page',{
        title:'404',
        errormsg:'Help article not found'
    })

})
app.get('*',(req,res)=>{

    res.render('404page',{
        title:'404',
        errormsg:'Page Not found'
    })

})

app.listen(3000,()=>{
    console.log("Server Started")
})