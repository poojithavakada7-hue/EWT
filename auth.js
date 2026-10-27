import { auth } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// ========================================
// SIGNUP
// ========================================

const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("message");


if (signupForm) {

    signupForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            console.log("User created:", user.uid);

            // Save name temporarily
            localStorage.setItem(
                "aaharaName",
                name
            );

            if (signupMessage) {

                signupMessage.textContent =
                    "Account created successfully!";

            }

            /*
             * After signup, go to LOGIN.
             */
            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 1000);


        } catch (error) {

            console.error(error);

            if (signupMessage) {

                signupMessage.textContent =
                    getFirebaseErrorMessage(error.code);

            }

        }

    });

}


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("message");


if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        try {

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user =
                userCredential.user;


            console.log(
                "Login successful:",
                user.uid
            );


            if (loginMessage) {

                loginMessage.textContent =
                    "Login successful!";

            }


            /*
             * After successful login,
             * open onboarding page.
             */

            setTimeout(() => {

                window.location.href =
                    "onboarding.html";

            }, 700);


        } catch (error) {

            console.error(error);

            if (loginMessage) {

                loginMessage.textContent =
                    getFirebaseErrorMessage(error.code);

            }

        }

    });

}


// ========================================
// FIREBASE ERROR MESSAGES
// ========================================

function getFirebaseErrorMessage(code) {

    switch (code) {

        case "auth/email-already-in-use":
            return "This email is already registered.";

        case "auth/invalid-email":
            return "Please enter a valid email.";

        case "auth/weak-password":
            return "Password should be at least 6 characters.";

        case "auth/invalid-credential":
            return "Incorrect email or password.";

        case "auth/user-not-found":
            return "No account found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        default:
            return "Something went wrong. Please try again.";

    }

}