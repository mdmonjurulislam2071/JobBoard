import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   

  const createUser=(email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password);

  }
  
  const loginUser=(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password);
  }


   const logOutUser=()=>{
    return signOut(auth);
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
    loginUser,
    logOutUser

  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;