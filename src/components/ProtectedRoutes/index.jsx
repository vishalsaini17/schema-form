import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authDataSelector } from "../../Redux/slices/authSlice";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate()
  const { email } = useSelector(authDataSelector);
  useEffect(() => {
    if (!email) {
      navigate("/signin");
    }
  }, [email, navigate])

  return (
    <>
      {children}
    </>
  );
}

export default ProtectedRoutes;