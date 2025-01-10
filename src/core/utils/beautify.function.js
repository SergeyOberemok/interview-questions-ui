import { css_beautify, html_beautify, js_beautify } from 'js-beautify'

export function beautify(value, type) {
  switch (type) {
    case 'js':
    case 'json':
      return js_beautify(value, { indent_size: 2 })
    case 'sass':
      return css_beautify(value, { indent_size: 2 })
    case 'html':
      return html_beautify(value, { indent_size: 2 })
    default:
      return value
  }
}
