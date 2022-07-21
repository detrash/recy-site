export type RecyFormSchema = {
  [wasteType: string]: {
    amount: number;
    videoProof?: File;
  };
};
