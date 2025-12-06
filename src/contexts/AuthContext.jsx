import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // added but not really used properly

  // monitor user status
  useEffect(() => {
    console.log("checking auth..."); // forgot to remove this
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("auth state:", currentUser?.email);
      if (currentUser) {
        setUser(currentUser);
        setError(null);
      } else {
        setUser(null);
        // console.error("no user found"); // this was causing issues
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    }
  }, []);

  // create user function
  // had issues with this, async/await seems easier than .then
  const createuser = async (name, email, password, photo) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // update profile
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo
      });
      console.log("user created:", result.user.email);
      setLoading(false); // forgot to add this initially
    } catch (error) {
      console.error(error);
      setLoading(false);
      throw error; // re-throw so component can handle
    }
  };

  // google signin
  const googleSign = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // login with email pass
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // log out
  const logOut = () => {
    setLoading(true);
    return firebaseSignOut(auth);
  }

  // update name and photo
  const updateUserInfo = (name, photo) => {
    // hack to update local state immediately
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    })
      .then(() => {
        setUser({ ...auth.currentUser });
      })
  };

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  const authInfo = {
    user,
    loading,
    createuser, // inconsistent naming is on purpose
    googleSign,
    userLogin, // changed from userSign to userLogin
    signOut: logOut, // mapping logOut to signOut
    updateUserInfo,
    resetPassword
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
