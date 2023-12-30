const express=require('express');
const app=express();
const port=3001;
const path=require('path');
var bodyParser = require('body-parser');
const https=require('https');
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/',(req,res)=>{
        res.sendFile(path.join(__dirname,'index.html'));
})

app.post('/',(req,res)=>{
        const place=req.body.city;
        const Api='694fa586a643605dcb00fb3cfdc1a938';
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${Api}&units=metric`;
        https.get(url,(response)=>{
                response.on('data', (data) => {
                       const weatherData=JSON.parse(data);
                       const temp=weatherData.main.temp;
                       const description=weatherData.weather[0].description
                        res.write(`<h1>temp is ${temp}</h1>`)
                        res.write(`<p>description: ${description}</p>`)
                      });
                response.on('error',(error)=>{
                        console.log('error occured')
                })
        })


})


app.listen(port,(req,res)=>{
        console.log('connected successfully');
})