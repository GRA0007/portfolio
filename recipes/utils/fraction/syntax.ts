import type { Code, Effects, Extension, State } from 'micromark-util-types'

const fractionMarker = 47

const isNumber = (code: Code) => code !== null && code >= 48 && code <= 57

declare module 'micromark-util-types' {
  interface TokenTypeMap {
    fraction: 'fraction'
  }
}

export function syntax(): Extension {
  function tokenize(effects: Effects, ok: State, nok: State) {
    function start(code: Code) {
      if (!isNumber(code)) return nok(code)

      effects.enter('fraction')
      return consumeNumerator(code)
    }

    function consumeNumerator(code: Code) {
      if (!isNumber(code) && code !== fractionMarker) return nok(code)

      if (code === fractionMarker) return consumeFractionMarker(code)

      effects.consume(code)
      return consumeNumerator
    }

    function consumeFractionMarker(code: Code) {
      effects.consume(code)
      return consumeDenominator
    }

    function consumeDenominator(code: Code) {
      if (!isNumber(code)) return nok(code)
      effects.consume(code)

      return consumeEnd
    }

    function consumeEnd(code: Code) {
      if (!isNumber(code) && code !== fractionMarker) {
        effects.exit('fraction')
        return ok(code)
      }

      effects.consume(code)
      return consumeEnd
    }

    return start
  }

  const fraction = { tokenize }

  return {
    text: {
      48: fraction,
      49: fraction,
      50: fraction,
      51: fraction,
      52: fraction,
      53: fraction,
      54: fraction,
      55: fraction,
      56: fraction,
      57: fraction,
    },
  }
}
