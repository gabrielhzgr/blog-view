import AuthContext from "../Contexts/AuthContext.jsx";
import { useContext } from "react";
function useAuth() {
  return useContext(AuthContext);
}
export default useAuth;
