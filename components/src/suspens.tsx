import { effect, JSX, useEffect, useSignal } from '../../deps.ts'

export function Suspense(
	{ fallback, suspender, timeout, children }: {
		fallback: JSX.Element
		suspender: JSX.Element
		timeout?: number
		children: Promise<JSX.Element>
	},
) {
	const displayed = useSignal(suspender)

	useEffect(() => {
		const ac = new AbortController()

		effect(async () => {
			if (ac.signal.aborted) return
			try {
				displayed.value = await children
			} catch {
				displayed.value = fallback
			}
		})

		if (timeout) {
			effect(() => {
				setTimeout(() => {
					ac.abort(new Error('promise timeout exceeded'))
					if (displayed.value === suspender) {
						displayed.value = fallback
					}
				}, timeout)
			})
		}

		return ac.abort(new Error('component rerender'))
	})

	return <>{displayed}</>
}
