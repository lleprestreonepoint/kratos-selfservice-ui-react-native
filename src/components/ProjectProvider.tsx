// This file defines a React Context which keeps track of the authenticated session.

import React, { createContext, ReactNode, useEffect, useState } from 'react'
import {
  getAuthenticatedSession,
  killAuthenticatedSession,
  SessionContext,
  setAuthenticatedSession
} from '../helpers/auth'
import { AxiosError } from 'axios'
import { newKratosSdk } from '../helpers/sdk'
import { Session } from '@oryd/kratos-client'

interface Context {
  project: string
  setProject: (project: string) => void
}

export const ProjectContext = createContext<Context>({
  setProject: () => {},
  project: 'playground'
})

interface Props {
  children: ReactNode
}

export default ({ children }: Props) => {
  const [project, setProject] = useState('playground')

  console.log('updating with state: ', project)
  return (
    <ProjectContext.Provider
      value={{
        // Helpers to set the global Ory Project for this app.
        project,
        setProject: (project: string) => {
          console.log('updating to:', project)
          setProject(project)
        }
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
