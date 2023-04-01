import { Box, Flex, Title } from "@mantine/core";

import { Link } from "@components/core";
import { DesktopNavigationItem } from "./DesktopNavigationItem";

type DesktopNavigationProps = {
  title: string;
  children: React.ReactNode;
};

export const DesktopNavigation = ({
  title,
  children,
}: DesktopNavigationProps) => {
  return (
    <Flex sx={{ justifyContent: "space-between" }}>
      <DesktopNavigationItem>
        <Title order={4}>
          <Link href="/">{title}</Link>
        </Title>
      </DesktopNavigationItem>
      <Box display="flex">{children}</Box>
    </Flex>
  );
};
