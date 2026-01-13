export interface User {
  /** System-generated */
  id: string;

  /** REQUIRED — unique identifier */
  email: string;

  /** REQUIRED */
  firstName: string;

  /** REQUIRED */
  lastName: string;

  /** OPTIONAL — provided by frontend, backend just stores it */
  avatarId?: string | null;

  /** REQUIRED — used for OTP / email verification */
  isVerified: boolean;

  /** System-generated */
  createdAt: Date;

  /** System-generated */
  updatedAt: Date;
}
