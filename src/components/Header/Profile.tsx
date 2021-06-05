import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";

interface ProfileProps {
  showProfileData?: boolean;
} 

export function Profile({ showProfileData = true }: ProfileProps) { 
  const { user } = useAuth();

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gabriel Teodoro</Text>
          <Text color="gray.300" fontSize="small">
            {user?.email}
          </Text>
        </Box>
      )}

      <Avatar 
        size="md" 
        name="Gabriel Teodoro" 
        src="https://github.com/oigabrielteodoro.png" 
      />
    </Flex>
  )
}