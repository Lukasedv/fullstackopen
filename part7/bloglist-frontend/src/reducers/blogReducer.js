import blogService from '../services/blogs'


const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE_BLOG': {
    return state.map(
      blog => blog.id !== action.data.id ? blog: action.data
    )}
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = await blogService.like(blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}


export default blogReducer