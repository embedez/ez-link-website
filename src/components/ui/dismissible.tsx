import * as React from "react";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Dismissible = ({
  className,
  timeout,
  ...props
}: {
  timeout?: number;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    if (timeout) {
      setTimeout(() => {
        setOpen(false);
      }, timeout);
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          {...props}
        >
          {props.children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Dismissible.displayName = "Dismissible";

export { Dismissible };
