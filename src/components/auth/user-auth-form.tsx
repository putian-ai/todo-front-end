import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { loginLoginPost } from "@/client";
import { jwtDecode } from "jwt-decode"
import { useToast } from "../ui/use-toast";
import { tokenAtom, userAtom } from "@/atom";
import { useAtom } from "jotai";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(12, "Username must be at most 12 characters"),
  password: z.string().min(8, "Password must be at least 8 characters").max(16, "Password must be at most 16 characters"),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }
interface DecodedToken {
  id: number
  sub: string
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const { toast } = useToast();
  const [, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(tokenAtom);

  async function onSubmit(data: LoginSchemaType) {
    setIsLoading(true);

    try {
      const response = await loginLoginPost({
        requestBody: {
          username: data.username,
          password: data.password,
        },
      });

      // Handle successful login (e.g., redirect, update state)
      const token = response.access_token
      const decoded = jwtDecode<DecodedToken>(token)
      setUser({
        id: decoded.id,
        username: decoded.sub,
      });
      setToken(token);
      toast({
        title: "Success!",
        description: `Welcome back! ${decoded.sub}`,
      })
      console.log("Login successful:", decoded);
    } catch (error) {
      // Handle login error (e.g., display error message)
      console.error("Login error:", error);
      toast({
        title: "Error!",
        description: "Wrong password or username!",
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              disabled={isLoading}
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              disabled={isLoading}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}