

import Button from '../components/button/button'

import SideNav from '../components/sideNav/sideNav'
import Recipies from './recipies'

const AuthenticatedApp = ({user, logout}) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        {user.email}
        <Button btnType='blueGray' css={{marginLeft: '10px'}} onClick={logout}>
          Logout
        </Button>
      </div>
      <div
        style={{
          margin: '0 auto',
          padding: '4em 2em',
          maxWidth: '840px',
          width: '100%',
          display: 'grid',
          gridGap: '1em',
          gridTemplateColumns: '1fr 3fr',
        }}
      >
      <div
        style={{
          margin: '0 auto',
          padding: '4em 2em',
          maxWidth: '840px',
          width: '100%',
          display: 'grid',
          gridGap: '1em',
          gridTemplateColumns: '1fr 3fr',
        }}
      >
        <div css={{position: 'relative'}}>
          <SideNav />
        </div>
        <main css={{width: '100%'}}>
          <Recipies  />
        </main>
      </div>

      </div>
    </>
  )
}

export default AuthenticatedApp;
