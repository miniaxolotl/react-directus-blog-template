import React from "react";

import { LayoutDefault } from "@components/layouts";
import { Box, Container, Text, Title } from "@mantine/core";

export const Page = () => {
  return (
    <>
      <Container>
        <Title color="brand-red">Press & Publications</Title>
      </Container>
      <Container>
        <Text dangerouslySetInnerHTML={{ __html: "body text" }} />
      </Container>
    </>
  );
};

// export const onBeforeRender = async () => {};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
