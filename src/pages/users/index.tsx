import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Checkbox, Tbody, Text, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import Head from "next/head";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";

export default function UserList() {
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

              <Button 
                as="a" 
                size="sm" 
                fontSize="small" 
                colorScheme="pink" 
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Flex>

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
                <Tr>
                  <Td px={["4", "4", "6"]}>
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">Gabriel Teodoro</Text>
                      <Text fontSize="small" color="gray.300">oi@gabrielteodoro.com</Text>
                    </Box>
                  </Td>
                  {isWideVersion && (
                    <>
                      <Td>04 de Abril, 2021</Td>
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
                <Tr>
                  <Td px={["4", "4", "6"]}>
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">Gabriel Teodoro</Text>
                      <Text fontSize="small" color="gray.300">oi@gabrielteodoro.com</Text>
                    </Box>
                  </Td>
                  {isWideVersion && (
                    <>
                      <Td>04 de Abril, 2021</Td>
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
                <Tr>
                  <Td px={["4", "4", "6"]}>
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">Gabriel Teodoro</Text>
                      <Text fontSize="small" color="gray.300">oi@gabrielteodoro.com</Text>
                    </Box>
                  </Td>
                  {isWideVersion && (
                    <>
                      <Td>04 de Abril, 2021</Td>
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
              </Tbody>
            </Table>

            <Pagination />
          </Box>
        </Flex>  
      </Box>
    </>
  )
}