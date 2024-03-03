"use strict"

const { response } = require("express");

const logoutButton = new LogoutButton();
logoutButton.action = ApiConnector.logout(response => {
    if(logoutButton.success === true) {
        location.reload();
    }
    console.log(response)
});

ApiConnector.current(response => {
    if(response.success) {
    ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();
const tableBoardFunc = ApiConnector.getStocks(response => {
    if(response.success) {
        console.log(response.data);
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
        }     
});
setInterval(() =>{
    tableBoardFunc;
}, 1000*60); 

const monManager = new MoneyManager();

monManager.addMoneyCallback = (money) => {ApiConnector.addMoney(money, (response) => {
        if(response.success) {
            console.log(response);
            ProfileWidget.showProfile(response.data);
        }
     else {
             monManager.setMessage(response, "ошибка");
        }
    }); 
}

monManager.conversionMoneyCallback = (money) => {
    ApiConnector.convertMoney(money, (response) => {
        if(response.success) {
            console.log(response);
            ProfileWidget.showProfile(response.data);
        }
        else {
            monManager.setMessage(response, "ошибка");
        }
    });
} 
monManager.sendMoneyCallback = (money) => ApiConnector.transferMoney(money, (response) => {
    if(response.success) {
        console.log(response);
        ProfileWidget.showProfile(response.data);
        monManager.setMessage(response, "Перевод совершен");
    }
    else {
        monManager.setMessage(response, "ошибка");
    }
})

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        monManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response, "cписок получен");
    }     
})

favoritesWidget.addUserCallback = (favorite) => { ApiConnector.addUserToFavorites(favorite, (response) => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        monManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response, "пользователь добавлен");
    }  
    else {
        monManager.setMessage(response, "ошибка");
    }
})
}

favoritesWidget.removeUserCallback = (remove) => {
    ApiConnector.removeUserFromFavorites(remove, (response) => {
        if(response.success) {
            console.log(response.data);
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            monManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response, "пользователь удален");  
        } 
        else {
            monManager.setMessage(response, "ошибка");
        }
    })
}    
