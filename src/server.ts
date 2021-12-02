import express, { Request, Response } from "express";
import faker from "faker";

const app = express();

app.get("/v1/payment-account/:id", (request: Request, response: Response) => {
  const array = [];
  for (let i = 0; i < faker.datatype.number({ min: 1, max: 4 }); i++) {
    array.push({
      accountDetails: {
        clabe: faker.datatype.uuid(),
      },
      countryCode: faker.address.countryCode(),
      companyId: faker.datatype.number({ min: 1, max: 2 }),
      personId: request.params.id,
    });
  }
  return response.send(array);
});

app.listen(process.env.PORT || 3333);
