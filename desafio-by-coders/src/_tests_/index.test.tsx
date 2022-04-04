import { render } from "@testing-library/react";
import { ContextWrapper } from "./testBed";
import { Routing } from "../components";

test("Render app using react router dom without crashing", () => {
  render(
    <ContextWrapper>
      <Routing />
    </ContextWrapper>
  );
});
