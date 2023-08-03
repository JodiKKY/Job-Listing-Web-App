//Firebase Authentication
import { useState } from "react";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function SignIn() {
  //State Values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Navigation
  const navigate = useNavigate();
  //Reset Fields
  function resetFields() {
    setEmail("");
    setPassword("");
  }
  async function signIn(e) {
    e.preventDefault();
    resetFields();
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("user",JSON.stringify(auth.currentUser))
    console.log(auth)
    toast.success("Logged In");
    setTimeout(() => {
      navigate("/app/dashboard");
    }, 3000);
  }
  return (
    <main>
      <h1>Sign In To Your Account👋</h1>
      <form>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          name=""
          id=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name=""
          id=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={signIn}>Submit</button>
      </form>
      <p>New User? <span><Link to={"/signup"}>Sign Up</Link></span></p>
    </main>
  );
}

export default SignIn;