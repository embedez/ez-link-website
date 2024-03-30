"use client";

import * as React from "react";
import { useMediaQuery } from "react-responsive";
import {
  Dia,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type DiaDrawerProps = React.ComponentProps<typeof Dia> &
  React.ComponentProps<typeof Drawer>;

const DiaDrawer: React.FC<DiaDrawerProps> = ({ children, ...props }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return isDesktop ? (
    <Dia {...props}>{children}</Dia>
  ) : (
    <Drawer {...props}>{children}</Drawer>
  );
};

type DiaDrawerTriggerProps = React.ComponentProps<typeof DialogTrigger> &
  React.ComponentProps<typeof DrawerTrigger>;

const DiaDrawerTrigger: React.FC<DiaDrawerTriggerProps> = ({
  children,
  ...props
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return isDesktop ? (
    <DialogTrigger {...props}>{children}</DialogTrigger>
  ) : (
    <DrawerTrigger {...props}>{children}</DrawerTrigger>
  );
};

type DiaDrawerPortalProps = React.ComponentProps<typeof DialogPortal> &
  React.ComponentProps<typeof DrawerPortal>;

const DiaDrawerPortal: React.FC<DiaDrawerPortalProps> = ({
  children,
  ...props
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return isDesktop ? (
    <DialogPortal {...props}>{children}</DialogPortal>
  ) : (
    <DrawerPortal {...props}>{children}</DrawerPortal>
  );
};

type DiaDrawerOverlayProps = React.ComponentProps<typeof DialogOverlay> &
  React.ComponentProps<typeof DrawerOverlay>;

const DiaDrawerOverlay: React.FC<DiaDrawerOverlayProps> = ({
  children,
  ...props
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return isDesktop ? (
    <DialogOverlay {...props}>{children}</DialogOverlay>
  ) : (
    <DrawerOverlay {...props}>{children}</DrawerOverlay>
  );
};

type DiaDrawerCloseProps = React.ComponentProps<typeof DialogClose> &
  React.ComponentProps<typeof DrawerClose>;

const DiaDrawerClose: React.FC<DiaDrawerCloseProps> = ({
  children,
  ...props
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return isDesktop ? (
    <DialogClose {...props}>{children}</DialogClose>
  ) : (
    <DrawerClose {...props}>{children}</DrawerClose>
  );
};

type DiaDrawerContentProps = React.ComponentProps<typeof DialogContent> &
  React.ComponentProps<typeof DrawerContent>;

const DiaDrawerContent: React.FC<DiaDrawerContentProps> = ({
  children,
  className,
  ...props
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return isDesktop ? (
    <DialogContent
      {...props}
      className={className + " max-h-dvh p-0 overflow-auto"}
    >
      {children}
    </DialogContent>
  ) : (
    <DrawerContent className={className + " max-h-dvh"} {...props}>
      <div className={"max-h-full overflow-auto"}>{children}</div>
    </DrawerContent>
  );
};

type DiaDrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const DiaDrawerHeader: React.FC<DiaDrawerHeaderProps> = ({
  children,
  ...props
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return isDesktop ? (
    <DialogHeader {...props}>{children}</DialogHeader>
  ) : (
    <DrawerHeader {...props}>{children}</DrawerHeader>
  );
};

type DiaDrawerFooterProps = React.HTMLAttributes<HTMLDivElement>;

const DiaDrawerFooter: React.FC<DiaDrawerFooterProps> = ({
  children,
  ...props
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return isDesktop ? (
    <DialogFooter {...props}>{children}</DialogFooter>
  ) : (
    <DrawerFooter {...props}>{children}</DrawerFooter>
  );
};

type DiaDrawerTitleProps = React.HTMLAttributes<HTMLDivElement>;

const DiaDrawerTitle: React.FC<DiaDrawerTitleProps> = ({ ...props }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return isDesktop ? <DialogTitle {...props} /> : <DrawerTitle {...props} />;
};

type DiaDrawerDescriptionProps = React.HTMLAttributes<HTMLDivElement>;
const DiaDrawerDescription: React.FC<DiaDrawerDescriptionProps> = (
  { className, ...props },
  ref,
) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return isDesktop ? (
    <DialogDescription {...props} />
  ) : (
    <DrawerDescription {...props} />
  );
};

export {
  DiaDrawer,
  DiaDrawerClose,
  DiaDrawerFooter,
  DiaDrawerTitle,
  DiaDrawerHeader,
  DiaDrawerPortal,
  DiaDrawerContent,
  DiaDrawerTrigger,
  DiaDrawerOverlay,
  DiaDrawerDescription,
};
