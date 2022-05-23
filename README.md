# tw-copy

This repository houses a Javascript bookmarklet to make it easier to copy [Tripwire](https://tripwire.eve-apps.com/?system=Thera) signature to and from [Thera Scan](https://therascan.info) by adding the following functionality:

- Adds a "copy" link in the signatures widget that will copy all existing signatures to the clipboard so that they can be pasted into Thera Scan.
- Adds a "paste" link in the signatures widget that handles creating a new signature using copied data from Thera Scan.
- Disables "Follow my in-game system" functionality
- Disables "Auto-Mapper" functionality
- Activates the corporate "EvE-Scout" mask
- Sets the currently viewed system to "Thera"

## Usage

To get started, copy the following code to your clipboard by clicking on the copy icon in the top-right of the code block:

```javascript
javascript:(function(){
    $.getScript('https://cdn.jsdelivr.net/gh/brownoxford/tw-copy@v0.0.2/main.js')
})();
```

Next, right-click in your Chrome bookmark bar and select `Add Page...`. In the popup that opens, add your own name, and paste the copied javascript code into the `URL` field.

![Create a bookmark](resources/add-bookmark.png)

Open up [Tripwire](https://tripwire.eve-apps.com/?system=Thera), log in, and click your new bookmark to configure your current Tripwire session for Thera scanning.
