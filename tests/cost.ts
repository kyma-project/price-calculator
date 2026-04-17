export enum Step {
  BASE_VM_SIZE_INCREASE,
  BASE_AUTOSCALER_INCREASE,
  WORKER_ADD_NODE,
  WORKER_TYPE_CHANGE,
  WORKER_SIZE_CHANGE,
  WORKER_AUTOSCALER_INCREASE,
  STORAGE_GB_INCREASE,
  STORAGE_PREMIUM_GB_INCREASE,
  ADDITIONAL_REDIS_INCREASE,
}

export type Price = {
  Nodes?: number;
  Storage?: number;
  Additional?: number;
  TotalCost?: {
    CapacityUnits: number;
    Currency: number;
  };
};

let expectedPrice: Price = {
  Nodes: 777.6,
  Additional: 0,
  Storage: 0,
  TotalCost: {
    CapacityUnits: 777.6,
    Currency: 777.6,
  },
};

const stepsPrice: Map<Step, Price> = new Map<Step, Price>([
  [
    Step.BASE_VM_SIZE_INCREASE,
    {
      Nodes: 259.2,
      Additional: 0,
      Storage: 0,
      TotalCost: {
        CapacityUnits: 259.2,
        Currency: 259.2,
      },
    },
  ],
  [
    Step.BASE_AUTOSCALER_INCREASE,
    {
      Nodes: 2419.2,
      Additional: 0,
      Storage: 0,
      TotalCost: {
        CapacityUnits: 2419.2,
        Currency: 2419.2,
      },
    },
  ],
  [
    Step.WORKER_ADD_NODE,
    {
      Nodes: 259.2,
      Additional: 0,
      Storage: 0,
      TotalCost: {
        CapacityUnits: 259.2,
        Currency: 259.2,
      },
    },
  ],
  [
    Step.WORKER_TYPE_CHANGE,
    {
      Nodes: 0,
      Additional: 0,
      Storage: 0,
      TotalCost: {
        CapacityUnits: 0,
        Currency: 0,
      },
    },
  ],
  [
    Step.WORKER_SIZE_CHANGE,
    {
      Nodes: 432,
      Additional: 0,
      Storage: 0,
      TotalCost: {
        CapacityUnits: 432,
        Currency: 432,
      },
    },
  ],
  [
    Step.WORKER_AUTOSCALER_INCREASE,
    {
      Nodes: 2764.8,
      Additional: 0,
      Storage: 0,
      TotalCost: {
        CapacityUnits: 2764.8,
        Currency: 2764.8,
      },
    },
  ],
  [
    Step.STORAGE_GB_INCREASE,
    {
      Nodes: 0,
      Additional: 0,
      Storage: 72,
      TotalCost: {
        CapacityUnits: 72,
        Currency: 72,
      },
    },
  ],
  [
    Step.STORAGE_PREMIUM_GB_INCREASE,
    {
      Nodes: 0,
      Additional: 0,
      Storage: 216,
      TotalCost: {
        CapacityUnits: 216,
        Currency: 216,
      },
    },
  ],
  [
    Step.ADDITIONAL_REDIS_INCREASE,
    {
      Nodes: 0,
      Additional: 778,
      Storage: 0,
      TotalCost: {
        CapacityUnits: 778,
        Currency: 778,
      },
    },
  ],
]);

export function applyStepOnPrice(step: Step): Price {
  const stepToApply = stepsPrice.get(step);
  if (!stepToApply) {
    throw new Error(`Couldn't find ${Step[step]} to apply`);
  }

  expectedPrice = {
    Nodes: (expectedPrice.Nodes ?? 0) + (stepToApply.Nodes ?? 0),
    Additional: (expectedPrice.Additional ?? 0) + (stepToApply.Additional ?? 0),
    Storage: (expectedPrice.Storage ?? 0) + (stepToApply.Storage ?? 0),
    TotalCost: {
      CapacityUnits:
        (expectedPrice.TotalCost?.CapacityUnits ?? 0) +
        (stepToApply.TotalCost?.CapacityUnits ?? 0),
      Currency:
        (expectedPrice.TotalCost?.Currency ?? 0) +
        (stepToApply.TotalCost?.Currency ?? 0),
    },
  };
  return expectedPrice;
}
