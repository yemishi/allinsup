import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";

import axiosRequest from "../../services/axios.config";

import { redirect } from "react-router-dom";

import { Button, MotionDiv } from "../../ui";

import PaymentMethod from "./MethodPicker/MethodPicker";
import stripeCheckout from "./stripeCheckout";

import { IoCloseSharp } from "react-icons/io5";

import Summary from "./CheckoutSummary/CheckoutSummary";
import Steps from "./CheckoutSteps/CheckoutSteps";
import UserAddress from "./UserAddress/UserAddress";
import createOrder from "./createOrder";
import { useCart } from "../../context/Provider";
import { ErrorWrapper, Login, UserAddressForm } from "../index";

export default function CheckoutGrid({ onClose }: { onClose: () => void }) {
  const { cart, updateCart } = useCart();
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["user info"],
    refetchOnWindowFocus: false,
    queryFn: () => axiosRequest.user.info(),
  });
  const [isFetching, setIsFetching] = useState(false);

  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("");

  if (data?.error && step !== 0) setStep(0);

  const next = async () => {
    if (step === 0.5) return setStep(1);
    if (step !== 3) return setStep(step + 1);
    const methodChoice = method.toLocaleLowerCase();

    if (methodChoice === "paypal" || methodChoice === "card")
      return await stripeCheckout({ method: methodChoice, cart });
    const onFinally = () => {
      setIsFetching(false);
      updateCart([]);
      redirect("/");
      onClose();
    };

    createOrder(cart, method, setIsFetching, onFinally, updateCart);
  };
  const RenderStep = {
    0: (
      <Login
        key="login-step"
        className="bg-none border-none"
        disableExit
        onSignInSuccess={() => {
          refetch();
          setTimeout(() => setStep(1), 100);
        }}
        onClose={() => setStep(1)}
      />
    ),
    0.5: !data?.error && (
      <MotionDiv justY key="delivery-form-step">
        <UserAddressForm onSuccess={refetch} userInfo={data} onClose={() => setStep(1)} />
      </MotionDiv>
    ),
    1: !data?.error && <UserAddress key="address-step" toggleForm={() => setStep(0.5)} userInfo={data!} />,
    2: <PaymentMethod key="payment-step" method={method} setMethod={setMethod} />,
    3: <Summary key="summary-step" method={method} cart={cart} />,
  }[step];

  const RenderTitle = {
    0: <></>,
    0.5: (
      <MotionDiv reverse key="delivery-form-title">
        <h2>Set a new address</h2>
      </MotionDiv>
    ),
    1: (
      <MotionDiv reverse key="delivery-title">
        <h2>Delivery address</h2>
      </MotionDiv>
    ),
    2: (
      <MotionDiv reverse key="payment-title">
        <h2>Payment Method</h2>
      </MotionDiv>
    ),
    3: (
      <MotionDiv reverse key="summary-title">
        <h2>Summary</h2>
      </MotionDiv>
    ),
  }[step];
  const textNext = {
    0.5: "Back",
    1: "Next",
    2: "Confirm",
    3: "Complete purchase",
  }[step];

  const disableNextAction =
    (step === 2 && !method) || (step === 1 && !data?.error && !data?.address)
      ? "pointer-events-none grayscale text-black"
      : "";

  return (
    <div className="modal-container">
      <ErrorWrapper
        className="my-auto shadow-none bg-none"
        error={!isLoading && (!data || data.error) && isError}
        message={data?.message}
        refetch={refetch}
      >
        {isLoading ? (
          <img src="loading.svg" className="self-center my-auto" />
        ) : (
          <>
            <div className="flex flex-col gap-2 mb-5 w-full">
              <button type="button" className="ml-auto" onClick={onClose}>
                <IoCloseSharp className="h-8 w-8" />
              </button>
              <Steps setStep={setStep} step={step - 1} stepLength={3} />
            </div>

            <span className="font-anton text-xl w-max text-gray-200 md:self-center lg:text-2xl mb-5">
              <AnimatePresence mode="wait">{RenderTitle}</AnimatePresence>
            </span>

            <AnimatePresence mode="wait">{RenderStep}</AnimatePresence>

            {step !== 0 && (
              <Button
                disabled={isFetching}
                onClick={next}
                className={`mt-auto self-center bg-secondary-600 px-7 md:text-lg ${disableNextAction}`}
              >
                {textNext}
              </Button>
            )}
          </>
        )}
      </ErrorWrapper>
    </div>
  );
}
