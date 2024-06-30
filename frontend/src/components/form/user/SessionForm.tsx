import { AnimatePresence } from "framer-motion";
import { lazy, useState } from "react";
import SignInForm from "./SignInForm";
import DivDraggable from "../../ui/DivDraggable";
const SignUpForm = lazy(() => import("./SignUpForm"));

export default function SessionForm({
  onClose,
  isSubPop,
  onSignInSuccess,
  onSignUpSuccess,
}: {
  onClose: () => void;
  isSubPop?: boolean;
  onSignInSuccess?: () => void;
  onSignUpSuccess?: () => void;
}) {
  const [count, setCount] = useState(0);
  const popStyle = `max-h-[700px] max-w-xl  ${
    isSubPop ? "bg-none" : "md:border md:border-primary-200"
  }`;
  return (
    <AnimatePresence mode="wait">
      {count === 0 && (
        <DivDraggable
          key="sign-in form"
          changeOpacity
          disableDrag={isSubPop}
          className="flex justify-center bg-none self-center"
          closeParent={onClose}
          initialDirection="-100%"
          removeAnimatePresence
        >
          <SignInForm
            onSuccess={onSignInSuccess}
            className={popStyle}
            disableExit={isSubPop}
            onClose={() => {
              onClose(), (document.body.style.overflow = "");
            }}
            openSignUp={() => setCount(1)}
          />
        </DivDraggable>
      )}
      {count === 1 && (
        <DivDraggable
          className="flex justify-center bg-none self-center"
          disableDrag={isSubPop}
          key="sign-up form"
          changeOpacity
          closeParent={onClose}
          initialDirection="100%"
          removeAnimatePresence
        >
          <SignUpForm
            className={popStyle}
            disableExit={isSubPop}
            onSuccess={onSignUpSuccess}
            onClose={() => {
              onClose(), (document.body.style.overflow = "");
            }}
            openSignIn={() => setCount(0)}
          />
        </DivDraggable>
      )}
    </AnimatePresence>
  );
}
