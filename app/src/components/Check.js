const LoggedIn = (email) => {
    const existingSessions = JSON.parse(localStorage.getItem("Sessions"));
    return existingSessions.find(user => user.email === email);
}
const LogIn = (email,password) => {
    const existingUsers = JSON.parse(localStorage.getItem("Users"));
    return existingUsers.find(user => user.email === email && user.password === password);
}

export {
    LoggedIn,
    LogIn
}