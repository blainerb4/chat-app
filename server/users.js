//helper functions to help us manage users, joining, signing out, removing hers, adding users
//what users are in what rooms
//users in an array
const users = [];
//3 parameters id of a user/ of a socket instance, name, room
//we need to change the name and room the user enters
//curly braces when destructuring
const addUser = ({ id, name, room}) => {
    //if user enters room Dragon Ball Z = dragonballz (all lower case and one word)-trim makes it one work
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    //check if there is an existing user with username the second user is trying to login with
    //we are going thru the array(look for users and trying to find exising user with the name
    //the new user wants to sign up with)
    const existingUser = users.find((user) => user.room === room && user.name === name);
    //if existing username, user cant sign in & exit this function and throw and error-
    //new user wont be created
    if (existingUser) {
        return { error: 'username is taken.'};
    }
    //if there is no exisitng user we can create a new user with 3 objects
    const user = {id, name, room};
    //push to new array of users
    users.push(user);

    //so we know what user was pushed
    return { user }
}
//try to find user with specific id, emove user from users array
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}
//if user.id equals to id user exists
const getUser = (id) => users.find((user) => user.id === id);

//filter function we want all users from specific room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };

//now we can use these helper functions in the index.js(server side)
//so we can manage all the users that are in specific sockets