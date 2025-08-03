import { useEffect, useState } from "react";
import { Navigate, replace, useNavigate } from "react-router-dom";

import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("jack@example.com s");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated , logout} = useAuth();

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if ((email&&password)) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", {replace : true});
    },
    [isAuthenticated,navigate]
  );

 

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        k
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
