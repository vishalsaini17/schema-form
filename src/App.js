import { GoogleOAuthProvider } from "@react-oauth/google";
import Router from "./Router";

function App() {
  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;


  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <Router />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
