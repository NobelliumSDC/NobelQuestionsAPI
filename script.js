import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';



export const options = {
  vus: 100,
  duration: '15s',
};




export default function () {
  const BASE_URL = 'http://localhost:3000/qa/questions';

  const responses = http.batch([
    ['GET', `${BASE_URL}/${~~(Math.random() * 1900000)}`, null, { tags: { name: 'questions req' } }],
    ['GET', `${BASE_URL}/${~~(Math.random() * 1900000)}/answers`, null, { tags: { name: 'answers req' } }],
    ['GET', `${BASE_URL}/${~~(Math.random() * 1900000)}`, null, { tags: { name: 'questions req' } }],
    ['GET', `${BASE_URL}/${~~(Math.random() * 1900000)}/answers`, null, { tags: { name: 'answers req' } }],
  ]);

const res = http.get(`http://localhost:3000/qa/questions/${~~(Math.random() * 1900000)}`);
check(res, { 'status was 200': (r) => r.status == 200,

'transaction time < 50ms': (r) => r.timings.duration < 200,
'transaction time < 200ms': (r) => r.timings.duration < 500,
'transaction time < 1000ms': (r) => r.timings.duration < 1000,
'transaction time < 2000ms': (r) => r.timings.duration < 2000,
});
  sleep(1);
}



// // import http from 'k6/http';
// // import { sleep } from 'k6';

// // export default function () {
// //   const res = http.get('http://localhost:3000/qa/questions/1000000');
// //   check(res, { 'status was 200': (r) => r.status == 200,
// //   'is status 200': (r) => r.status === 200,
// //   'transaction time < 50ms': (r) => r.timings.duration < 200,
// //   'transaction time < 200ms': (r) => r.timings.duration < 500,
// //   'transaction time < 1000ms': (r) => r.timings.duration < 1000,
// //   'transaction time < 2000ms': (r) => r.timings.duration < 2000,


// // });
// //   sleep(1);
// // }

// import http from 'k6/http';
// import { check , sleep } from 'k6';
// export const options = {
//   vus: 100,
//   duration: '10s',
// };
// let url = `http://localhost:3000/qa/questions/${~~(Math.random() * 1900000)}`
// export default function () {

//   let res = http.get(url);
//   check(res, { 'status was 200': (r) => r.status === 200,
//                'duration was less than 200ms': r => r.timings.duration < 200,
//                'duration was less than 100ms': r => r.timings.duration < 100,
//                'duration was less than 50ms': r => r.timings.duration < 50,
//                'duration was less than 30ms': r => r.timings.duration < 30,
//                'duration was less than 25ms': r => r.timings.duration < 25,
//  });
// }