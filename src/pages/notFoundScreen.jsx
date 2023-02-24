

import { Link } from "react-router-dom"

const NotFoundScreen =()=> {
  return (
    <div
      css={{
        height: '100%',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        Sorry... nothing here. <Link to="/recipies">Go home</Link>
      </div>
    </div>
  )
}

export default NotFoundScreen
