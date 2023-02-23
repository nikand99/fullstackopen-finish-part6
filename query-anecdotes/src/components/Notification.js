import { useContext } from 'react'
import CounterContext from '../CounterContext'

const Notification = () => {
  const [notification, ] = useContext(CounterContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  console.log('notification: ', notification)
  if(notification === 0) {
    return  ''
  }
  else {
    return (
    <div style={style}>
      {notification}
    </div>
  )
  }
}

export default Notification
