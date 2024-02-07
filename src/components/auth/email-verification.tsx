"use client"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { SyncLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { emailVerification } from "@/actions/email-verification"
import { FormStateMessage} from "@/components/form-state-message"
import { ERROR_MSG, NO_TOKEN } from "@/assets/messages"
import { EMAILVERIFICATION } from "@/assets/texts"

export const EmailVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {
    if (!token) {
      setError(NO_TOKEN)
      return;
    };

    emailVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError(ERROR_MSG);
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel={EMAILVERIFICATION.TITLE}
      backButtonLabel={EMAILVERIFICATION.BACK}
      backButtonHref="/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <SyncLoader color="#000" />}
        <FormStateMessage success={success} error={error} />
        </div>
    </CardWrapper>

  )
}