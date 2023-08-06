## Folder structure

```
| task1
| - index.ts  // <-- implementation
| - test.ts  // <-- unit test case
| task2
| - index.ts
| - test.ts
| task3
| - index.ts
| - test.ts
| index.ts // << - Entry point
```

## Getting started

Install all the library

```
$ yarn
```

Run test

```
$ yarn test
```

Start the app, see the result

```
$ yarn start
```
The result will be in terminal console

Proof of result: 
```
yarn run v1.22.19
$ yarn tsc & node dist/index.js
$ /Users/kenchoong/Desktop/splyt/node_modules/.bin/tsc
== Testing Task 1 ==
== Testing Task 2 ==
Task 2 Result: 19
== Testing Task 3 ==
Task 3 Result: 12:15
Task 1 Result: 5
✨  Done in 0.56s.
```

Note: you can also modify the variable before running the function,
search for keyword "Modify" in index.ts(entry point)

About how it works
Inside each task/index.ts, the implementation, will have the comment show how it works

If still need anything, I happy to clarify
