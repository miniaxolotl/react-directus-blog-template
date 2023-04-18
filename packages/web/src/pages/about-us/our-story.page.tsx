import React from "react";

import { Container, Text, Title } from "@mantine/core";

import { LayoutDefault } from "@components/layouts";
import { BasePage } from "@lib/shared";

type PageProps = BasePage;

export const Page = ({ heading, content }: PageProps) => {
  return (
    <>
      <Container>
        <Title color="brand-red">{heading}</Title>
      </Container>
      <Container>
        <Text dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </>
  );
};

export const query = {
  model: "items/our_story",
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
