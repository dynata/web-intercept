import React from 'react';
// import ReactDOM from 'react-dom';
import Config from '../../config';
import './intercept.css';

const widgetName = Config.name;

class Intercept extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    openSurvey() {
        window.open(this.props.surveyURL, "_blank");
    }

    position() {

    }

    render() {
        return (
            <div className={"widget-container" + " widget-" + this.props.position}>
                <img className="widget-logo" src={this.props.logo}></img>

                <h3>{this.props.callToActionHeader}</h3>
                <button className="widget-cta-button" onClick={() => this.openSurvey()}>
                    {this.props.callToActionButtonText}
                </button>


                <h5>{this.props.deferText}</h5>
                <div className="widget-footer">{this.props.footerText}</div>
            </div>
        )
    }
};

export default Intercept;