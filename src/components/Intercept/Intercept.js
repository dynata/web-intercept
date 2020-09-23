import { PureComponent } from 'preact/compat';
import { h } from 'preact';
import DOMPurify from 'dompurify';
import './intercept.css';

class Intercept extends PureComponent {
    constructor(props) {
        super(props);
        let hidden = false;

        if (getCookie(this.props.cookieName) === "1") {
            hidden = true;
        }

        this.state = {
            hidden: hidden || this.props.hideOnLoad
        };
    }

    openSurvey() {
        window.open(this.props.surveyURL, "_blank");
    }

    show() {
        this.setState({hidden: false});
    }

    hide() {
        this.setState({hidden: true});
    }

    hideForLater() {
        var exp = new Date ();
        exp.setTime (exp.getTime() + (1000 * this.props.cookieTTL ));
        setCookie(this.props.cookieName, "1", exp);

        this.hide();
    }

    render() {
        if (this.state.hidden) {
            return <div></div>
        }

        return (
            <div className={"widget-container" + " widget-" + this.props.position}>
                <div className="widget-close">
                    <button onClick={() => this.hide()}>X</button>
                </div>

                { !this.props.logo ||
                    <img className="widget-logo" src={this.props.logo}></img>
                }
                
                <h3>{this.props.callToActionHeader}</h3>
                <button className="widget-cta-button" onClick={() => this.openSurvey()}>
                    {this.props.callToActionButtonText}
                </button>

                <h5 onClick={() => this.hideForLater()}>{this.props.deferText}</h5>

                {
                    this.props.allowHTML ? 
                    <div className="widget-footer" dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(this.props.footerText)
                    }} /> :
                    <div className="widget-footer">{this.props.footerText}</div>
                }
                
            </div>
        )
    }
};

var getCookie = function (name) {
	const value = "; " + document.cookie;
	const parts = value.split("; " + name + "=");
	if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
};

var setCookie = function (name, value, expires) {
    if (!expires) {
        expires = new Date();
    }
    document.cookie = name + "=" + escape (value) + "; expires=" + expires.toGMTString() +  "; path=/";
}

export default Intercept;