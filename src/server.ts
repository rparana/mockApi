import express, { Response } from "express";

const app = express();

app.get("/v1/payment-account/:id", (_, response: Response) =>
  response.send([
    {
      accountDetails: {
        clabe: "0d3b891d-0f29-4b1f-a542-a2533160f80b",
      },
      countryCode: "PE",
      companyId: 1,
      personId: "13626a93-3497-42ff-9dc2-b45bd7ea0315",
    },
    {
      accountDetails: {
        clabe: "228fcc2f-db53-4402-8d98-eaed8c6b3883",
      },
      countryCode: "CO",
      companyId: 1,
      personId: "13626a93-3497-42ff-9dc2-b45bd7ea0315",
    },
  ])
);

app.listen(process.env.PORT || 3333);
