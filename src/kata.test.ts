import { evaluate, Expression } from "./kata";
describe("expression evaluation", () => {
    test("expression works with a literal", () => {
        const tree1: Expression = 10;
        expect(evaluate(tree1)).toBe(10);
    });

    test("single expression works", () => {
        const tree1: Expression = { op: "add", a: 10, b: 20 };
        expect(evaluate(tree1)).toBe(30);
    });

    test("nested expression works", () => {
        const tree1: Expression = {
            op: "add",
            a: 10,
            b: { op: "subtract", a: 100, b: 3 },
        };
        expect(evaluate(tree1)).toBe(107);
    });

    test("big nested expression works", () => {
        const tree1: Expression = {
            op: "add",
            a: { op: "multiply", a: { op: "divide", a: 10, b: 2 }, b: 3 },
            b: { op: "subtract", a: 3, b: 8 },
        };
        expect(evaluate(tree1)).toBe(10);
    });
});
