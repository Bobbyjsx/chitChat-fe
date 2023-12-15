"use client"
import { forwardRef, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import { Input, InputProps } from './Input';

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }: InputProps, ref) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
      <Input
        trailingIcon={
          passwordVisible ? (
            <EyeIcon
              className="h-5 w-5 cursor-pointer text-gray-400"
              onClick={() => setPasswordVisible((val) => !val)}
            />
          ) : (
            <EyeSlashIcon
              className="h-5 w-5 cursor-pointer text-gray-400"
              onClick={() => setPasswordVisible((val) => !val)}
            />
          )
        }
        type={passwordVisible ? 'text' : 'password'}
        {...props}
        ref={ref}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
