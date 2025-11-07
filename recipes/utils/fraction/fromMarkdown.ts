import type { Literal } from 'mdast'
import type { CompileContext, Extension, Token } from 'mdast-util-from-markdown'

interface Fraction extends Literal {
  type: 'fraction'
}

declare module 'mdast' {
  interface RootContentMap {
    fraction: Fraction
  }
}

export function fromMarkdown(): Extension {
  let node: Fraction

  function enterFraction(this: CompileContext, token: Token) {
    node = { type: 'fraction', value: '' }
    this.enter(node, token)
  }

  function exitFraction(this: CompileContext, token: Token) {
    this.exit(token)
    node.value = this.sliceSerialize(token)
    node.data = {
      hName: 'span',
      hProperties: { className: 'fraction' },
      hChildren: [{ type: 'text', value: node.value }],
    }
  }

  return {
    enter: { fraction: enterFraction },
    exit: { fraction: exitFraction },
  }
}
