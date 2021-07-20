const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((accum,item) => accum + item.likes, 0)
  }

  const favoriteBlog = (blogs) => {
    return blogs.reduce((p, c) => p.likes > c.likes ? p : c)
  }

  const mostBlogs = (blogs) => {

    const authors = _.map(_.countBy(blogs, "author"), (val, key) => ({ author: key, blogs: val }))
    const topAuthor = authors.reduce((max, obj) => (max.blogs > obj.blogs) ? max : obj);

    return topAuthor

  }

  const mostLikes = (blogs) => {

    const authorLikes = _(blogs)
      .groupBy('author')
      .map((objs, key) => ({
          'author': key,
          'likes': _.sumBy(objs, 'likes') }))
      .value()
    
    const topLikes = authorLikes.reduce((max, obj) => (max.likes > obj.likes) ? max : obj);
    return topLikes

  }



  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }