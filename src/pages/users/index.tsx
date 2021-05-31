import { useEffect } from "react";

import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Checkbox, Tbody, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { useQuery } from 'react-query';

import Link from "next/link";
import Head from "next/head";

import { api } from "../../services/api";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

type QuerySuccessResponse = {
  users: User[];
} 

export default function UserList() {
  const { data, isLoading, error } = useQuery<User[]>('users', async () => {
    const { data: { users } } = await api.get<QuerySuccessResponse>('/users');

    const data = users.map(user => ({
      ...user,
      createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }))
 
    return data;
  }); 

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return ( 
    <>
      <Head>
        <title>Usuários | dashgo</title>
      </Head>

      <Box>
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius="8" bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="medium">Usuários</Heading>

              <Link href="/users/create" passHref>
                <Button 
                  as="a" 
                  size="sm" 
                  fontSize="small" 
                  colorScheme="pink" 
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo
                </Button>
              </Link>
            </Flex>

            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? ( 
              <Flex justify="center">
                <Text>Falha ao obter dados dos usuários.</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px={["4", "4", "6"]}color="gray.300" width="8">
                        <Checkbox colorScheme="pink" />
                      </Th>
                      <Th>Usuário</Th>
                      {isWideVersion && (
                        <>
                          <Th>Data de cadastro</Th>
                          <Th width="8" />
                        </>
                      )}
                    </Tr>
                  </Thead>
                  <Tbody> 
                    {data?.map(user => (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="small" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && ( 
                          <>
                            <Td>{user.created_at}</Td>
                            <Td>
                              <Button 
                                as="a" 
                                size="sm" 
                                fontSize="sm" 
                                colorScheme="purple" 
                                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                              >
                                Editar
                              </Button>
                            </Td>
                          </>
                        )}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <Pagination />
              </>
            )}
          </Box>
        </Flex>  
      </Box>
    </>
  )
}