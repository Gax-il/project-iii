"use client"

import { useTransition, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FormStateMessage } from "@/components/form-state-message"
import { resetPassword } from "@/actions/password";
import { useSearchParams } from "next/navigation";
import { PasswordChangeSchema } from "@/schemas/auth";
import { PASSWORD } from "@/assets/placeholders";

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof PasswordChangeSchema>>({
    resolver: zodResolver(PasswordChangeSchema),
    defaultValues: {
      password: "",
    }
  });

  const onSubmit = (values: z.infer<typeof PasswordChangeSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(values, token)
        .then((data) => {
          setSuccess(data?.success);
          setError(data?.error);
        });
    });
  }


  return (
    <CardWrapper
      headerLabel="Zadejte nové heslo"
      backButtonLabel=""
      backButtonHref=""
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Heslo
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={PASSWORD}
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmationPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Stejné heslo
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={PASSWORD}
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormStateMessage success={success} error={error}/>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            Změnit heslo
          </Button>
        </form>
      </Form> 
      </CardWrapper>
  );
}