

export const isAuthenticated = (userStore: any) => {
    return userStore.token ? true : false
}
