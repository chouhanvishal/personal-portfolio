import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'hero-gradient': 'linear-gradient(135deg, hsl(var(--hero-gradient-start)), hsl(var(--hero-gradient-end)))',
				'skill-gradient': 'linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary)))',
				'gradient-1': 'linear-gradient(45deg, hsl(var(--gradient-1)), hsl(var(--gradient-2)))',
				'gradient-2': 'linear-gradient(to right, hsl(var(--gradient-2)), hsl(var(--gradient-3)))',
				'gradient-3': 'linear-gradient(to bottom right, hsl(var(--gradient-3)), hsl(var(--gradient-4)))',
				'gradient-4': 'linear-gradient(to bottom, hsl(var(--gradient-4)), hsl(var(--gradient-1)))',
				'gradient-conic': 'conic-gradient(from 0deg, hsl(var(--gradient-1)), hsl(var(--gradient-2)), hsl(var(--gradient-3)), hsl(var(--gradient-4)), hsl(var(--gradient-1)))',
				'mesh-1': 'radial-gradient(at 40% 20%, hsla(var(--gradient-1) / 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(var(--gradient-2) / 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(var(--gradient-3) / 0.3) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(var(--gradient-4) / 0.3) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(var(--gradient-1) / 0.3) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(var(--gradient-2) / 0.3) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(var(--gradient-3) / 0.3) 0px, transparent 50%)',
				'mesh-2': 'radial-gradient(at 0% 0%, hsla(var(--gradient-1) / 0.4) 0px, transparent 50%), radial-gradient(at 100% 0%, hsla(var(--gradient-2) / 0.4) 0px, transparent 50%), radial-gradient(at 100% 100%, hsla(var(--gradient-3) / 0.4) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(var(--gradient-4) / 0.4) 0px, transparent 50%)',
			},
			boxShadow: {
				'project': '0 10px 30px -10px hsl(var(--project-shadow))',
				'glow': '0 0 20px hsl(var(--glow) / 0.3)',
				'3d': '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
				'inner-glow': 'inset 0 0 20px hsl(var(--glow) / 0.2)',
				'neon': '0 0 5px hsl(var(--glow) / 0.5), 0 0 20px hsl(var(--glow) / 0.3), 0 0 40px hsl(var(--glow) / 0.1)',
				'sharp': '5px 5px 0px 0px hsl(var(--accent))',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '0.6' },
					'50%': { opacity: '1' }
				},
				'spin-slow': {
					to: { transform: 'rotate(360deg)' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'scale-up': {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-left': {
					'0%': { transform: 'translateX(20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-right': {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'blur-in': {
					'0%': { filter: 'blur(8px)', opacity: '0' },
					'100%': { filter: 'blur(0)', opacity: '1' }
				},
				'rotate-3d': {
					'0%': { transform: 'perspective(1000px) rotateY(0deg)' },
					'100%': { transform: 'perspective(1000px) rotateY(360deg)' }
				},
				'morph': {
					'0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
					'50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-1000px 0' },
					'100%': { backgroundPosition: '1000px 0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
				'spin-slow': 'spin-slow 20s linear infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'scale-up': 'scale-up 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.5s ease-out',
				'slide-left': 'slide-left 0.5s ease-out',
				'slide-right': 'slide-right 0.5s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'blur-in': 'blur-in 0.5s ease-out',
				'rotate-3d': 'rotate-3d 15s linear infinite',
				'morph': 'morph 8s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite'
			},
			transitionTimingFunction: {
				'bounce-in': 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
				'bounce-out': 'cubic-bezier(0.32, 1.55, 0.68, 0.45)',
				'smooth': 'cubic-bezier(0.45, 0, 0.55, 1)',
				'spring': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
