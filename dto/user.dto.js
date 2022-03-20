const userDto = ({_id,fname,lname,phone,email,userType})=>({
    id:_id,
    fname,
    lname,
    email,
    phone,
    userType
})

module.exports = {userDto};