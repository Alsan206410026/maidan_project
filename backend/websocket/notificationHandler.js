const sendToUser = require("./sendToUser");

function sendNotification(notification){

    sendToUser(

        notification.receiver,

        {
            type:"notification",
            notification
        }

    );

}

module.exports = sendNotification;