import React from 'react';
import CityWeather from './cityWeather';
import '../css/CityWeatherList.css';

class CityWeatherList extends React.Component {

    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove(cityId) {
        this.props.onRemove(cityId);
    }

    render() {
        var self = this;
        return (
            <div className="row city-weather-list">
                {
                    this.props.cities.map(function (item) {
                        return <CityWeather key={item.id} city={item} onRemove={self.handleRemove}/>;
                    })
                }
            </div>
        );
    }
}

export default CityWeatherList;

