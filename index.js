require('dotenv').config();
const express= require("express")
const https= require("https");
const bodyParser= require("body-parser");
const { log } = require('util');
const app= express();


app.set('view engine','ejs'); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    
    let icon = "";
    let weather = [];
    let forecast = [];  
    
    const url="https://api.openweathermap.org/data/2.5/weather?q=coimbatore&appid="+process.env.API_KEY+"&units=metric";
    const url2="https://api.openweathermap.org/data/2.5/forecast?q=coimbatore&appid="+process.env.API_KEY+"&units=metric";
    
    https.get(url, function(response){ 
        response.on("data", async (data)=>{
            const weatherData= JSON.parse(data);
            // console.log(weatherData);
            icon= "https://openweathermap.org/img/wn/"+ weatherData.weather[0].icon+".png";
            weather= [weatherData.name, weatherData.weather[0].description, weatherData.main.temp, weatherData.main.feels_like, weatherData.main.humidity, weatherData.wind.speed, weatherData.wind.deg];
    
    })
    })
    
    https.get(url2, function(response) {
        let rawData = '';
      
        response.on('data', function(chunk) {
          rawData += chunk;
        });
      
        response.on('end', function() {
          try {
            const weatherData = JSON.parse(rawData);

            for (let i = 0; i < weatherData.list.length; i++) {
              forecast.push([
                weatherData.list[i].dt_txt,
                "https://openweathermap.org/img/wn/"+ weatherData.list[i].weather[0].icon + ".png",
                [weatherData.list[i].main.temp, weatherData.list[i].main.feels_like, weatherData.list[i].main.humidity, weatherData.list[i].wind.speed, weatherData.list[i].wind.deg],
                weatherData.list[i].weather[0].description,
              ]);
            }
            res.render("index", 
            {
                displayProperty: "block" ,
                weatherImg: icon, 
                weatherData: weather, 
                errorMessage: "", 
                forecast: forecast
            });
            // console.log(forecast);
          } catch (error) {
            console.error('Error parsing JSON:', error.message);
          }
        });
      
      }).on('error', function(error) {
        console.error('Request error:', error.message);
    });
    
    
})

app.post("/geolocation/:latitude/:longitude", function(req, res){
    const latitude = req.params.latitude;
    const longitude = req.params.longitude;
    // console.log(latitude, longitude);
    let icon = "";
    let weather = [];
    let forecast = [];  

    const url="https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+process.env.API_KEY+"&units=metric";
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}&units=metric`;


    https.get(url, function(response){ 
        response.on("data", async (data)=>{
            const weatherData= JSON.parse(data);
            // console.log(weatherData);
            icon= "https://openweathermap.org/img/wn/"+ weatherData.weather[0].icon+".png";
            weather= [weatherData.name, weatherData.weather[0].description, weatherData.main.temp, weatherData.main.feels_like, weatherData.main.humidity, weatherData.wind.speed, weatherData.wind.deg];
    
    })
    })
    
    https.get(url2, function(response) {
        let rawData = '';
      
        response.on('data', function(chunk) {
          rawData += chunk;
        });
      
        response.on('end', function() {
          try {
            const weatherData = JSON.parse(rawData);

            for (let i = 0; i < weatherData.list.length; i++) {
              forecast.push([
                weatherData.list[i].dt_txt,
                "https://openweathermap.org/img/wn/"+ weatherData.list[i].weather[0].icon + ".png",
                [weatherData.list[i].main.temp, weatherData.list[i].main.feels_like, weatherData.list[i].main.humidity, weatherData.list[i].wind.speed, weatherData.list[i].wind.deg],
                weatherData.list[i].weather[0].description,
              ]);
            }
            res.status(200).json(
              {
                  displayProperty: "block" ,
                  weatherImg: icon, 
                  weatherData: weather,
                  errorMessage: "",
                  forecast: forecast
              }
            );
            // console.log(forecast);
          } catch (error) {
            console.error('Error parsing JSON:', error.message);
          }
        });
      
      }).on('error', function(error) {
        console.error('Request error:', error.message);
    });
    
    
});

app.post("/",function(req,res){
    const city= req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city +"&appid="+process.env.API_KEY+"&units=metric";
    const url2 = "https://api.openweathermap.org/data/2.5/forecast?q="+city +"&appid="+process.env.API_KEY+"&units=metric";

    let icon = "";
    let weather = [];
    let forecast = [];  

    https.get(url,function(response){ 
        response.on("data",function(data){
            // if respone is not found then display error
            const weatherData= JSON.parse(data);
            if(weatherData.cod !=200){
                res.render("index", {
                    displayProperty: "none",
                    weatherImg: "", 
                    weatherData: "",
                    errorMessage: "City not found",
                    forecast: []
                });
            }
            else{
                icon= "https://openweathermap.org/img/wn/"+ weatherData.weather[0].icon+".png";
                weather= [weatherData.name, weatherData.weather[0].description, weatherData.main.temp, weatherData.main.feels_like, weatherData.main.humidity, weatherData.wind.speed, weatherData.wind.deg];
            }
        })
    });

    
    https.get(url2, function(response) {
        let rawData = '';
      
        response.on('data', function(chunk) {
          rawData += chunk;
        });
      
        response.on('end', function() {
          try {
            const weatherData = JSON.parse(rawData);

            for (let i = 0; i < weatherData.list.length; i++) {
              forecast.push([
                weatherData.list[i].dt_txt,
                "https://openweathermap.org/img/wn/"+ weatherData.list[i].weather[0].icon + ".png",
                [weatherData.list[i].main.temp, weatherData.list[i].main.feels_like, weatherData.list[i].main.humidity, weatherData.list[i].wind.speed, weatherData.list[i].wind.deg],
                weatherData.list[i].weather[0].description,
              ]);
            }
            res.render("index", 
            {
                displayProperty: "block" ,
                weatherImg: icon,
                weatherData: weather,
                errorMessage: "",
                forecast: forecast
            });
            // console.log(forecast);
          } catch (error) {
            console.error('Error parsing JSON:', error.message);
          }
        });
      
      }).on('error', function(error) {
        console.error('Request error:', error.message);
    });
});


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is runninng on port 3000");
});