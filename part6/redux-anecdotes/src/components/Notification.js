import { connect } from "react-redux"
const Notification = prop => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
      {prop.message !== ''
      ? <div style={style}>
          {prop.message }
      </div>
      : null}
      </>
    
    
  )
}
const mapStateToProps = state => {
  return {
    message: state.message
  }
}

export default connect(mapStateToProps)(Notification)