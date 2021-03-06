const SocketEventName = {
    updateUser: 'update-user',
    signIn: 'sign-in',
    signOut: 'sign-out',
    getOnlineUsers: 'get-online-users',
    typing: 'typing',
    stopTyping: 'stop-typing',
    sendMessage: 'send-message',
    receiveMessage: 'receive-message',
    newMessageNotification: 'new-message-notification',
    onlineUsers: 'online-users',
    newOnlineUser: 'new-online-user',
    onlineUserLeft: 'online-user-left',
    joinUsersToConversation: 'join-users-to-conversation',
    joinRoom: 'join-room',
    leaveRoom: 'leave-room',
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
}

module.exports = SocketEventName;