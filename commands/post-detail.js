const postApi = require('viblo-sdk/api/posts')
const chalk = require('chalk')
const figlet = require('figlet')
const pager = require('node-pager')
const marked = require('marked')
const TerminalRenderer = require('marked-terminal')

marked.setOptions({
  renderer: new TerminalRenderer()
})

module.exports = async function (postSlug) {
  const post = await postApi.getPost(postSlug).catch(e => console.log(e))
  const header = figlet.textSync(post.data.user.data.username)
  const title = chalk.white.bold.underline.bgBlue(post.data.title)
  pager(header + '\n' + title + '\n\n\n' + marked(post.data.contents))
}
