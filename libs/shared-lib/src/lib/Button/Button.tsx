import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className,
  ...rest
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center gap-2 rounded border-0 font-semibold transition-[opacity,background-color] duration-200 disabled:cursor-not-allowed disabled:opacity-50';

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-sky-600 text-white enabled:hover:bg-sky-700',
    secondary: 'bg-slate-200 text-slate-900 enabled:hover:bg-slate-300',
    danger: 'bg-red-500 text-white enabled:hover:bg-red-600',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-5 py-2 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    loading ? 'relative' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      data-variant={variant}
      data-size={size}
      {...rest}
    >
      {loading ? (
        <span
          className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : null}
      <span>{children}</span>
    </button>
  );
}

export default Button;
