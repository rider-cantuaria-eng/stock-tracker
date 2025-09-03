"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "!bg-green-500 !text-white !border-green-600",
          error:
            "!bg-red-500 !text-white !border-red-600",
          info: 
            "!bg-blue-500 !text-white !border-blue-600",
          description:
            "!text-white",
          warning:
            "!bg-yellow-500 !text-white !border-yellow-600",
        },
      }}
      position="top-center"
      {...props}
    />
  );
};

export { Toaster };
