import { JSX, useMemo, useSignal } from '../../deps.ts'

export function TabMenu(
	{ tabs, ...props }:
		& { tabs: [label: string, tab: JSX.Element][] }
		& JSX.HTMLAttributes<HTMLDivElement>,
) {
	const currentTab = useSignal(0)
	const seed = useMemo(() => Date.now().toString(), [])

	return (
		<div {...props}>
			<menu role='tablist' class={`${props.class} tab-list`}>
				{tabs.map(([label], index) => (
					<button
						class={`${props.class} tab-button`}
						role='tab'
						id={`tab-${seed}-${label}-${index}`}
						tabIndex={currentTab.value === index ? 0 : -1}
						aria-selected={currentTab.value === index}
						aria-controls={`tabpanel-${seed}-${label}-${index}`}
						onFocus={() => currentTab.value = index}
					>
						{label}
					</button>
				))}
			</menu>
			<div className={`${props.class} tab-container`}>
				{tabs.map(([label, tab], index) => (
					<div
						class={`${props.class} tab-panel`}
						role='tabpanel'
						id={`tabpanel-${seed}-${label}-${index}`}
						tabIndex={0}
						aria-labelledby={`tab-${seed}-${label}-${index}`}
						style={{
							display: currentTab.value === index
								? 'block'
								: 'none',
						}}
						onFocus={() => currentTab.value = index}
					>
						{tab}
					</div>
				))}
			</div>
		</div>
	)
}
