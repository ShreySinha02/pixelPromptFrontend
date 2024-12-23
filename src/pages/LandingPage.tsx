import {  NavLink } from "react-router";
import Typewriter from "typewriter-effect";

function LandingPage() {
  return (
    <div className=" w-full h-full flex flex-col justify-center items-center space-y-8 ">

     <div className=" text-6xl font-bold">
      <Typewriter
        options={{
          strings: ["Welcome to PixelPrompt", "Please Login/SignUp"],
          autoStart: true,
          loop: true,
        }}
      />
      </div>  
      <div className=" flex space-x-2 font-bold text-3xl ">
        <NavLink className=" bg-slate-800 w-36 h-12 items-center flex justify-center rounded-xl" to="/login">LogIn</NavLink>
        <NavLink className=" bg-slate-800 w-36 h-12 items-center flex justify-center rounded-xl" to="/signup">SignUp</NavLink>
        </div> 
    </div>
  );
}

export default LandingPage;
