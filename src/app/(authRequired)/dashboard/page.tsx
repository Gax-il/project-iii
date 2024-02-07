"use client"

import { useCurrentUser } from '@/actions/hooks/use-current-user'
import { UserInfo } from '@/components/afterAuth/user-info'
import React from 'react'

const DashboardPage = () => {
  const user = useCurrentUser();

  return (
    <div>
      <h1 className='font-primary font-semibold text-xl'>Informace o uživateli:</h1>
      <UserInfo user={user} />
    </div>
  )
}

export default DashboardPage