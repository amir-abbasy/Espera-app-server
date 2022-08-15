const fetch = require('node-fetch');

let url = 'https://fcm.googleapis.com/fcm/send';

let options = {
  method: 'POST',
  headers: {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    Authorization: 'Bearer AAAAlp3v_bk:APA91bHzbrGTlz5DWXOpKorpTBRTEvu0PS1qHZDGrMSKD3etSqqIiCl8nnnqer7ASmfy9gZNBYeIS8r9Tflpb11Vtsh2fzXN-bwftopsEIITYtR8eYqn0BfypznWH_f5AVApsDA3BEzm',
    'Content-Type': 'application/json'
  },
  body: '{"data":{},"notification":{"title":"Background Message openApp","body":"Background message amir"},"webpush":{"fcm_options":{"link":"https://dummypage.com"}},"to":"/topics/coupen"}'
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));





//   const request = require('request');

// const options = {
//   method: 'POST',
//   url: 'https://fcm.googleapis.com/fcm/send',
//   headers: {
//     Accept: '*/*',
//     'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
//     Authorization: 'Bearer AAAAlp3v_bk:APA91bHzbrGTlz5DWXOpKorpTBRTEvu0PS1qHZDGrMSKD3etSqqIiCl8nnnqer7ASmfy9gZNBYeIS8r9Tflpb11Vtsh2fzXN-bwftopsEIITYtR8eYqn0BfypznWH_f5AVApsDA3BEzm',
//     'Content-Type': 'application/json'
//   },
//   body: {
//     data: {},
//     notification: {title: 'Background Message openApp', body: 'Background message amir'},
//     webpush: {fcm_options: {link: 'https://dummypage.com'}},
//     to: '/topics/coupen'
//   },
//   json: true
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });
