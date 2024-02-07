"use client";

import * as z from "zod";

import Link from "next/link";

import {
  useTransition,
  useState
} from "react";

import {
CardWrapper
} from "@/components/auth/card-wrapper";

import {
  useForm
} from "react-hook-form"

import {
  Input
} from "@/components/ui/input";

import {
  Button
} from "@/components/ui/button";

import {
  LoginSchema
} from "@/schemas/auth"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LOGINFORM } from "@/assets/texts";
import { EMAIL, PASSWORD } from "@/assets/placeholders";
import { FormStateMessage } from "../form-state-message";
import { EMAIL_IN_USE_OAUTH } from "@/assets/messages";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? EMAIL_IN_USE_OAUTH : "";
  const callbackUrl = searchParams.get("callbackUrl")
  const [error, setError] = useState<string | undefined>(urlError);
  const [notice, setNotice] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  // const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setNotice("");
    // setIsPending(true);
    
    // //WIP, jen simuluj req, zmenit
    // setTimeout(() => {

    //   setIsPending(false);
    // },1600)

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          // setSuccess(data?.success)
          setError(data?.error)
          setNotice(data?.notice)
        })
    })
  }

  return (
    <CardWrapper
      headerLabel={LOGINFORM.TITLE}
      backButtonLabel={LOGINFORM.BACK}
      backButtonHref="/register"
      showOAuth={true}
      disabled={isPending}
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
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/reset">
                      Zapomněli jste heslo?
                    </Link>
                  </Button>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <FormStateMessage error={error} notice={notice} />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {!isPending && "Přihlásit se"}
            {isPending && "Přihlašuji..."}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )

}