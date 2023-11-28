export function Table({ data }: { data: Record<string, string[]> }) {
	return (
		<table>
			<thead>
				<tr>
					{Object.keys(data).map((title) => <th>{title}</th>)}
				</tr>
			</thead>
			<tbody>
				{Object.values(data).map((column) => (
					<tr>{column.map((row) => <td>{row}</td>)}</tr>
				))}
			</tbody>
		</table>
	)
}
