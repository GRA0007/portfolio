import type { Processor, Settings } from 'unified'
import { fromMarkdown } from './fromMarkdown'
import { syntax } from './syntax'

function remarkWikiLink(this: Processor) {
  const data = this.data()

  function add<T extends keyof typeof data>(field: T, value: Exclude<NonNullable<(typeof data)[T]>, Settings>[number]) {
    if (data[field] && Array.isArray(data[field])) {
      data[field].push(value)
    } else {
      data[field] = [value]
    }
  }

  add('micromarkExtensions', syntax())
  add('fromMarkdownExtensions', fromMarkdown())
}

export default remarkWikiLink
export { syntax, fromMarkdown }
