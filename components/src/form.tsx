import { JSX } from '../../deps.ts'

export function Form(
	{ csrf, ...props }: { csrf: string } & JSX.HTMLAttributes<HTMLFormElement>,
) {
	return (
		<form {...props}>
			<input type='hidden' value={csrf} name='csrf' />
		</form>
	)
}
