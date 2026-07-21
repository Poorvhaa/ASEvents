'use client';

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// 1. TYPOGRAPHY COMPONENTS
// ============================================================================

interface BaseTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export const LuxuryDisplay = forwardRef<HTMLElement, BaseTextProps>(
  ({ className, as: Component = 'h1', ...props }, ref) => (
    <Component
      ref={ref as any}
      className={cn(
        'text-clamp-display text-[#0B1325] antialiased tracking-tight',
        className
      )}
      {...props}
    />
  ),
);
LuxuryDisplay.displayName = 'LuxuryDisplay';

export const LuxuryHeading = forwardRef<HTMLElement, BaseTextProps>(
  ({ className, as: Component = 'h2', ...props }, ref) => (
    <Component
      ref={ref as any}
      className={cn(
        'text-clamp-heading text-[#0B1325] antialiased tracking-tight',
        className
      )}
      {...props}
    />
  ),
);
LuxuryHeading.displayName = 'LuxuryHeading';

export const LuxurySubheading = forwardRef<HTMLElement, BaseTextProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref as any}
      className={cn(
        'font-serif text-lg md:text-xl lg:text-2xl text-[#C5A880] tracking-wide antialiased',
        className
      )}
      {...props}
    />
  ),
);
LuxurySubheading.displayName = 'LuxurySubheading';

export const LuxuryBody = forwardRef<HTMLElement, BaseTextProps>(
  ({ className, as: Component = 'p', ...props }, ref) => (
    <Component
      ref={ref as any}
      className={cn(
        'text-clamp-body text-[#64748B] font-sans antialiased leading-relaxed',
        className
      )}
      {...props}
    />
  ),
);
LuxuryBody.displayName = 'LuxuryBody';

export const LuxuryEyebrow = forwardRef<HTMLElement, BaseTextProps>(
  ({ className, as: Component = 'span', ...props }, ref) => (
    <Component
      ref={ref as any}
      className={cn(
        'font-sans font-medium text-xs sm:text-sm tracking-[0.25em] text-[#C5A880] uppercase select-none',
        className
      )}
      {...props}
    />
  ),
);
LuxuryEyebrow.displayName = 'LuxuryEyebrow';


// ============================================================================
// 2. LAYOUT COMPONENTS
// ============================================================================

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  alternate?: boolean;
}

export const LuxurySection = forwardRef<HTMLElement, SectionProps>(
  ({ className, alternate = false, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        'py-16 sm:py-24 md:py-32 w-full overflow-hidden transition-colors duration-500',
        alternate 
          ? 'bg-gradient-to-b from-[#FAF8F5] to-[#F3EFEA]' 
          : 'bg-white',
        className
      )}
      {...props}
    />
  ),
);
LuxurySection.displayName = 'LuxurySection';

export const LuxuryContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20',
        className
      )}
      {...props}
    />
  ),
);
LuxuryContainer.displayName = 'LuxuryContainer';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4;
}

export const LuxuryGrid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 3, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'grid gap-8 sm:gap-10 md:gap-12 w-full',
        cols === 1 && 'grid-cols-1',
        cols === 2 && 'grid-cols-1 md:grid-cols-2',
        cols === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        cols === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        className
      )}
      {...props}
    />
  ),
);
LuxuryGrid.displayName = 'LuxuryGrid';


// ============================================================================
// 3. BUTTON SYSTEM
// ============================================================================

export interface LuxuryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cta';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const LuxuryButton = forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base focus and transitions
          'touch-target inline-flex items-center justify-center font-sans font-semibold tracking-wider uppercase rounded-xl transition-luxury border select-none cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2',
          'active:scale-98 disabled:opacity-50 disabled:pointer-events-none',
          
          // Sizing classes
          size === 'sm' && 'px-5 py-2.5 text-[10px] rounded-lg',
          size === 'md' && 'px-7 py-3.5 text-xs rounded-xl',
          size === 'lg' && 'px-9 py-4.5 text-sm rounded-xl',

          // Variant styling
          variant === 'primary' && 'bg-[#0B1325] text-white border-[#0B1325] hover:bg-[#1A284C] hover:border-[#1A284C] hover:shadow-luxury-md',
          variant === 'secondary' && 'bg-[#FAF8F5] text-[#0B1325] border-[#FAF8F5] hover:bg-[#F3EFEA] hover:border-[#F3EFEA]',
          variant === 'outline' && 'bg-transparent text-[#0B1325] border-[#EADBC8] hover:border-[#C5A880] hover:bg-[#FAF8F5]/30',
          variant === 'ghost' && 'bg-transparent text-[#0B1325] border-transparent hover:bg-[#FAF8F5]',
          variant === 'cta' && 'bg-gradient-to-r from-[#C5A880] via-[#EADBC8] to-[#C5A880] text-[#0B1325] border-transparent hover:shadow-[0_0_20px_rgba(197,168,128,0.35)]',
          
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin text-current" />
        ) : (
          leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="ml-2 inline-flex items-center">{rightIcon}</span>
        )}
      </button>
    );
  }
);
LuxuryButton.displayName = 'LuxuryButton';


// ============================================================================
// 4. CARD SYSTEM
// ============================================================================

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'service' | 'portfolio' | 'glass' | 'image';
  hoverEffect?: boolean;
}

export const LuxuryCard = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverEffect = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden rounded-2xl border transition-luxury',
          
          // Variants
          variant === 'default' && 'bg-white border-[#EADBC8]/40 shadow-luxury-sm',
          variant === 'service' && 'bg-white border-[#EADBC8]/30 shadow-luxury-sm p-8 sm:p-10 flex flex-col items-start gap-4',
          variant === 'portfolio' && 'bg-white border-[#EADBC8]/40 shadow-luxury-md aspect-[4/5] flex flex-col justify-end p-6 sm:p-8',
          variant === 'glass' && 'glass-luxury border-white/20 shadow-luxury-md',
          variant === 'image' && 'relative border-transparent aspect-[16/10] bg-slate-900',

          // Hover elevation
          hoverEffect && variant !== 'image' && 'hover:-translate-y-1 hover:shadow-luxury-lg hover:border-[#C5A880]/30',
          
          className
        )}
        {...props}
      />
    );
  }
);
LuxuryCard.displayName = 'LuxuryCard';


// ============================================================================
// 5. FORM SYSTEM
// ============================================================================

export interface LuxuryInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const LuxuryInput = forwardRef<HTMLInputElement, LuxuryInputProps>(
  ({ className, label, error, type = 'text', disabled, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label className="font-sans text-[10px] sm:text-xs font-semibold tracking-widest text-[#C5A880] uppercase select-none">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={cn(
            'w-full px-5 py-3.5 bg-white/70 border border-[#EADBC8] rounded-xl text-sm text-[#0B1325] transition-luxury placeholder-[#64748B]/50 font-sans',
            'focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]',
            'disabled:opacity-50 disabled:pointer-events-none',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-[11px] text-red-500 font-sans" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);
LuxuryInput.displayName = 'LuxuryInput';

export interface LuxuryTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const LuxuryTextarea = forwardRef<HTMLTextAreaElement, LuxuryTextareaProps>(
  ({ className, label, error, disabled, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label className="font-sans text-[10px] sm:text-xs font-semibold tracking-widest text-[#C5A880] uppercase select-none">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          disabled={disabled}
          rows={rows}
          className={cn(
            'w-full px-5 py-4 bg-white/70 border border-[#EADBC8] rounded-xl text-sm text-[#0B1325] transition-luxury placeholder-[#64748B]/50 font-sans resize-none',
            'focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]',
            'disabled:opacity-50 disabled:pointer-events-none',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-[11px] text-red-500 font-sans" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);
LuxuryTextarea.displayName = 'LuxuryTextarea';

export interface LuxurySelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const LuxurySelect = forwardRef<HTMLSelectElement, LuxurySelectProps>(
  ({ className, label, error, options, disabled, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label className="font-sans text-[10px] sm:text-xs font-semibold tracking-widest text-[#C5A880] uppercase select-none">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full px-5 py-3.5 bg-white/70 border border-[#EADBC8] rounded-xl text-sm text-[#0B1325] appearance-none transition-luxury font-sans cursor-pointer',
              'focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]',
              'disabled:opacity-50 disabled:pointer-events-none',
              error && 'border-red-400 focus:border-red-400 focus:ring-red-400',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom Chevron Indicator */}
          <div className="absolute top-1/2 right-5 -translate-y-1/2 pointer-events-none border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#C5A880]" />
        </div>
        {error && (
          <span className="text-[11px] text-red-500 font-sans" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);
LuxurySelect.displayName = 'LuxurySelect';

export interface LuxuryCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const LuxuryCheckbox = forwardRef<HTMLInputElement, LuxuryCheckboxProps>(
  ({ className, label, error, disabled, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="inline-flex items-center gap-3 cursor-pointer select-none">
          <div className="relative flex items-center justify-center">
            <input
              ref={ref}
              type="checkbox"
              disabled={disabled}
              className={cn(
                'peer sr-only'
              )}
              {...props}
            />
            {/* Custom Styled Box */}
            <div className="w-5 h-5 border border-[#EADBC8] rounded-md transition-luxury peer-checked:bg-[#0B1325] peer-checked:border-[#0B1325] peer-focus-visible:ring-2 peer-focus-visible:ring-[#C5A880] peer-disabled:opacity-50" />
            {/* Checkmark Icon overlay */}
            <svg
              className="absolute w-3.5 h-3.5 text-white stroke-2 stroke-current fill-none opacity-0 transition-opacity duration-300 peer-checked:opacity-100"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="font-sans text-sm text-[#64748B] peer-disabled:opacity-50">
            {label}
          </span>
        </label>
        {error && (
          <span className="text-[11px] text-red-500 font-sans" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);
LuxuryCheckbox.displayName = 'LuxuryCheckbox';


// ============================================================================
// 6. ANIMATION & PARALLAX WRAPPERS
// ============================================================================

interface RevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
}

export const LuxuryReveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
}) => {
  const getVariants = () => {
    const offsets = {
      up: { y: 35 },
      down: { y: -35 },
      left: { x: 35 },
      right: { x: -35 },
      fade: {},
    };

    return {
      hidden: {
        opacity: 0,
        ...offsets[direction],
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1] as any, // Apple-style custom easing curve
        },
      },
    };
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
};

export const LuxuryHoverZoom: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('overflow-hidden w-full h-full relative group', className)}>
      <div className="w-full h-full transition-luxury duration-700 group-hover:scale-103">
        {children}
      </div>
    </div>
  );
};
