"use strict";
const models = require("../../models/index");

module.exports = {
  up: function () {
    return Promise.all([
      models.Car.findOrCreate({
        where: {
          id: "1",
        },
        defaults: {
          brand: "Fiat",
          name: "Fiat 500",
          year: "2016",
          color: "Red",
          price: "4000",
          kmTraveled: "100000",
          description: "Fiat Uno 2016, very good state",
          userId: "1",
          plate: "ABC-123",
        },
      }),
      models.Car.findOrCreate({
        where: {
          id: "2",
        },
        defaults: {
          brand: "Ford",
          name: "Ford Fiesta",
          year: "2018",
          color: "Blue",
          price: "8000",
          kmTraveled: "50000",
          description: "Ford Fiesta 2018, very good state",        
          userId: "1",
          plate: "DEF-456",
        },
      }),
      models.Car.findOrCreate({
        where: {
          id: "3",
        },
        defaults: {
          brand: "Chevrolet",
          name: "Chevrolet Onix",
          year: "2019",
          color: "Black",
          price: "10000",
          kmTraveled: "20000",
          description: "Chevrolet Cruze 2019, very good state",
          userId: "2",
          plate: "GHI-789",
        },
      }),
      models.Car.findOrCreate({
        where: {
          id: "4",
        },
        defaults: {
          brand: "Chevrolet",
          name: "Chevrolet Cruze",
          year: "2022",
          color: "Black",
          price: "30000",
          kmTraveled: "0",
          description: "Chevrolet Cruze 2022, zero km",
          userId: null,
          plate: "JKL-012",  
        },
      }),

      models.Car.findOrCreate({
        where: {
          id: "5",
        },
        defaults: {
          brand: "Honda",
          name: "Honda Civic",
          year: "2022",
          color: "White",
          price: "35000",
          kmTraveled: "0",
          description: "Honda Civic 2022, zero km",
          userId: null,
          plate: "MNO-345",
        },
      }),
    ]);
  },
};
