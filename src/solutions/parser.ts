//This source is not part of the exercise.
import { Expression, Operator } from "./expressions";

type OperatorToken = "+" | "-" | "*" | "/";
type ParenToken = "(" | ")";
type Token =
    | { type: "paren"; t: ParenToken }
    | { type: "op"; t: OperatorToken }
    | {
          type: "lit";
          t: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
      };

//"(+ (/ 5 (* 2 5)) (- 5 4))"

function tokenize(str: string): Token[] {
    function charToToken(c: string): Token | null {
        switch (c) {
            case "(":
            case ")":
                return { type: "paren", t: c };
            case "/":
            case "*":
            case "+":
            case "-":
                return { type: "op", t: c };
            case " ":
                return null;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                return { type: "lit", t: c };
            default:
                throw new Error("parse error: " + c);
        }
    }
    return str
        .split("")
        .map((c) => charToToken(c))
        .filter((t) => t !== null) as Token[];
}
function parseTokenizedExpression(toks: Token[]): [Expression, Token[]] {
    const [first, second] = toks;

    if (first.type === "lit") {
        return [parseInt(first.t), toks.slice(1)];
    }
    if (first.type !== "paren") {
        throw new Error("invalid, expected (");
    }
    //now guaranteed of form ( op exp1 exp2 )
    const op = parseOp(second.t);
    const [a, toks2] = parseTokenizedExpression(toks.slice(2));
    const [b, toks3] = parseTokenizedExpression(toks2);

    return [{ op, a, b }, toks3.slice(1)];
}
export function parseExpression(str: string): Expression {
    const tokens = tokenize(str);
    // console.log(tokens);
    return parseTokenizedExpression(tokens)[0];
}

export function parseOp(str: string): Operator {
    if (str === "+") {
        return "add";
    }
    if (str === "-") {
        return "subtract";
    }
    if (str === "/") {
        return "divide";
    }
    if (str === "*") {
        return "multiply";
    }
    throw new Error("ParseError: expected operation but got: " + str);
}
