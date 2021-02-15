'use strict' ;

const { equal } = require('assert');
const Readline = require('readline'); // for including readline module in your application
const rl = Readline.createInterface ({ // Creates an Interface object

	input: process.stdin,
	output: process.stdout,
	terminal: false
});
const matcher = require ('./matcher') ; // to use the matcher module here
const weather = require ("./weather"); // to use the weather module here
const forecast = require ("./forecast"); // to use the forecast module

rl.setPrompt('> ');
rl.prompt();
rl.on('line', reply => {
	console.log('Human:' ,reply);
	matcher (reply , cb => {
	// do it by yourself
	//console.log('Intent:',cb.intent)
	switch(cb.intent){
		case 'Hello':
			console.log('BOT: Hello and welcome to chatbot!');
			//console.log('Entities:',cb.entities.greeting)
			break;
		case 'Exit':
			console.log('BOT: Bye Bye!')
			process.exit(0)
		case 'Current Weather':
			//console.log('Entities(City):',cb.entities.city);
		    weather(cb.entities.city).then(async result=> {
				var weaDesc = result.weather[0].description
				var city = result.name
				var countries = require("i18n-iso-countries");
				var country = result.sys.country
				var con = countries.getName(country, "en", {select: "official"})
				var temp= result.main.temp
				console.log("BOT: It is",weaDesc.red,"in",city.green,",",con.cyan,"with",temp,"degrees Celsius")
				}
			)
			.catch(async error => {
				console.log(error.response.data.message.red)
			  });
			break;
		case 'Weather Forecast':
			//console.log('Entities:',cb.entities.weather,cb.entities.city,cb.entities.time);
			forecast(cb.entities.weather,cb.entities.city,cb.entities.time).then(result=> {
				var city = result.city_name
				var countries = require("i18n-iso-countries");
				var country = result.country_code
				var weatherCond=cb.entities.weather
				var time=cb.entities.time
				var con = countries.getName(country, "en", {select: "official"})
					if(time.toLowerCase()==="today"){
						var weaCon = result.data[0].weather.description
						var temp = result.data[0].temp
						var date = result.data[0].datetime
						if(weatherCond==="cold" && temp<15.0){
							console.log("BOT: Yes, it's cold!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else if((weatherCond.includes("sun")&&weaCon.toLowerCase()==="clear sky") && temp>15.0){
							console.log("BOT: Yes, it's sunny!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else if(weatherCond==="hot" && temp>30.0){
							console.log("BOT: Yes, it's hot!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else if(weatherCond.includes("rain") && weaCon.includes("rain")){
							console.log("BOT: Yes, it's raining!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else if(weatherCond.includes("cloud") && weaCon.includes("cloud")){
							console.log("BOT: Yes, it's cloudy!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else{
							console.log("BOT: It's",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
					}
					else if(time.toLowerCase()==="tomorrow"){
						var weaCon = result.data[1].weather.description
						var temp = result.data[1].temp
						var date = result.data[1].datetime
						if(weatherCond==="cold" && temp<15.0){
							console.log("BOT: Yes, it'll be cold!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else if((weatherCond.includes("sun")&&weaCon.toLowerCase()==="clear sky") && temp>15.0){
							console.log("BOT: Yes, it'll be sunny!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else if(weatherCond==="hot" && temp>30.0){
							console.log("BOT: Yes, it's hot!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else if(weatherCond.includes("rain") && weaCon.includes("rain")){
							console.log("BOT: Yes, it'll be raining!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else if(weatherCond.includes("cloud") && weaCon.includes("cloud")){
							console.log("BOT: Yes, it'll be cloudy!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else{
							console.log("BOT: It'll be",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						
					}
					else{
						var weaCon = result.data[2].weather.description
						var temp = result.data[2].temp
						var date = result.data[2].datetime
						if(weatherCond==="cold" && temp<15.0){
							console.log("BOT: Yes, it'll be cold!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else if((weatherCond.includes("sun")&&weaCon.toLowerCase()==="clear sky") && temp>15.0){
							console.log("BOT: Yes, it'll be sunny!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else if(weatherCond==="hot" && temp>30.0){
							console.log("BOT: Yes, it's hot!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else if(weatherCond.includes("rain") && weaCon.includes("rain")){
							console.log("BOT: Yes, it'll be raining!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else if(weatherCond.includes("cloud") && weaCon.includes("cloud")){
							console.log("BOT: Yes, it'll be cloudy!",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
						else{
							console.log("BOT: It'll be",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						}
					}
					
			})
			.catch(error => {
				console.log("BOT: ","Invalid input, couldn't get data...".red)
			  }); 
			break;
		case 'get weather':
			//console.log('The weather in Paris is 4 degrees...')
			//console.log('Entities:',cb.entities.city,',',cb.entities.time)
			forecast("0",cb.entities.city,cb.entities.time).then(result=> {
				var city = result.city_name
				var countries = require("i18n-iso-countries");
				var country = result.country_code
				var time=cb.entities.time
				var con = countries.getName(country, "en", {select: "official"})
					if(time.toLowerCase()==="today"){
						var weaCon = result.data[0].weather.description
						var temp = result.data[0].temp
						var date = result.data[0].datetime
						console.log("BOT: It's",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
					
					}
					else if(time.toLowerCase()==="tomorrow"){
						var weaCon = result.data[1].weather.description
						var temp = result.data[1].temp
						var date = result.data[1].datetime
						console.log("BOT: It'll be",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
						
					}
					else{
						var weaCon = result.data[2].weather.description
						var temp = result.data[2].temp
						var date = result.data[2].datetime
						console.log("BOT: It'll be",weaCon.red,"in",city.green,"(",con.yellow,")", time,"(",date.cyan,")","with temperature",temp,"°C")
					}
					
			})
			.catch(error => {
				console.log("BOT: ","Invalid input, couldn't get data...".red)
			  }); 
			break;
		default:
			console.log('No intent identified');
	}
	}) ;

	rl.prompt(); 
});
