import React from "react";

import { Box, Image, Text, Title } from "@mantine/core";

import { web_config } from "@lib/config";
import { Link } from "@components/core";
import { BaseUser } from "@lib/shared";

export const ArticleAuthorCard = ({
  avatar,
  email,
  first_name,
  last_name,
  title,
  description,
}: BaseUser) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
      }}
    >
      <Image
        src={`https://${web_config.cms_host}/assets/${avatar}?key=large-avatar`}
        width={192}
        alt={`${first_name} ${last_name}`}
        radius={4}
        sx={{ textShadow: "1.2px 1.2px 2px 0.8px #595959" }}
      />
      <Box>
        <Title size="h3" order={2} sx={{ display: "flex", gap: 4 }}>
          <Box>{`${first_name} ${last_name}`}</Box>
          <Box
            sx={{
              display: "box",
              visibility: "visible",
              "@media (max-width: 920px)": {
                display: "none",
                visibility: "hidden",
              },
            }}
          >{`|`}</Box>
          <Box
            sx={{
              display: "box",
              visibility: "visible",
              "@media (max-width: 920px)": {
                display: "none",
                visibility: "hidden",
              },
            }}
          >{`${title}`}</Box>
        </Title>
        <Text
          sx={{
            fontWeight: "bold",
            "@media (min-width: 920px)": {
              display: "none",
              visibility: "hidden",
            },
          }}
        >
          {title}
        </Text>
        <Link href={`mailto:${email}`}>{email}</Link>
        <Text>{description}</Text>
      </Box>
    </Box>
  );
};
