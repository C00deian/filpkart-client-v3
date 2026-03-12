export interface ProfileDto {
  id: number;
  userId: string;
  name: string;
  gender: string;
  email: string;
  phoneNumber: string;
  bio?: string;
  dateOfBirth?: string;
  avatarUrl?: string;
  loyaltyPoints?: number;
}

export interface UpdateProfileRequest {
  email?: string;
  phoneNumber?: string;
  name?: string;
  gender?: string;
}