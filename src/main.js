import React from 'react';
import ReactDOM from 'react-dom';
import Intercept from './components/Intercept/Intercept';
import Config from './config';

const widgetName = Config.name;
const widgetConfigName = widgetName + 'Config';
const defaultconfig = {
    logo: "./horizontal@2px.png",
    surveyURL: "https://www.google.com",
    position: "bottom-right",
    footerText: "This study is for research purposes only and your reponses will remain confidential. At no time will you be asked to purchase anything, and no one will contact you as a result of your participation.",
    callToActionHeader: "How was your experience?",
    callToActionButtonText: "Take a Quick Survey",
    deferText: "Take survey later",
    hideOnLoad: false
};

let widgetComponent = null;

function app(window) {
    if (!window[widgetName]) {
        let tag = document.getElementById(widgetName + '-Script');

        if (!tag) {
            throw Error(`Cannot find script tag with id {$widgetName}-Script`);
        }

        let rawData = tag.getAttribute('data-config');
        rawData = rawData.replace(/'/g, "\"");
        console.log(rawData);
        let data = JSON.parse(rawData);

        window[widgetName] = data.name;

        let placeholder = {};
        (placeholder.q = []).push(['init', data.config]);

        window[window[widgetName]] = placeholder;
    }


    let placeholder = window[window[widgetName]];

    // override temporary (until the app loaded) handler
    // for widget's API calls
    window[window[widgetName]] = apiHandler;
    window[widgetConfigName] = defaultconfig;

    if (placeholder) {
        console.log(`${widgetName} placeholder found`);

        let queue = placeholder.q;
        if (queue) {
            console.log(`${widgetName} placeholder queue found`);

            for (var i = 0; i < queue.length; i++) {
                apiHandler(queue[i][0], queue[i][1]);
            }
        }
    }
}

/**
    Method that handles all API calls
*/
function apiHandler(api, params) {
    if (!api) throw Error('API method required');
    api = api.toLowerCase();
    let config = window[widgetConfigName];
    let container = null;

    console.log(`Handling API call ${api}`, params, config);

    switch (api) {
        case 'init':
            config = Object.assign({}, config, params);
            window[widgetConfigName] = config;

            container = document.createElement('div');
            container.id = 'dyn-cmix-container';
            document.body.appendChild(container);
                
            widgetComponent = React.createRef();
            ReactDOM.render(
                <Intercept ref={widgetComponent} {...config}/>, 
                document.getElementById('dyn-cmix-container')
            );
            break;

        case 'show':
            widgetComponent.current.show();
            break;
        default:
            throw Error(`Method ${api} is not supported`);
    }
}

app(window);

export default app;