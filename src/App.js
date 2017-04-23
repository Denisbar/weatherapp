import React from 'react';
import $ from 'jquery';
import CityListApp from './CityListApp';

var tempConvert = 273;

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

class App extends React.Component {
    constructor(){
    super();
        this.state = {
            weather: [],
            sys: [],
            main: [],
            cityName: 'Odessa'
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
            });
        }catch (e){
            alert(e.name);
        }
    }

    render() {
        const weather = this.state.weather.map((item) => {
            // if city not defined
            if(this.state.cityName === ''){
                this.setState({cityName: '-'});
                this.state.sys.country = '-';
                item['main'] = '-';
                item['description'] = '-';
                this.state.main.temp = 273;
                this.state.main.humidity = 0;
            }
            return <div className="weather-main">
                        <h1>City: {this.state.cityName.capitalizeFirstLetter()}, {this.state.sys.country}</h1>
                        <h3>Weather: {item['main']}</h3>
                        <h3>Description: {item['description']}</h3>
                    </div>
        });

        return <div id="layout-content" className="layout-content-wrapper">
                    <input type="text"
                    onChange={this.update.bind(this)}/>
                    <div className="panel-list">{ weather }</div>
                    <h3>Temp: {(this.state.main.temp - tempConvert).toFixed(1)}&deg;</h3>
                    <h3>Humidity: {this.state.main.humidity}%</h3>
                    <CityListApp
                        name={this.state.cityName.capitalizeFirstLetter()}
                        t={(this.state.main.temp - tempConvert).toFixed(1)} />
                </div>
    }
}

export default App;
