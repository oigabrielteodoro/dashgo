import { Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiGitMergeLine, RiInputMethodLine, RiUserAddLine } from "react-icons/ri";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
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
    </Stack>
  )
}