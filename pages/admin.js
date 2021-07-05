import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import Login from "../components/Admin/Login";
import Panel from "../components/Admin/Panel";

function Admin() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const authListner = firebase.auth().onAuthStateChanged(setUser);

    return authListner;
  });

  const login = async (email, pass) => {
    if (!email) throw new Error("No email entered");
    if (!pass) throw new Error("No pass entered");
    const user = await firebase.auth().signInWithEmailAndPassword(email, pass);
    setUser(user);
  };

  const register = async (email, pass) => {
    if (!email) throw new Error("No email entered");
    if (!pass) throw new Error("No pass entered");
    const user = await firebase.auth().createUserWithEmailAndPassword(email, pass);
    setUser(user);
  };

  if (user === undefined) return null;

  return user ? <Panel /> : <Login login={login} register={register} />;
}

export default Admin;
