import React from "react";

import { Box, Image, Title } from "@mantine/core";

import { Link } from "@components/core";
import { DesktopNavigationItem } from "./DesktopNavigationItem";

const logo = "/assets/logo.svg";

type DesktopNavigationProps = {
  title: string;
  children: React.ReactNode;
};

export const DesktopNavigation = ({
  title,
  children,
}: DesktopNavigationProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        "@media (max-width: 920px)": {
          alignItems: "center",
          flexDirection: "column",
        },
        "@media (max-width: 680px)": {
          fontSize: 14,
        },
        gap: 16,
      }}
    >
      <DesktopNavigationItem>
        <Title order={4} color="brand-red">
          <Link
            href="/"
            weight={600}
            color="brand-red"
            sx={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
              "@media (max-width: 980px)": {
                alignItems: "center",
              },
              "@media (max-width: 680px)": {
                fontSize: 18,
              },
            }}
          >
            <Image src={logo} maw={36} mx="auto" alt="Organization logo" />
            {title}
          </Link>
        </Title>
      </DesktopNavigationItem>
      <Box
        sx={{
          display: "flex",
          gap: 12,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
