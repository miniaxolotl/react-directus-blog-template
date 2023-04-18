import React from "react";

import { Box, Button, Image, Text, Title } from "@mantine/core";

import { web_config } from "@lib/config";
import { Link } from "@components/core";
import { BaseBlogPost } from "@lib/shared";

export type SmallArticleCardProps = {
  id: string;
  cover: string;
  cover_caption: string;
  heading: string;
  preview: string;
  body: string;
  date_created: string;
  user_created: {
    avatar: string;
    first_name: string;
    last_name: string;
    title: string;
  };
  user_updated: {
    avatar: string;
    first_name: string;
    last_name: string;
    title: string;
  };
};

export const SmallArticleCard = ({
  id,
  cover_image,
  cover_image_caption,
  heading,
  content_preview,
}: BaseBlogPost) => {
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
            alt={cover_image_caption}
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
