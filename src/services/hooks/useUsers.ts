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

type GetUsersResponse = {
  users: User[];
  totalCount: number;
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data: { users }, headers } = await api.get<QuerySuccessResponse>('/users', {
    params: {
      page,
    }
  });

  const totalCount = Number(headers['x-total-count']);

  const data = users.map(user => ({
    ...user,
    created_at: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }))

  return {
    users: data, 
    totalCount
  };
}  

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10
  }); 
}