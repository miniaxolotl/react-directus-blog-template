import React, { useState } from "react";

import { LayoutDefault } from "@components/layouts";
import { Box, Container, Pagination, Title } from "@mantine/core";
import { ArticleCard } from "@components/display/article";
import { BaseBlogPost } from "@lib/shared";

type PageProps = {
  blog_posts: BaseBlogPost[];
};
export const Page = ({ blog_posts }: PageProps) => {
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
          "@media (max-width: 980px)": {
            "grid-template-columns": `repeat(3, 1fr)`,
            alignItems: "center",
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            "grid-template-columns": `repeat(3, 1fr)`,
            columnGap: 8,
            rowGap: 12,
            "@media (max-width: 980px)": {
              "grid-template-columns": `repeat(2, 1fr)`,
            },
            "@media (max-width: 720px)": {
              "grid-template-columns": `repeat(1, 1fr)`,
            },
          }}
        >
          {blog_posts
            ?.sort(
              (a, b) =>
                new Date(b.date_created).getTime() -
                new Date(a.date_created).getTime()
            )
            .map((x) => (
              <ArticleCard key={x.id} {...x} />
            ))}
        </Box>
        <Pagination value={activePage} onChange={setPage} total={1} disabled />
      </Container>
    </>
  );
};

export const query = {
  blog_posts: {
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
  },
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
