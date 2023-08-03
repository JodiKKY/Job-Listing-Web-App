import { useState } from "react";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function resetFields() {
    setEmail("");
    setPassword("");
  }
  //Navigation
  const navigate = useNavigate();
  
  async function createUser(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      resetFields();
      toast.success("User Account Successfully Created!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <main>
      <h1>Create An Account</h1>
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
        <button onClick={createUser}>Submit</button>
      </form>
      <p>Have An Account? <span><Link to={"/"}>Sign In</Link></span></p>
    </main>
  );
}

export default SignUp;