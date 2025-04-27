import axiosRequest, { updateToken } from "../../../services/axios.config";
import { ReactNode, useState } from "react";

import { FaHouseChimney } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";

import { GrNotes } from "react-icons/gr";
import { motion } from "framer-motion";
import { IoPersonOutline } from "react-icons/io5";

import BrandMenu from "./BrandMenu";
import CategoryMenu from "./CategoryMenu";
import { Link, useNavigate } from "react-router-dom";

import { useQuery } from "react-query";
import { MdOutlineSort } from "react-icons/md";

import { toast } from "react-toastify";
import Modal from "../../Modal/Modal";

import { Button, DivDraggable } from "../../../ui";
import { Login } from "../../../components";

export default function Menu() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState<{ content: ReactNode; isLeft?: boolean } | false>(false);

  const closeModal = () => setIsModal(false);
  const isDelete = () => {
    const fetchData = async () => {
      setIsLoading(true);
      const { error, message } = await axiosRequest.user.delete();
      setIsLoading(false);
      if (error) return toast.error(message);
      toast.success(message), setIsModal(false);
    };
    setIsModal({
      content: <DeleteUser onClose={closeModal} fetchData={fetchData} isLoading={isLoading} />,
      isLeft: false,
    });
  };

  const UpgradeUser = ({ onClose }: { onClose: () => void }) => (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ type: "just" }}
      className="p-6 pb-4 rounded-lg bg-primary-500 flex flex-col gap-14 border border-white border-opacity-50"
    >
      <span className="text-xl font-bold">You really want to be a admin?</span>
      <div className="grid grid-cols-2 gap-2">
        <Button disabled={isLoading} className="py-2 bg-primary" onClick={onClose}>
          No
        </Button>
        <Button disabled={isLoading} onClick={requestUpgrade} className="py-2">
          Yes!
        </Button>
      </div>
    </motion.div>
  );

  const requestUpgrade = async () => {
    setIsLoading(true);
    const response = await axiosRequest.user.upgrade();
    setIsLoading(false);
    if (response.error) return toast.error(response.message);
    return toast.success(response.message), closeModal();
  };

  const openLogin = () => setIsModal({ content: <Login onClose={closeModal} />, isLeft: false });

  const upToAdmin = () => setIsModal({ content: <UpgradeUser onClose={closeModal} />, isLeft: false });

  const openMenu = () => {
    setIsModal({
      content: <MenuPanel isDelete={isDelete} upToAdmin={upToAdmin} login={openLogin} onClose={closeModal} />,
      isLeft: true,
    });
  };

  return (
    <>
      <button onClick={openMenu} className="w-7 lg:w-10 relative">
        <MdOutlineSort className="!w-full !h-full text-white hover:text-[#fb923c]" />
      </button>
      {isModal && (
        <Modal className={!isModal.isLeft ? "mx-auto  my-auto " : ""} onClose={closeModal}>
          {isModal.content}
        </Modal>
      )}
    </>
  );
}

const MenuPanel = ({
  onClose,
  login,
  upToAdmin,
  isDelete,
}: {
  onClose: () => void;
  login: () => void;
  upToAdmin: () => void;
  isDelete: () => void;
}) => {
  const { data, refetch, isLoading } = useQuery({
    queryFn: () => axiosRequest.user.info(),
    queryKey: ["User-info"],
  });
  const navigate = useNavigate();

  const handleLogin = () => {
    if (data?.error) return login();
    updateToken(""), refetch();
  };
  const linkClass =
    "text-base font-anton font-semibold flex items-center w-full p-3 hover:bg-primary-400 duration-150 text-lg md:text-xl";

  return (
    <DivDraggable
      initialDirection="-100%"
      className="md:text-lg md:rounded-r-lg md:border md:border-primary-200 "
      closeParent={onClose}
    >
      <div className="w-full flex top-0 p-5 h-[83px] bg-secondary rounded-b-xl  ">
        {isLoading ? (
          <img src="/loading.svg" alt="loading" className="self-center w-20 h-20 brightness-150" />
        ) : (
          <span className="mt-auto font-semibold text-lg font-anton md:text-xl">
            {data?.error ? "Take a shortcut" : data?.name}
          </span>
        )}

        <span className="spin" />
        {isLoading ? (
          <img src="/loading.svg" className="self-center ml-auto w-20 h-20 brightness-150" />
        ) : (
          <button onClick={handleLogin} className="ml-auto mb-auto   flex gap-1 ">
            <p className="font-anton text-base md:text-lg mt-auto  self-center">
              {data?.error ? "Sign in" : "Sign out"}
            </p>

            <IoPersonOutline className="w-7 h-7 md:w-8 md:h-8" />
          </button>
        )}
      </div>

      <div className="pt-2 flex flex-col items-center border-b-2 border-primary-200 w-full ">
        <Link to="/" onClick={onClose} className={linkClass}>
          Go to home
          <FaHouseChimney className="w-7 h-7 md:w-8 md:h-8 ml-auto" />
        </Link>

        {isLoading ? (
          <img src="/loading.svg" className="w-32 h-32" />
        ) : (
          !data?.error && (
            <>
              <Link to="/my-orders" onClick={onClose} className={linkClass}>
                My orders
                <GrNotes className="ml-auto h-7 w-7 md:w-8 md:h-8" />
              </Link>

              <button
                onClick={() => {
                  if (data?.isAdmin) return navigate("/dashboard"), onClose();
                  upToAdmin();
                }}
                className={linkClass}
              >
                {data?.isAdmin ? "Dashboard" : "upgrade to admin account"}
                <MdAdminPanelSettings className="ml-auto h-7 w-7 md:w-8 md:h-8" />
              </button>
            </>
          )
        )}
      </div>
      <CategoryMenu onClose={onClose} />
      <BrandMenu onClose={onClose} />

      {!data?.error && (
        <button
          onClick={isDelete}
          className="p-4 flex items-center w-full border-t-2 border-primary-200 cursor-pointer hover:bg-red-600 duration-200 mt-auto"
        >
          <span className="text-base md:text-lg font-anton font-semibold self-end">Delete account</span>
        </button>
      )}
    </DivDraggable>
  );
};

const DeleteUser = ({
  fetchData,
  onClose,
  isLoading,
}: {
  isLoading: boolean;
  fetchData: () => void;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ type: "just" }}
      className="p-6 pb-4 rounded-lg bg-primary-500 flex flex-col gap-14 border border-white border-opacity-50"
    >
      <span className="text-xl font-bold">You really want delete this product?</span>
      <div className="grid grid-cols-2 gap-2">
        <Button disabled={isLoading} onClick={onClose} className="py-2 bg-primary">
          No
        </Button>
        <Button disabled={isLoading} onClick={fetchData} className="py-2">
          Yes!
        </Button>
      </div>
    </motion.div>
  );
};
