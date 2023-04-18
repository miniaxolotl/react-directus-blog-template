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
        <Title
          size="h3"
          order={2}
        >{`${first_name} ${last_name} | ${title}`}</Title>
        <Link href={`mailto:${email}`}>{email}</Link>
        <Text>{description}</Text>
      </Box>
    </Box>
  );
};
