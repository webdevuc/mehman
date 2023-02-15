export interface Country {
  code?: string;
  name?: string;
  dial_code?:string;
}

export interface Gender {
  id: number;
  name: string;
  value: string;
}

export interface MealPreference {
  name: string;
  value: string;
}
