import { getApiURL } from "@/constants";
import { setLoginMode } from "@/globalStates/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginRequestBody, useAuthLogin } from "@/hooks/query/auth";
import { LoginRequestSchema } from "@reynandaptr/aha-types/dist/types";
import { useRouter } from "next/router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestBody>({
    resolver: zodResolver(LoginRequestSchema.shape.body),
  });
  const { mutate: doAuthLogin } = useAuthLogin()

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('error')) {
      toast.error(query.get('error'))
    }
  }, [])

  const onSubmit: SubmitHandler<LoginRequestBody> = (data) => {
    doAuthLogin(data, {
      onSuccess: () => {
        router.replace('/app')
      },
      onError: (error) => {
        toast.error(error.response?.data.message || error.message)
      }
    })
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Enter your email below to Sign In
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 gap-6">
                <Button variant="outline">
                  <Icons.google className="mr-2 h-4 w-4" />
                  <Link href={`${getApiURL()}/v1/auth/login/google`} onClick={() => dispatch(setLoginMode('GOOGLE'))}>Google</Link>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...register('password')} />
                {errors.password && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.password?.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">Sign Up</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </section>
  );
}

SignIn.UseClientSideLayout = true
