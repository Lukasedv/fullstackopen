const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((accum,item) => accum + item.likes, 0)
  }

  const favoriteBlog = (blogs) => {
    return blogs.reduce((p, c) => p.likes > c.likes ? p : c)
  }

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }