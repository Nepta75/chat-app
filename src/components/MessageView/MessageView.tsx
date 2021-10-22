import React, { useEffect, useState, useRef } from 'react';
import type { FC } from 'react'
import { Container, Button } from 'react-bootstrap';
import { StyledContainer } from './MessageView.style';
import { useQuery } from '@apollo/client';
import { userQuery } from '../../apollo/user/query';
import { Conversation } from '../../types/conversation'
import { useForm, SubmitHandler } from "react-hook-form";
import { format } from 'date-fns'
import { Message } from '../../types/message'

interface Props {
  conversation: Conversation,
}

type Inputs = {
  messageText: string,
};

const MessageView: FC<Props> = ({ conversation }) => {
  const messageContainerRef = useRef()
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const { data: { user }} = useQuery(userQuery);

  const imSender = conversation?.senderId === user.id;
  
  const onSubmit: SubmitHandler<Inputs> = data => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: data.messageText,
        timestamp: new Date().getTime(),
        conversationId: conversation.id,
        authorId: user.id
      }),
    }).then(res => res.json()).then(data => {
      if (data?.id) {
        setMessages([...messages, data]);
        reset({ messageText: ''})
      }
    })
  };

  useEffect(() => {
    if (conversation?.id) {
      reset({ messageText: ''});
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/${conversation.id}`)
      .then(response => {
        if (response.status === 200) {
          return response.json().then(
            data => setMessages(data)
          )
        }
      }) 
    }
  }, [conversation.id, reset]);

  return (
    <StyledContainer>
      <Container ref={messageContainerRef}>
        {messages?.length > 0 && messages.map((message) => {
          console.log('user', user)
          const isSender = message.authorId === user.id;
          const date = new Date(message.timestamp);
          const formatedDate =  format(date, 'dd/MM/yy à HH:mm');
          return (
            <div className={`message-container ${isSender ? 'message-container--user' : 'message-container--user2'}`} key={message.id}>
              <div>
                <div className="label-message">
                  <div>
                    {isSender ? 'vous' : (imSender ? conversation.recipientNickname : conversation.senderNickname)}
                    <span className="date-message">
                      {" "}le{" "}
                      {formatedDate}
                    </span>
                  </div>
                </div>
                <div className="message">{message.body}</div>
              </div>
            </div>
          )
        })}
      </Container>
      <form className="bottom-container" onSubmit={handleSubmit(onSubmit)}>
          <textarea id="messageText" {...register("messageText")}></textarea>
          <Button aria-label="sendMessage" type="submit">Envoyer</Button>
      </form>
    </StyledContainer>
  )
}

export { MessageView };

