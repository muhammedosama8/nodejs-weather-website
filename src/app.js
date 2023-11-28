const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/mapbox')
const weatherstack = require('./utils/weatherstack')
const port = process.env.PORT || 3000
const dir = path.join(__dirname, "../public")
const dirViews = path.join(__dirname,'../templates/views')
const hbsPath = path.join(__dirname,'../templates/partial')

app.use(express.static(dir))
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(hbsPath)


app.get('/getWeather', (req, res)=> {
    if(!req.query.location){
        return res.send({error: 'you shoud enter location'})
    }

    geocode(req.query.location, (error, {latitude, longitude}) => {
        if(error){
            return res.send({error})
        }

        weatherstack(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                temperature : forecastData.current.temperature,
                descriptions : forecastData.current.weather_descriptions[0]
            })
        })
    })
})



app.get('/', (req, res)=> {
    res.render('index', {title: 'Weather'})
})

app.get('/about', (req, res)=> {
    res.render('about', {title: 'About Me'})
})

app.get('*', (req, res)=> {
    res.render('notfound',{
        title: "404 error"
    })
})
app.listen(port, () => {
    console.log('Server Run!')
})
