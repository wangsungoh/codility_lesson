/*
L04-02-CountingElements-MaxCounters.js

You are given N counters, initially set to 0, and you have two possible operations on them:

increase(X) − counter X is increased by 1,
max counter − all counters are set to the maximum value of any counter.
A non-empty array A of M integers is given. This array represents consecutive operations:

if A[K] = X, such that 1 ≤ X ≤ N, then operation K is increase(X),
if A[K] = N + 1 then operation K is max counter.
For example, given integer N = 5 and array A such that:

    A[0] = 3
    A[1] = 4
    A[2] = 4
    A[3] = 6
    A[4] = 1
    A[5] = 4
    A[6] = 4
the values of the counters after each consecutive operation will be:

    (0, 0, 1, 0, 0)
    (0, 0, 1, 1, 0)
    (0, 0, 1, 2, 0)
    (2, 2, 2, 2, 2)
    (3, 2, 2, 2, 2)
    (3, 2, 2, 3, 2)
    (3, 2, 2, 4, 2)
The goal is to calculate the value of every counter after all operations.

Write a function:

function solution(N, A);

that, given an integer N and a non-empty array A consisting of M integers, returns a sequence of integers representing the values of the counters.

Result array should be returned as an array of integers.

For example, given:

    A[0] = 3
    A[1] = 4
    A[2] = 4
    A[3] = 6
    A[4] = 1
    A[5] = 4
    A[6] = 4
the function should return [3, 2, 2, 4, 2], as explained above.

Write an efficient algorithm for the following assumptions:

N and M are integers within the range [1..100,000];
each element of array A is an integer within the range [1..N + 1].

0으로 설정된 N개의 카운터가 제공
Increase (X) - 카운터 X는 1씩 증가한다.
모든 카운터는 모든 카운터의 최대값이 된다.

만약 A[K] = X, 즉 1 <= X <= N 이면 Increase(X)
만약 A[K] = N + 1 이면 K는 최대 카운터

만약 N = 5, A = [3, 4, 4, 6, 1, 4, 4] 이면

A[0] = 3
A[1] = 4
A[2] = 4
A[3] = 6
A[4] = 1
A[5] = 4
A[6] = 4

K X
0 3 (0, 0, 1, 0, 0)
1 4 (0, 0, 1, 1, 0)
2 4 (0, 0, 1, 2, 0)
3 6 (2, 2, 2, 2, 2)
4 1 (3, 2, 2, 2, 2)
5 4 (3, 2, 2, 3, 2)
6 4 (3, 2, 2, 4, 2)

A[0]: 3, 1 <= 3 <= 5, O, 00100
A[1]: 4, 1 <= 4 <= 5, O, 00110
A[2]: 4, 1 <= 4 <= 5, O, 00120
A[3]: 6, 1 <= 6 <= 5, X, 22222
A[4]: 1, 1 <= 1 <= 5, O, 32222 10120
A[5]: 4, 1 <= 4 <= 5, O, 32232 10130
A[6]: 4, 1 <= 4 <= 5, O, 32242 10142 32342

A[0]: 3, 1 <= 3 <= 5, O, 00100
A[1]: 4, 1 <= 4 <= 5, O, 00110
A[2]: 4, 1 <= 4 <= 5, O, 00120
A[3]: 6, 1 <= 6 <= 5, X, 22222 00120
A[4]: 1, 1 <= 1 <= 5, O, 32222 10120
A[5]: 6, 1 <= 6 <= 5, X, 33333 10120
A[6]: 4, 1 <= 4 <= 5, O, 33343 10130

A[0]: 1, 1 <= 3 <= 5, O, 10000
A[1]: 3, 1 <= 4 <= 5, O, 10100
A[2]: 4, 1 <= 4 <= 5, O, 10110
A[3]: 4, 1 <= 6 <= 5, X, 10120
A[4]: 4, 1 <= 1 <= 5, O, 10130
A[5]: 4, 1 <= 4 <= 5, O, 10140
A[6]: 6, 1 <= 4 <= 5, O, 44444  

*/
import { generateArrayRandom } from './utils';

// O(N*M)
// function solution(N, A) {
//   const result = [];
//   let max = 0;

//   const check = (value, N) => {
//     if (1 <= value && value <= N) {
//       if (result[value - 1] === undefined) {
//         result[value - 1] = 1;
//       } else {
//         result[value - 1]++;
//       }

//       max = result[value - 1] > max ? result[value - 1] : max;
//     } else {
//       for (let index = 0; index < N; index++) {
//         result[index] = max;
//       }
//     }
//   };

//   for (let index = 0; index < A.length; index++) {
//     check(A[index], N);
//   }

//   return result;
// }

// O(N + M) 100%
function solution(N, A) {
  const result = Array(N).fill(0);
  let max = 0;
  let prevMax = -1;

  for (let index = 0; index < A.length; index++) {
    if (1 <= A[index] && A[index] <= N) {
      result[A[index] - 1]++;

      if (max < result[A[index] - 1]) {
        max = result[A[index] - 1];
      }
    } else if (A[index] > N && prevMax !== max) {
      if (prevMax < max) {
        for (let index = 0; index < N; index++) {
          result[index] = max;
        }
      }

      prevMax = max;
    }
  }

  return result;
}

const nN = 100000;
const arrayA = generateArrayRandom(1, 100000, nN + 1);

console.log(solution(nN, arrayA));
