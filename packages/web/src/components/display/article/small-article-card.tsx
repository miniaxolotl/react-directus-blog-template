import React from "react";

import { Box, Button, Image, Text, Title } from "@mantine/core";

import { web_config } from "@lib/config";
import { Link } from "@components/core";
import { BaseBlogPost } from "@lib/shared";

export type SmallArticleCardProps = BaseBlogPost;

export const SmallArticleCard = ({
  id,
  cover_image,
  heading,
  content_preview,
}: SmallArticleCardProps) => {
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
        <Link
          href={`/blog/${id}`}
          sx={{
            ":hover": {
              "animation-duration": "1.2s",
              opacity: 0.8,
            },
          }}
        >
          <Image
            src={`https://${web_config.cms_host}/assets/${cover_image}?key=small-avatar`}
            alt={`${heading} - Blog cover image`}
            height={72}
            width={72}
            radius={4}
          />
        </Link>
        <Box sx={{ flexGrow: 1 }}>
          <Title size="xs" order={4} lineClamp={1}>
            {heading}
          </Title>
          <Text size="sm" lineClamp={2}>
            {content_preview}
          </Text>
        </Box>
      </Box>
      <Link href={`/blog/${id}`}>
        <Button variant="subtle" c="brand-red" fullWidth>
          Read now
        </Button>
      </Link>
    </Box>
  );
};
