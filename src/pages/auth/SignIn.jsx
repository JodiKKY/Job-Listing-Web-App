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
    localStorage.setItem("user", JSON.stringify(auth.currentUser));
    console.log(auth);
    toast.success("Logged In");
    setTimeout(() => {
      navigate("/app/jobs");
    }, 3000);
  }
  return (
    <main className="pt-[10vh]">
      <section className="max-w-[1000px] mx-auto p-5">
        <h1 className="text-center text-2xl font-bold">
          Sign In To Your Account👋
        </h1>
        <form>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full px-4 py-2"
          />
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full px-4 py-2"
          />
          <br />
          <br />
          <button onClick={signIn} className="px-4 py-2 bg-blue-500 text-white my-5">Submit</button>
        </form>
        <p>
          New User?{" "}
          <span>
            <Link to={"/signup"} className="text-blue-500">Sign Up</Link>
          </span>
        </p>
      </section>
    </main>
  );
}

export default SignIn;
