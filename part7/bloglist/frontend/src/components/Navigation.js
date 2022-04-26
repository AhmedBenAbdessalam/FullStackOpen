import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Navigation = ({ message }) => {
  const dispatch = useDispatch()
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/"> blogs </Button>
        <Button color="inherit" component={Link} to="/users"> users </Button>
        <Container sx={
          {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }
        }>
          <Typography variant="body2">{message}</Typography>
          <Button sx={{ ml: 2 }} variant="outlined" color="inherit" onClick={() => dispatch(logout())}>logout</Button>
        </Container>
      </Toolbar>
    </AppBar >
  )
}

export default Navigation