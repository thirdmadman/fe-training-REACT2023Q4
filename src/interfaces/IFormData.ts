export interface IFormData {
  name: string;
  age: number;
  gender: string;
  country: string;
  email: string;
  password: string;
  passwordRepeat: string;
  acceptTC: boolean;
  userPicture: string;
}

export interface IFormDataOptional {
  name?: string;
  age?: number;
  gender?: string;
  country?: string;
  email?: string;
  password?: string;
  passwordRepeat?: string;
  acceptTC?: boolean;
  userPicture?: string;
}
