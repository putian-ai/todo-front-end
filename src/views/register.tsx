import AuthLayout from "@/components/auth/auth-layout";
import { UserRegisterForm } from "@/components/auth/user-register-form";
import React from "react";

function RegisterPage() {


  return (<>
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Register
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your username and password
        </p>
      </div>
      <UserRegisterForm />
    </AuthLayout>
  </>);
}

export default RegisterPage;