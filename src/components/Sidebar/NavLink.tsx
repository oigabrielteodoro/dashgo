import { ElementType } from "react";

import { IconBaseProps } from "react-icons";

import Icon from "@chakra-ui/icon";

import { Link as ChakraLink, Text, LinkProps } from "@chakra-ui/layout";

import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends LinkProps {
  icon: ElementType<IconBaseProps>
  children: string;
}  
 
export function NavLink({ icon, href = '/', children, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  )
}