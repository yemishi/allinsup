import { AnimatePresence } from "framer-motion";
import { lazy, useState } from "react";

import DivDraggable from "../../ui/DivDraggable";
import { IoCloseSharp } from "react-icons/io5";
import MotionDiv from "../../ui/MotionDiv";
import SignInForm from "./SignInForm"


const SignUpForm = lazy(() => import("./SignUpForm"));
export default function Login({ onClose, onSignInSuccess }: { onClose: () => void; onSignInSuccess?: () => void }) {
  const [action, setAction] = useState<"signin" | "signup">("signin");

  return (
    <div
      className="flex flex-col items-center w-screen bg-gradient-to-tl overflow-x-hidden from-primary-500 to-primary 
    h-[100dvh] min-[768px]:h-[700px] max-w-xl md:border md:border-primary-200 p-5 md:rounded-xl relative"
    >
      <button type="button" className="ml-auto" onClick={onClose}>
        <IoCloseSharp className="h-8 w-8" />
      </button>

      <AnimatePresence mode="wait">
        {action === "signin" ? (
          <MotionDiv className="font-montserrat self-center text-3xl font-semibold mb-10" reverse key="sign-in text">
            Sign in
          </MotionDiv>
        ) : (
          <MotionDiv className="font-montserrat self-center text-3xl font-semibold mb-10" key="sign-up text">
            Sign up
          </MotionDiv>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {action === "signin" ? (
          <DivDraggable
            key="sign-in form"
            disableDrag
            changeOpacity
            className="bg-none"
            closeParent={onClose}
            initialDirection="-100%"
            removeAnimatePresence
          >
            <SignInForm onSuccess={onSignInSuccess} onClose={onClose} />
          </DivDraggable>
        ) : (
          <DivDraggable
            disableDrag
            key="sign-up form"
            className="bg-none"
            changeOpacity
            closeParent={onClose}
            initialDirection="100%"
            removeAnimatePresence
          >
            <SignUpForm gotoSignIn={() => setAction("signin")} />
          </DivDraggable>
        )}
      </AnimatePresence>

      <div className="flex font-lato text-lg gap-1">
        <span className="">{action === "signin" ? "Doesn't have an account?" : "Already have an account?"}</span>
        <button
          className="font-semibold text-secondary"
          onClick={() => setAction(action === "signin" ? "signup" : "signin")}
        >
          <AnimatePresence mode="wait">
            {action === "signin" ? (
              <MotionDiv justY key="got to sin up">
                Sign up
              </MotionDiv>
            ) : (
              <MotionDiv justY reverse key="got to sign in">
                Sign in
              </MotionDiv>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
