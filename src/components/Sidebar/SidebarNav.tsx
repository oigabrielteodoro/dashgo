import { Stack, Button, Icon } from "@chakra-ui/react";
import { RiDashboardLine, RiGitMergeLine, RiInputMethodLine, RiUserAddLine, RiLoginBoxLine } from "react-icons/ri";

import { useAuth } from "../../contexts/AuthContext";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  const { signOut } = useAuth();

  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine}>Dashboard</NavLink>
        <NavLink href="/users" icon={RiUserAddLine}>Usuários</NavLink>
      </NavSection>

      <NavSection title="AUTOMAÇÃO">
        <NavLink href="/forms" icon={RiInputMethodLine}>Formulários</NavLink>
        <NavLink href="/automation" icon={RiGitMergeLine}>Automação</NavLink>
      </NavSection>
      <Button 
        aria-label="Logout" 
        bg="transparent" 
        color="red.300" 
        padding="0"
        _hover={{
          background: 'transparent',
          color: 'red.400',
        }}
        onClick={signOut}
      >
        <Icon as={RiLoginBoxLine} fontSize="20" mr="4" />
        Sair da plataforma
      </Button>
    </Stack>
  )
}