import React from "react";
import HeaderForm from "../Components/HeaderForm";
import Login from "../Components/Login";

function LoginPage() {
  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <HeaderForm
            heading="Login to your account"
            paragraph="Don't have an account yet? "
            linkName="Signup"
            linkUrl="/SignupPage"
          />
          <Login />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
