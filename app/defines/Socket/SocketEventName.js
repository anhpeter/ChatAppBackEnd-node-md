const SocketEventName = {
    updateUser: 'update-user',
    join: 'john',
    getOnlineUsers: 'get-online-users',
    leave: 'leave',
    sendMessage: 'send-message',
    typing: 'typing',
    stopTyping: 'stop-typing',
    receiveMessage: 'receive-message',
    onlineUsers: 'online-users',
    newJoiner: 'new-joiner',
    userLeft: 'user-left',
    acceptFriend: 'accept-friend',
    addFriend: 'add-friend',
    unfriend: 'unfriend',
    cancelFriendRequest: 'cancel-friend-request',
    deleteFriendRequest: 'delete-friend-request',
    friendRequestCanceled: 'friend-request-canceled',
    friendRejected: 'friend-rejected',
    friendAccepted: 'friend-accepted',
    friendRequested: 'friend-requested',
    friendUnfriend: 'friend-unfriend',

    // backend events only
}

module.exports = SocketEventName;