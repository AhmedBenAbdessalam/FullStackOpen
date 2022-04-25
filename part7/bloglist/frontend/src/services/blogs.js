import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}



const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  if(newObject.like === undefined){
    newObject.like = 0
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${newObject.id}`, { ...newObject },config)
  return request.then(response => response.data)

}
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, setToken, create, update, remove }