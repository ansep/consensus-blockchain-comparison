#!/usr/bin/env node

console.log("Starting node " + process.env.NODE_ID);

var amqp = require("amqplib/callback_api");
const sqlite3 = require("sqlite3").verbose();

// Open a database handle
let db = new sqlite3.Database("/data/pbft.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
  // create tables if not exist
  db.run(
    "CREATE TABLE IF NOT EXISTS pbft (message TEXT, received TEXT, sender TEXT)",
    function (err) {
      if (err) {
        throw err;
      }
      console.log("Table created");
    }
  );

  amqp.connect("amqp://rabbit", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var exchange = "logs";

      channel.assertExchange(exchange, "fanout", {
        durable: false,
      });

      channel.assertQueue(
        "",
        {
          exclusive: true,
        },
        function (error2, q) {
          if (error2) {
            throw error2;
          }
          console.log(
            " [*] Waiting for messages in %s. To exit press CTRL+C",
            q.queue
          );
          channel.bindQueue(q.queue, exchange, "");

          channel.consume(
            q.queue,
            function (msg) {
              if (msg.content) {
                const receivedMessage = JSON.parse(msg.content.toString());
                console.log(receivedMessage);

                db.run(
                  "INSERT INTO pbft (message, received, sender) VALUES (?, ?, ?)",
                  [
                    receivedMessage.text,
                    new Date().toISOString(),
                    receivedMessage.sender,
                  ],
                  function (err) {
                    if (err) {
                      return console.log(err.message);
                    }
                  }
                );
              }
            },
            {
              noAck: true,
            }
          );
        }
      );
    });
  });
});
