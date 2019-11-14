import React, {useRef, useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import useLockBodyScroll from '../effects/useLockBodyScroll'
import useOutsideAlerter from '../effects/handleClickOutside'
import {Container, Modal, Header, Main, Footer} from './Modal'
import TextInput from './TextInput'
import Button from './Button'

const Message = styled.p`
  font: inherit;

  margin: 20px;
  padding: 0;
`

export default function Dialog({onSave, onCancel}) {
  const [studyId, setStudyId] = useState('')
  const [complete, setComplete] = useState(false)

  const modalRef = useRef(null)
  const inputRef = useRef(null)

  useLockBodyScroll()
  useOutsideAlerter(modalRef, () => onCancel())

  useEffect(() => {
    setComplete(studyId !== '')
  }, [studyId])

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])

  const handleSave = useCallback(e => {
    if (e) e.preventDefault()
    onSave(studyId)
  })
  const handleCancel = useCallback(e => {
    if (e) e.preventDefault()
    onCancel()
  })

  return (
    <Container>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://rsms.me/inter/inter.css"
      />

      <Modal ref={modalRef}>
        <Header>
          <label>
            ID:
            <TextInput
              ref={inputRef}
              placeholder="Your study ID"
              value={studyId}
              onChange={e => setStudyId(e.target.value)}
            />
          </label>
        </Header>
        <Main>
          <Message>
            Your annotations will be stored in Recogito's centralized database.
          </Message>
        </Main>
        <Footer>
          <Button cancel onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={!complete} onClick={handleSave}>
            Continue
          </Button>
        </Footer>
      </Modal>
    </Container>
  )
}
