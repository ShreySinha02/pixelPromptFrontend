import { NavLink } from "react-router"

function Info() {
  return (
    <div className=" absolute  right-2 bottom-2 w-full flex space-x-2  justify-end h-12 items-center p-4 ">
        <h1>Made by Shrey</h1>
        <NavLink to="https://github.com/ShreySinha02">Github</NavLink>
        <NavLink to="https://www.linkedin.com/in/shrey07/">LinkedIn</NavLink>
    </div>
  )
}

export default Info