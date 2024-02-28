# Chrome Extension Multi iframe Repro

Demos a Chrome extension using `chrome.devtools.inspectedWindow.eval` to inspect
multiple iframes on the same page with the same URL.

## Reproduction

1.  Install the repository with `npm ci`.
1.  Install the DevTools extension by visiting `chrome://extensions` and loading
    the "unpacked" extension at [`devtools/`](/devtools/).
1.  Start the application by running `npm start`.
1.  Open http://localhost:8080/.
1.  Open DevTools and switch to "Multi-iframe Test".
1.  Click "Run"
1.  Observe Console output.

## Output

```
1. iframe: I am iframe #1
2. duplicate URL: I am iframe #1
3. query parameter: I am iframe #3
5. soft-navigation: I am iframe #5
```

Note: 5. is only printed if the application is loaded first, and then DevTools is
opened. If DevTools is opened before the app, then 5. is *not* printed.
