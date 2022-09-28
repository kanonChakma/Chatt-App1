export const host = "http://localhost:5000";
export const loginRoute = `${host}/api/user/login`;
export const registerRoute = `${host}/api/user/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/user/allusers`;

export const sendMessageRoute = `${host}/api/messages/addmsg`;

export const setAvatarRoute = `${host}/api/auth/setavatar`;
export const fetchAllChatsRoute = `${host}/api/chat`;
export const fetchGroupChatsRoute = `${host}/api/chat/group`;
//message
export const getAllMessageRoutes = `${host}/api/messages`;