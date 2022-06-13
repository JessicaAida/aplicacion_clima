const express = require('express')
const request = require('request')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials', function(err) {});
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.render("index");
})

app.get('/detalleClima', (req, res) => {
    let url_api = "http://api.weatherstack.com/current?access_key=61cbe3cce72fc7a14506985f896213cb&query=" + req.query.address;
    request(url_api, (err, response, body) => {
        if (!err) {
            const users = JSON.parse(body);
            if (!users.error) {
                let city = users.location.name + ", " + users.location.country + ", " + users.location.region;
                let infoClima = "Temperature: " + users.current.temperature + "°c , Wind: " + users.current.wind_speed + " kmph, Precip: " + users.current.precip + " mm, Pressure: " + users.current.pressure + " mb, Humidity: " + users.current.humidity;
                let localtime = users.location.localtime;
                let img = users.current.weather_icons;
                res.send({
                        city,
                        infoClima,
                        localtime,
                        img
                    })
                    //res.send(users.location.name)
                    //res.render("index", { titulo: users });
            } else {
                let error = users.error.code;
                res.send({
                    error
                })
            }
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})