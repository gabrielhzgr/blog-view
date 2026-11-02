import AuthContext from "../Contexts/AuthContext";
function AuthProvider({ children }) {
  return <AuthContext>{children}</AuthContext>;
}

export default AuthProvider;
