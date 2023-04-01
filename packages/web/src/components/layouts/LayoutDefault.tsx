import React, { useEffect, useState } from "react";

import { Stande } from "@lib/stande";
import { web_config } from "@lib/config";

import { usePageContext } from "@renderer/hooks";
import {
  DesktopNavigation,
  DesktopNavigationItem,
  // DesktopNavigationDropdown,
  // DesktopNavigationDropdownItem,
} from "@components/navigation/desktop-navigation";
import { Box } from "@mantine/core";
import { Link } from "@components/core";

export type LayoutDefaultProps = {
  children?: React.ReactNode;
};

export type NavigationItem = {
  slug: string;
  display_name: string;
  children?: NavigationItem[];
};

export type GlobalAppData = {
  title?: string;
  description?: string;
  navigation_bar: NavigationItem[];
};

export const LayoutDefault = (props: LayoutDefaultProps) => {
  const { exports } = usePageContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [navigation_items, set_navigation_items] = useState<any[]>([]);
  const get_global_app_data = async () => {
    const { get } = new Stande({
      base_url: web_config.cms_host,
    });

    const res = await get<{ data: GlobalAppData }>("items/global", {
      parameters: {
        fields: "navigation_bar.*,navigation_bar.children.*",
      },
    });
    if (res.ok) return res.data.data;
    return null;
  };

  useEffect(() => {
    const load_page_data = async () => {
      const global_app_data = await get_global_app_data();
      if (!global_app_data) return;
      if (global_app_data?.title)
        exports.documentProps.title = global_app_data.title;
      if (global_app_data?.description)
        exports.documentProps.description = global_app_data.description;
      set_navigation_items(global_app_data.navigation_bar);
    };

    load_page_data();
  }, []);

  return (
    <Layout navigation_items={navigation_items}>
      {/* TODO - ADD SEO Here */}
      <Content>{props.children}</Content>
    </Layout>
  );
};

export const Layout = ({
  children,
  navigation_items,
}: {
  children: React.ReactNode;
  navigation_items: NavigationItem[];
}) => {
  return (
    <Box px={24} py={16}>
      <DesktopNavigation title={web_config.app_title}>
        {navigation_items.map((item) => {
          console.log(item);

          return item.children && item.children.length ? (
            <DesktopNavigationItem key={item.slug}>
              <Link href={item.slug}>{item.display_name}</Link>
            </DesktopNavigationItem>
          ) : (
            <DesktopNavigationItem key={item.slug}>
              <Link href="/article">Articles</Link>
            </DesktopNavigationItem>
          );
        })}
        {/* <DesktopNavigationItem>
          <Link href="/article">Articles</Link>
        </DesktopNavigationItem>

        <DesktopNavigationDropdown title="Get Involved">
          <DesktopNavigationDropdownItem>
            <Link href="/get-involved/volunteer">Volunteer</Link>
          </DesktopNavigationDropdownItem>
        </DesktopNavigationDropdown>

        <DesktopNavigationDropdown title="About Us">
          <DesktopNavigationDropdownItem>
            <Link href="/about-us/our-story">Our Story</Link>
          </DesktopNavigationDropdownItem>
          <DesktopNavigationDropdownItem>
            <Link href="/about-us/our-sponsors">Our Sponsors</Link>
          </DesktopNavigationDropdownItem>
          <DesktopNavigationDropdownItem>
            <Link href="/about-us/press-publications">
              Press & Publications
            </Link>
          </DesktopNavigationDropdownItem>
          <DesktopNavigationDropdownItem>
            <Link href="/about-us/financial-reports">Financial Reports</Link>
          </DesktopNavigationDropdownItem>
        </DesktopNavigationDropdown>

        <DesktopNavigationItem>
          <Link href="/contact-us">Contact Us</Link>
        </DesktopNavigationItem> */}
      </DesktopNavigation>
      <div style={{ display: "flex" }}>{children}</div>
    </Box>
  );
};

export const Content = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};
