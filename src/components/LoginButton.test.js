import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import '@testing-library/jest-dom';


jest.mock("@auth0/auth0-react");

describe("LoginButton", () => {
    const mockLoginWithRedirect = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useAuth0.mockReturnValue({
            loginWithRedirect: mockLoginWithRedirect,
        });
    });

    test("renders a button with 'Log In' text", () => {
        render(<LoginButton />);
        expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    });

    test("calls loginWithRedirect on click", () => {
        render(<LoginButton />);
        fireEvent.click(screen.getByRole("button"));
        expect(mockLoginWithRedirect).toHaveBeenCalledTimes(1);
    });
});
