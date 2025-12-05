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
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Monitor auth state changes
  useEffect(() => {
    if (!auth) {
      console.error("Firebase auth not configured");
      setIsAuthLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (email, password, fullName, photoURL) => {
    if (!auth) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (fullName || photoURL) {
        await firebaseUpdateProfile(userCredential.user, {
          displayName: fullName,
          photoURL: photoURL || null
        });
      }
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    if (!auth) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
    } catch (error) {
      toast.error("Invalid email or password.");
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    if (!auth) return;
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setCurrentUser(result.user);
      toast.success("Successfully signed in with Google.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signOut = async () => {
    if (!auth) return;
    try {
      await firebaseSignOut(auth);
      toast.success("See you soon!");
    } catch (error) {
      toast.error("Error signing out.");
    }
  };

  const updateUserInfo = async (name, photoURL) => {
    if (!auth.currentUser) return;
    try {
      await firebaseUpdateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL
      });
      await auth.currentUser.reload();
      setCurrentUser({ ...auth.currentUser });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent.");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const value = {
    user: currentUser,
    loading: isAuthLoading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile: updateUserInfo,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!isAuthLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
