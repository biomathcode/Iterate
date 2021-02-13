import { Box } from "grommet";

export default function AppHeader(props) {
  return (
    <Box
      animation="fadeIn"
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="light-1"
      pad={{ left: "medium", right: "large", vertical: "xsmall",top: "none", bottom: "none"}}
      elevation="none"
      style={{ zIndex: "0" }}
      {...props}
    />
  );
}
