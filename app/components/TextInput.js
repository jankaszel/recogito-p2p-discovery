import styled from 'styled-components'
import {inputBlue} from '../layout/colors'

const TextInput = styled.input.attrs({
  type: 'text',
})`
  &&& {
    display: inline-block;
    width: 300px;
    margin: 0 0 0 10px;
    border: 2px solid rgb(200, 200, 200);
    border-radius: 3px;
    padding: 9px;
    background: white;

    font: 18px/100% 'Inter', sans-serif;
    font-weight: 400;
    letter-spacing: 0;

    transition: border-color 125ms ease-out, box-shadow 125ms ease-out;

    &:focus,
    &:active {
      border-color: ${inputBlue};
      box-shadow: 0 0 3px rgba(150, 150, 245, 0.6);
    }
  }
`

export default TextInput
