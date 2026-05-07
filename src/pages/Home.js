import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import Profile from '../components/Profile';

const Home = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    if (isLoading) return <div>Loading...</div>;
    return (
        <div>
            <h1>Auth0 React Demo</h1>
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated && (
                <>
                    <Profile />
                    <LogoutButton />
                </>
            )}
        </div>
    );
};

export default Home;
