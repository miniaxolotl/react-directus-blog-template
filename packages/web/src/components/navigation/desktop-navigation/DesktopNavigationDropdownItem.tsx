import React from "react";

import { Menu, MenuItemProps } from "@mantine/core";

type DesktopNavigationDropdownItemProps = MenuItemProps & {
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export const DesktopNavigationDropdownItem = ({
  icon,
  children,
}: DesktopNavigationDropdownItemProps) => {
  return (
    <Menu.Item
      display="flex"
      icon={icon}
      px={16}
      py={8}
      sx={{
        a: { ":hover": { textDecoration: "none" } },
        borderRadius: 2,
      }}
    >
      {children}
    </Menu.Item>
  );
};
