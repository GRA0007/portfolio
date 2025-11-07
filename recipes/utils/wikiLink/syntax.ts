import type { Code, Effects, Extension, State } from 'micromark-util-types'

const aliasMarker = '|'.charCodeAt(0)
const startMarker = '['.charCodeAt(0)
const embedStartMarker = '!'.charCodeAt(0)
const endMarker = ']'.charCodeAt(0)

const isEndOfLineOrFile = (code: Code) => code === null || code < 0

declare module 'micromark-util-types' {
  interface TokenTypeMap {
    wikiLink: 'wikiLink'
    wikiLinkMarker: 'wikiLinkMarker'
    wikiLinkAlias: 'wikiLinkAlias'
    wikiLinkData: 'wikiLinkData'
    wikiLinkAliasMarker: 'wikiLinkAliasMarker'
    wikiLinkTarget: 'wikiLinkTarget'
  }
}

export function syntax(): Extension {
  function tokenize(effects: Effects, ok: State, nok: State) {
    let data = false
    let alias = false

    let startMarkerCount = 0
    let endMarkerCount = 0

    function start(code: Code) {
      if (code === startMarker) {
        effects.enter('wikiLink')
        effects.enter('wikiLinkMarker')
        return consumeStart(code)
      } else if (code === embedStartMarker) {
        effects.enter('wikiLink', { isType: 'embed' })
        effects.enter('wikiLinkMarker', { isType: 'embed' })
        return consumeStart(code)
      } else {
        return nok(code)
      }
    }

    function consumeStart(code: Code) {
      if (startMarkerCount === 2) {
        effects.exit('wikiLinkMarker')
        return consumeData(code)
      }

      if (code === startMarker || code === embedStartMarker) {
        if (code === startMarker) startMarkerCount++
        effects.consume(code)
        return consumeStart
      } else {
        return nok(code)
      }
    }

    function consumeData(code: Code) {
      if (isEndOfLineOrFile(code)) return nok(code)

      effects.enter('wikiLinkData')
      effects.enter('wikiLinkTarget')
      return consumeTarget(code)
    }

    function consumeTarget(code: Code) {
      if (code === aliasMarker) {
        if (!data) return nok(code)
        effects.exit('wikiLinkTarget')
        effects.enter('wikiLinkAliasMarker')
        return consumeAliasMarker(code)
      }

      if (code === endMarker) {
        if (!data) return nok(code)
        effects.exit('wikiLinkTarget')
        effects.exit('wikiLinkData')
        effects.enter('wikiLinkMarker')
        return consumeEnd(code)
      }

      if (isEndOfLineOrFile(code)) return nok(code)

      data = true
      effects.consume(code)
      return consumeTarget
    }

    function consumeAliasMarker(code: Code) {
      effects.consume(code)
      effects.exit('wikiLinkAliasMarker')
      effects.enter('wikiLinkAlias')
      return consumeAlias
    }

    function consumeAlias(code: Code) {
      if (code === endMarker) {
        if (!alias) return nok(code)
        effects.exit('wikiLinkAlias')
        effects.exit('wikiLinkData')
        effects.enter('wikiLinkMarker')
        return consumeEnd(code)
      }

      if (isEndOfLineOrFile(code)) return nok(code)

      alias = true
      effects.consume(code)
      return consumeAlias
    }

    function consumeEnd(code: Code) {
      if (endMarkerCount === 2) {
        effects.exit('wikiLinkMarker')
        effects.exit('wikiLink')
        return ok(code)
      }

      if (code !== endMarker) return nok(code)

      effects.consume(code)
      endMarkerCount++
      return consumeEnd
    }

    return start
  }

  return {
    text: {
      [startMarker]: { tokenize },
      [embedStartMarker]: { tokenize },
    },
  }
}
