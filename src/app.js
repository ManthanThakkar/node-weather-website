const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs') //handlebars module 
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//static() is a middleware for accessing a html/css file   
// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('',{
        title:'Weather',
        name:'Andrew Mead'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name:'Andrew Mead'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help',
        name:'Andrew Mead'
    })
})

// app.get('',(req,res) => {
//     res.send('<h1>Weather</h1>') 
// })

// app.get('/help',(req,res) => {
//     res.send([{
//         name:'Manthan'
//     },{
//         name:'Manan'
//     }])
// })

// app.get('/about',(req,res) => {
//     res.send('<h1>About</h1>')
// })

//Query String [folder 8 v-2]
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }

    // here ={} means use destructuring (default function parameter)
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => { //we can import forecast() method and we typr localhost:3000/weather?address=boston in browser
         if(error){
             return res.send({error})
         }

         forecast(latitude,longitude,(error,forecastData) => {
             if(error){
                 return res.send({error})
             }

             res.send({
                 forecast:forecastData,
                 location,
                 address:req.query.address
             })
         })
    })

    // res.send({
    //     forecast:'It is snowing',
    //     location:'Philadelphia',
    //     address:req.query.address //here when we pass localhost:3000?address=india then this line prints address:india
    // })
})

//Query String [folder 8 v-2]
app.get('/products',(req,res) => { //here we have to type in browserlocalhost:3000/products?search = game
    if(!req.query.search){
       return res.send({     //here return statement return the message if we don't search anything as like above link
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search) //req.query.search is print the search result like here game
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Manthan',
        errorMessage:'Help article not found.'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Manthan',
        errorMessage:'Page not found.'
    })
})

app.listen(3000,() => {
    console.log('Server is up on port 3000.');
})