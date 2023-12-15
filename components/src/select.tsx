import { JSX } from '../../deps.ts'

export function Select(
	{ label, name, options, ...props }: {
		label: string
		name: string
		options: ({ label: string } & JSX.HTMLAttributes<HTMLOptionElement>)[]
	} & JSX.HTMLAttributes<HTMLSelectElement>,
) {
	return (
		<label>
			<span>{label}</span>
			<select name={name} {...props}>
				{options.map(({ label, ...props }) => (
					<option {...props}>{label}</option>
				))}
			</select>
		</label>
	)
}
