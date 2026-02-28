import prettierPluginBabel from 'prettier/plugins/babel'
import prettierPluginEstree from 'prettier/plugins/estree'
import prettierPluginHtml from 'prettier/plugins/html'
import prettierPluginPostcss from 'prettier/plugins/postcss'
import { format } from 'prettier/standalone'

export async function beautify(value, type) {
  switch (type) {
    case 'js':
      return await format(value, {
        parser: 'babel',
        plugins: [prettierPluginBabel, prettierPluginEstree],
      })
    case 'json':
      return await format(value, {
        parser: 'json',
        plugins: [prettierPluginBabel, prettierPluginEstree],
      })
    case 'sass':
      return await format(value, {
        parser: 'css',
        plugins: [prettierPluginPostcss],
      })
    case 'html':
      return await format(value, {
        parser: 'html',
        plugins: [prettierPluginBabel, prettierPluginEstree, prettierPluginHtml],
      })
    default:
      return value
  }
}
