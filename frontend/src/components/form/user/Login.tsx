import { AnimatePresence } from "framer-motion";
import { HTMLAttributes, lazy, useState } from "react";

import { IoCloseSharp } from "react-icons/io5";
import MotionDiv from "../../ui/MotionDiv";
import SignInForm from "./SignInForm";
import { cleanClasses } from "../../../utils/helpers";

const SignUpForm = lazy(() => import("./SignUpForm"));
interface Props extends HTMLAttributes<HTMLDivElement> {
  onSignInSuccess?: () => void;
  onClose: () => void;
  disableExit?: boolean;
}
export default function Login({ disableExit, onClose, onSignInSuccess, ...rest }: Props) {
  const { className = "" } = rest;

  const [action, setAction] = useState<"signin" | "signup">("signin");

  return (
    <div
      className={cleanClasses(
        className,
        `flex flex-col items-center w-screen bg-gradient-to-tl from-primary-500 to-primary overflow-x-hidden  
    h-[100dvh] min-[768px]:h-[700px] max-w-xl md:border md:border-primary-200 p-5 md:rounded-xl`
      )}
    >
      {!disableExit && (
        <button type="button" className="ml-auto" onClick={onClose}>
          <IoCloseSharp className="h-8 w-8" />
        </button>
      )}

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
          <MotionDiv key="sign-in form" className="w-full h-full px-5" reverse>
            <SignInForm onSuccess={onSignInSuccess} onClose={onClose} />
          </MotionDiv>
        ) : (
          <MotionDiv key="sign-up form" className="w-full h-full px-5">
            <SignUpForm gotoSignIn={() => setAction("signin")} />
          </MotionDiv>
        )}
      </AnimatePresence>

      <div className="flex font-lato text-lg gap-1">
        <AnimatePresence mode="wait">
          {action === "signin" ? (
            <MotionDiv justY reverse key="got to sin up">
              Doesn't have an account?
            </MotionDiv>
          ) : (
            <MotionDiv justY key="got to sign in">
              Already have an account?
            </MotionDiv>
          )}
        </AnimatePresence>

        <button
          className="font-semibold text-secondary hover:brightness-125 duration-100 transition-all"
          onClick={() => setAction(action === "signin" ? "signup" : "signin")}
        >
          <AnimatePresence mode="wait">
            {action === "signin" ? (
              <MotionDiv justY key="got to sin up">
                Sign up here!
              </MotionDiv>
            ) : (
              <MotionDiv justY reverse key="got to sign in">
                Sign in here!
              </MotionDiv>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
