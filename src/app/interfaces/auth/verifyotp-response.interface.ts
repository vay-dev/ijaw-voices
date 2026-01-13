import { User } from '../user.interface';

export interface VerifyOtpResponse extends User {
  access: string;
  refresh: string;
}
