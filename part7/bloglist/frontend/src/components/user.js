import { Link, List, ListItem, Typography } from '@mui/material'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <>
      <Typography variant='h2' pt={5} >{user.name}</Typography>
      <Typography variant='h4' pt={3}>added blogs</Typography>
      <List>
        {user.blogs.map(blog =>
          <ListItem key={blog.id}>
            <Link href={`/blogs/${blog.id}`} underline='hover'>{blog.title}</Link>
          </ListItem>
        )}
      </List>
    </>
  )
}
export default User