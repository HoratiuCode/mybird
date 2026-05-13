# MyBird

MyBird is a Manifest V3 Chrome extension popup for saving keywords locally and searching live X/Twitter posts for those keywords.

## Features

- Add and delete saved keywords.
- Stores keywords with `chrome.storage.local`.
- Prevents empty and duplicate keywords.
- Searches X live results with properly encoded query strings.
- Includes a `Search all` button that combines saved keywords with `OR`.
- Uses vanilla HTML, CSS, and JavaScript only.

## Project Structure

```text
MyBird/
  manifest.json
  popup.html
  popup.css
  popup.js
  README.md
  icons/
    mybird.svg
```

## Setup

1. Open Chrome.
2. Go to `chrome://extensions`.
3. Turn on `Developer mode`.
4. Click `Load unpacked`.
5. Select the `MyBird` folder.
6. Pin the extension from the Chrome toolbar if you want quick access.

## Usage

1. Open the MyBird popup.
2. Type a keyword into `Add keyword`.
3. Click `Add`.
4. Click `Search` next to a keyword to open live X results in a new tab.
5. Click `Search all` to search all saved keywords combined with `OR`.

The search URL format is:

```text
https://x.com/search?q=<encoded keyword>&src=typed_query&f=live
```

## Notes

- Keywords are stored only on your local Chrome profile.
- The extension requests only the `storage` permission.
