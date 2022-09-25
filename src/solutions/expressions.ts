export type Operator = "add" | "subtract" | "divide" | "multiply";

export type Expression =
    | number
    | { op: Operator; a: Expression; b: Expression };

function evaluate(exp: Expression): number {
    if (typeof exp === "number") {
        return exp;
    }
    return apply(exp.op, evaluate(exp.a), evaluate(exp.b));
}

function apply(op: Operator, a: number, b: number) {
    switch (op) {
        case "add":
            return a + b;
        case "subtract":
            return a - b;
        case "divide":
            return a / b;
        case "multiply":
            return a * b;
    }
}

export { evaluate };
