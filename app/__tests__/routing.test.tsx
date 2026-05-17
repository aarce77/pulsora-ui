import { render } from "@testing-library/react-native";

import RootIndex from "../index";
import TabsIndex from "../(tabs)/index";

const mockRedirect = jest.fn();

jest.mock("expo-router", () => ({
  Redirect: (props: { href: string }) => {
    mockRedirect(props.href);
    return null;
  },
}));

describe("routing redirects", () => {
  beforeEach(() => {
    mockRedirect.mockClear();
  });

  it("redirects the app root to home", () => {
    render(<RootIndex />);

    expect(mockRedirect).toHaveBeenCalledWith("/(tabs)/home");
  });

  it("redirects the tabs index to home", () => {
    render(<TabsIndex />);

    expect(mockRedirect).toHaveBeenCalledWith("/(tabs)/home");
  });
});
