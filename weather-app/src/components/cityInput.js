import React from 'react';
import '../css/CityInput.css';

class CityInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cityName: '' };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event) {
        event.preventDefault();
        this.props.handleInput(this.state.cityName);
        this.setState({ cityName: '' });
    }

    handleUpdate(event) {
        this.setState({ cityName: event.target.value });
    }

    render() {
        return (
            <div className="row add-city-weather">
                <input className="input-small" type="text" placeholder='Enter city name' onChange={this.handleUpdate} value={this.state.cityName}/>
                <button className="btn btn-info" onClick={this.handleInput}>Add City</button>
            </div>
        );
    }
}

export default CityInput;

