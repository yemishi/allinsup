import { AnimatePresence, MotionProps, PanInfo, motion } from "framer-motion";
import { HTMLAttributes, ReactNode, useState, Fragment } from "react";

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
  const minTablet = window.matchMedia("(min-width: 768px)");
  const [isActive, setIsActive] = useState(true);
  const [directionDrag, setDirectionDrag] = useState<"100%" | "-100%">(
    initialDirection
  );

  const onDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -150 || info.offset.x > 150) {
      setIsActive(false);
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
  const defaultSize =
    className?.includes("w-") || className?.includes("h-")
      ? ""
      : "h-full w-full lg:min-w-[500px] min-[450px]:w-[450px]";
  const defaultBg = className?.includes("bg-") ? "" : "bg-primary-600";
  const Component = removeAnimatePresence ? Fragment : AnimatePresence;
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
          className={`${
            className ? className : ""
          } ${defaultBg} ${defaultSize} ${
            maxMd
              ? "max-h-[1000px] max-w-xl md:border md:border-primary-200"
              : ""
          } flex flex-col overflow-y-auto`}
          transition={{ type: "just" }}
          {...(!minTablet.matches && {
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