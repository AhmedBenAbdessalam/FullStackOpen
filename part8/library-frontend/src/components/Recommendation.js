import { useQuery } from "@apollo/client"
import { ALL_BOOKS_GENRE } from "../queries"

const Recommendation = ({ show, genre }) => {
  const genreResult = useQuery(ALL_BOOKS_GENRE, {
    variables: { genre }
  })
  if (!show) {
    return null
  }
  if (genreResult.loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h2>Recommendation</h2>
      <p>
        books in your favorite genre <b>{genre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genreResult.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendation