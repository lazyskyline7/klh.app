import { FC, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: FC<ButtonProps> = ({ className = '', children, ...props }) => {
  return (
    <button className={clsx('glass-button group', className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
