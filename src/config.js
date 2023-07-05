let baseUrl =
  'https://azeem2795-ubiquitous-space-trout-jg7477r9r7r3pw6-5000.preview.app.github.dev/api/v1';
let mediaUrl = 'http://localhost:5000/';
let frontendUrl = 'http://localhost:3000';

// let baseUrl = 'https://vapeverification-api-dev.falconweb.app/api/v1';
// let mediaUrl = 'https://vapeverification-api-dev.falconweb.app/';

// let baseUrl = 'http://localhost:5000/api/v1';
// let mediaUrl = 'http://localhost:5000/';

// let frontendUrl = 'https://vapeverification-dev.falconweb.app';

if (window.location.host === 'vapeverification-admin-dev.falconweb.app') {
  baseUrl = 'https://vapeverification-api-dev.falconweb.app/api/v1';
  mediaUrl = 'https://vapeverification-api-dev.falconweb.app/';
  frontendUrl = 'https://vapeverification-dev.falconweb.app';
} else if (window.location.host === 'vapeverification-admin-qa.falconweb.app') {
  baseUrl = 'https://vapeverification-api-qa.falconweb.app/api/v1';
  mediaUrl = 'https://vapeverification-api-qa.falconweb.app/';
  frontendUrl = 'https://vapeverification-qa.falconweb.app';
} else if (window.location.host === 'vapeverification-admin-staging.falconweb.app') {
  baseUrl = 'https://vapeverification-api-staging.falconweb.app/api/v1';
  mediaUrl = 'https://vapeverification-api-staging.falconweb.app/';
  frontendUrl = 'https://vapeverification-staging.falconweb.app';
} else if (
  window.location.host === 'admin.getveriscan.com' ||
  window.location.host === 'client.getveriscan.com'
) {
  baseUrl = 'https://api.getveriscan.com/api/v1';
  mediaUrl = 'https://api.getveriscan.com/';
  frontendUrl = 'https://app.getveriscan.com';
}

module.exports = { baseUrl, mediaUrl, frontendUrl };
