import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import '@testing-library/jest-dom';


jest.mock("@auth0/auth0-react");

describe("LogoutButton", () => {
    const mockLogout = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useAuth0.mockReturnValue({
            logout: mockLogout,
        });
    });

    test("renders a button with 'Log Out' text", () => {
        render(<LogoutButton />);
        expect(screen.getByRole(
            "button", 
            { name: /log out/i }
        )).toBeInTheDocument();
    });

    test("calls logout with returnTo URL on click", () => {
        render(<LogoutButton />);
        fireEvent.click(screen.getByRole("button"));
        expect(mockLogout).toHaveBeenCalledWith({
            returnTo: window.location.origin
        }); 
    });
});
