import { renderHook } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react"; 
import { useAuth } from "./useAuth";


// mock entire auth0-react module
jest.mock("@auth0/auth0-react");

describe("useAuth hook", () => {
    const mockLoginWithRedirect = jest.fn();
    const mockLogout = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("returns auth values correctly when not authenticated", () => {
        useAuth0.mockReturnValue({
            loginWithRedirect: mockLoginWithRedirect,
            logout: mockLogout,
            user: undefined,
            isAuthenticated: false,
            isLoading: false,
        });

        const { result } = renderHook(() => useAuth());
        expect(result.current.login).toBe(mockLoginWithRedirect);
        expect(result.current.logout).toBe(mockLogout);
        expect(result.current.user).toBeUndefined();
        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.isLoading).toBe(false);
    });

    test("returns auth values correctly when authenticated", () => {
        const mockUser = { name: "Jane Smith", email: "janesmith1234@gmail.com" };
        useAuth0.mockReturnValue({
            loginWithRedirect: mockLoginWithRedirect,
            logout: mockLogout,
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
        });

        const { result } = renderHook(() => useAuth());
        expect(result.current.user).toEqual(mockUser);
        expect(result.current.isAuthenticated).toBe(true);
    });
});
