import React, {useRef, useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import useLockBodyScroll from '../effects/useLockBodyScroll'
import useOutsideAlerter from '../effects/handleClickOutside'
import {Container, Modal, Header, Main, Footer} from './modal'
import {List, Item} from './list'
import TextInput from './TextInput'
import Button from './Button'
import {inactiveGray, offBlack, dividerGray, headerGray} from '../layout/colors'

const Message = styled.p`
  margin: 0;
  border-bottom: 2px solid ${dividerGray};
  padding: 20px;
  background: ${headerGray};
  font: inherit;
  line-height: 135%;
  cursor: default;
`

const Label = styled.em`
  display: inline-block;
  align-self: flex-end;
  margin: 0 0 0 auto;
  border-radius: 40px;
  padding: 11px;
  font: inherit;
  font-style: normal;
  background: white;
  cursor: default;
`

const Title = styled.h6`
  display: block;
  width: 100%;
  margin: 0 0 15px;
  font: inherit;
  font-weight: 500;
  color: ${offBlack};
`

const Url = styled.p`
  margin: -2px 0;
  padding: 2px 0;
  overflow: hidden;
  font-family: 'Fira Mono', monospace;
  color: ${inactiveGray};

  white-space: nowrap;
  text-overflow: ellipsis;
`

export default function Dialog({
  targetUrl,
  documents,
  userId = '',
  useP2P,
  allowOutsideClick,
  onSave,
  onCancel,
}) {
  const [studyId, setStudyId] = useState(userId)
  const [complete, setComplete] = useState(false)
  const [selectedDocUrl, setSelectedDocUrl] = useState(null)

  const modalRef = useRef(null)
  const inputRef = useRef(null)

  useLockBodyScroll()
  if (allowOutsideClick) {
    useOutsideAlerter(modalRef, () => onCancel())
  }

  useEffect(() => {
    setComplete(
      studyId !== '' && (!useP2P || (useP2P && selectedDocUrl !== null))
    )
  }, [studyId, selectedDocUrl])

  useEffect(() => {
    if (selectedDocUrl && !documents.find(({url}) => selectedDocUrl === url)) {
      setSelectedDocUrl(null)
    }
  }, [documents])

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])

  const handleSave = useCallback(e => {
    if (e) {
      e.preventDefault()
    }

    if (useP2P) {
      onSave(studyId, selectedDocUrl)
    } else {
      onSave(studyId)
    }
  })

  const handleCancel = useCallback(e => {
    if (e) e.preventDefault()
    onCancel()
  })

  const handleSelect = useCallback(docUrl => {
    setSelectedDocUrl(docUrl)
  })

  return (
    <Container>
      <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
      <link
        href="https://fonts.googleapis.com/css?family=Fira+Mono&display=swap"
        rel="stylesheet"
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

          {useP2P && <Label>P2P</Label>}
        </Header>
        <Main>
          <Message>
            {useP2P
              ? 'Please select a decentralized notebook for storage:'
              : "Your annotations will be stored in Recogito's database."}
          </Message>

          {useP2P && (
            <List>
              {documents.map(({url, title}) => (
                <Item
                  key={url}
                  selected={selectedDocUrl === url}
                  onClick={() => handleSelect(url)}
                >
                  {title && <Title>{title}</Title>}
                  <Url>{url}</Url>
                </Item>
              ))}
            </List>
          )}
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
