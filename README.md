# Expression Tree Kata scaffolding and solution

If you want some scaffolding you can work from `src/task/expressions.ts` and write tests in `src/task/expressions-test.ts`

There are also some solutions in `src/solutions`

### bonus: parsing from string to expression tree

For the curious, a simple parser has been provided which will create an expression tree from a string.   See: src/solutions/parser.test.ts

You use it by calling `parseExpression(str)`

Example:

```typescript
parseExpression("(+ (/ 5 (* 2 5)) (- 5 4))");

//should yield

{
  op: "add",
  a: { op: "divide", a: 5, b: { op: "multiply", a: 2, b: 5 } },
  b: { op: "subtract", a: 5, b: 4 },
}
```
