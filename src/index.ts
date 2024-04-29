import fs from "fs/promises"
import path from "path"
import assert from "assert"
import type { SourceUnit, ContractDefinition } from "solidity-ast"

type Func = {
  name: string
}

function find_funcs(contract_def: ContractDefinition) {
  const funcs: Func[] = []

  for (const node of contract_def.nodes) {
    if (node.nodeType == "FunctionDefinition") {
      funcs.push({ name: node.name })
    }
  }

  return funcs
}

// Contract
// - function def
//   - func calls

async function main() {
  const args = process.argv.slice(2)
  assert(args[0], "path undefined")

  const json_path = path.join(process.cwd(), args[0])
  const data = await fs.readFile(json_path)
  const json = JSON.parse(data.toString())
  const ast = json.ast

  // @ts-ignore
  const contract_def: ContractDefinition = ast.nodes[1]

  // console.log("HERE", JSON.stringify(contract_def, null, 2))
  console.log(contract_def.name)
  const funcs = find_funcs(contract_def)
  console.log(funcs)
}

main()
