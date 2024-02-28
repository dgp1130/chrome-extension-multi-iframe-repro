chrome.devtools.panels.create(
  'Multi-iframe Test' /* title */,
  undefined /* iconPath */,
  '/panel.html' /* pagePath */,
  () => {
    console.error('Panel created');
  },
);
