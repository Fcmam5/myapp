const express = require('express')
const http= require('http')
const app = express()




app.get('/', (req, res) => res.send('Hello World!'))

app.get('/ghali/', (req, res) => res.send('Hello Ghali'))

app.get('/meteo/:city/', function (req, res) {
	console.log("Notre affichage : "+req.params['city'])
	var request = http.get("http://samples.openweathermap.org/data/2.5/weather?q=" + req.params['city'] + "&appid=a855f71d20058f793c0bd93b47e8ad74" ,function(response){
	
	var body ="";

	response.on('data', function (chunk){
		body += chunk;
	});

	response.on('end', function(){
	if (response.statusCode=== 200) {
		try{
		var data_meteo = JSON.parse(body);
		res.json({
			'city' : req.params['city'],
			'humidity' : data_meteo.main.humidity,
			'temp' : (data_meteo.main.temp-273.15).toFixed(2) 

		})

	}catch(error){
		res.send(response.statusCode + error.message);
	}
	}else {
		res.json({ message: "page introuvable !"})
	}
	});
});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));