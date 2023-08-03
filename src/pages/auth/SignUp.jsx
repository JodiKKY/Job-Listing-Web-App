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
        navigate("/sign-in");
      }, 3000);
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <main className="pt-[10vh]">
      <section className="max-w-[1000px] mx-auto p-5">
        <h1 className="text-center text-2xl font-bold">
          Create An Account
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
          <button onClick={createUser} className="px-4 py-2 bg-blue-500 text-white my-5">Submit</button>
        </form>
        <p>
          Already Have an Account?{" "}
          <span>
            <Link to={"/sign-in"} className="text-blue-500">Sign In</Link>
          </span>
        </p>
      </section>
    </main>
  );
}

export default SignUp;