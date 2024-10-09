export interface IFormValues {
  title: string | null;
  conditions: string | null;
  exclusion: string | null;
  ngIndustries: string[];
  monitorscount: number | null;
  duration: string;
  gender: number | null;
  age: { lower: number | null; upper: number | null };
  prefecture: string[];
  married: number | null;
  children: number | null;
  profession: string[];
  personalIncome: { lower: number | null; upper: number | null };
  householdIncome: { lower: number | null; upper: number | null };
  question: IQuestion[];
}

export interface IQuestion {
  questionText: string;
  type: number;
  isRequired: boolean;
  order: number;
  sequence: number;
  options: IOption[];
}

export interface IOption {
  type?: string;
  optionText: string;
  order: number;
  optionType: number;
}
