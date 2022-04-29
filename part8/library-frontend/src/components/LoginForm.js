import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries"

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN)
  useEffect(() => {
    if (result.data) {
      setToken(result.data.login.value)
      localStorage.setItem('library-user-token', result.data.login.value)
      setPage('authors')
    }
  }, [result.data]) // eslint-disable-line
  if (!show) {
    return null
  }

  const submit = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
  }
  return (
    <form onSubmit={submit}>
      <div>
        name <input value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        password <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <button typeof="submit">login</button>
      </div>
    </form>
  )
}
export default LoginForm