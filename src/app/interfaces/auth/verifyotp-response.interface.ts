import { User } from '../user.interface';
import { BaseResponseInterface } from '../base-response.interface';

export interface VerifyOtpResponseInterface extends BaseResponseInterface {
  accessToken: string;
  refreshToken: string;
  user: User;
}
