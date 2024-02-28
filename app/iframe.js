const frameHash = new URL(window.location.href).hash;

if (frameHash === '#5') {
  history.pushState(undefined, undefined, '/iframe.html?id=5#5');
}

document.querySelector('h2').textContent += ` ${frameHash}`;
