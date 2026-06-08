export type Application = {
  id: string;
  company: string;
  role: string;
  status: string;
  source: string;
  jdUrl: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export enum FormActionType {
  Add = "add",
  Update = "update",
}
export const statusOptions: string[] = [
  "applied",
  "screen",
  "tech",
  "onsite",
  "offer",
  "rejected",
];
export const sourceOptions: string[] = [
  "LinkedIn",
  "Naukri",
  "Cutshort",
  "Foundit",
  "Referral",
];
