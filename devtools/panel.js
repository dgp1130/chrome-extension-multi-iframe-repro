document.querySelector('#run').addEventListener('click', () => { run(); });

function announceIframe(title) {
  return `console.log('${title}: I am iframe ' + new URL(window.location.href).hash);`;
}

async function run() {
  // Problem 1: Inspecting multiple iframes with the same URL.
  {
    // Inspect frame 1.
    await chrome.devtools.inspectedWindow.eval(
      announceIframe('1. iframe'),
      { frameURL: 'http://localhost:8080/iframe.html' },
    );
    // "1. iframe: I am frame #1" - Ok.

    // Inspect frame 2.
    await chrome.devtools.inspectedWindow.eval(
      announceIframe('2. duplicate URL'),
      { frameURL: 'http://localhost:8080/iframe.html' },
    );
    // "2. duplicate URL: I am frame #1" - Only targets the first matching iframe.
  }

  // Problem 2: Inspecting an iframe with a hash fragment.
  {
    // Inspect frame 3 with a query parameter.
    await chrome.devtools.inspectedWindow.eval(
      announceIframe('3. query parameter'),
      { frameURL: 'http://localhost:8080/iframe.html?id=3' },
    );
    // "3. query parameter: I am iframe #3" - Works.

    // Inspect frame 4 with hash fragment.
    await chrome.devtools.inspectedWindow.eval(
      announceIframe('4. hash fragment'),
      { frameURL: 'http://localhost:8080/iframe.html#3' },
    );
    // Does not print.
  }

  // Problem 3. Inspecting an iframe which soft-navigates.
  {
    // Inspect frame 5 which starts a `/iframe.html` and then soft-navigates to
    // `/iframe.html?id=5`.
    await chrome.devtools.inspectedWindow.eval(
      announceIframe('5. soft-navigation'),
      { frameURL: 'http://localhost:8080/iframe.html?id=5' },
    );
    // Output varies.
    // * If you load the app first, *then* open the DevTools panel and click "Run"
    //   it prints "5. soft-navigation: I am iframe #5".
    // * If you open DevTools first, *then* load the app (or just refresh the app)
    //   and click "Run", it does not print anything at all.
  }
}
