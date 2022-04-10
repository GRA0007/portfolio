import { render } from 'react-dom'
import { createElement } from 'react'
import { setup } from 'goober'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import * as Pages from './pages'

// Set up goober to use React
setup(
  createElement, undefined, undefined,
  // Remove transient props from the DOM
  props => Object.keys(props).forEach(p => p[0] === '$' && delete props[p])
)

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Pages.Home />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('app')
)
