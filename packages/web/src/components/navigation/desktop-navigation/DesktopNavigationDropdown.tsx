import React from "react";

import { Flex, Menu, MenuProps } from "@mantine/core";

import { DesktopNavigationItem } from "./DesktopNavigationItem";

type DesktopNavigationDropdownProps = MenuProps & {
  title: string;
  children: React.ReactNode;
};

export const DesktopNavigationDropdown = ({
  children,
  title,
}: DesktopNavigationDropdownProps) => {
  return (
    <Menu position="bottom-start" withinPortal>
      <Menu.Target>
        <DesktopNavigationItem>{title}</DesktopNavigationItem>
      </Menu.Target>
      <Menu.Dropdown
        p={0}
        miw={144}
        sx={{
          borderRadius: 4,
          boxShadow: "1.2px 1.2px 2px 0.8px #595959",
        }}
      >
        <Flex direction="column">{children}</Flex>
      </Menu.Dropdown>
    </Menu>
  );
};
