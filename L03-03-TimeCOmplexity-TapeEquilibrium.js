/*
A non-empty array A consisting of N integers is given. Array A represents numbers on a tape.

Any integer P, such that 0 < P < N, splits this tape into two non-empty parts: A[0], A[1], ..., A[P − 1] and A[P], A[P + 1], ..., A[N − 1].

The difffunctioerence between the two parts is the value of: |(A[0] + A[1] + ... + A[P − 1]) − (A[P] + A[P + 1] + ... + A[N − 1])|

In other words, it is the absolute difference between the sum of the first part and the sum of the second part.

For example, consider array A such that:

  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 4
  A[4] = 3
We can split this tape in four places:

P = 1, difference = |3 − 10| = 7
P = 2, difference = |4 − 9| = 5
P = 3, difference = |6 − 7| = 1
P = 4, difference = |10 − 3| = 7
Write a function:

function solution(A);

that, given a non-empty array A of N integers, returns the minimal difference that can be achieved.

For example, given:

  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 4
  A[4] = 3
the function should return 1, as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [2..100,000];
each element of array A is an integer within the range [−1,000..1,000].
*/
/*
N 개의 정수로 구성된 비어 있지 않은 배열 A가 제공됩니다. 배열 A는 테이프의 숫자를 나타냅니다.
0 < P <N 인 정수 P는이 테이프를 비어 있지 않은 두 부분으로 분할합니다 : (A [0] + A [1] + ... + A [P − 1]) - (A [P] + A [ P + 1] + ...+ A [N-1])
즉, 첫 번째 부분의 합과 두 번째 부분의 합 사이의 절대 차이입니다.
*/
/*
N 이 5 일때
P 는 1 부터 5사이
1, 2, 3, 4

1
!!! P-1 ; P-1 < P; (P-1)++ !!! (A[0]) - (A[1] + A[2] + A[3] + A[4]) !!!P = 1; P < N; P++!!!
(3) - (1+2+3+4)
|3 - 10| = 7

2
!!! P-1 ; P-1 < P; (P-1)++ !!! (A[0] + A[1]) - (A[2] + A[3] + A[4]) !!!P = 2; P < N; P++!!!
(3 + 1) - (2 + 4 + 3)
|4 - 9| = 5

3
!!! P-1 ; P-1 < P; (P-1)++ !!! (A[0] + A[1] + A[2]) - (A[3] + A[4]) !!!P = 3; P < N; P++!!!
(3 + 1 + 2) - (4 + 3)
|6 - 7| = 1

4
!!! P-1 ; P-1 < P; (P-1)++ !!! (A[0] + A[1] + A[2] + A[3]) - (A[4]) !!!P = 4; P < N; P++!!!
(3 + 1 + 2 + 4) - (3)
|10 - 3| = 7

*/

import { generateArrayRandom } from './utils';

function solution(A) {
  const lengthOfA = A.length;
  const rangeOfP = {
    start: 1,
    end: lengthOfA - 1,
    min: 100000,
  };
  let left = 0;
  let right = 0;

  const total = A.reduce((acc, cur) => acc + cur);

  for (let index = rangeOfP.start; index <= rangeOfP.end; index++) {
    left += A[index - 1];

    right = total - left;

    const min = Math.abs(left - right);
    rangeOfP.min = min > rangeOfP.min ? rangeOfP.min : min;
  }

  return rangeOfP.min;
}

function solutionA(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var p = 0;
  var index = 0;
  var leftSum = 0;
  var rightSum = 0;
  var totalSum = 0;
  var N = A.length;

  var last_minimum = 100000;

  if (A.length == 2) return Math.abs(A[0] - A[1]);
  if (A.length == 1) return Math.abs(A[0]);

  for (index = 0; index < N; index++) totalSum = totalSum + A[index];

  for (p = 1; p <= N - 1; p++) {
    leftSum += A[p - 1];
    rightSum = totalSum - leftSum;

    let current_min = Math.abs(leftSum - rightSum);
    last_minimum = current_min < last_minimum ? current_min : last_minimum;

    if (last_minimum === 0) break;
  }
  return last_minimum;
}

const A = generateArrayRandom(1, 5, 100000);
// const A = [3, 1, 2, 4, 3];

const { performance, PerformanceObserver } = require('perf_hooks');

function someFunction() {
  console.log(`result : ${solution(A)}`);
}

const wrapped = performance.timerify(someFunction);

const obs = new PerformanceObserver((list) => {
  console.log(`perfomance : ${list.getEntries()[0].duration}`);
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'] });

// A performance timeline entry will be created
wrapped();
