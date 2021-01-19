import { Button, CircularProgress, PropTypes } from '@material-ui/core'
import React from 'react'

// defining interface here instead of interfaces file as nowhere else will be using this interface,
// and the component is small
interface LoadingButtonProps {
  children: any[];
  buttonStyle?: any;
  text: string;
  color: PropTypes.Color;
  loading?: boolean;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function LoadingButton({ text = 'Submit', buttonStyle, color = 'primary', loading = false, disabled = false, onClick }: LoadingButtonProps): JSX.Element {
  return (
    <Button
      className={buttonStyle}
      variant="contained"
      color={color}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? <CircularProgress color="primary" size="25px" /> : text}
    </Button>
  )
}
