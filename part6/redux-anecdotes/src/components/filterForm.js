import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const FilterForm = props => {
  const style = {
    marginBottom: 10
  }
  const handleFilter = (e) =>{
    props.setFilter(e.target.value.toLowerCase())
  }
  return (
    <div style={style}>
      filter <input onChange={handleFilter}/>
    </div>
  )
}

export default connect(null,{setFilter})(FilterForm)