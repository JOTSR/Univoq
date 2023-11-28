import { JSX } from '../../deps.ts'
function viewTransition(
	event: JSX.TargetedMouseEvent<HTMLAnchorElement>,
	rootSelector: keyof HTMLElementTagNameMap,
) {
	const target = event.target as HTMLAnchorElement

	// Check if viewTransition API is intended
	if (target.target !== '') return
	if (target.download !== '') return
	if (new URL(target.href).origin !== location.origin) return

	// @ts-ignore outdated Document interface definition
	document.startViewTransition?.(async () => {
		// Get view data
		const response = await fetch(target.href)
		const parser = new DOMParser()

		// Parse view to html
		const view = parser.parseFromString(await response.text(), 'text/html')

		// Get roots
		const sourceRoot = document.querySelector(rootSelector)
		const viewRoot = view.querySelector(rootSelector)

		// Use default behaviour is no root match
		if (viewRoot?.childNodes === undefined) return true

		// Update DOM
		sourceRoot?.replaceChildren(...Array.from(viewRoot.children))

		// Prevent default link href
		event.preventDefault()
	})
}

export function Link(
	{ rootSelector, ...props }:
		& { rootSelector?: keyof HTMLElementTagNameMap }
		& JSX.HTMLAttributes<HTMLAnchorElement>,
) {
	return (
		<a
			{...props}
			onClick={(event) => {
				if (rootSelector) viewTransition(event, rootSelector)
			}}
		>
		</a>
	)
}
