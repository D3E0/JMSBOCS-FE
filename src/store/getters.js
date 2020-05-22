const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    id: state => state.user.id,
    isTeacher: state => {
        for (const role of state.user.roles) {
            if (role === "teacher") return true;
        }
        return false;
    },
    isStudent: state => {
        for (const role of state.user.roles) {
            if (role === "student") return true;
        }
        return false;
    },
    // permission_routers: state => state.permission.routers,
    // addRouters: state => state.permission.addRouters
};
export default getters
