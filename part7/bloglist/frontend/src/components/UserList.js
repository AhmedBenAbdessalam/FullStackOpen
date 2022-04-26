import { Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
const UserList = ({ users }) => {

  return (
    <div>
      <Typography variant='h2' pt={5}>Users</Typography>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user =>
            <TableRow key={user.id}>
              <TableCell><Link underline="none" href={`/users/${user.id}`}>{user.name}</Link></TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
export default UserList