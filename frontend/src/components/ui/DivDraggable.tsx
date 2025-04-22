import { AnimatePresence, MotionProps, PanInfo, motion } from "framer-motion";
import { HTMLAttributes, ReactNode, useState, Fragment, useEffect } from "react";
import isMobile from "../../utils/isMobile";
import { cleanClasses } from "../../utils/helpers";

type HTMLMotionDivProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style"
>;

type MotionPropsWithoutChildren = Omit<MotionProps, "children">;
interface PropsType extends HTMLMotionDivProps, MotionPropsWithoutChildren {
  initialDirection: "100%" | "-100%";
  closeParent?: () => void;
  exit?: string;
  children?: ReactNode;
  changeOpacity?: boolean;
  disableDrag?: boolean;
  maxMd?: boolean;
  removeAnimatePresence?: boolean;
}

export default function DivDraggable({
  closeParent,
  initialDirection,
  children,
  disableDrag,
  exit,
  maxMd,
  changeOpacity,
  removeAnimatePresence,
  ...props
}: PropsType) {
  const { className, ...rest } = props;
  const minTablet = !isMobile();
  const [isActive, setIsActive] = useState(true);
  const [directionDrag, setDirectionDrag] = useState<"100%" | "-100%">(initialDirection);

  const onDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -150 || info.offset.x > 150) {
      setIsActive(false), (document.body.style.overflow = "");
      setTimeout(() => {
        closeParent && closeParent();
        setIsActive(true);
      }, 500);
    }
  };

  const onDrag = (_: any, info: PanInfo) => {
    if (info.offset.x < -150) {
      setDirectionDrag("-100%");
    } else if (info.offset.x > 150) {
      setDirectionDrag("100%");
    }
  };

  const Component = removeAnimatePresence ? Fragment : AnimatePresence;

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <Component>
      {isActive && (
        <motion.div
          {...rest}
          dragPropagation={false}
          initial={{ x: initialDirection, opacity: changeOpacity ? 0 : 1 }}
          exit={{
            x: exit ? exit : directionDrag,
            opacity: changeOpacity ? 0 : 1,
          }}
          animate={{ x: 0, opacity: 1 }}
          className={`${cleanClasses(
            className,
            " flex flex-col overflow-y-auto h-full w-screen lg:min-w-[500px] min-[450px]:w-[450px]  bg-primary-600"
          )} ${maxMd ? "max-h-[1000px] max-w-xl md:border md:border-primary-200" : ""}`}
          transition={{ type: "just" }}
          {...(!minTablet && {
            drag: disableDrag ? false : "x",
            onDragEnd,
            onDrag,
            dragElastic: 1,
            dragConstraints: { left: 0, right: 0 },
          })}
        >
          {children}
        </motion.div>
      )}
    </Component>
  );
}
