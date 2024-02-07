import { IconAlertTriangle, IconCheck } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";

interface FormSuccessProps{
  message?: string;
};

interface FormErrorProps {
  message?: string;
};

interface FomrNoticeProps {
  message?: string;
}

interface FormStateMessageProps {
  error?: string,
  success?: string,
  notice?: string,
}

export const FormSuccess = ({
  message,
}: FormSuccessProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-emerald-400/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-400">
      <IconCheck />
      <p>{message}</p>
    </div>
  )
}

export const FormError = ({
  message,
}: FormErrorProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-rose-600/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-600">
      <IconX />
      <p>{message}</p>
    </div>
  )
}

export const FormNotice = ({
  message,
}: FomrNoticeProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-amber-400/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-amber-400">
      <IconAlertTriangle />
      <p>{message}</p>
    </div>
  )
}

export const FormStateMessage = ({
  error,
  success,
  notice,
}: FormStateMessageProps) => {
  return (
    <>
      <FormSuccess message={success} />
      <FormError message={error} />
      <FormNotice message={notice} />
    </>
  )
}


