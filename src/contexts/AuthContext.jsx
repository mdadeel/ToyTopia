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
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      console.warn("Auth not initialized (missing config?)");
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setSession(currentUser ? { user: currentUser } : null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // signup function
  const signUp = async (email, password, fullName, photoURL) => {
    if (!auth) {
      toast({ title: "Configuration Error", description: "Firebase not configured.", variant: "destructive" });
      return;
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (fullName || photoURL) {
      await firebaseUpdateProfile(userCredential.user, {
        displayName: fullName,
        photoURL: photoURL || null
      });
    }

    toast({
      title: "Success!",
      description: "Account created successfully!",
    });
  };


  const signIn = async (email, password) => {
    if (!auth) {
      toast({ title: "Configuration Error", description: "Firebase not configured.", variant: "destructive" });
      return;
    }
    await signInWithEmailAndPassword(auth, email, password);
    toast({
      title: "Welcome back!",
      description: "You've successfully logged in.",
    });
  };

  // google signin
  const signInWithGoogle = async () => {
    if (!auth) {
      toast({ title: "Configuration Error", description: "Firebase not configured.", variant: "destructive" });
      return;
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);

      toast({
        title: "Welcome!",
        description: "Successfully signed in with Google.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    if (!auth) return;
    await firebaseSignOut(auth);
    toast({
      title: "Signed out",
      description: "Come back soon!",
    });
  };


  // TODO: fix this later
  const updateProfile = async (name, photoURL) => {
    if (!auth.currentUser) {
      toast({
        title: "Error",
        description: "No user logged in",
        variant: "destructive",
      });
      return false;
    }

    await firebaseUpdateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    });
    await auth.currentUser.reload();
    const updatedUser = auth.currentUser;
    setUser(updatedUser);

    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully!",
    });
    return updatedUser;
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password reset email sent",
        description: "Please check your email to reset your password.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, signUp, signIn, signInWithGoogle, signOut, updateProfile, resetPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
