const crypto = require('crypto');

module.exports.isHmacVerified = function (req, res, next) {
 
    const HmacKey = "5435E68D78DBA40A43833F11CC73901F0B43A2BFCE7863A4CDCEB5E760E3F6E7";

    function ifExist(obj) {
        return typeof obj != "undefined" ? obj : "";
    }

    var payload = ifExist(req.body.notificationItems[0].NotificationRequestItem.pspReference) +
        ":" + ifExist(req.body.notificationItems[0].NotificationRequestItem.originalReference) +
        ":" + ifExist(req.body.notificationItems[0].NotificationRequestItem.merchantAccountCode) +
        ":" + ifExist(req.body.notificationItems[0].NotificationRequestItem.merchantReference) +
        ":" + ifExist(req.body.notificationItems[0].NotificationRequestItem.amount.value) +
        ":" + ifExist(req.body.notificationItems[0].NotificationRequestItem.amount.currency) +
        ":" + ifExist(req.body.notificationItems[0].NotificationRequestItem.eventCode) +
        ":" + ifExist(req.body.notificationItems[0].NotificationRequestItem.success);

    console.log(payload);

    function calculateHmac(data, key) {
        const rawKey = Buffer.from(key, "hex");
        return crypto.createHmac("sha256", rawKey).update(data, "utf8").digest("base64");
    }

    console.log(calculateHmac(payload, HmacKey));
    console.log(req.body.notificationItems[0].NotificationRequestItem.additionalData.hmacSignature);

    function validateHMAC() {
        const expectedSign = calculateHmac(payload, HmacKey);
        const merchantSign = req.body.notificationItems[0].NotificationRequestItem.additionalData.hmacSignature;
        return expectedSign === merchantSign;
    }

    if (validateHMAC()) {
        return next()
    }else{
        console.log("this is not a secure webhook message");
        res.send("this is not a secure webhook message");
    }


}