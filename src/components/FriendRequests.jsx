// components/FriendRequests.jsx
import React, { useEffect, useState } from 'react';
import friendRequestService from '../services/friendService';
import { useSelector } from 'react-redux';
import { Box, Button, Heading } from "@chakra-ui/react";

const FriendRequests = () => {
    const [requests, setRequests] = useState([]);
    const user = useSelector(state => state.user);

    useEffect(() => {
        const fetchRequests = async () => {
            const friendRequests = await friendRequestService.fetchRequests(user.id);
            setRequests(friendRequests);
        };

        fetchRequests();
    }, [user.id]);

    const acceptRequest = async (userId) => {
        await friendRequestService.acceptRequest(userId);
        setRequests(requests.filter(request => request.id !== userId));
    };

    const rejectRequest = async (userId) => {
        await friendRequestService.rejectRequest(userId);
        setRequests(requests.filter(request => request.id !== userId));
    };

    return (
        <div>
            <h2>Friend Requests</h2>
            <ul>
                {requests.map(request => (
                    <li key={request.id}>
                        {request.name} ({request.username})
                        <button onClick={() => acceptRequest(request.id)}>Accept</button>
                        <button onClick={() => rejectRequest(request.id)}>Reject</button>
                    </li>
                ))}
                {
                    requests && <>Feels empty here</>
                }
            </ul>
            <Box textAlign="center" py={10}>
                <Heading as="h1" size="2xl" mb={4}>
                    Welcome to My Blog
                </Heading>
                <Button colorScheme="teal" size="lg">
                    Get Started
                </Button>
            </Box>
        </div>

    );
};

export default FriendRequests;