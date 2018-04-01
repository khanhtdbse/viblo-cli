var postApi = require('viblo-sdk/api/posts')
var inquirer = require('inquirer')
var clear = require('clear')
var postDetail = require('./post-detail')

const allPosts = []
let currentPage = 1

const renderAllPosts = () => {
  clear()
  const allPostsWithPagination = [
    ...allPosts,
    ...[
      new inquirer.Separator(),
      {
        name: 'Load more',
        value: {
          action: 'LOAD_MORE'
        }
      },
      {
        name: 'Exit',
        value: 'exit'
      }
    ]
  ]

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'navigateObject',
        message: 'Newest posts on Viblo',
        choices: allPostsWithPagination,
        pageSize: 999
      }
    ])
    .then(async ({ navigateObject }) => {
      switch (navigateObject.action) {
        case 'POST_DETAIL':
          await postDetail(navigateObject.payload.slug)
          loadPosts(null)
          break
        case 'LOAD_MORE':
          await loadPosts(++currentPage)
          break
      }
    })
}

const loadPosts = async function (page = 1) {
  if (page === null) return renderAllPosts()

  var posts = await postApi.getPostsFeed(postApi.PostFeedType.Newest, { page })
  posts.data.every(post => {
    allPosts.push({
      name: post.title,
      value: {
        action: 'POST_DETAIL',
        payload: post
      }
    })
  })
  allPosts.push(new inquirer.Separator())
  renderAllPosts()
}

module.exports = loadPosts
