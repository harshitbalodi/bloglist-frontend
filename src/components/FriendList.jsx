// components/FriendsList.jsx
import React, { useEffect, useState } from 'react';
import friendRequestService from '../services/friendService';
import { useSelector } from 'react-redux';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    const fetchFriends = async () => {
      const friendsList = await friendRequestService.fetchFriends(user.id);
      setFriends(friendsList);
    };

    fetchFriends();
  }, [user.id]);

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>
            {friend.name} ({friend.username})
          </li>
        ))}
        {
            friends && <>Feels empty here</>
        }
      </ul>
    </div>
  );
};

export default FriendsList;
