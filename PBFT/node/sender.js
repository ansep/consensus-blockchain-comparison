#!/usr/bin/env node

var amqp = require("amqplib/callback_api");

amqp.connect("amqp://rabbit", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = "logs";
    var msg = {
      sender: process.env.NODE_ID,
      text: process.argv.slice(2).join(" ") || "Hello World!",
    };

    channel.assertExchange(exchange, "fanout", {
      durable: false,
    });
    channel.publish(exchange, "", Buffer.from(JSON.stringify(msg)));
    console.log("Sent ", msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
