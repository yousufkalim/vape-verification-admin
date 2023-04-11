let baseUrl = 'https://vapeverification-api-dev.falconweb.app/api/v1';
let mediaUrl = 'https://vapeverification-api-dev.falconweb.app';

if (window.location.host === 'vapeverification-admin-dev.falconweb.app') {
  baseUrl = 'https://vapeverification-api-dev.falconweb.app/api/v1';
  mediaUrl = 'https://vapeverification-api-dev.falconweb.app/';
} else if (window.location.host === 'vapeverification-admin-qa.falconweb.app') {
  baseUrl = 'https://vapeverification-api-qa.falconweb.app/api/v1';
  mediaUrl = 'https://vapeverification-api-qa.falconweb.app/';
} else if (window.location.host === 'vapeverification-admin-staging.falconweb.app') {
  baseUrl = 'https://vapeverification-api-staging.falconweb.app/api/v1';
  mediaUrl = 'https://vapeverification-api-staging.falconweb.app/';
} else if (window.location.host === 'vapeverification-admin-prod.falconweb.app') {
  baseUrl = 'https://vapeverification-api-prod.falconweb.app/api/v1';
  mediaUrl = 'https://vapeverification-api-prod.falconweb.app/';
}

module.exports = { baseUrl, mediaUrl };
