"use client"

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";
import { loginAction, signUpAction } from "@/actions/users";

type Props = {
    type: "login" | "signUp";
}

function AuthForm({ type }: Props) {
    const isLoginForm = type === "login";

    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            let errorMessage;
            let description;
            if (isLoginForm) {
                errorMessage = (await loginAction(email, password)).errorMessage;
                description = "You have been logged in successfully";
            } else {
                errorMessage = (await signUpAction(email, password)).errorMessage;
                description = "Check your email for a confirmation link";
            }

            if (!errorMessage) {
                toast.success(description);
                router.replace("/");
            } else {
                toast.error(errorMessage);
            }


        });
    }    
    return (
        <form action={handleSubmit}>
            <CardContent className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        disabled={isPending}
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        disabled={isPending}
                    />
                </div>
            </CardContent>
            <CardFooter className="mt-4 flex flex-col gap-6">
                <Button className="w-full">
                    {isPending ? (
                        <Loader className="animate-spin" />
                     ) : isLoginForm ? (
                        "Login" 
                    ) : (
                        "Sign Up"
                    )}
                </Button>
                <p className="text-xs">
                    {isLoginForm
                        ? "Don't have an account? "
                        : "Already have an account? "}{""}
                    <Link href={isLoginForm ? "/sign-up" : "/login"} className={`text-blue-500 underline ${isPending ? "pointer-event-none opacity-50" : ""}`}>
                        {isLoginForm ? "Sign Up" : "Login"}
                    </Link>
                </p>
            </CardFooter>
        </form>
    )
}

export default AuthForm