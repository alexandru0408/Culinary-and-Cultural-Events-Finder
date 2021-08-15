import { AiOutlineUser } from "react-icons/ai";
import { useState, useEffect, useContext } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

import Layout from "@/components/Layout/Layout";
import AuthContext from "@/context/AuthContext";


export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


   const { login, error } = useContext(AuthContext);

  
  const handleSubmit = (e) => {
    e.preventDefault();
   login({email,password})
  };

  return (
    <Layout title="Benutzer Login">
      <div className="login">
        <h1>
          <AiOutlineUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">E-mail Adresse</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Passwort</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="Login" className="login__btn" />
        </form>
        <p>
          Kein Konto ? <Link href="/account/register">Registrieren</Link>
        </p>
      </div>
      ;
    </Layout>
  );
}
