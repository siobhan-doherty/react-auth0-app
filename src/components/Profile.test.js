import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import "@testing-library/jest-dom";


jest.mock("@auth0/auth0-react");

describe("Profile", () => {
    test("returns null when not authenticated", () => {
        useAuth0.mockReturnValue({
            isAuthenticated: false,
            user: null,
        });
        const { container } = render(<Profile />);
        expect(container.firstChild).toBeNull();
    });

    test("renders user information when authenticated", () => {
        const mockUser = {
            name: "Betty White", 
            picture: "https://m.media-amazon.com/images/M/MV5BMjA2OTA5NTUyMF5BMl5BanBnXkFtZTcwNjMwNzYzMw@@._V1_.jpg", 
            email: "bettywhite1234@gmail.com",
        };
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            user: mockUser,
        });
        render(<Profile />);
        expect(screen.getByAltText("Betty White")).toHaveAttribute("src", mockUser.picture);
        expect(screen.getByText("Betty White")).toBeInTheDocument();
        expect(screen.getByText("bettywhite1234@gmail.com")).toBeInTheDocument();
    });
});
