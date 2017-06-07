import React from 'react';
import $ from 'jquery';

let divStyle = {
    background: "rgba(51, 122, 183, 0.09)",
    padding: "20px",
    margin: "20px",
    float: "left",
    width: "200px",
};
let descriptionStyle = {
    fontWeight: "bold",
};
let conteinerSpace = {
    display: "flex",
    justifyContent: "space-between",
};
let container = {
  paddingLeft: "50",
};
let containerForWeekBlock = {
    paddingLeft: "320px",
    width: "1200px",
    background: "red",
};

class WeekForecast extends React.Component {
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    constructor(props) {
        super(props);
        this.state = {
            // Json data
            cityName: 'Odessa',
            city: [],
            list: [],
        };
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.weartherWeekForecast();
    }

    weartherWeekForecast(cityN = this.state.cityName) {
        let apiKey = 'c24bda9c5812d6be82860b70c35d41a5';
        let url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
        let weatherURL = url + cityN + '&appid=' + apiKey;
        return $.getJSON(weatherURL).then((response) => {
            this.setState({city: response.city});
            this.setState({list: response.list});
        });
    }

    update( e ) {
        e.preventDefault();
        let val = document.getElementById("searchBoxForecast").value; 
        this.setState({cityName: val});
        this.weartherWeekForecast(val);
    }

    render(){
        let url = "http://openweathermap.org/img/w/";
        let extention = ".png";
        return(
            <div>
                <h1 id="head" style={{marginRight: "40px", paddingBottom: "15px"}}>7 days weather forecast in {this.state.cityName}</h1>
                <div>
                    <div style={{marginLeft: "340px"}}>
                        <form style={{marginLeft: "150px"}}>
                            <input style={{float: "left", marginRight: "10px"}} type="text" id="searchBoxForecast" className="form-control" placeholder="Type City Name For Searching"/>
                            <button type="submit" onClick={this.update}>Search</button>
                        </form>
                    </div>
                    <div style={containerForWeekBlock}>
                        {this.state.list.map((item, i) => (
                            <div style={divStyle} key={item.id}>
                                <div style={descriptionStyle}>{this.days[i]}</div>
                                <div><img className="items" src={url + item.weather[0].icon + extention} /></div>
                                <div style={conteinerSpace}><span style={descriptionStyle}>Temp: </span>{(item.temp.day - 273).toFixed(1)} &deg;C</div>
                                <div style={conteinerSpace}><span style={descriptionStyle}>Pressure: </span>{item.pressure} hpa</div>
                                <div style={conteinerSpace}><span style={descriptionStyle}>Humidity: </span>{item.humidity}%</div>
                                <div style={conteinerSpace}><span style={descriptionStyle}>Description: </span>{item.weather[0].description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default WeekForecast;