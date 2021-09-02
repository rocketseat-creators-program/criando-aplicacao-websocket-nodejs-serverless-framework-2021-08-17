const Connect = require("./connectHandler");
const Disconnect = require("./disconnectHandler");
const PublishMessage = require("./publishMessageHandler");
const Default = require("./defaultHandler");
const SetTopic = require("./setTopicHandler");
const Constants = require("../utils/constants");
const Redirect = require("./redirectMessageHandler");

exports.handler = async(event) => {
    // console.log("event", event);

    const route = event.requestContext.routeKey;
    const connectionId = event.requestContext.connectionId;
    const domainName = event.requestContext.domainName;
    const stage = event.requestContext.stage;

    switch (route) {
        case "$connect":
            let connectResponse = await Connect.handler(connectionId, Constants.TABLE_NAME, domainName, stage);
            return connectResponse;
        case "$disconnect":
            let disconnectResponse = await Disconnect.handler(connectionId, Constants.TABLE_NAME);
            return disconnectResponse;
        case "publish":
            let publishMessageResponse = await PublishMessage.handler(connectionId, event.body, Constants.TABLE_NAME, domainName, stage);
            return publishMessageResponse;
        case "setTopic":
            let setTopicResponse = await SetTopic.handler(connectionId, event.body, Constants.TABLE_NAME, domainName, stage);
            return setTopicResponse;
        case "redirectMessage":
            let redirectMessageResponse = await Redirect.handler(connectionId, event.body, domainName, stage);
            return redirectMessageResponse;
        default:
            let defaultResponse = await Default.handler(connectionId, domainName, stage);
            return defaultResponse;
    }
};

// wss://4tak5p460k.execute-api.us-east-2.amazonaws.com/develop