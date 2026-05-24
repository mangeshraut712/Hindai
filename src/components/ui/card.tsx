import * as React from "react";
import { cn } from "@/lib/utils";

const Card = ({ className, ref, ...props }: React.ComponentPropsWithRef<"div">) => (
  <div
    ref={ref}
    className={cn(
      "bg-card/78 flex flex-col gap-6 rounded-[28px] border border-border/65 py-6 text-card-foreground shadow-[0_30px_80px_-48px_rgba(15,23,42,0.4)] backdrop-blur-xl",
      className
    )}
    {...props}
  />
);
Card.displayName = "Card";

const CardHeader = ({ className, ref, ...props }: React.ComponentPropsWithRef<"div">) => (
  <div ref={ref} className={cn("flex flex-col gap-1.5 px-6", className)} {...props} />
);
CardHeader.displayName = "CardHeader";

const CardTitle = ({ className, ref, ...props }: React.ComponentPropsWithRef<"h3">) => (
  <h3 ref={ref} className={cn("font-semibold leading-none", className)} {...props} />
);
CardTitle.displayName = "CardTitle";

const CardDescription = ({ className, ref, ...props }: React.ComponentPropsWithRef<"p">) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
);
CardDescription.displayName = "CardDescription";

const CardContent = ({ className, ref, ...props }: React.ComponentPropsWithRef<"div">) => (
  <div ref={ref} className={cn("px-6", className)} {...props} />
);
CardContent.displayName = "CardContent";

const CardFooter = ({ className, ref, ...props }: React.ComponentPropsWithRef<"div">) => (
  <div ref={ref} className={cn("flex items-center px-6", className)} {...props} />
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
