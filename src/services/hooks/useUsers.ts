import { useQuery } from "react-query";

import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

type QueryUser = {
  createdAt: string
} & Omit<User, 'created_at'>

type QuerySuccessResponse = {
  users: QueryUser[];
}  

export async function getUsers(): Promise<User[]> {
  const { data: { users } } = await api.get<QuerySuccessResponse>('/users');

  const data = users.map(user => ({
    ...user,
    created_at: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }))

  return data;
} 

export function useUsers() {
  return useQuery<User[]>('users', getUsers, {
    staleTime: 1000 * 5
  }); 
}