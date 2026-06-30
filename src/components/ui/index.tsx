import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ============ Button ============
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-electric to-electric-dark text-white shadow-glow-blue hover:shadow-glow-blue-strong',
  secondary: 'glass text-text-primary hover:bg-slate-700/50 border border-slate-600/50',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-slate-700/30',
  outline: 'border border-electric/40 text-electric hover:bg-electric/10',
  danger: 'bg-gradient-to-r from-danger to-red-600 text-white',
  success: 'bg-gradient-to-r from-success to-emerald-600 text-white',
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm rounded-lg gap-1.5',
  md: 'h-11 px-6 text-sm rounded-xl gap-2',
  lg: 'h-13 px-8 text-base rounded-xl gap-2',
  xl: 'h-16 px-10 text-lg rounded-2xl gap-3',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, icon, fullWidth, className, children, disabled, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-200 btn-shine',
        'focus:outline-none focus:ring-2 focus:ring-electric/50 focus:ring-offset-0',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        buttonVariants[variant],
        buttonSizes[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : icon}
      {children}
    </motion.button>
  ),
)
Button.displayName = 'Button'

// ============ Badge ============
type BadgeVariant = 'default' | 'electric' | 'success' | 'warning' | 'danger' | 'purple'

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'glass text-text-secondary border-slate-600/50',
  electric: 'bg-electric/10 text-electric border-electric/30',
  success: 'bg-success/10 text-success border-success/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
  danger: 'bg-danger/10 text-danger border-danger/30',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
}

export function Badge({ variant = 'default', className, children }: { variant?: BadgeVariant; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border', badgeVariants[variant], className)}>
      {children}
    </span>
  )
}

// ============ Card ============
export function Card({ className, children, hover = true, ...props }: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-6 shadow-card transition-all duration-300',
        hover && 'card-hover cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============ Input ============
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, iconRight, error, className, ...props }, ref) => (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full h-12 rounded-xl glass border border-slate-600/50 px-4 text-text-primary placeholder:text-text-muted',
          'focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric/50 transition-all duration-200',
          icon && 'pl-12',
          iconRight && 'pr-12',
          error && 'border-danger/50 focus:ring-danger/30',
          className,
        )}
        {...props}
      />
      {iconRight && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {iconRight}
        </div>
      )}
    </div>
  ),
)
Input.displayName = 'Input'

// ============ Spinner ============
export function Spinner({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Loader2 className={cn(sizes[size], 'animate-spin text-electric')} />
    </div>
  )
}

// ============ Section Heading ============
export function SectionHeading({ title, subtitle, center = true }: { title: string; subtitle?: string; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={cn('mb-12', center && 'text-center')}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
