import { PageContextProvider } from "../hooks";

import "./PageShell.scss";

export type PageShellProps = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageContext: any;
};

export const PageShell: React.FC<PageShellProps> = ({
  children,
  pageContext,
}: PageShellProps) => {
  return (
    <PageContextProvider pageContext={pageContext}>
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </PageContextProvider>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ display: "flex" }}>{children}</div>;
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};
