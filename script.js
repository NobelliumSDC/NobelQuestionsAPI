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



