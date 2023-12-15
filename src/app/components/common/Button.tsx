import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import classNames from 'classnames';

import { LoadingSpinner } from './LoadingSpinner';

const buttonStyles = cva(
  'flex justify-center rounded-md disabled:opacity-50 disabled:pointer-events-none px-3 py-1.5 text-sm font-medium leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    defaultVariants: {
      intent: 'primary',
    },
    variants: {
      intent: {
        neutral:
          'border border-purple-600 bg-white text-gray-900  focus-visible:outline-purple-600',
        primary:
          'bg-yellow-500 text-gray-900 hover:bg-yellow-600 focus-visible:outline-yellow-600',
        secondary:
          'bg-purple-600 text-white hover:bg-purple-500 focus-visible:outline-purple-600',
      },
    },
  }
);

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  VariantProps<typeof buttonStyles> & {
    isLoading?: boolean;
    useDiv?: boolean;
  };

export const Button = ({
  children,
  title,
  isLoading,
  intent,
  className,
  useDiv = false,
  ...rest
}: ButtonProps) => {
  const _className = classNames(buttonStyles({ intent }), className);

  const { onClick } = rest;

  if (useDiv) {
    return (
      // @ts-ignore
      <div className={_className} onClick={onClick}>
        {children ?? title}
        {isLoading && (
          <span className="ml-2">
            <LoadingSpinner className="h-5 w-5" />
          </span>
        )}
      </div>
    );
  }

  return (
    <button className={_className} type="button" {...rest}>
      {children ?? title}
      {isLoading && (
        <span className="ml-2">
          <LoadingSpinner className="h-5 w-5" />
        </span>
      )}
    </button>
  );
};
