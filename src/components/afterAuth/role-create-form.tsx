"use client"

import { RoleCreateSchema } from "@/schemas/role"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  useForm
} from "react-hook-form"

import * as z from "zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "../ui/form"
import { Input } from "@/components/ui/input"
import { ROLE_NAME } from "@/assets/placeholders"
import { PermItem } from "./role-form-perm-item"
import { FormStateMessage } from "../form-state-message"
import { Button } from "../ui/button"
import { useState, useTransition } from "react"
import { createRole } from "@/actions/role-creation"

export const RoleCreateForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof RoleCreateSchema>>({
    resolver: zodResolver(RoleCreateSchema),
    defaultValues: {
      name: "",
      permissions: {
        admin: false,
        perm1: true,
        perm2: false,
        perm3: false
      },

    }


  })

  const onSubmit = (values: z.infer<typeof RoleCreateSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createRole(values)
        .then((data) => {
          setSuccess(data?.success)
          setError(data?.error)
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Jméno
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={ROLE_NAME}
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
        />

        <div className="grid grid-cols-1 gap-1 mt-2 truncate w-[200px]">
          <h2 className="text-lg">Perms:</h2>
              <FormField
              control={form.control}
              name="permissions.admin"
            render={({ field }) => (
              <PermItem
                checked={field.value}
                onCheckedChange={field.onChange}
                label="Admin"
                disabled={isPending}
                />
              )} 
        />
        <FormField
              control={form.control}
              name="permissions.perm1"
              render={({ field }) => (
                <PermItem
                checked={field.value}
                onCheckedChange={field.onChange}
                label="Perm1"
                disabled={isPending}
                />
                
              )}
        />
        <FormField
              control={form.control}
              name="permissions.perm2"
              render={({ field }) => (
                <PermItem
                checked={field.value}
                onCheckedChange={field.onChange}
                label="Perm2"
                disabled={isPending}
                />
                
              )}
        />
        <FormField
              control={form.control}
              name="permissions.perm3"
              render={({ field }) => (
                <PermItem
                checked={field.value}
                onCheckedChange={field.onChange}
                label="Perm3"
                disabled={isPending}
                />
                
              )}
          />
          
        </div>
        <FormStateMessage
          success={success}
          error={error}
        />
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isPending}//wip
        >
          Vytvořit
        </Button>
      </form>
    </Form>
  )
}