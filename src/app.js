const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const port = process.env.PORT || 3000
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Routes
app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Huraira Hussain'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title : 'About me',
        name : 'Huraira Hussain'
    })
})

app.get('/help' , (req , res) =>{
    res.render('help', {
        title : 'Help Page',
        message : 'This is a help message',
        name : 'Huraira Hussain'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address is required to fetch the weather'
        })
    }
    
    geocode(req.query.address , (error, {latitude,longitude, location} = {})=>{
        if(error){
            return res.send(error)
        }else{
            weather({latitude,longitude} , (error, forecastdata)=>{
                if(error){
                    return res.send(error)
                }else{
                    return res.send({
                        location,
                        Forecast : forecastdata,
                        address: req.query.address
                    })
                }
            })
        }

    })
})


app.get('/help/*', (req, res) =>{
     res.render('404',{
         title: '404',
         errorMessage: 'Help Document not Found',
         name : 'Huraira Hussain'
     })
})

app.get('*',(req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Page Not Found',
        name : 'Huraira Hussain'
    })
})

app.listen(port, ()=> {
    console.log('Server is running on port ' + port)
})

