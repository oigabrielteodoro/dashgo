import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() { 
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Gabriel Teodoro</Text>
        <Text color="gray.300" fontSize="small">
          teodoro@brainn.co
        </Text>
      </Box>

      <Avatar 
        size="md" 
        name="Gabriel Teodoro" 
        src="https://github.com/oigabrielteodoro.png" 
      />
    </Flex>
  )
}