import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { createUserCreateUserPost, CreateUserCreateUserPostData } from "@/client";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(12, "Username must be at most 12 characters"),
  password: z.string().min(8, "Password must be at least 8 characters").max(16, "Password must be at most 16 characters"),
});

type registerSchemaType = z.infer<typeof registerSchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> { }


export function UserRegisterForm({ className, ...props }: UserRegisterFormProps) {

  const navigate = useNavigate();



  const { toast } = useToast();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: registerSchemaType) => {
    setIsLoading(true);
    console.log("Registering...");
    try {
      const payload: CreateUserCreateUserPostData = {
        requestBody: {
          user_name: data.username,
          pwd: data.password,
        },
      };
      await createUserCreateUserPost(payload);
      toast({
        title: "User registered",
        description: "User has been registered successfully",
      })
      setIsLoading(false);
      navigate("/login");
    } catch {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "An error occurred while registering user",
      });
    }
  };


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
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}