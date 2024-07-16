import React, { useEffect, useState } from 'react';
import friendRequestService from '../services/friendService';
import { useSelector } from 'react-redux';

const FriendRequests = () => {
    const [requests, setRequests] = useState([]);
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user && user.id) {
            const fetchRequests = async () => {
                try {
                    const friendRequests = await friendRequestService.fetchRequests(user.id);
                    setRequests(friendRequests);
                } catch (error) {
                    console.error("Error fetching friend requests:", error);
                }
            };

            fetchRequests();
        }
    }, [user]);

    const acceptRequest = async (userId) => {
        try {
            await friendRequestService.acceptRequest(userId);
            setRequests(requests.filter(request => request.id !== userId));
        } catch (error) {
            console.error("Error accepting friend request:", error);
        }
    };

    const rejectRequest = async (userId) => {
        try {
            await friendRequestService.rejectRequest(userId);
            setRequests(requests.filter(request => request.id !== userId));
        } catch (error) {
            console.error("Error rejecting friend request:", error);
        }
    };

    return (
        <div>
            <h2>Friend Requests</h2>
            <ul>
                {requests.length > 0 ? (
                    requests.map(request => (
                        <li key={request.id}>
                            {request.name} ({request.username})
                            <button onClick={() => acceptRequest(request.id)}>Accept</button>
                            <button onClick={() => rejectRequest(request.id)}>Reject</button>
                        </li>
                    ))
                ) : (
                    <li>Feels empty here</li>
                )}
            </ul>
        </div>
    );
};

export default FriendRequests;
