import { ReactElement } from "react"

export type ChildProp = {
  children: ReactElement
}

export type UsersContextTypes = {
  users: User[],
  addUser: (newUser: User) => void
}

export type User = {
  id: string,
  username: string,
  email: string,
  password: string,
  avatar: string,
  dob: string
}