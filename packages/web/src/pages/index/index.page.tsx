import { Counter } from "@components/Counter";

export const Page = () => {
  return (
    <div>
      <h1>Welcome</h1>
      This page is:
      <ol>
        <li>Rendered to HTML</li>
        <li>
          Interactive: <Counter />
        </li>
      </ol>
    </div>
  );
};
