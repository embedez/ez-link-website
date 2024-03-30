import * as React from "react";
import { cn } from "@/lib/utils";

const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "scroll-m-20 [&:not(:first-child)]:mt-6 text-4xl font-extrabold tracking-tight lg:text-5xl",
      className,
    )}
    {...props}
  >
    {children}
  </h1>
));
H1.displayName = "H1";

const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "scroll-m-20 [&:not(:first-child)]:mt-6 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      className,
    )}
    {...props}
  >
    {children}
  </h2>
));
H2.displayName = "H2";

const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "scroll-m-20 [&:not(:first-child)]:mt-6 text-2xl font-semibold tracking-tight",
      className,
    )}
    {...props}
  >
    {children}
  </h3>
));
H3.displayName = "H3";

const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn(
      "scroll-m-20 [&:not(:first-child)]:mt-6 text-xl font-semibold tracking-tight",
      className,
    )}
    {...props}
  >
    {children}
  </h4>
));
H4.displayName = "H4";

const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("leading-7 [&:not(:first-child)]:mt-2", className)}
    {...props}
  >
    {children}
  </p>
));
P.displayName = "P";

const B = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <b
      ref={ref}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </b>
  ),
);
B.displayName = "B";

// For Italic text
const I = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <i
      className={cn("leading-7 [&:not(:first-child)]", className)}
      ref={ref}
      {...props}
    >
      {children}
    </i>
  ),
);
I.displayName = "I";

// For Underline text
const U = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <u
      className={cn("leading-7 [&:not(:first-child)]", className)}
      ref={ref}
      {...props}
    >
      {children}
    </u>
  ),
);
U.displayName = "U";

const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, children, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn("mt-6 border-l-2 pl-6 italic", className)}
    {...props}
  ></blockquote>
));
Blockquote.displayName = "Blockquote";

// For Unordered List
const UnorderedList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, children, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("my-2 ml-6 list-disc [&>li]:mt-2", className)}
    {...props}
  >
    {children}
  </ul>
));
UnorderedList.displayName = "UnorderedList";

// For List Item
const List = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, children, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props}>
    {children}
  </li>
));
List.displayName = "List";

const Large = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("text-lg font-semibold", className)} {...props}>
    {children}
  </div>
));
Large.displayName = "Large";

const Small = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <small
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  >
    {children}
  </small>
));
Small.displayName = "Small";

const Muted = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  >
    {children}
  </p>
));
Muted.displayName = "Muted";

const Divider = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-1 w-full rounded bg-muted", className)}
    {...props}
  />
));
Divider.displayName = "Divider";

export {
  H1,
  H2,
  H3,
  H4,
  P,
  B,
  I,
  U,
  Blockquote,
  List,
  UnorderedList,
  Large,
  Small,
  Muted,
  Divider,
};
