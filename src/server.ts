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
const leadTypeArray = ['with_schedule', 'manual_lead', 'received_lead'];
const distributionTypeArray = ['none', 'simple', 'broker_score', 'novice'];
const statusArray = [
  'queue',
  'available',
  'working',
  'contact',
  'scheduled',
  'consulting',
  'dormant',
  'done'
];
const clusterArray = [
  'diabetes',
  'hypertension',
  'cardiovascular_disease',
  'hiv',
  'prostate_cancer',
  'breast_cancer',
  'skin_cancer',
  'obesity'
];

app.get("/v1/users/:id/leads", (request: Request, response: Response) => {
  faker.locale = 'pt_BR';
  const itemsAmount = 15;

  const { id: userId } = request.params;

  let data: any[] = [];

  const isUserProducer = userId === '1';
  const isUserLeader = userId === '2';
  const isValidUser = isUserProducer || isUserLeader;

  if (isValidUser) {
    data = Array(itemsAmount).fill(0).map(() => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const openedAt = faker.date.past(undefined, new Date()); 

      let lead: any = {
        id: faker.datatype.uuid(),
        customer: {
          name: `${firstName} ${lastName}`,
          phone: faker.phone.phoneNumber('###########')
        },
        campaignId: faker.datatype.number({ min: 1, max: 10 }),
        status: faker.random.arrayElement(statusArray),
        registeredAt: faker.date.past(undefined, openedAt),
        expiresAt: faker.date.future(undefined, new Date())
      };

      if (isUserProducer) {
        lead = {
          ...lead,
          type: faker.random.arrayElement(leadTypeArray),
          cluster: faker.random.arrayElement(clusterArray)
        };
      } else {
        lead = {
          ...lead,
          customer: {
            ...lead.customer,
            email: faker.internet.email(firstName, lastName)
          },
          isVerified: faker.datatype.boolean(),
          onHold: faker.datatype.boolean(),
          producer: {
            id: faker.datatype.uuid(),
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          },
          managerId: faker.datatype.uuid(),
          distributionType: faker.random.arrayElement(distributionTypeArray),
          openedAt
        };
      }

      return lead;
    });
  }

  return response.send({
    data: data,
    amount: data.length,
    amountPerPage: itemsAmount,
    page: 1,
  });
});

app.listen(process.env.PORT || 3333);
