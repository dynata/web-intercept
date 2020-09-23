import React from 'react';
// import ReactDOM from 'react-dom';
import Config from '../../config';
import './intercept.css';

const widgetName = Config.name;

class Intercept extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        // this.state = {};
    }

    render() {
        return (
            <div className="widget-container">
                <img className="widget-logo" src={this.props.logo}></img>

                <h3>{this.props.callToActionHeader}</h3>
                <button className="widget-cta-button">{this.props.callToActionButtonText}</button>


                <h5>{this.props.deferText}</h5>
                <div className="widget-footer">{this.props.footerText}</div>
            </div>
        )
    }
};

export default Intercept;