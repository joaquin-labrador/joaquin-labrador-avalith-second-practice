"use strict";
//requiert models/index.js
const models = require("../../models/index");
module.exports = {
  up: function () {
    return Promise.all([
      models.User.findOrCreate({
        where: {
          id: "1",
        },
        defaults: {
          userName: "admin",
          email: "joaquinlabrador@gmail.com",
          /* password: "admin1Password!", */
          password:
            "$2a$12$7WrCDJ4NlyUzFn33904bWu42olWeho1pdTTq3SKC.33KqEWz26LE6",
          isAdmin: true,
          birthDate: "11/06/1998",
        },
      }),
      models.User.findOrCreate({
        where: {
          id: "2",
        },
        defaults: {
          userName: "user",
          email: "user@gmail.com",
         /*  password: "user1Password!", */
          password:
            "$2a$12$bcc7H84pRaAAplmKl/9JPecsndwGtqGyoQS5vfXTsCzJR/uwKSLv.",
          birthDate: "04/15/2001",
        },
      }),
    
    ]);
  },
};
