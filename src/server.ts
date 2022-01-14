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

// Mag
const statusArray = [
  'queue',
  'available',
  'working',
  'contact',
  'scheduled',
  'consulting',
  'dormant',
  'done'
]

app.get("/v0/users/2/leads", (_, response: Response) => {
  faker.locale = 'pt_BR';
  const itemsAmount = 15;

  const data = Array(itemsAmount).fill(0).map(() => ({
    id: faker.datatype.uuid(),
    customer: {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      phone: faker.phone.phoneNumber('###########')
    },
    workStatus: faker.random.arrayElement(['to_do', 'working', 'done']),
    campaignId: faker.datatype.number({ min: 1, max: 10 }),
    status: faker.random.arrayElement(statusArray),
    type: faker.random.arrayElement([
      'with_schedule',
      'manual_lead',
      'received_lead'
    ]),
    cluster: faker.random.arrayElement([
      'diabetes',
      'hypertension',
      'cardiovascular_disease',
      'hiv',
      'prostate_cancer',
      'breast_cancer',
      'skin_cancer',
      'obesity'
    ]),
    registeredAt: faker.date.past(undefined, new Date()),
    expiresAt: faker.date.future(undefined, new Date())
  }));

  return response.send({
    data,
    totalAmount: 15,
    currentPage: 1,
    pagesAmount: 1,
  });
});

app.get("/v0/users/1/leads", (_, response: Response) => {
  faker.locale = 'pt_BR';
  const itemsAmount = 15;

  const data = Array(itemsAmount).fill(0).map(() => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const openedAt = faker.date.past(undefined, new Date()); 

    return {
      id: faker.datatype.uuid(),
      customer: {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email(firstName, lastName),
        phone: faker.phone.phoneNumber('###########')
      },
      isVerified: faker.datatype.boolean(),
      onHold: faker.datatype.boolean(),
      producer: {
        id: faker.datatype.uuid(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      },
      campaignId: faker.datatype.uuid(),
      managerId: faker.datatype.uuid(),
      status: faker.random.arrayElement(statusArray),
      distributionType: faker.random.arrayElement([
        'none', 'simple', 'broker_score', 'novice'
      ]),
      registeredAt: faker.date.past(undefined, openedAt),
      openedAt: openedAt,
      expirateAt: faker.date.future(undefined, new Date())
    };
  });

  return response.send({
    data,
    totalAmount: 15,
    currentPage: 1,
    pagesAmount: 1,
  });
});

app.listen(process.env.PORT || 3333);
