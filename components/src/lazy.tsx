import { effect, JSX, useEffect, useRef, useSignal } from '../../deps.ts'

export function Lazy(
	{ children, placeholder, options }: {
		children: JSX.Element
		placeholder?: JSX.Element
		options?: IntersectionObserverInit
	},
) {
	const ref = useRef(null)
	const current = useSignal(placeholder)
	useEffect(() => {
		const observer = new IntersectionObserver(() => {
			effect(() => {
				current.value = children
			})
		}, options)

		observer.observe(ref.current!)

		return () => observer.disconnect()
	})

	return <div ref={ref}>{current}</div>
}
