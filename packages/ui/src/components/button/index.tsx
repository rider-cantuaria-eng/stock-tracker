import { Slot } from "@radix-ui/react-slot";

import { cn } from "@workspace/ui/lib/utils";
import { buttonVariants } from "./styles";
import { IButtonProps } from "./types";

function Button({
  className,
  variant,
  size,
  ref,
  asChild = false,
  ...props
}: IButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
}

export { Button, buttonVariants };
