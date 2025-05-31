declare module 'react-helmet-async' {
  import * as React from 'react';

  interface HelmetProps {
    // Add any specific props you need
    children?: React.ReactNode;
    // Add other Helmet props as needed
  }

  export const Helmet: React.FC<HelmetProps>;
  
  interface HelmetProviderProps {
    children?: React.ReactNode;
    context?: {};
  }
  
  export const HelmetProvider: React.FC<HelmetProviderProps>;
  
  // Add other exports if needed
  export * from 'react-helmet';
}
