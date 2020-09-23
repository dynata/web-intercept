import { h, render, createRef } from 'preact';
import Intercept from './components/Intercept/Intercept';
import Config from './config';

const widgetName = Config.name;
const widgetConfigName = widgetName + 'Config';
const defaultconfig = {
    logo: "https://github.com/dynata/web-intercept/blob/master/assets/horizontal%402x.png?raw=true",
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
        let data = JSON.parse(rawData);

        window[widgetName] = data.name;

        let placeholder = {};
        (placeholder.q = []).push(['init', data.config]);

        window[window[widgetName]] = placeholder;
    }


    let placeholder = window[window[widgetName]];

    window[window[widgetName]] = apiHandler;
    window[widgetConfigName] = defaultconfig;

    if (placeholder) {
        let queue = placeholder.q;
        if (queue) {
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

    switch (api) {

        case 'init':
            config = Object.assign({}, config, params);
            window[widgetConfigName] = config;

            container = document.createElement('div');
            container.id = 'dyn-cmix-container';
            document.body.appendChild(container);
                
            widgetComponent = createRef();
            render(
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