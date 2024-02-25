"use strict"

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
ApiConnector.getStocks(response => {
    if(response.success) {
        console.log(response.data);
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
        }     
});
setInterval(() =>{
    ApiConnector.getStocks(response => {
        if(response.success) {
            console.log(response.data);
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
            }     
    });
}, 1000*60); 

/* в чем ошибка не знаю, не идет что то... FvoritesWidget -тоже самое - запутался что должны возвращать функции
и как правильно выводить setMessage
const MonManager = new MoneyManager();

MonManager.addMoneyCallback = (data) => {ApiConnector.addMoney(data, response => {
    if(response.success) {
    ProfileWidget.showProfile(response.data);
    }
}); 
}

MonManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
    if(response.success) {
    ProfileWidget.showProfile(response.data);
    }
}) 
} 
*/

const FvoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if(response.success) {
        console.log(response.data);
        FvoritesWidget.clearTable();
        FvoritesWidget.fillTable(response.data);
        FvoritesWidget.updateUsersList();
        }     
})

FvoritesWidget.addUserCallback = ApiConnector.addUserToFavorites(response => {
    if(response.success === true) {
    FvoritesWidget.clearTable();
    FvoritesWidget.fillTable(response.data);
    FvoritesWidget.updateUsersList();
    }
})

FvoritesWidget.removeUserCallback = ApiConnector.removeUserFromFavorites(response => {
    if(response.success === true) {
    FvoritesWidget.clearTable();
    FvoritesWidget.fillTable(response.data);
    FvoritesWidget.updateUsersList();
    }
})     
