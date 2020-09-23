# Web Intercept

This is a WIP.

### Usage
You can synchronously or asynchronously add the widget tag.

```js
(function (w, d, s, o, f, js, fjs) {
            w['Intercept'] = o; w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
            js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
            js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
        }(window, document, 'script', 'w1', './widget.js'));
```

Initialize the popup using `init` with a configuration object:

```js
w1('init', { 
    surveyURL: 'https://surveys.cmix.com/token/something',  //replace with an actual survey link
    position: 'top-left' 
});
```

### Config

Here's what the default configuration looks like:

```js
{
    logo: "https://zeroheight-uploads.s3-accelerate.amazonaws.",
    surveyURL: "https://www.google.com",
    position: "bottom-right",
    footerText: "This study is for research purposes only and your reponses will remain confidential. At no time will you be asked to purchase anything, and no one will contact you as a result of your participation.",
    callToActionHeader: "How was your experience?",
    callToActionButtonText: "Take a Quick Survey",
    deferText: "Take survey later",
    hideOnLoad: false
}
```


| Config  Field | Description   |
| ------------- | ------------  |
| logo  | (string) URL for the logo to display  |
| surveyURL | (string) URL for the CMix Survey  |
| position | (string/enum) Possible values: bottom-right, top-right, top-left, bottom-left  |
| footerText | (string) Text to display in the footer  |
| callToActionHeader | (string) This is the primary heading before the button  |
| callToActionButtonText | (string) Button Text for Survey call to action  |
| deferText | (string) Text for link to hide the survey  |
| hideOnLoad | (bool) Use this if you want to control when to show the popup |


### Controlling when the popup shows up

If you're using the `hideOnLoad` configuration, the popup will not immediately display on load. The popup component can be triggered by passing a 'show' message to the component.

Example using a button click event to display the popup:
```js
<div><button onClick="javascript: w1('show');">Show</button></div>
```


### Example


```html
<html>

<head>
    <title>Demo</title>
</head>

<body>
    <h1>Web Intercept Demo</h1>
    
    <script>
        (function (w, d, s, o, f, js, fjs) {
            w['Intercept'] = o; w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
            js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
            js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
        }(window, document, 'script', 'w1', './widget.js'));
        w1('init', { 
            surveyURL: 'https://www.google.com', 
            position: 'top-left' 
        });
    </script>

</body>

</html>
```