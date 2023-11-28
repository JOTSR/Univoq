import { JSX } from '../../deps.ts'

export function Input(
	{ label, name, ...props }:
		& { label: string; name: string }
		& JSX.HTMLAttributes<HTMLInputElement>,
) {
	return (
		<label>
			<span>{label}</span>
			<input {...props} name={name} />
		</label>
	)
}
