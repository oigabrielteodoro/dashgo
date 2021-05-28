import { ElementType } from "react";

import { IconBaseProps } from "react-icons";

import Icon from "@chakra-ui/icon";
import { Link, Text, LinkProps } from "@chakra-ui/layout";

interface NavLinkProps extends LinkProps {
  icon: ElementType<IconBaseProps>
  children: string;
} 
 
export function NavLink({ icon, children, ...rest }: NavLinkProps) {
  return (
    <Link display="flex" align="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">{children}</Text>
    </Link>
  )
}