# MyBird

MyBird is a small Chrome extension for saving keywords locally and using them to search live X/Twitter posts.

The extension lives in the `MyBird/` folder and uses Manifest V3 with vanilla HTML, CSS, and JavaScript.

## Features

- Add keywords from the popup.
- Save keywords with `chrome.storage.local`.
- Prevent empty and duplicate keywords.
- Delete saved keywords.
- Search one keyword on X live results.
- Search all saved keywords combined with `OR`.
- Clean orange, white, and black popup interface.

## Repository Structure

```text
.
  LICENSE
  README.md
  MyBird/
    manifest.json
    popup.html
    popup.css
    popup.js
    README.md
    icons/
      mybird.svg
```

## Load in Chrome

1. Open Chrome.
2. Go to `chrome://extensions`.
3. Enable `Developer mode`.
4. Click `Load unpacked`.
5. Select this folder:

```text
/Users/horatiubudai/ceo/Hacker/mybrain/mybrain/MyBird
```

Chrome should then install the unpacked MyBird extension.

## Usage

1. Click the MyBird extension icon.
2. Enter a keyword in the `Add keyword` field.
3. Click `Add`.
4. Use `Search` next to any keyword to open live X results in a new tab.
5. Use `Search all` to search all saved keywords with an `OR` query.

Searches open URLs in this format:

```text
https://x.com/search?q=<encoded keyword>&src=typed_query&f=live
```

## Development Notes

- No build step is required.
- No npm dependencies are required.
- The extension requests only the `storage` permission.
- Keywords are stored locally in the current Chrome profile.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
