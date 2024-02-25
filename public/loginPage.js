"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = data => ApiConnector.login(data, response => console.log(response));
userForm.registerFormCallback = data => ApiConnector.register(data, response => console.log(response));

if(UserForm.success === true) {
    location.reload();
}
else{
    alert("Произошла ошибка!");
}