import React, { useState, useEffect } from 'react';
import '../css/main.css';
import Header from '../components/Header';

// Define the Message type
type Message = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
};

const SingleMessagePage: React.FC = () => {
  const [message, setMessage] = useState<Message | null>(null);

  // Fetching a single message (mock data here)
  useEffect(() => {
    const fetchedMessage: Message = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      subject: 'Inquiry about services',
      message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      receivedAt: '2024-10-06 14:35',
    };

    setMessage(fetchedMessage); // Set fetched message as the one to display
  }, []);

  return (
    <div>
        <Header />
        <div className="single-message-page-container">
      {message ? (
        <div className="message-detail">
          <h2>{message.subject}</h2>
          <p>
            <strong>From:</strong> {message.firstName} {message.lastName} 
          </p>
          <p>
            <strong>Email:</strong> {message.email}
          </p>
          <p><strong>Date:</strong> {message.receivedAt}</p>
          <div className="message-content">
            <p>{message.message}</p>
          </div>
        </div>
      ) : (
        <p>Loading message...</p>
      )}
    </div>
    </div>
  );
};

export default SingleMessagePage;
