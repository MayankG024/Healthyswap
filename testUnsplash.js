import https from 'https';

https.get('https://source.unsplash.com/featured/800x600/?food,dessert', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  console.log('Location:', res.headers.location);
}).on('error', (e) => {
  console.error(e);
});
