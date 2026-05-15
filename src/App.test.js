import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import App from "./App";
import '@testing-library/jest-dom';


jest.mock("@auth0/auth0-react");

describe("App integration", () => {
  test("renders without crashing and shows the home page", () => {
    useAuth0.mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
      loginWithRedirect: jest.fn(),
      logout: jest.fn(),
    });
    render(<App />);
    expect(screen.getByText(/Auth0 React Demo/i)).toBeInTheDocument();
  });
});
