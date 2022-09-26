import { Expression, Operator } from "./expressions";
import { parseExpression } from "./parser";

export function generateGraph(expr: Expression): string {
    const lines: string[] = [];
    genLinesRecursively(expr, lines);
    return `
digraph {
\tordering=out;
${lines.join("\n")}
}`;
}

/** Add the relevant graphviz dot-langugage lines for the given expression node and
 *  its children to the given list of strings, recursively */
function genLinesRecursively(expr: Expression, lines: string[]): string {
    const myId = "e" + lines.length; //length of lines will make for a uid generator.
    const label = labelFor(expr);

    //Emit a graphviz label line for this expression node.
    //Example, one expression might be:
    //   e3 [label="*"];
    lines.push(`\t${myId} [label="${label}"]`);

    if (typeof expr !== "number") {
        //deal with the children!
        const aId = genLinesRecursively(expr.a, lines);
        const bId = genLinesRecursively(expr.b, lines);

        //emit link lines to my child nodes:
        //example, if I am e11, and one of my children is e17, we'd emit:
        //e11 -> e17;

        lines.push(`\t${myId} -> ${aId};`);
        lines.push(`\t${myId} -> ${bId};`);
    }
    //return this node's id so the parent can emit a link to it.
    return myId;
}

/** return the short operator symbol (string) for a given Operator.
 *
 * Example: operatorSymbol("multiply") will return "*"
 */
function operatorSymbol(op: Operator): string {
    const lookup: Record<Operator, string> = {
        add: "+",
        divide: "/",
        multiply: "*",
        subtract: "-",
    };
    return lookup[op];
}
/** Either the literal value cast to a string - e.g. "7" - or the operator symbol e.g. "+" */
function labelFor(expr: Expression): string {
    return typeof expr === "number" ? expr + "" : operatorSymbol(expr.op);
}

export function demoGraphGenerator() {
    const testExpr: Expression = parseExpression(
        "(+ (* 2 6) (* 5 (- (+ 3 3) 4))))"
    );
    //usage:
    //1. run and output the generated graph code
    //2. copy-paste it into graphviz e.g. at https://dreampuf.github.io/GraphvizOnline/
    const str = generateGraph(testExpr);
    console.log(
        "//copy-paste the below into graphviz e.g. https://dreampuf.github.io/GraphvizOnline/"
    );
    console.log(str);
}
