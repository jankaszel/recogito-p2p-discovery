import styled from 'styled-components'
import {buttonGray, buttonRed} from '../layout/colors'

const Button = styled.button`
  margin: 0 0 0 10px;
  border: 0 none;
  border-radius: 7px;
  padding: 10px 15px;

  font: inherit;
  font-weight: 400;
  background: ${props => (props.cancel ? buttonRed : buttonGray)};
  transition: background 125ms ease-out, oapcity 125 ease-out;
  cursor: pointer;

  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  -webkit-appearance: none;

  &:first-child {
    margin-left: auto;
  }

  &:disabled {
    cursor: not-allowed;
    &:hover {
      opacity: 1;
    }
  }

  &:hover {
    opacity: 0.8;
  }
`

export default Button
