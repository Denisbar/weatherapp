import React from 'react';
import $ from 'jquery';
import CityListApp from './components/CityListApp';
import Sun from './components/Sun';
import WeekForecast from './components/WeekForecast';

let tempConvert = 273;

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

let fontWeatherParam = {
    fontSize: "16px",
    display: "flex",
    justifyContent: "space-between",
};
let descriptionStyle = {
    fontWeight: "bold",
};
let paramsDivWith = {
    width: "235px",
};

class App extends React.Component {
    constructor(){
    super();
        this.state = {
            weather: [],
            sys: [],
            main: [],
            cityName: 'Odessa',
            wind: [],
            cod: null,
            icon: '',
            id: null, 
        };
    }

    componentDidMount() {
        this.WeatherData();
    }
    // update data
    update( e ){
        this.setState({cityName: e.target.value}, () => {
            this.WeatherData(this.state.cityName);
        });
    }

    WeatherData(city = this.state.cityName){
        try {
            let apiKey = 'c24bda9c5812d6be82860b70c35d41a5';
            let url = 'http://api.openweathermap.org/data/2.5/weather?q=';
            let weatherURL = url + city + '&appid=' + apiKey;
            return $.getJSON(weatherURL).then((response) => {
                this.setState({weather: response.weather});
                this.setState({main: response.main});
                this.setState({sys: response.sys});
                this.setState({cod: response.cod});
                this.setState({icon: response.weather[0].icon});
                this.setState({id: response.weather[0].id});
                this.setState({wind: response.wind});
            });
        }catch (e){
            alert(e.name);
        }
    }

    render() {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes();
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June', 
            'July', 
            'August', 
            'September', 
            'October', 
            'November', 
            'December'
            ];
        let dateDay = today.getDate();
        // milisec to  time
        let sunrise = this.state.sys.sunrise;
        let sunset = this.state.sys.sunset;
        let dateSunrise = new Date(sunrise * 1000);
        let dateSunset = new Date(sunset * 1000);
        let strSunrise = '';
        let strSunset = '';

        if( ((dateSunset.getHours()) < 10) && ((dateSunset.getMinutes())) < 10 ) {
            strSunset += "0" + dateSunset.getHours() + ":" + "0" + dateSunset.getMinutes();
        }else{
            strSunset += dateSunset.getHours() + ":" + dateSunset.getMinutes();
        }
        if( ((dateSunrise.getHours()) < 10) && ((dateSunrise.getMinutes())) < 10 ) {
            strSunrise += "0" + dateSunrise.getHours() + ":" + "0" + dateSunrise.getMinutes();
        }else{
            strSunrise += dateSunrise.getHours() + ":" + dateSunrise.getMinutes();
        }
        const weather = this.state.weather.map((item) => {
            // if city not defined
            if(this.state.cityName === ''){
                this.setState({cityName: '-'});
                this.setState({sys:{country: '-'}});
                item['main'] = '-';
                item['description'] = '-';
                this.setState({main:{temp: '273'}});
                this.setState({main:{humidity:0}});
            }

            return <div className="weather-main" key={item.id}>
                        <h1 style={{fontWeight: "bold"}}>Weather in {this.state.cityName.capitalizeFirstLetter()}, {this.state.sys.country}</h1>
                        <div style={{float: "left"}}>
                            <Sun iconName={this.state.icon}/>  {/*my SUN is here*/}
                        </div>
                        <h3>{(this.state.main.temp - tempConvert).toFixed(1)} &deg;C</h3>
                        <div>{item['description'].capitalizeFirstLetter()}</div>
                        <h3 style={{fontSize: "18px", marginLeft: "50px"}}>{time} {months[today.getMonth()]} {dateDay}</h3>
                    </div>
        });

        return <div id="layout-content" className="layout-content-wrapper">
                    <input type="text" id="searchBox" className="form-control" placeholder="Type City Name For Searching"
                    onChange={this.update.bind(this)}/>
                    <div style={{float: "left"}}>
                        <div className="panel-list">{ weather }</div> {/*here we include weather var that above*/}
                        <div style={paramsDivWith}>
                            <div style={fontWeatherParam}><span style={descriptionStyle}>Humidity: </span>{this.state.main.humidity}%</div>
                            <div style={fontWeatherParam}><span style={descriptionStyle}>Pressure: </span>{this.state.main.pressure}hpa</div>
                            <div style={fontWeatherParam}><span style={descriptionStyle}>Wind speed: </span>{this.state.wind.speed} m/s</div>
                            <div style={fontWeatherParam}><span style={descriptionStyle}>Sunrise: </span>{strSunrise}</div>
                            <div style={fontWeatherParam}><span style={descriptionStyle}>Sunset: </span>{strSunset}</div>
                        </div>
                    <CityListApp
                        name={this.state.cityName.capitalizeFirstLetter()}
                        t={(this.state.main.temp - tempConvert).toFixed(1)} />
                    </div>
                    <WeekForecast cityNameProp={this.state.cityName} />
                </div>
    }
}

export default App;
