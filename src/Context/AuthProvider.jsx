import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password, role) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const response = await fetch("https://job-board-server-omega.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          role: role
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        return { success: true, message: "Registration successful! Please login." };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: error.message };
    }
  };

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const token = await firebaseUser.getIdToken();
      const jwtResponse = await fetch("https://job-board-server-omega.vercel.app/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token }),
      });
      
      if (jwtResponse.ok) {
        const profileRes = await fetch("https://job-board-server-omega.vercel.app/profile", {
          credentials: "include",
        });
        
        if (profileRes.ok) {
          const data = await profileRes.json();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: data.role,
          });
          return { success: true };
        }
      }
      return { success: false, message: "Login failed" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error.message };
    }
  };

  const logOutUser = async () => {
    try {
      await fetch("https://job-board-server-omega.vercel.app/logout", {
        method: "POST",
        credentials: "include",
      });
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          setLoading(true);
          const profileRes = await fetch("https://job-board-server-omega.vercel.app/profile", {
            method: "GET",
            credentials: "include",
          });

          if (profileRes.ok) {
            const data = await profileRes.json();
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              role: data.role,
            });
          } else {
            setUser(null);
          }
        } catch (err) {
          console.log("Auth state error:", err);
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;