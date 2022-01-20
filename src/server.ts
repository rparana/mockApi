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
const campaigns = [
  { id: '1', description: 'MagLeads' },
  { id: '2', description: 'Glic' },
  { id: '3', description: 'SQUID' },
  { id: '4', description: 'ABEP' },
  { id: '5', description: 'Unicred' },
];
const producers = [
  { id: '1', name: 'Fernando Marinho' },
  { id: '2', name: 'Marcela Teixeira' },
  { id: '3', name: 'Alessandro Aparecido' },
  { id: '4', name: 'Bianca Glaciano' },
  { id: '5', name: 'João Gabriel' },
];
const managers = [
  { id: '1', name: 'João Gonçalves' },
  { id: '2', name: 'Priscila de Almeida' },
  { id: '3', name: 'Junior Rodrigues de Souza' },
  { id: '4', name: 'Fernando da Costa' },
  { id: '5', name: 'Marcos Vinícius' },
];

app.get("/v1/users/:id/leads", (request: Request, response: Response) => {
  faker.locale = 'pt_BR';
  const itemsAmount = 10;

  const { id: userId } = request.params;

  let data: any[] = [];

  const isUserProducer = userId === '1';
  const isUserLeader = userId === '2';
  const isValidUser = isUserProducer || isUserLeader;

  if (isValidUser) {
    data = faker.datatype.array(itemsAmount).map(() => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const registeredAt = faker.date.past();
      const expiresAt = faker.date.future();
      const openedAt = faker.date.between(registeredAt, expiresAt); 

      let lead: any = {
        id: faker.datatype.uuid(),
        customer: {
          name: `${firstName} ${lastName}`,
          phone: faker.phone.phoneNumber('###########')
        },
        campaignId: faker.random.arrayElement(campaigns).id,
        status: faker.random.arrayElement(statusArray),
        registeredAt,
        expiresAt
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
          producer: faker.random.arrayElement(producers),
          managerId: faker.random.arrayElement(managers).id,
          distributionType: faker.random.arrayElement(distributionTypeArray),
          openedAt: faker.random.arrayElement([openedAt, null])
        };
      }

      return lead;
    });
  }

  return response.send({
    data: data,
    amount: data.length,
    amountPerPage: 10,
    page: 1,
  });
});

app.get("/v1/users/:id/teams/campaigns", (request: Request, response: Response) => {
  const { id: userId } = request.params;

  const isUserProducer = userId === '1';
  const isUserLeader = userId === '2';
  const isValidUser = isUserProducer || isUserLeader;

  const data = isValidUser ? campaigns : [];

  return response.send({
    data,
    amount: data.length,
    amountPerPage: 10,
    page: 1,
  });
});

app.get("/v1/users/:id/producers", (request: Request, response: Response) => {
  const { id: userId } = request.params;

  const isUserProducer = userId === '1';
  const isUserLeader = userId === '2';
  const isValidUser = isUserProducer || isUserLeader;

  const data = isValidUser ? producers : [];

  return response.send({
    data,
    amount: data.length,
    amountPerPage: 10,
    page: 1,
  });
});

app.get("/v1/users/:id/teams/leaders", (request: Request, response: Response) => {
  const { id: userId } = request.params;

  const isUserProducer = userId === '1';
  const isUserLeader = userId === '2';
  const isValidUser = isUserProducer || isUserLeader;

  const data = isValidUser ? managers : [];

  return response.send({
    data,
    amount: data.length,
    amountPerPage: 10,
    page: 1,
  });
});

app.listen(process.env.PORT || 3333);
