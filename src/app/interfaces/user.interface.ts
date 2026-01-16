export interface UserInterface {
  /** System-generated */
  id: string;

  /** REQUIRED — unique identifier */
  email: string;

  /** REQUIRED */
  first_name: string;

  /** REQUIRED */
  last_name: string;

  /** OPTIONAL — provided by frontend, backend just stores it */
  avatar_id?: string | null;

  /** REQUIRED — used for OTP / email verification */
  is_verified: boolean;

  /** System-generated */
  created_at: Date;

  /** System-generated */
  updated_at: Date;
}
