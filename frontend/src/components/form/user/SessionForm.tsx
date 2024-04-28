import { AnimatePresence } from "framer-motion";
import { lazy, useState } from "react";
import SignInForm from "./SignInForm";
import DivDraggable from "../../ui/DivDraggable";
const SignUpForm = lazy(() => import("./SignUpForm"));

export default function SessionForm({
  onClose,
  onSignInSuccess,
  onSignUpSuccess,
}: {
  onClose: () => void;
  onSignInSuccess?: () => void;
  onSignUpSuccess?: () => void;
}) {
  const [count, setCount] = useState(0);
  return (
    <AnimatePresence mode="wait">
      {count === 0 && (
        <DivDraggable
          key="sign-in form"
          changeOpacity
          className="flex justify-center bg-none"
          closeParent={onClose}
          initialDirection="-100%"
          removeAnimatePresence
        >
          <SignInForm
            onSuccess={onSignInSuccess}
            className="max-h-[700px] max-w-xl md:border md:border-primary-200"
            onClose={onClose}
            openSignUp={() => setCount(1)}
          />
        </DivDraggable>
      )}
      {count === 1 && (
        <DivDraggable
          className="flex justify-center bg-none"
          key="sign-up form"
          changeOpacity
          closeParent={onClose}
          initialDirection="100%"
          removeAnimatePresence
        >
          <SignUpForm
            className="max-h-[700px] max-w-xl md:border md:border-primary-200"
            onSuccess={onSignUpSuccess}
            onClose={onClose}
            openSignIn={() => setCount(0)}
          />
        </DivDraggable>
      )}
    </AnimatePresence>
  );
}
