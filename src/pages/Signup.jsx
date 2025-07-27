import { SignUp } from '@clerk/clerk-react';

const Signup = () => {
  return (
    <div style={{ 
      minHeight: "80vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "var(--background-color)",
      padding: "20px"
    }}>
      <SignUp 
        redirectUrl="/"
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "0 6px 24px rgba(20,58,82,0.10)",
              borderRadius: "16px"
            }
          }
        }}
      />
    </div>
  );
};

export default Signup; 