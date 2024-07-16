import React, { useEffect, useState } from 'react';
import friendRequestService from '../services/friendService';
import { useSelector } from 'react-redux';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const user = useSelector(state => state.user);
  console.log("friends", friends);

  useEffect(() => {
    if (user && user.id) {
      const fetchFriends = async () => {
        try {
          const friendsList = await friendRequestService.fetchFriends(user.id);
          setFriends(friendsList);
        } catch (error) {
          console.error("Error fetching friends list:", error);
        }
      };

      fetchFriends();
    }
  }, [user]);

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.length > 0 ? (
          friends.map(friend => (
            <li key={friend.id}>
              {friend.name} ({friend.username})
            </li>
          ))
        ) : (
          <li>Feels empty here</li>
        )}
      </ul>
    </div>
  );
};

export default FriendsList;
