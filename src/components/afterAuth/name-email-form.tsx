"use client"

import { useCurrentUser } from "@/actions/hooks/use-current-user"
import { nameEmailChange } from "@/actions/settings";
import { NameEmailChangeSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { EMAIL, NAME } from "@/assets/placeholders";
import { Button } from "../ui/button";
import { FormStateMessage } from "../form-state-message";

export const NameEmailForm = ({oauth} : {oauth: boolean}) => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NameEmailChangeSchema>>({
    resolver: zodResolver(NameEmailChangeSchema),
    defaultValues: {
      name: "",
      email: "",
    }
  })


  const onSubmit = (values: z.infer<typeof NameEmailChangeSchema>) => {
    setError("");
    setSuccess("");
    if (values.email === "" && values.name === "") {
      setError("Nic se nezměnilo");
    }
    else {
    startTransition(() => {

      nameEmailChange(values)
        .then((data) => {
          if(data?.error){
            setError(data?.error)
          }
          
          if (data?.success) {
            update();
            setSuccess(data?.success)
          }
      })
    })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
      <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Jméno
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={user?.name || NAME}
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
        />

      {!oauth && <FormField
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
                      placeholder={user?.email || EMAIL}
                      type="email"
                      disabled={isPending}
                    />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
        />}
        <FormStateMessage
          success={success}
        error={error} />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {!isPending && "Změnit"}
            {isPending && "Měním údaje..."}
          </Button>
      </form>
      </Form>
  )
}