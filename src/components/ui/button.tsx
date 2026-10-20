import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-control font-semibold transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-signal-blue focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 text-base',
  {
    variants: {
      variant: {
        default:
          'bg-signal-blue text-white hover:bg-signal-blue-hover border-2 border-signal-blue active:bg-signal-blue-hover',
        secondary:
          'bg-paper text-signal-blue border-2 border-signal-blue hover:bg-panel active:bg-panel-darker',
        outline:
          'border-2 border-control-edge bg-paper text-ink hover:bg-panel hover:text-ink',
        quiet:
          'text-ink-muted underline hover:text-ink min-h-[48px] px-3 bg-transparent',
        safe:
          'bg-safe-green text-white hover:opacity-90 border-2 border-safe-green',
        destructive:
          'bg-stop-red text-white hover:opacity-90 border-2 border-stop-red',
      },
      size: {
        default: 'min-h-[56px] px-6 py-3',
        sm: 'min-h-[44px] px-4 py-2 text-sm',
        lg: 'min-h-[64px] px-8 py-4 text-lg',
        icon: 'h-12 w-12 min-h-[48px] min-w-[48px] p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
