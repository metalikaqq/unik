import type { HTMLAttributes, Ref } from "react";

import { cn } from "@/lib/cn";

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  ref?: Ref<HTMLSpanElement>;
};

export function Tag({ className, ref, ...props }: TagProps) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-block font-mono uppercase text-xs tracking-wider",
        className,
      )}
      {...props}
    />
  );
}
