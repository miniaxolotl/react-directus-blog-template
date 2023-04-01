import { BoxProps, Flex } from "@mantine/core";
import { forwardRef } from "react";

type DesktopNavigationItemProps = BoxProps & {
  children: React.ReactNode;
};

export const DesktopNavigationItem = forwardRef<
  HTMLDivElement,
  DesktopNavigationItemProps
>((props, ref) => {
  return (
    <Flex
      {...props}
      ref={ref}
      align="center"
      px={8}
      py={4}
      mx={4}
      sx={{
        ":hover": {
          backgroundColor: "titleBar.hoverBackground",
          color: "titleBar.hoverForeground",
        },
        a: { ":hover": { textDecoration: "none" } },
        ":first-of-type": { marginLeft: 0 },
        ":last-of-type": { marginRight: 0 },
      }}
    >
      {props.children}
    </Flex>
  );
});
