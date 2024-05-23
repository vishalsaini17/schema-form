import { Divider } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authDataSelector, setAuth } from "../../Redux/slices/authSlice";
import { setAuthUser } from "../../Redux/slices/authUserSlice";
import styles from "./signIn.module.scss";


const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector(authDataSelector)

  const handleSuccess = (credentialResponse) => {
    const parts = credentialResponse.credential.split('.');
    const payload = JSON.parse(atob(parts[1]));
    const email = payload.email;

    dispatch(setAuth({
      email,
      credential: credentialResponse.credential
    }));

    dispatch(setAuthUser({
      email,
      name: payload.name,
      picture: payload.picture,
      given_name: payload.given_name,
      family_name: payload.family_name,
    }))
  }

  useEffect(() => {
    if (!!email) {
      navigate("/")
    }
  }, [email, navigate])

  return (
    <>
      <h1 style={{ textAlign: "center" }}> Product Manage</h1>
      <Divider />
      <div className={styles.formBody}>
        <div className={styles.signBtnWrapper}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </div>
    </>
  )
}
export default SignIn;