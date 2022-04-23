import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const FilterForm = () => {
  const style = {
    marginBottom: 10
  }
  const dispatch = useDispatch()
  const handleFilter = (e) =>{
    dispatch(setFilter(e.target.value.toLowerCase()))
  }
  return (
    <div style={style}>
      filter <input onChange={handleFilter}/>
    </div>
  )
}

export default FilterForm