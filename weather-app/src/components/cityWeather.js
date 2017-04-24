import React from 'react';
import '../css/CityWeather.css';

class CityWeather extends React.Component {

    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove() {
        this.props.onRemove(this.props.city.id);
    }

    render() {
        return (
            <div className="col-xs-12  col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3 city-weather">
                <ul>
                    <li><p><strong>City: {this.props.city.name}, {this.props.city.sys.country}</strong></p></li>
                    <li><p>weather: {this.props.city.weather[0].main}</p></li>
                    <li><p>temp: {this.props.city.main.temp}C</p></li>
                    <li><p>pressure: {this.props.city.main.pressure}hPa</p></li>
                    <li><p>humidity: {this.props.city.main.humidity}%</p></li>
                </ul>
                <button className="btn btn-warning" onClick={this.handleRemove}>Delete</button>
            </div>
        );
    }
}

export default CityWeather;
