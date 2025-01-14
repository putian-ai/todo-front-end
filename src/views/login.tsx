import React from "react";
import { UserAuthForm } from "@/components/auth/user-auth-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/auth-layout";

function LoginPage() {
  const navigate = useNavigate();


  function handleClick() {
    navigate("/register");
  }

  return (<>
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Login
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password
        </p>
      </div>
      <Button variant="outline" className="w-full"
        onClick={handleClick}>click here if you don&apos;t have an account yet</Button>
      <UserAuthForm />
    </AuthLayout >
  </>);
}

export default LoginPage;