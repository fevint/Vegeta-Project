"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

type UserAuthForm = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserAuthForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: UserAuthForm) => {
    console.log("🚀 ~ onSubmit ~ data:", data);

    try {
      const user = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: searchParams.get("callbackUrl") || "/",
        redirect: false,
      });

      console.log("🚀 ~ onSubmit ~ user:", user);

      if (!user?.error) {
        router.push(user?.url || "/");
      } else {
        toast({
          title: "Something went wrong",
          description: "Please check your email and password",
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch (error) {
      console.log("🚀 ~ file: sign-in-form.tsx:41 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[100%]">
      <div className="w-[100%] text-3xl font-semibold tracking-widest mb-2 text-center">
        Masuk akun anda
      </div>

      {/* <div className="w-[100%]"> */}
      <Input
        className="w-[100%]"
        type="text"
        placeholder="Email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        className="w-[100%] mt-4"
        type={showPassword ? "text" : "password"}
        placeholder="Kata Sandi"
        suffix="Eye"
        onPressSuffix={() => setShowPassword(!showPassword)}
        {...register("password")}
        error={errors.password?.message}
      />
      {/* </div> */}

      <Button
        className={cn("w-[320px] bg-leaf mt-6 mx-auto", hover.shadow)}
        type="submit"
      >
        Masuk
      </Button>
    </form>
  );
}

export default SignInForm;
