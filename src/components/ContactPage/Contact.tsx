import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? I'd love to hear from you!
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;