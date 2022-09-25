export type Operator = "add" | "subtract" | "divide" | "multiply";

export type Expression =
    | number
    | { op: Operator; a: Expression; b: Expression };

function evaluate(exp: Expression): number {
    return -1;
}

export { evaluate };
