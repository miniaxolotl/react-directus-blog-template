import React from "react";

import { Avatar, Box, Button, Card, Image, Text } from "@mantine/core";

import { web_config } from "@lib/config";
import { Link } from "@components/core";
import { format } from "date-fns";
import { BaseBlogPost } from "@lib/shared";

export type ArticleCardProps = BaseBlogPost;

export const ArticleCard = ({
  id,
  cover_image,
  heading,
  content_preview,
  date_created,
  user_created,
}: ArticleCardProps) => {
  const date = new Date(date_created);
  const date_string = format(date, "MMMM d, yyyy");

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
        height: "100%",
      }}
    >
      <Card.Section>
        <Link
          href={`/blog/${id}`}
          sx={{
            ":hover": {
              "animation-duration": "0.5s",
              opacity: 0.8,
            },
          }}
        >
          <Image
            src={`https://${web_config.cms_host}/assets/${cover_image}?key=small-cover`}
            height={172}
            // radius={4}
            alt={`${heading} - Blog cover image`}
          />
        </Link>
      </Card.Section>

      <Box mt={8} mb={4} sx={{ flexGrow: 1 }}>
        <Text size="sm" lineClamp={4}>
          {content_preview}
        </Text>
      </Box>

      <Box mt={4} mb={8}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <Avatar
            src={`https://${web_config.cms_host}/assets/${user_created.avatar}?key=small-avatar`}
            alt={`${user_created.first_name} ${user_created.last_name}`}
          />
          <Box>
            <Text size="xs" fs="italic" c="brand-green">
              By. {user_created.first_name} {user_created.last_name}
            </Text>
            <Text size="xs" fs="italic" c="brand-green">
              {date_string}
            </Text>
          </Box>
        </Box>
      </Box>

      <Card.Section>
        <Link href={`/blog/${id}`}>
          <Button variant="subtle" c="brand-red" fullWidth>
            Read now
          </Button>
        </Link>
      </Card.Section>
    </Card>
  );
};
