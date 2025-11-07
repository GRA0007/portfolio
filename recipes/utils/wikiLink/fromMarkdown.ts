import type { Data, Image, Literal, Nodes } from 'mdast'
import type { CompileContext, Extension, Token } from 'mdast-util-from-markdown'

interface WikiLinkData extends Data {
  alias: string | null
}

interface WikiLink extends Literal {
  type: 'wikiLink'
  data: WikiLinkData
}

declare module 'mdast' {
  interface RootContentMap {
    wikiLink: WikiLink
  }
}

declare module 'micromark-util-types' {
  interface Token {
    isType?: 'embed'
  }
}

export function fromMarkdown(): Extension {
  let node: Nodes

  function enterWikiLink(this: CompileContext, token: Token) {
    if (token.isType === 'embed') {
      node = { type: 'image', title: null, url: '', alt: null }
    } else {
      node = { type: 'wikiLink', value: '', data: { alias: null } }
    }
    this.enter(node, token)
  }

  function exitWikiLinkAlias(this: CompileContext, token: Token) {
    const alias = this.sliceSerialize(token)
    const current = this.stack[this.stack.length - 1] as Image | WikiLink
    if (current.type === 'image') {
      current.title = alias
    } else {
      current.data.alias = alias
    }
  }

  function exitWikiLinkTarget(this: CompileContext, token: Token) {
    const target = this.sliceSerialize(token)
    const current = this.stack[this.stack.length - 1] as Image | WikiLink
    if (current.type === 'image') {
      current.url = target
    } else {
      current.value = target
    }
  }

  function exitWikiLink(this: CompileContext, token: Token) {
    this.exit(token)

    if (node.type === 'wikiLink') {
      node.data.hName = 'a'
      node.data.hProperties = {
        href: node.value,
      }
      node.data.hChildren = [{ type: 'text', value: node.data.alias || node.value }]
    }
  }

  return {
    enter: { wikiLink: enterWikiLink },
    exit: {
      wikiLinkTarget: exitWikiLinkTarget,
      wikiLinkAlias: exitWikiLinkAlias,
      wikiLink: exitWikiLink,
    },
  }
}
