import { JSX } from '../../deps.ts'

export function Textarea(
	{ label, name, ...props }:
		& { label: string; name: string }
		& JSX.HTMLAttributes<HTMLTextAreaElement>,
) {
	return (
		<label>
			<span>{label}</span>
			<textarea {...props} name={name} />
		</label>
	)
}
