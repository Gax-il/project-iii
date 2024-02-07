"use client"

import * as z from "zod"

import { useSession } from "next-auth/react"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { PasswordSchema } from "@/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { passwordChange } from "@/actions/settings"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { PASSWORD } from "@/assets/placeholders"
import { FormStateMessage } from "../form-state-message"
import { Button } from "../ui/button"

export const ChangePasswordForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof PasswordSchema>) => {
    setError("")

    startTransition(() => {
      passwordChange(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error)
          }
      })
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Aktuální heslo
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={PASSWORD}
                  type="password"
                  disabled={isPending} />
                
              </FormControl>
          </FormItem>
          )} />
        
        <FormStateMessage
          error={error} />
        
        <Button
            type="submit"
            className="w-full"
            disabled={isPending}
        >
          {!isPending && "Zkontrolovat"}
          {isPending && "Kontrolováno"}
          </Button>
      </form>
    </Form>
  )
}