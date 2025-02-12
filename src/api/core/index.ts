import { ComponentType } from 'react'

export type RouteType = {
  readonly exact?: boolean
  readonly path: string
  readonly isPublic: boolean
  readonly element: ComponentType
}
