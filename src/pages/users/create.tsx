import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";

import Link from "next/link";
import Head from "next/head";

import { SubmitHandler, useForm } from "react-hook-form";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import { Input } from "../../components/Form/Input";

interface CreateUserFormData {
  email: string;
  password: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
}) 

export default function CreateUser() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm({
    resolver: yupResolver(createUserFormSchema)
  });
 
  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(data);
  }

  return (
    <>
      <Head>
        <title>Criar usuário | dashgo</title>
      </Head>

      <Box>
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box 
            as="form" 
            flex="1" 
            borderRadius="8" 
            bg="gray.800" 
            p={["6", "8"]}
            onClick={handleSubmit(handleCreateUser)}
          >
            <Heading size="lg" fontWeight="medium">Criar usuário</Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input 
                  label="Nome completo" 
                  error={errors.name}
                  {...register('name')}
                />
                <Input 
                  type="email" 
                  label="E-mail" 
                  error={errors.email}
                  {...register('email')}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input 
                  type="password" 
                  label="Senha" 
                  error={errors.password}
                  {...register('password')}
                />
                <Input 
                  type="password" 
                  label="Confirmação da senha" 
                  error={errors.password_confirmation}
                  {...register('password_confirmation')}
                />
              </SimpleGrid>
            </VStack> 

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                </Link> 
                <Button colorScheme="pink" isLoading={isSubmitting}>
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>  
      </Box>
    </>
  )
} 