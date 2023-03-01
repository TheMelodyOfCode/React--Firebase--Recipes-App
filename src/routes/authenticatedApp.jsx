import SideNav from '../components/navigation/sideNav/sideNav'
import Recipies from './recipies'
import MainNav from '../components/navigation/mainNav/mainNav'


const AuthenticatedApp = ({user, logout}) => {
  return (
    <>
    <MainNav user={user} logout={logout} />

      
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
