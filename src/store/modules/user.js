import {login, logout, getId} from '@/api/login'
import {userInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        id: 0,
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_ID: (state, id) => {
            state.id = id
        }
    },

    actions: {
        // 登录
        Login({commit}, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                login(username, userInfo.password).then(response => {
                    let token  = response.data;
                    if (token !== null && response.message === 'success') {
                        console.info(token);
                        commit('SET_TOKEN', token);
                        setToken(token);
                        commit('SET_ID', username);
                        resolve(token)
                    }else{
                        reject(response.message)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getId().then().then(response => {
                    let id = response.data;
                    console.info(id);
                    if(id === "null") {
                        reject('getId: invalid token !')
                    }
                    userInfo(id).then(response => {
                        const data = response.data;
                        console.info(data);
                        if (data && data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                            commit('SET_ROLES', data.roles)
                        } else {
                            reject('getInfo: roles must be a non-null array !')
                        }
                        commit('SET_NAME', data.username);
                        commit('SET_ID', data.userId);
                        resolve(response)
                    }).catch(error => {
                        reject(error)
                    })
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        Logout({commit, state}) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    removeToken();
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                removeToken();
                resolve()
            })
        }
    }
};

export default user
