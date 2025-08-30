"use client";

import * as React from "react";

import { cn } from "./utils.ts";

interface ProgressProps extends React.ComponentPropsWithoutRef<"div"> {
  value?: number;
  className?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}

function Progress({ className, value, ...props }: ProgressProps) {
  return (
      <div
        data-slot="progress"
        className={cn("bg-muted relative h-4 w-full rounded-full overflow-hidden", className)}
      >
        <div
          data-slot="progress-indicator"
          className="bg-primary h-full w-full flex-1 transition-all"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </div>
  );
}

export { Progress };