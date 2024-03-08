import HeaderForm from "../Components/HeaderForm";
import Signup from "../Components/Signup";
import React from "react";

function SignupPage() {
  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <HeaderForm
            heading="Signup to create an account"
            paragraph="Already have an account? "
            linkName="Login"
            linkUrl="/LoginPage"
          />
          <Signup />
        </div>
      </div>
    </>
  );
}

export default SignupPage;
