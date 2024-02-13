import { JSX, useSignal } from '../../deps.ts'

function RenderError(
	{ error, fallback }: { error: Error; fallback: Fallback | undefined },
) {
	if (fallback) {
		return fallback({ error })
	}

	return (
		<output>
			<pre>{String(error)}</pre>
		</output>
	)
}

type Fallback = ({ error }: { error: Error }) => JSX.Element

export function Suspense(
	{ loader, fallback, signal, children }: {
		loader: JSX.Element
		children: Promise<JSX.Element>
		fallback?: Fallback
		signal?: AbortSignal
	},
) {
	const displayed = useSignal(loader)

	signal?.addEventListener('abort', () => {
		try {
			signal.throwIfAborted()
		} catch (error) {
			displayed.value = RenderError({ error, fallback })
		}
	})

	children
		.then((element) => {
			if (signal?.aborted) return
			displayed.value = element
		})
		.catch((error) => {
			if (signal?.aborted) return
			displayed.value = RenderError({ error, fallback })
		})

	return <>{displayed}</>
}
