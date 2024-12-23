import { useState, FocusEvent, ChangeEvent,useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authContext = useContext(AuthContext);

  // Handle null AuthContext
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { dispatch } = authContext;

  const navigate=useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

  
    setIsLoading(true);
    try {
      const data = { email, password };
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        data,{
            headers:{
                "Content-Type": "application/json"
            }
        }
      );
      localStorage.setItem('accessToken',res.data.data.accessToken)
      localStorage.setItem('refreshToken',res.data.data.refreshToken)
      dispatch({type:'login'})
      if(res.data.success)
      {
        navigate('/image')
      }
      console.log(res.data.success)
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.type === "email") {
      setEmailError(null); // Clear the email error on focus
    }
    if (e.target.type === "password") {
      setPasswordError(null); // Clear the email error on focus
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.type === "email") {
      if (!email) {
        setEmailError("Email is required");
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError("Please enter a valid email address");
      }
    }

    if (e.target.type === "password") {
      if (!password) {
        setPasswordError("Password is required");
      } else if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters");
      } else {
        setPasswordError(null);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <form
        className="w-3/12 flex flex-col space-y-4 text-black"
        name="signUp"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <input
            className="h-10 rounded-md p-2"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Please Enter your email"
          />
          {emailError && (
            <span className="text-red-500 text-sm">{emailError}</span>
          )}
        </div>

        <div className="flex flex-col relative">
          <input
            className="h-10 rounded-md p-2 pr-10"
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            autoComplete="true"
            placeholder="Please Enter password"
          />
          <button
            type="button"
            className="absolute right-2 top-2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <span role="img" aria-label="Hide Password">
                👁️‍🗨️
              </span>
            ) : (
              <span role="img" aria-label="Show Password">
                👁️
              </span>
            )}
          </button>
          {passwordError && (
            <span className="text-red-500 text-sm">{passwordError}</span>
          )}
        </div>

        <input
          className={`h-10 rounded-md bg-slate-900 text-white cursor-pointer ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          type="submit"
          value={isLoading ? "Loading..." : "Login"}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}

export default LoginPage;
