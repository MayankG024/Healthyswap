import https from 'https';

const url = 'https://loremflickr.com/800/600/Skinny,food/all';

https.get(url, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
}).on('error', (e) => {
  console.error(e);
});
