import { effect, JSX, signal } from '../../deps.ts'

export function Suspense(
	{ fallback, suspender, timeout, children }: {
		fallback: JSX.Element
		suspender: JSX.Element
		timeout?: number
		children: Promise<JSX.Element>
	},
) {
	const displayed = signal(suspender)

	const dispose = effect(async () => {
		try {
			displayed.value = await children
		} catch {
			displayed.value = fallback
		}
	})

	if (timeout) {
		effect(() => {
			setTimeout(() => {
				dispose()
				displayed.value = fallback
			}, timeout)
		})
	}

	return <>{displayed}</>
}
