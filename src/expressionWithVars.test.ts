import { evaluate, Expression } from "./expressionWithVars";
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

    test("test tree3 with variables", () => {
        const tree3: Expression = {
            op: "multiply",
            a: { op: "add", a: 1, b: 3 },
            b: { op: "subtract", a: "x", b: { op: "subtract", a: 20, b: "y" } },
        };
        expect(evaluate(tree3, { x: 7, y: 18 })).toBe(20);
    });
});
