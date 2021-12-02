import express, { Request, Response } from "express";
import faker from "faker";

const app = express();

app.use(express.json());
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

app.patch("/v1/payment-account/:id", (request: Request, response: Response) => {
  console.log(request.body);
  return response.send({
    accountDetails: {
      clabe: request.body.clabe,
    },
    countryCode: faker.address.countryCode(),
    companyId: faker.datatype.number({ min: 1, max: 2 }),
    personId: request.params.id,
  });
});

app.listen(process.env.PORT || 3333);
