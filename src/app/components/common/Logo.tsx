import Image from 'next/image';

export const Logo = ({
  width = 175.5,
  withTitle = true,
  onClick = () => {},
}) => {
  if (withTitle) {
    return (
      <Image
        alt="logo"
        height={45.5}
        onClick={onClick}
        src="/images/logo.svg"
        width={width}
      />
    );
  }
  return (
    <Image
      alt="logo"
      height={45.5}
      onClick={onClick}
      src="/images/sm-logo.svg"
      width={width}
    />
  );
};
