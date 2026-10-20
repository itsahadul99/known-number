import React from 'react';
import { cn } from '@/lib/utils';

interface ChoiceButtonProps {
  label: string;
  onClick: () => void;
  isSelected?: boolean;
  disabled?: boolean;
  shortcutIndex?: number;
  className?: string;
}

export function ChoiceButton({
  label,
  onClick,
  isSelected = false,
  disabled = false,
  shortcutIndex,
  className,
}: ChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full min-h-[64px] p-4 px-5 flex items-center justify-start text-left rounded-control transition-all',
        'border-2 text-ink text-lg leading-snug gap-3',
        isSelected
          ? 'bg-panel border-signal-blue border-l-8 font-bold'
          : 'bg-paper border-control-edge font-medium hover:bg-panel active:bg-panel-darker',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-pressed={isSelected}
    >
      {shortcutIndex !== undefined && (
        <span
          className={cn(
            'inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 border',
            isSelected
              ? 'bg-signal-blue text-white border-signal-blue'
              : 'bg-panel text-ink border-control-edge'
          )}
          aria-hidden="true"
        >
          {shortcutIndex}
        </span>
      )}
      <span className="flex-1">{label}</span>
      {isSelected && (
        <span className="text-xs text-signal-blue font-bold uppercase tracking-wider">
          Selected
        </span>
      )}
    </button>
  );
}
