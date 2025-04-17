import { ReactElement } from "react"

export type ChildProp = {
  children: ReactElement
}

export type UsersContextTypes = {
  users: User[],
  addUser: (newUser: User) => void,
  loggedInUser: User | null,
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>,
  findUser: (formikValues: Partial<User>) => User | undefined
}

export type PostsContextTypes = {
  posts: Post[]
}

export type User = {
  id: string,
  username: string,
  email: string,
  password: string,
  avatar: string,
  dob: string,
  role: 'admin' | 'user',
  savedPosts: Post['id'][]
}

export type Post = {
  id: string,
  posterId: User['id'],
  dateOfPost: string,
  picture: string,
  content: string
}