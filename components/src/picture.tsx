import { JSX } from '../../deps.ts'

export function Picture(
	{ sources, fallback, alt, ...props }: {
		sources: JSX.HTMLAttributes<HTMLSourceElement>[]
		fallback: string
		alt: string
	} & JSX.HTMLAttributes<HTMLPictureElement>,
) {
	return (
		<picture {...props}>
			{sources.map((props) => <source {...props} />)}
			<img src={fallback} alt={alt} />
		</picture>
	)
}
