import { useApolloClient, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendation from './components/Recommendation'
import { ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ME)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  useEffect(() => {
    if (result.data) {
      setFavoriteGenre(result.data.me.favoriteGenre)
    }
  }, [result.data])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token
            ? <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommendation')}>recommend</button>
              <button onClick={() => {
                logout()
                setPage('authors')
              }}>logout</button>
            </>
            : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommendation show={page === 'recommendation'} genre={favoriteGenre} />
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
