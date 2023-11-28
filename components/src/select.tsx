import { JSX } from '../../deps.ts'

export function Select(
	{ label, menu, name, options, ...props }: {
		label: string
		menu: boolean
		name: string
		options: [label: string, value: string][]
	} & JSX.HTMLAttributes<HTMLSelectElement>,
) {
	return (
		<label>
			<span>{label}</span>
			<select name={name} {...props}>
				{options.map(([label, value]) => (
					<option value={value}>{label}</option>
				))}
			</select>
		</label>
	)
}
