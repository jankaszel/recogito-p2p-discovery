import styled from 'styled-components'
import {buttonGreen, dividerGray, headerGray} from '../layout/colors'

export const List = styled.ul`
  display: flex;
  flex-flow: column;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: ${headerGray};
`

export const Item = styled.li`
  display: flex;
  flex-flow: column;
  margin: 0;
  border-bottom: 2px solid ${dividerGray};
  padding: 20px;
  background-color: ${props => (props.selected ? buttonGreen : 'white')};

  cursor: pointer;
  transition: background 125ms ease-out;

  &:hover {
    background-color: ${props => (props.selected ? buttonGreen : headerGray)};
  }
`
