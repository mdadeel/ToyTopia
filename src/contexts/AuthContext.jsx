import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '@/config/firebase';
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

  // monitor user status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("auth state:", currentUser?.email);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    }
  }, []);

  // create user function
  // logic from firebase docs
  const createuser = (name, email, password, photo) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        // update profile after creation
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo
        })
      })
      .then(() => {
        // console.log("updated")
      })
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
