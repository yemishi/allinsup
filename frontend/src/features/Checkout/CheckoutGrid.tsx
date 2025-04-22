import { useState } from "react";
import axiosRequest from "../../services/axios.config";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { redirect } from "react-router-dom";
import { useCart } from "../../context/Provider";
import { IoIosClose } from "react-icons/io";

import Address from "./Address";
import Steps from "./Steps";
import Button from "../../components/ui/Button";
import UserForm from "../../components/form/user/UserForm";
import ErrorWrapper from "../../components/ErrorWrapper";
import PaymentMethod from "./PaymentMethod";
import Summary from "./Summary";
import stripeCheckout from "./StripeCheckout";
import { createOrder } from "./helpers";
import Login from "../../components/form/user/Login";

export default function CheckoutGrid({ onClose }: { onClose: () => void }) {
  const { cart, updateCart } = useCart();
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["user info"],
    refetchOnWindowFocus: false,
    queryFn: () => axiosRequest.user.info(),
  });
  const [isFetching, setIsFetching] = useState(false);
  const [isAddress, setIsAddress] = useState(false);

  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("");

  if (data?.error && step !== 0) setStep(0);

  const next = async () => {
    if (step !== 3) return setStep(step + 1);
    if (method === "paypal" || method === "card") return await stripeCheckout({ method, cart });
    const onFinally = () => {
      setIsFetching(false);
      updateCart([]);
      redirect("/");
      onClose();
      document.body.style.overflow = "";
    };
    createOrder(cart, method, setIsFetching, onFinally, updateCart);
  };
  const RenderStep = {
    0: (
      <Login
        onSignInSuccess={() => {
          refetch(), setStep(1);
        }}
        onClose={() => setStep(1)}
      />
    ),
    1: !data?.error && <Address toggleForm={() => setIsAddress(isAddress ? false : true)} userInfo={data!} />,
    2: <PaymentMethod method={method} setMethod={setMethod} />,
    3: <Summary method={method} cart={cart} />,
  }[step];

  const disableNextAction =
    (step === 2 && !method) || (step === 1 && !data?.error && !data?.address) ? "pointer-events-none opacity-50" : "";

  return (
    <div
      className="w-full h-full overflow-x-hidden bg-primary-600 p-4 pb-8 flex flex-col max-h-[1000px] max-w-xl md:border md:border-primary-200
     relative md:rounded-lg "
    >
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
            <div className="flex flex-col gap-2 mb-5 ">
              <button onClick={onClose}>
                <IoIosClose className="w-7 h-7 md:w-10 md:h-10" />
              </button>
              <Steps setStep={setStep} step={step - 1} stepLength={3} />
            </div>

            {isLoading ? <img src="/loading.svg" /> : <AnimatePresence mode="wait">{RenderStep}</AnimatePresence>}

            {step !== 0 && (
              <Button
                disabled={isFetching}
                onClick={next}
                className={`mt-auto self-center bg-secondary-600 px-7 md:text-lg ${disableNextAction}`}
              >
                {step === 3 ? "Complete purchase" : "Next"}
              </Button>
            )}
            {isAddress && !data?.error && (
              <UserForm
                className="z-20 absolute top-0 left-0 "
                onSuccess={refetch}
                onClose={() => setIsAddress(false)}
                userInfo={data!}
              />
            )}
          </>
        )}
      </ErrorWrapper>
    </div>
  );
}
