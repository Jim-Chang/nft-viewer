// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

const whiteList = [
  'nft-viewer-ipfs.koding.work',
  'nft-viewer.koding.work',
  'konglong-nft-ipfs.koding.work',
  'konglong-nft.koding.work',
  'konglong.nft',
];

var cors_proxy = require('cors-anywhere');
cors_proxy
  .createServer({
    originWhitelist: whiteList,
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'],
  })
  .listen(port, host, function () {
    console.log('White List:');
    whiteList.forEach((url) => console.log(url));
    console.log('Running CORS Anywhere on ' + host + ':' + port);
  });
