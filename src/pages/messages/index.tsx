/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next'
import { Container } from 'react-bootstrap';
import StyledContainer from './Messages.style'
import { MessageView } from '../../components/MessageView';
import { format } from 'date-fns'
import { useQuery } from '@apollo/client';
import { userQuery } from '../../apollo/user/query';

const Messages: NextPage<Props> = () => {
  const { data: { user }} = useQuery(userQuery);
  console.log('user', user)
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations/${user.id}`)
        .then(response => response.json())
        .then(data => {
          console.log('data', data);
          return setConversations(data)
        })
    }
  }, [user]);

  return (
    <Container>
      <StyledContainer hasSelectedConversation={!!currentConversation}>
        <div className="conversations-container"> 
          {conversations.map((conversation)  => {
            const date = new Date(conversation.lastMessageTimestamp);
            const formatedDate =  format(date, 'dd/MM/yy à hh:mm') ;
            const imSender = conversation?.senderId === user.id
            return (
              <div
                className={`item ${conversation?.id === currentConversation?.id ? 'item--active' : ''}`}
                key={conversation.id}
                onClick={() => setCurrentConversation(conversation)}
              >
                <img src="https://www.wortis.fr/wp-content/uploads/2018/06/client.png" alt={`recipient-${conversation.recipientId}`} />
                <div>{imSender ? conversation.recipientNickname : conversation.senderNickname}</div>
                <div className="date">dernier message le {formatedDate}</div>
              </div>
            )
          })}
        </div>
        {currentConversation &&
          <div className="messageview-container">
            <MessageView conversation={currentConversation} />
          </div>
        }
      </StyledContainer>
    </Container>
  )
}

interface Props {
}

export default Messages;
