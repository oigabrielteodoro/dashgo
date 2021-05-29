import { Flex, Button, Stack } from "@chakra-ui/react";

import Head from "next/head";

import { SubmitHandler, useForm } from "react-hook-form";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../components/Form/Input";

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória'),
})
 
export default function SignIn() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm({
    resolver: yupResolver(signInFormSchema)
  });
 
  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(data);
  }
 
  return (
    <>
      <Head>
        <title>Autenticação | dashgo</title>
      </Head>

      <Flex 
        w="100vw" 
        h="100vh" 
        align="center" 
        justify="center"
      >
        <Flex
          as="form"
          width="100%"
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        > 
          <Stack spacing="4">
            <Input 
              type="email" 
              label="E-mail" 
              error={errors.email}
              {...register('email')} 
            />

            <Input
              type="password" 
              label="Senha" 
              error={errors.password}
              {...register('password')}
            />
          </Stack> 

          <Button 
            type="submit" 
            mt="6" 
            size="lg"
            colorScheme="pink" 
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>  
    </>
  )
}
