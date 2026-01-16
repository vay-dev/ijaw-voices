import { BaseResponseInterface } from '../base-response.interface';
import { UserInterface } from '../user.interface';

export interface LoginResponseInterface extends BaseResponseInterface {
  accessToken: string;
  refreshToken: string;
  user: UserInterface;
}
