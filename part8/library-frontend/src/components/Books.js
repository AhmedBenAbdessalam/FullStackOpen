import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS_GENRE } from "../queries"

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const result = useQuery(ALL_BOOKS_GENRE)
  const [loadFiltered, { data, loading, refetch }] = useLazyQuery(ALL_BOOKS_GENRE,)
  useEffect(() => {
    if (result.data) {
      const genres = result.data.allBooks.reduce((previous, current) => {
        current.genres.forEach((genre) => {
          if (!previous.includes(genre)) {
            previous.push(genre)
          }
        })
        return previous
      }, [])
      setGenres(genres)
      setFilteredBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    console.log("ay");
    if (data) {
      setFilteredBooks(data.allBooks)
    }
  }, [data])
  if (!props.show) {
    return null
  }
  if (loading) {
    return <div>Loading...</div>
  }

  const filter = genre => {
    if (genre === "all") {
      setFilteredBooks(result.data.allBooks)
    }
    else {
      refetch({ genre })
      loadFiltered({ variables: { genre } })
    }

  }
  return (
    <div>
      <h2>books</h2>!
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => { filter(genre) }}>{genre}</button>
      ))}
      <button onClick={() => { filter("all") }}>all</button>
    </div>
  )
}
export default Books
