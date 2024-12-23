import  { useContext } from 'react'
import { NavLink } from 'react-router'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
    const authContext=useContext(AuthContext)
    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
      }
    const {state,dispatch}=authContext
    const handleClick=()=>{
        dispatch({type:'logout'})
        localStorage.removeItem('accessToken')
    }
  return (
    <div className='w-full h-12 bg-gray-600 flex flex-row justify-between p-4 items-center  fixed top-0'>
        <div >
        <NavLink to="">Logo</NavLink>
        </div>
        <div >
            {!state.isAuthenticated?(<div className=' flex flex-row space-x-2'>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">SignUp</NavLink>
            </div>):(<button onClick={handleClick}>Logout</button>)}
        </div>
    </div>
  )
}

export default Navbar