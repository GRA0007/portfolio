import { StyledButton } from './buttonStyle'

const Button = ({
  type = 'button',
  ...props
}) => (
  <StyledButton
    type={type}
    {...props}
  />
)

export default Button
