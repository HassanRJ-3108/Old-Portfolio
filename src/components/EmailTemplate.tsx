import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  email,
  subject,
  message,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f4f4f4' }}>
    <h1 style={{ color: '#333', borderBottom: '2px solid #D3E97A', paddingBottom: '10px' }}>New Contact Form Submission</h1>
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
      <p style={{ margin: '10px 0' }}><strong>Name:</strong> {name}</p>
      <p style={{ margin: '10px 0' }}><strong>Email:</strong> {email}</p>
      <p style={{ margin: '10px 0' }}><strong>Subject:</strong> {subject}</p>
      <h2 style={{ color: '#333', borderBottom: '1px solid #D3E97A', paddingBottom: '5px', marginTop: '20px' }}>Message:</h2>
      <p style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{message}</p>
    </div>
    <div style={{ marginTop: '20px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
      This email was sent from your contact form.
    </div>
  </div>
);