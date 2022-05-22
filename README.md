# tw-copy

This repository houses a Javascript bookmarklet to make it easier to copy [Tripwire](https://tripwire.eve-apps.com/?system=Thera) signature data into [Thera Scan](https://therascan.info).

## Usage

To get started, copy the following code to your clipboard by clicking on the copy icon in the top-right of the code block:

```javascript
javascript:(function(){
    $.getScript('https://cdn.jsdelivr.net/gh/brownoxford/tw-copy@11e9eda/main.js')
})();
```

Next, right-click in your Chrome bookmark bar and select `Add Page...`. In the popup that opens, add your own name, and paste the copied javascript code into the `URL` field.

![Create a bookmark](resources/add-bookmark.png)

Open up [Tripwire](https://tripwire.eve-apps.com/?system=Thera) and click your new bookmark to add copy and paste buttons to the signature window.
