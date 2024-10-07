import { AuthUser } from './user.model';

export interface AuthenticationResponse {
  accessToken: string;
  refreshtoken: string;
}
