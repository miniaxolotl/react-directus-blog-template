import React, { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";

import { LayoutDefault } from "@components/layouts";
import { BasePage } from "@lib/shared";
import {
  MdAlternateEmail,
  MdEmail,
  MdError,
  MdPerson,
} from "react-icons/md/index.js";
import { Stande } from "@lib/stande";
import { web_config } from "@lib/config";

type PageProps = BasePage;

export const Page = ({ heading, content }: PageProps) => {
  const [formSuccess, setFormSuccess] = useState<boolean | null>(null);

  const { post } = new Stande({
    base_url: web_config.cms_host,
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const first_name = form.elements.namedItem(
      "first_name"
    ) as HTMLInputElement;
    const last_name = form.elements.namedItem("last_name") as HTMLInputElement;
    const body = form.elements.namedItem("body") as HTMLInputElement;

    const response = await post("items/contact_us_form", {
      body: {
        email: email.value,
        first_name: first_name.value,
        last_name: last_name.value,
        body: body.value,
      },
    });

    if (response.ok) setFormSuccess(true);
    else setFormSuccess(false);
  };

  return (
    <>
      <Container>
        <Title color="brand-red">{heading}</Title>
      </Container>
      <Container>
        <Box>
          <Text dangerouslySetInnerHTML={{ __html: content }} />
        </Box>
        <Divider sx={{ margin: "8px 0px" }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <form onSubmit={submitForm}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <TextInput
                icon={<MdAlternateEmail />}
                placeholder="Email"
                name="email"
                autoComplete="email"
                withAsterisk
                required
              />
              <Box sx={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                <TextInput
                  icon={<MdPerson />}
                  placeholder="First Name"
                  name="first_name"
                  autoComplete="given-name"
                  sx={{ flexGrow: 1 }}
                  withAsterisk
                  required
                />
                <TextInput
                  icon={<MdPerson />}
                  placeholder="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  sx={{ flexGrow: 1 }}
                  withAsterisk
                  required
                />
              </Box>
              <Textarea
                icon={<MdEmail />}
                placeholder="Message"
                name="body"
                withAsterisk
                required
              />
              <Button type="submit">Submit</Button>
            </Box>
          </form>
          {typeof formSuccess === "boolean" &&
            (formSuccess ? (
              <Alert
                icon={<MdError size="1rem" />}
                title="Sweet!"
                color="green"
              >
                We'll get back to you as soon as possible!
              </Alert>
            ) : (
              <Alert icon={<MdError size="1rem" />} title="Bummer!" color="red">
                There was an error submitting your message. Please try again
                later.
              </Alert>
            ))}
        </Box>
      </Container>
    </>
  );
};

export const query = {
  model: "items/contact_information",
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
