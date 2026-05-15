import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./Home";
import '@testing-library/jest-dom';


jest.mock("@auth0/auth0-react");

describe("Home Component", () => {
    const mockLoginWithRedirect = jest.fn();
    const mockLogout = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("shows loading message when isLoading is true", () => {
        useAuth0.mockReturnValue({
            isLoading: true,
            isAuthenticated: false,
            loginWithRedirect: mockLoginWithRedirect,
            logout: mockLogout,
        });
        render(<Home />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    test("shows Log In button when not authenticated", () => {
        useAuth0.mockReturnValue({
            isLoading: false,
            isAuthenticated: false,
            loginWithRedirect: mockLoginWithRedirect,
            logout: mockLogout,
        });
        render(<Home />);
        expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /log out/i })).not.toBeInTheDocument();
    });

    test("calls loginWithRedirect when Log In button is clicked", () => {
        useAuth0.mockReturnValue({
            isLoading: false,
            isAuthenticated: false,
            loginWithRedirect: mockLoginWithRedirect,
            logout: mockLogout,
        });
        render(<Home />);
        fireEvent.click(screen.getByRole("button", { name: /log in/i }));
        expect(mockLoginWithRedirect).toHaveBeenCalledTimes(1);
    });

    test("shows Profile and Log Out button when authenticated", () => {
        const mockUser = { 
            name: "Betty White", 
            picture: "https://m.media-amazon.com/images/M/MV5BMjA2OTA5NTUyMF5BMl5BanBnXkFtZTcwNjMwNzYzMw@@._V1_.jpg", 
            email: 'bettywhite1234@gmail.com' 
        };
        useAuth0.mockReturnValue({
            isLoading: false,
            isAuthenticated: true,
            user: mockUser,
            loginWithRedirect: mockLoginWithRedirect,
            logout: mockLogout,
        });
        render(<Home />);
        expect(screen.getByText('Betty White')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /log in/i })).not.toBeInTheDocument(); 
    });   

    test("calls logout with returnTo URL when Log Out button is clicked", () => {
        useAuth0.mockReturnValue({
            isLoading: false,
            isAuthenticated: true,
            user: { name: "Test" },
            loginWithRedirect: mockLoginWithRedirect,
            logout: mockLogout,
        });
        render(<Home />);
        fireEvent.click(screen.getByRole("button", { name: /log out/i }));
        expect(mockLogout).toHaveBeenCalledWith({ returnTo: window.location.origin });
    });
});
