import React, { useState } from "react";

import { web_config } from "@lib/config";
import { Stande } from "@lib/stande";

import { LayoutDefault } from "@components/layouts";
import { Box, Container, Pagination, SimpleGrid, Title } from "@mantine/core";
import { ArticleCard } from "@components/display/article";

type ArticleValues = {
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

type PageProps = { articles: ArticleValues[] };

export const Page = ({ articles }: PageProps) => {
  const [activePage, setPage] = useState(1);
  return (
    <>
      <Container size="md">
        <Title color="brand-red">Articles</Title>
      </Container>
      <Container
        size="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <SimpleGrid cols={3}>
          {articles.map((x) => (
            <ArticleCard key={x.id} {...x} />
          ))}
        </SimpleGrid>
        <Pagination value={activePage} onChange={setPage} total={1} disabled />
      </Container>
    </>
  );
};

export const onBeforeRender = async () => {
  const { search } = new Stande({
    base_url: web_config.cms_host,
    api_token: web_config.directus.public_api_token,
    api_token_type: "Bearer",
  });
  const response = await search<{ data: ArticleValues }>("items/article", {
    body: {
      query: {
        fields: "*,user_created.*",
        filter: {
          status: {
            _eq: "published",
          },
        },
      },
    },
  });
  if (!response.ok) return null;
  return {
    pageContext: { pageProps: { articles: response.data.data } },
  };
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
