import { createContext, useEffect, useReducer, ReactNode } from "react";

// Define the shape of the authentication state
interface AuthState {
  isAuthenticated: boolean;
}

// Define the possible actions for the reducer
type AuthAction = 
  | { type: "login" }
  | { type: "logout" };

// Define the context type
interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

// Create the AuthContext with an initial type of null
const AuthContext = createContext<AuthContextType | null>(null);

// Define the initial state for the reducer
const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("accessToken"),
};

// Define the reducer function with proper types
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "login":
      return { isAuthenticated: true };
    case "logout":
      return { isAuthenticated: false };
    default:
      return state; // Add this to satisfy exhaustive checks
  }
};

// Define the AuthProvider props type
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch({ type: "login" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
