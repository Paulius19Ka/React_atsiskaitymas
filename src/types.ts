import { ReactElement } from "react"

export type ChildProp = {
  children: ReactElement
}

export type UsersContextTypes = {
  users: User[],
  addUser: (newUser: User) => void,
  loggedInUser: User | null,
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>,
  findUser: (id: User["id"]) => User | string
}

export type User = {
  id: string,
  username: string,
  email: string,
  password: string,
  avatar: string,
  dob: string,
  role: string
}