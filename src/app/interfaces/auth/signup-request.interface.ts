export interface SignupRequestInterface {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar_id?: string | null;
}
