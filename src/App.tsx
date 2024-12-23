import { Outlet } from "react-router"
import Navbar from "./components/Navbar"
import Info from "./components/Info"

function App() {
 
  
  return (
    <div className="w-screen  relative h-screen bg-black text-white">
      <Navbar/>
     <Outlet/>
     <Info/>
    </div>
  )
}

export default App
