import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./styles";
import { Ref } from "react";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ref?: Ref<HTMLButtonElement> | undefined;
}
