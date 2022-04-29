import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Select from 'react-select';

const AuthorForm = ({ authors }) => {
  const [born, setBorn] = useState('')
  const [updateBirth, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const submit = e => {
    e.preventDefault()
    updateBirth({
      variables: {
        name: selectedOption.value,
        "setBornTo": Number(born)
      }
    })
    setBorn('')
  }
  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('author not found')
    }
  }, [result.data])
  const options = authors.map(a => ({ value: a.name, label: a.name }))
  const [selectedOption, setSelectedOption] = useState(options[0]);
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}
export default AuthorForm