export type Operator = "add" | "subtract" | "divide" | "multiply";

export type Expression =
    | number
    | string
    | { op: Operator; a: Expression; b: Expression };

type Bindings = { [key: string]: number };
function evaluate(exp: Expression, bindings: Bindings = {}): number {
    if (typeof exp === "number") {
        return exp;
    }
    if (typeof exp === "string") {
        return bindings[exp];
    }
    return apply(exp.op, evaluate(exp.a, bindings), evaluate(exp.b, bindings));
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
