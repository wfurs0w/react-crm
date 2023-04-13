import React, { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const redirectToRoles = useCallback(() => {
    navigate("/roles");
  }, [navigate]);

  const redirectToAccount = useCallback(() => {
    navigate("/account");
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user && user.providerData[0]?.providerId === "firebase") {
        try {
          const doc = await firebase.firestore().collection("users").doc(user.uid).get();
          if (doc.exists) {
            localStorage.setItem("user", JSON.stringify(user.role));
            redirectToAccount();
          } else {
            redirectToRoles();
          }
        } catch (error) {
          setErrorMessage("Error while checking if user exists in Firestore:", error);
        }
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [redirectToRoles, redirectToAccount, navigate]);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        const { user } = authResult;
        const phoneNumber = user.phoneNumber;
        localStorage.setItem("user", JSON.stringify(user));
  
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .set({
                  uid: user.uid,
                  displayName: user.displayName,
                  email: user.email,
                  phoneNumber: phoneNumber,
                })
                .then(() => {
                  redirectToRoles();
                })
                .catch((error) => {
                  setErrorMessage("Error while adding user data to Firestore:", error);
                });
            } else {
              redirectToAccount();
            }
          })
          .catch((error) => {
            setErrorMessage("Error when checking if user exists in Firestore:", error);
          });
  
        return false;
      },
    },
  };

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  );
};

