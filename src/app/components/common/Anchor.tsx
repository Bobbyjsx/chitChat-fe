import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';

type AnchorLinkProps = LinkProps & {
  children?: React.ReactNode;
  className?: string;
} & React.RefAttributes<HTMLAnchorElement>;

export const Anchor = ({
	children,
	className,
	...props
}: AnchorLinkProps) => {
	return (
		<Link
			className={classNames(
				"font-medium text-purple-600 hover:text-purple-500",
				className
			)}
			{...props}>
			{children}
		</Link>
	);
};
