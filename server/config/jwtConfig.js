const jwtSecret = 'Apex-Legends';
const jwtSession = {
    session: false
};
const ROLES = {
    user: 1,
    admin: 2,
    name: (value)=> Object.keys(ROLES).find(e=>ROLES[e]===value)
};
export {
    jwtSecret,
    jwtSession,
    ROLES
}