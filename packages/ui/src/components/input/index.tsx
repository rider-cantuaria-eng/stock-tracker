import { cn } from "@workspace/ui/lib/utils";
import { InputProps } from "./types";
import { Label } from "../label";

function Input(props: InputProps) {
  const { className, label, htmlFor, type, error } = props;

  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={htmlFor} className="mb-2">
          {label}
        </Label>
      )}
      <input
        {...props}
        id={htmlFor}
        type={type}
        data-slot="input"
        aria-invalid={!!error}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          error && "border-destructive",
          className
        )}        
      />
      {error && (
        <p className="text-destructive text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

export { Input };
