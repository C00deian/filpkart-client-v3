/** @deprecated Use UserProfile from user.types.ts instead */
export type ProfileDto = import('./user.types').UserProfile;

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phoneNumber?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | string;
  bio?: string;
  dateOfBirth?: string;
  avatarUrl?: string;
}