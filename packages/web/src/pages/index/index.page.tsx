import React, { useEffect, useState } from "react";
import { MdAlternateEmail, MdError, MdPerson } from "react-icons/md/index.js";

import {
  Alert,
  Box,
  Button,
  Container,
  Image,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import { web_config } from "@lib/config";
import { BaseBlogPost, BasePage } from "@lib/shared";
import { Stande } from "@lib/stande";

import { LayoutDefault } from "@components/layouts";
import { SmallArticleCard } from "@components/display/article";

type PageProps = {
  page_data: BasePage;
};

export const Page = ({
  page_data: { cover_image, cover_image_caption, heading, content },
}: PageProps) => {
  const [blogPosts, setBlogPosts] = useState<BaseBlogPost[]>([]);
  const [formSuccess, setFormSuccess] = useState<boolean | null>(null);

  const { search, post } = new Stande({
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

    const response = await post("items/marketing_email_list", {
      body: {
        email: email.value,
        first_name: first_name.value,
      },
    });

    if (response.ok) setFormSuccess(true);
    else setFormSuccess(false);
  };

  useEffect(() => {
    const getBlogPosts = async () => {
      const response = await search<{ data: BaseBlogPost[] }>(
        "items/blog_post",
        {
          parameters: {
            sort: "date_created",
          },
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
        }
      );
      if (response.ok) setBlogPosts(response.data.data);
    };

    getBlogPosts();
  }, []);

  return (
    <>
      <Container>
        <Image
          src={`https://${web_config.cms_host}/assets/${cover_image}?key=large-cover`}
          alt={cover_image_caption}
          caption={cover_image_caption}
          style={{
            overflow: "hidden",
            borderRadius: 4,
          }}
        />
        <Box
          sx={{
            display: "flex",
            gap: 16,
            "@media (max-width: 920px)": {
              alignItems: "center",
              flexDirection: "column",
            },
            "@media (max-width: 680px)": {
              fontSize: 14,
            },
          }}
        >
          <Box sx={{ flexBasis: 12, flexGrow: 1 }}>
            <Box>
              {heading && (
                <Title size="h2" order={2} color="brand-red">
                  {heading}
                </Title>
              )}
            </Box>

            <Box dangerouslySetInnerHTML={{ __html: content }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Title size="h2" order={2} color="brand-red">
                {/* <Title size="h5" order={5} color="brand-green"> */}
                Stay Updated!
              </Title>
              <Text>
                Subscribe to our newsletter to keep up to date with the latest
                news and events from the team at {web_config.app_title}.
              </Text>
              <form onSubmit={submitForm}>
                <Box sx={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                  <TextInput
                    icon={<MdPerson />}
                    placeholder="First Name"
                    name="first_name"
                    autoComplete="given-name"
                    required
                  />
                  <TextInput
                    icon={<MdAlternateEmail />}
                    placeholder="Email"
                    name="email"
                    autoComplete="email"
                    required
                  />
                  <Button type="submit">Subscribe</Button>
                </Box>
              </form>
              {typeof formSuccess === "boolean" &&
                (formSuccess ? (
                  <Alert
                    icon={<MdError size="1rem" />}
                    title="Sweet!"
                    color="green"
                  >
                    You have been successfully subscribed to our newsletter!
                  </Alert>
                ) : (
                  <Alert
                    icon={<MdError size="1rem" />}
                    title="Bummer!"
                    color="red"
                  >
                    There was an error subscribing you to our newsletter. Please
                    try again later.
                  </Alert>
                ))}
            </Box>
          </Box>
          <Box sx={{ flexBasis: 320, flexGrow: 0 }}>
            <Title size="h2" order={2} color="brand-red" mb={16}>
              Recent Blog Posts
            </Title>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {blogPosts
                ?.sort(
                  (a, b) =>
                    new Date(b.date_created).getTime() -
                    new Date(a.date_created).getTime()
                )
                .map((x) => (
                  <SmallArticleCard key={x.id} {...x} />
                ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export const query = {
  page_data: { model: "items/landing_page" },
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
