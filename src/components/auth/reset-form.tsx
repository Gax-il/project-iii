"use client"

import { useTransition, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { EmailSchema } from "@/schemas/auth";
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
import Link from "next/link"
import { reset } from "@/actions/new-password";
import { FormStateMessage } from "../form-state-message";
import { RESETPASSWORD } from "@/assets/texts";
import { EMAIL } from "@/assets/placeholders";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    }
  });

  const onSubmit = (values: z.infer<typeof EmailSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values)
        .then((data) => {
          setSuccess(data?.success);
          setError(data?.error);
        });
    });
  }


  return (
    <CardWrapper
      headerLabel={RESETPASSWORD.TITLE}
      backButtonLabel={RESETPASSWORD.BACK}
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={EMAIL}
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormStateMessage success={success} error={error} />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {RESETPASSWORD.SUBMIT}
          </Button>
        </form>
      </Form> 
      </CardWrapper>
  );
}