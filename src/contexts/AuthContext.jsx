import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '@/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Observer for user state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // console.log("User state changed:", currentUser);
    });
    return () => unSubscribe();
  }, []);

  // Create User
  const signUp = async (email, password, name, photo) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // update profile
      await firebaseUpdateProfile(result.user, {
        displayName: name,
        photoURL: photo
      });
      toast.success("Account created!");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login User
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
    } catch (error) {
      console.log(error);
      toast.error("Email or Password doesn't match");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      toast.success("Google Login Successful");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const signOut = async () => {
    setLoading(true);
    return firebaseSignOut(auth).then(() => {
      toast.success("Logged out");
      setLoading(false);
    });
  };

  // Update Profile Info
  const updateUserInfo = async (name, photo) => {
    return firebaseUpdateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    })
      .then(() => {
        toast.success("Profile Updated");
        // force refresh user
        setUser({ ...auth.currentUser });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Reset Pass
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
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
