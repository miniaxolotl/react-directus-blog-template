import React, { useState } from "react";

import { LayoutDefault } from "@components/layouts";
import { Container, Pagination, SimpleGrid, Title } from "@mantine/core";
import { ArticleCard } from "@components/display/article";
import { BaseBlogPost } from "@lib/shared";

type PageProps = { data?: BaseBlogPost[] };

export const Page = ({ data: posts }: PageProps) => {
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
          {posts?.map((x) => (
            <ArticleCard key={x.id} {...x} />
          ))}
        </SimpleGrid>
        <Pagination value={activePage} onChange={setPage} total={1} disabled />
      </Container>
    </>
  );
};

export const query = {
  model: "items/blog_post",
  method: "search",
  select: ["*", "user_created.*"],
  parameters: {
    sort: "date_created",
  },
  filter: {
    status: {
      _eq: "published",
    },
  },
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
