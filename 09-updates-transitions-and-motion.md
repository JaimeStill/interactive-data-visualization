# Updates, Transitions, and Motion



## Important Notes

Pending a response to this [StackOverflow question](https://stackoverflow.com/questions/60621226/d3-typescript-key-function-recommended-approach), the current approach to defining a reusable key function is as follows:

Given a data type of `{key: number, value: number}`:
```ts
private key = (d: any) => d.key;
```

When you try to strongly type the key function, the corresponding usage in the `.data()` function will throw errors about invalid types.

