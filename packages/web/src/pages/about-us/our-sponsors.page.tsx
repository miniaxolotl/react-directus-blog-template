import React from "react";

import { LayoutDefault } from "@components/layouts";
import { Container, Text, Title } from "@mantine/core";

export const Page = () => {
  return (
    <>
      <Container>
        <Title color="brand-red">Our Sponsors</Title>
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
