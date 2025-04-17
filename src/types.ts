import { ReactElement } from "react"

export type ChildProp = {
  children: ReactElement
}

export type UsersContextTypes = {
  users: User[],
  addUser: (newUser: User) => void,
  loggedInUser: User | null,
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>,
  findUserByMail: (formikValues: Partial<User>) => User | undefined,
  findUserById: (id: User["id"]) => User | undefined,
  savePost: (id: Post["id"]) => void,
  unsavePost: (id: Post["id"]) => void
}

export type PostsContextTypes = {
  posts: Post[],
  addPost: (newPost: Post) => void,
  deletePost: (id: Post["id"]) => void,
  findPostById: (id: Post["id"]) => Post | undefined
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
  title: string,
  content: string
}