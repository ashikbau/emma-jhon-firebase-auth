import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const providerGoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider );
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (name,photo) =>{
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
          });
    }


      //   3. Email Verify
  const verifyEmail = () => {
    setLoading(true)
    return sendEmailVerification(auth.currentUser)
  }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

        //7. Forget Password
  const resetPassword = email => {
    console.log('email from',email)
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

    useEffect( () =>{
        const unSubscribe = onAuthStateChanged( auth, currentUser =>{
            console.log('current User inside state change', currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () => unSubscribe();

    }, [])

    const authInfo = { user, loading,setLoading, createUser, signIn, logOut,providerGoogleLogin,updateUser,verifyEmail,resetPassword }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;