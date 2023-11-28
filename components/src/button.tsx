import { JSX } from '../../deps.ts'

export function Button(
	{ variant, ...props }:
		& { variant: 'primary' | 'secondary' | 'tertiary' }
		& JSX.HTMLAttributes<HTMLButtonElement>,
) {
	return <button class={`button button-${variant}`} {...props}></button>
}
