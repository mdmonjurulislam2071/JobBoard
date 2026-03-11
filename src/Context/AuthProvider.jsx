import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   

  const createUser=(email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password);

  }
  
  const loginUser=(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password);
  }


   useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);
      setLoading(false);

    });

    return () => {
      unsubscribe();
    };

  }, []);


  const authInfo = {
    user,
    loading,
    createUser,
    loginUser

  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;