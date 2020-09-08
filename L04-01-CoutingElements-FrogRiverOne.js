/*
A small frog wants to get to the other side of a river. The frog is initially located on one bank of the river (position 0) and wants to get to the opposite bank (position X+1). Leaves fall from a tree onto the surface of the river.
작은 개구리가 강 건너편으로 가고 싶어합니다. 개구리는 처음에는 강의 한 둑 (위치 0)에 있으며 반대쪽 둑 (위치 X + 1)에 도달하려고합니다. 잎은 나무에서 강 표면으로 떨어집니다.
You are given an array A consisting of N integers representing the falling leaves. A[K] represents the position where one leaf falls at time K, measured in seconds.
낙엽을 나타내는 N 개의 정수로 구성된 배열 A가 제공됩니다. A [K]는 초 단위로 측정 된 시간 K에서 한 잎이 떨어지는 위치를 나타냅니다.
The goal is to find the earliest time when the frog can jump to the other side of the river. The frog can cross only when leaves appear at every position across the river from 1 to X (that is, we want to find the earliest moment when all the positions from 1 to X are covered by leaves). You may assume that the speed of the current in the river is negligibly small, i.e. the leaves do not change their positions once they fall in the river.
목표는 개구리가 강 반대편으로 점프 할 수있는 가장 빠른 시간을 찾는 것입니다.
개구리는 잎이 1에서 X까지 강 건너 모든 위치에 나타날 때만 건널 수 있습니다 (즉, 1에서 X까지의 모든 위치가 잎으로 덮여있는 가장 빠른 순간을 찾고 싶습니다).
For example, you are given integer X = 5 and array A such that:

  A[0] = 1
  A[1] = 3
  A[2] = 1
  A[3] = 4
  A[4] = 2
  A[5] = 3
  A[6] = 5
  A[7] = 4
In second 6, a leaf falls into position 5. This is the earliest time when leaves appear in every position across the river.

Write a function:

function solution(X, A);

that, given a non-empty array A consisting of N integers and integer X, returns the earliest time when the frog can jump to the other side of the river.

If the frog is never able to jump to the other side of the river, the function should return −1.

For example, given X = 5 and array A such that:

  A[0] = 1
  A[1] = 3
  A[2] = 1
  A[3] = 4
  A[4] = 2
  A[5] = 3
  A[6] = 5
  A[7] = 4
the function should return 6, as explained above.

Write an efficient algorithm for the following assumptions:

N and X are integers within the range [1..100,000];
each element of array A is an integer within the range [1..X].

*/

import { generateArrayRandom } from './utils';

function solution(X, A) {
  const N = A.length;

  let route = {};
  for (let index = 0; index < X; index++) {
    route[index] = true;
  }

  for (let position = 0; position < N; position++) {
    if (A[position] - 1 > X) {
      continue;
    }

    if (!route[A[position] - 1]) {
      continue;
    }

    route[A[position] - 1] = false;

    if (!route[X - 1]) {
      let exit = true;
      for (let index = 0; index < X; index++) {
        if (route[index]) {
          exit = false;
          break;
        }
      }

      if (exit) {
        return position;
      }
    }
  }

  return -1;
}

const X = 30000;
const N = 100000;
const min = 1;
const max = X;
const A = generateArrayRandom(min, max, N);

const sampleA = [1, 3, 1, 4, 2, 3, 5, 4];
const sampleX = 5;

// console.log(solution(sampleX, sampleA));
console.log(solution(X, A));
