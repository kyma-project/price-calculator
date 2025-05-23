export enum Step {
  BASE_VM_SIZE_INCREASE,
  BASE_AUTOSCALER_INCREASE,
  WORKER_NODE_POOL,
  WORKER_TYPE_CHANGE,
  WORKER_SIZE_CHANGE,
  WORKER_AUTOSCALER_INCREASE,
  STORAGE_GB_INCREASE,
  STORAGE_PREMIUM_GB_INCREASE,
  ADDITIONAL_REDIS_INCREASE,
}

enum Unit {
  CU,
  EURO,
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

export let expectedPrice: Price = {
  Nodes: 776.6,
  Additional: 0,
  Storage: 0,
  TotalCost: {
    CapacityUnits: 776.6,
    Currency: 824.26,
  },
};

export const stepsPrice: Map<Step, Price> = new Map<Step, Price>([
  [
    Step.BASE_VM_SIZE_INCREASE,
    {
      Nodes: 260.2,
      Additional: 0,
      Storage: 0,
      TotalCost: {
        CapacityUnits: 260.2,
        Currency: 274.75,
      },
    },
  ],
]);

export function applyStepOnPrice(step: Step): void {
  const stepToApply = stepsPrice.get(step);
  if (!stepToApply) {
    throw new Error(`Couldn't find ${step} to apply`);
  }

  const newPrice = {
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

  expectedPrice = newPrice;
}
