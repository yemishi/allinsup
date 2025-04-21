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
  const [action, setAction] = useState<"signin" | "signup">("signin");
  const popStyle = `min-[768px]:h-[700px] max-w-xl ${isSubPop ? "bg-none" : "md:border md:border-primary-200"}`;
  return (
    <AnimatePresence mode="wait">
      {action === "signin" && (
        <DivDraggable
          key="sign-in form"
          changeOpacity
          disableDrag={isSubPop}
          className="flex justify-center bg-none self-center max"
          closeParent={onClose}
          initialDirection="-100%"
          removeAnimatePresence
        >
          <SignInForm
            onSuccess={onSignInSuccess}
            className={popStyle}
            disableExit={isSubPop}
            onClose={onClose}
            openSignUp={() => setAction("signup")}
          />
        </DivDraggable>
      )}
      {action === "signup" && (
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
            onClose={onClose}
            openSignIn={() => setAction("signin")}
          />
        </DivDraggable>
      )}
    </AnimatePresence>
  );
}
