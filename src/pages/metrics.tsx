import { Flex, SimpleGrid, Text } from "@chakra-ui/react";

import Head from "next/head";

import { Can } from "../components/Can";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

import { withSSRAuth } from "../utils/withSSRAuth";

import { setupApiClient } from "../services/auth";

export default function Metrics() {
  return (
    <>
      <Head> 
        <title>dashgo</title>
      </Head>

      <Can permissions={['metrics.list']}>
        <Flex direction="column" h="100vh">
          <Header />

          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />

            <SimpleGrid flex="1" gap="4" minChildWidth="320px">
              <Text fontWeight="bold" fontSize="5xl">Metrics</Text>
            </SimpleGrid>
          </Flex>
        </Flex>
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (context) => {
  const apiClient = setupApiClient(context);

  const response = await apiClient.get('/me');

  return {
    props: {},
  }
}, {
  permissions: ['metrics.list'],
  roles: ['administrator'],
})