import React, { useContext } from 'react';
import Navbar from '../../components/Navbar';
import { UserContext } from '../../services/UserContext';

function HomePage() {
    const { user } = useContext(UserContext);

    return (
        <div>
            <Navbar name={`Welcome to the library, ${user.name}`} />
            <h1>Home Page</h1>
        </div>
    );
}

export default HomePage;
