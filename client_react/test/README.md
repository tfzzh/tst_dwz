# 单元测试

Stmts:语句的覆盖率
Branch:分支的覆盖率(if、else)
Funcs:函数的覆盖率
Lines:代码行数的覆盖率

## 现阶段报告

----------------------|----------|----------|----------|----------|-------------------|
File                  |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------------|----------|----------|----------|----------|-------------------|
All files             |    43.82 |    23.94 |    34.85 |       44 |                   |
 src                  |     2.22 |        0 |     5.56 |     2.22 |                   |
  App.js              |      100 |      100 |      100 |      100 |                   |
  index.js            |        0 |      100 |      100 |        0 |              8,18 |
  serviceWorker.js    |        0 |        0 |        0 |        0 |... 32,133,135,138 |
  setupProxy.js       |        0 |      100 |        0 |        0 |             1,3,5 |
 src/pages            |    63.64 |      100 |       60 |       75 |                   |
  router.js           |    63.64 |      100 |       60 |       75 |             16,20 |
 src/pages/components |      100 |       75 |      100 |      100 |                   |
  dwz_labs.js         |      100 |       75 |      100 |      100 |                14 |
 src/pages/dwz        |       60 |    55.56 |    42.11 |       60 |                   |
  inList.js           |     4.35 |        0 |        0 |     4.35 |... 84,85,86,96,99 |
  inLong.js           |    90.91 |    66.67 |       80 |    90.91 |             31,62 |
  inShort.js          |       80 |       60 |       80 |       80 | 44,45,46,50,51,82 |
 src/req              |    43.59 |    23.53 |    35.29 |    43.59 |                   |
  baseRequest.js      |    38.24 |    23.53 |    28.57 |    38.24 |... 1,72,74,77,120 |
  dwz.js              |       80 |      100 |    66.67 |       80 |                 8 |
----------------------|----------|----------|----------|----------|-------------------|

测试还有待持续完善...
