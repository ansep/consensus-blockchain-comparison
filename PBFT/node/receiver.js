#!/usr/bin/env node

var amqp = require("amqplib/callback_api");
const sqlite3 = require("sqlite3").verbose();

// Open a database handle
let db = new sqlite3.Database("/data/pbft.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");

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
                console.log(" [x] %s", msg.content.toString());

                db.run(
                  "INSERT INTO pbft (message) VALUES (?)",
                  [msg.content.toString()],
                  function (err) {
                    if (err) {
                      return console.log(err.message);
                    }
                    console.log(
                      `A row has been inserted with rowid ${this.lastID}`
                    );
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
