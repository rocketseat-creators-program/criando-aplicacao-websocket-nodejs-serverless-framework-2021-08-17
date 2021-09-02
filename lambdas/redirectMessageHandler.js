const Response = require("../utils/response");
const Message = require("../utils/message");

exports.handler = async(connectionId, body, domainName, stage) => {
    let payloadParsed = JSON.parse(body);
    let payload = Response.send(200, `Redirect Message for you database`);
    console.log('payloadParsed', payloadParsed)

    try {
        console.log("save into my database...")

        await Message.send(
            domainName,
            stage,
            connectionId,
            payload
        );
        return payload
    } catch (error) {
        console.log("redirectMessage.error", error);
        return Response.send(500, error);
    }
};