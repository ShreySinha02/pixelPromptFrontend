import axios from "axios";
import { FormEvent, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function ImagePromptPage() {
  const [prompt, setPrompt] = useState("");
  const [loading,setLoading]=useState(false)
  const [imageUrl,setImage]=useState(null)

  const handleSubmit = async(e:FormEvent) => {
    e.preventDefault();
    setImage(null)
    setLoading(true)
    try {
      const data={prompt}
     const res= await axios.post(`${import.meta.env.VITE_BASE_URL}/images/getImage`,data,{
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      setImage(res.data.data.data.url)
      
    } catch (error) {

      console.log(error)
      
    }
    finally{
      setLoading(false)
      setPrompt('')
    }
  };
  return (
    <div className=" w-screen h-screen flex items-center justify-center flex-col space-y-2">
      <div className=" w-full flex items-center justify-center ">
        {loading&&<div>loading...</div>}
       {imageUrl&& <img className="w-2/6 rounded-md" src={imageUrl} alt="image"/>}
      </div>
      <div className="w-4/12 relative  rounded-md ">
        <form name="image" onSubmit={handleSubmit}>
          <textarea
          value={prompt}
            onChange={(e)=>{setPrompt(e.target.value)}}
            placeholder="Message PixelPrompt"
           className="w-full h-44 p-2 rounded-md bg-gray-200 text-gray-950 text-lg " />
          <button
            className="absolute bg-black h-8 w-8 right-2 bottom-4 rounded-full flex justify-center items-center"
            type="submit"
          >
            {!loading?<FaArrowUpLong />:<AiOutlineLoading3Quarters />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ImagePromptPage;
