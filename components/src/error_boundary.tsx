import { JSX } from '../../deps.ts'

export function ErrorBoundary(
	{ fallback, children }: { fallback: JSX.Element; children: JSX.Element },
) {
	try {
		return <>{children}</>
	} catch {
		return <>{fallback}</>
	}
}
