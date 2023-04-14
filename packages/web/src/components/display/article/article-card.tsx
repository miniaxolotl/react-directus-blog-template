import React from "react";

import { Avatar, Box, Button, Card, Image, Text } from "@mantine/core";

import { web_config } from "@lib/config";
import { Link } from "@components/core";
import { format } from "date-fns";
import { BaseBlogPost } from "@lib/shared";

export type ArticleCardProps = {
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

export const ArticleCard = ({
  id,
  cover_image,
  cover_image_caption,
  content_preview,
  date_created,
  user_created,
}: BaseBlogPost) => {
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
      }}
    >
      <Card.Section>
        <Link href={`/blog/${id}`}>
          <Image
            src={`https://${web_config.cms_host}/assets/${cover_image}?key=small-cover`}
            height={172}
            alt={cover_image_caption}
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
            src={`https://${web_config.cms_host}/assets/${user_created.avatar}?key=avatar`}
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
