import { JSX, signal } from '../../deps.ts'

export function TabMenu(
	{ tabs }: { tabs: [label: string, tab: JSX.Element][] },
) {
	const currentTab = signal(0)
	const seed = Date.now().toString()

	return (
		<div>
			<menu role='tablist'>
				{tabs.map(([label], index) => (
					<button
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
			<div>
				{tabs.map(([label, tab], index) => (
					<div
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
