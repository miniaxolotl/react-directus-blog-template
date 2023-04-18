import React from "react";
import { Box, Container, Image, Text, Title } from "@mantine/core";
import { format } from "date-fns";

import { BaseBlogPost } from "@lib/shared";
import { PageContextServer } from "@lib/vite-react";
import { Stande } from "@lib/stande";
import { web_config } from "@lib/config";

import { LayoutDefault } from "@components/layouts";
import { ArticleAuthorCard } from "@components/display/article";

type PageProps = { data?: BaseBlogPost };

export const Page = ({ data: post_data }: PageProps) => {
  const date = new Date(post_data?.date_created || "");
  const date_string = format(date, "MMMM d, yyyy");

  return (
    <>
      <Container size="md">
        <Title color="brand-red">{post_data?.heading}</Title>
      </Container>
      <Container
        size="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        <Image
          src={`https://${web_config.cms_host}/assets/${post_data?.cover_image}?key=large-cover`}
          // height={240}
          radius={4}
          alt={post_data?.cover_image_caption}
        />
        <Box dangerouslySetInnerHTML={{ __html: post_data?.content || "" }} />
        <Box>
          <Text color="dimmed">Published {date_string}</Text>
        </Box>
        {post_data && <ArticleAuthorCard {...post_data?.user_created} />}
      </Container>
    </>
  );
};

export const onBeforeRender = async (props: PageContextServer) => {
  const { get } = new Stande({
    base_url: web_config.cms_host,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await get<{ data: any }>(
    `items/blog_post/${props.routeParams.id}`,
    {
      parameters: {
        fields: "*,user_created.*",
      },
    }
  );

  if (!response.ok) return null;

  return {
    pageContext: {
      pageProps: { data: response.data.data },
    },
  };
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
