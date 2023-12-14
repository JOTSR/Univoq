import { effect, JSX, useSignal } from '../../deps.ts'

export function Input(
	{ label, name, ...props }:
		& { label: string; name: string }
		& JSX.HTMLAttributes<HTMLInputElement>,
) {
	if (props.type === 'password') {
		const password = useSignal('')
		const hash = useSignal('')
		const salt = crypto.randomUUID()

		effect(async () => {
			const digest = await crypto.subtle.digest(
				'SHA-256',
				new TextEncoder().encode(salt + password.value),
			)
			hash.value = new TextDecoder().decode(digest)
		})

		return (
			<label>
				<span>{label}</span>
				<input
					{...props}
					onInput={(event) =>
						password.value =
							(event.target as HTMLInputElement).value}
				/>
				<input type='text' hidden value={hash} name={name} />
				<input type='text' hidden value={salt} name={`${name}_salt`} />
			</label>
		)
	}

	return (
		<label>
			<span>{label}</span>
			<input {...props} name={name} />
		</label>
	)
}
