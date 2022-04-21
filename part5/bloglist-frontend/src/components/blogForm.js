import { useState } from 'react'

const BlogForm = ({ createBlog, setNotification }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleNewBlog = async e => {
    e.preventDefault()
    try {
      await createBlog({title, author, url})
      setNotification({ style: "valid", message: `a new blog ${title} by ${author} added` })
      setTimeout(() => {
        setNotification({})
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      setNotification({ style: "invalid", message: "something went wrong when adding a new blog" })
      setTimeout(() => {
        setNotification({})
      }, 5000)
    }
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={url}
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm