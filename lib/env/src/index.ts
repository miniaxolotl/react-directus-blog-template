export const load_env = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config({
    path: "../../.env",
  });
};
