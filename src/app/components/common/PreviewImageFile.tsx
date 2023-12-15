import React, { useContext, useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import {
  GlobalModalContext,
  ModalTypes,
} from 'src/context/GlobalModalContextProvider';

type PreviewImageFileProps = Omit<ImageProps, 'src'> & {
  file: File | string;
};

export const PreviewImageFile = ({
  file,
  className,
}: PreviewImageFileProps) => {
  const [url, setUrl] = useState<string | ArrayBuffer | null>(null);
  const { openModal } = useContext(GlobalModalContext);

  useEffect(() => {
    if (typeof file === 'string') {
      setUrl(file);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const handleImagePreview = () => {
    if (url) openModal(ModalTypes.PREVIEW_IMAGE_MODAL, { url });
  };

  return !!url ? (
    <Image
      alt="product image"
      aria-label="Preview image"
      className={` transition-all duration-100 hover:scale-105  ${className}`}
      fill
      onClick={handleImagePreview}
      src={url as string}
    />
  ) : (
    <></>
  );
};
