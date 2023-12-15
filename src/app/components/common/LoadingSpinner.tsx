import classNames from 'classnames';

type LoadingSpinnerProps = {
  className?: string;
};

export const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div
      className={classNames(
        'h-4 w-4 animate-spin rounded-full border-4 border-t-white',
        className
      )}
    />
  );
};
