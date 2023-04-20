// let baseUrl = 'http://localhost:5000/api/v1';
// let mediaUrl = 'http://localhost:5000/';
let frontendUrl = 'http://localhost:3001';
let baseUrl = 'https://vapeverification-api-dev.falconweb.app/api/v1';
let mediaUrl = 'https://vapeverification-api-dev.falconweb.app/';
// let frontendUrl = 'https://vapeverification-dev.falconweb.app';

if (window.location.host === 'vapeverification-admin-dev.falconweb.app') {
  baseUrl = 'https://vapeverification-api-dev.falconweb.app/api/v1';
  mediaUrl = 'https://vapeverification-api-dev.falconweb.app/';
  frontendUrl = 'https://vapeverification-dev.falconweb.app';
} else if (window.location.host === 'vapeverification-admin-qa.falconweb.app') {
  baseUrl = 'https://vapeverification-api-qa.falconweb.app/api/v1';
  mediaUrl = 'https://vapeverification-api-qa.falconweb.app/';
  frontendUrl = 'https://vapeverification-qa.falconweb.app';
} else if (
  window.location.host === 'vapeverification-admin-staging.falconweb.app'
) {
  baseUrl = 'https://vapeverification-api-staging.falconweb.app/api/v1';
  mediaUrl = 'https://vapeverification-api-staging.falconweb.app/';
  frontendUrl = 'https://vapeverification-staging.falconweb.app';
} else if (
  window.location.host === 'vapeverification-admin-prod.falconweb.app'
) {
  baseUrl = 'https://vapeverification-api-prod.falconweb.app/api/v1';
  mediaUrl = 'https://vapeverification-api-prod.falconweb.app/';
  frontendUrl = 'https://vapeverification-prod.falconweb.app';
}

module.exports = { baseUrl, mediaUrl, frontendUrl };
