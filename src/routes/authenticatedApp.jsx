// import SideNav from '../components/navigation/sideNav/sideNav'
// import Recipies from './recipies'
import MainNav from '../components/navigation/mainNav/mainNav'
import AddEditRecipeForm from '../components/addEditRecipeForm/addEditRecipeForm'

const AuthenticatedApp = ({user, logout}) => {
  return (
    <>
    <MainNav user={user} logout={logout} />
    {/* <div css={{position: 'relative'}}>
      
    </div> */}
    <main className='authApp'>
      {/* <SideNav /> */}
      {/* <Recipies  /> */}
      <AddEditRecipeForm/>

    </main>

    </>
  )
}

export default AuthenticatedApp;
