import apiClient from "@/services/apiClient";
import { API_ENDPOINTS } from "@/config/constants";
import type { ApiResponse } from "@/types/api.types";
import type {
  AddressDto,
  AddressRequest,
  AddressType,
} from "../types/address.types";

type AddressId = number | string;

const normalizeAddressType = (value?: string | null): AddressType =>
  value === "WORK" ? "WORK" : "HOME";

const normalizeAddress = (address: AddressDto): AddressDto => ({
  ...address,
  pincode: address.pincode ?? address.zip ?? "",
  addressLine: address.addressLine ?? address.street ?? "",
  addressType: normalizeAddressType(address.addressType),
});

export const addressService = {
  /** GET /users/me/addresses */
  getAddresses: async (): Promise<AddressDto[]> => {
    const res = await apiClient.get<ApiResponse<AddressDto[]>>(
      API_ENDPOINTS.USERS.ADDRESSES,
    );
    return (res.data.data ?? []).map(normalizeAddress);
  },

  /** POST /users/me/addresses */
  addAddress: async (payload: AddressRequest): Promise<AddressDto> => {
    const res = await apiClient.post<ApiResponse<AddressDto>>(
      API_ENDPOINTS.USERS.ADDRESSES,
      payload,
    );
    return normalizeAddress(res.data.data);
  },

  /** PUT /users/me/addresses/{addressId} */
  updateAddress: async (
    addressId: AddressId,
    payload: AddressRequest,
  ): Promise<AddressDto> => {
    const res = await apiClient.put<ApiResponse<AddressDto>>(
      `${API_ENDPOINTS.USERS.ADDRESSES}/${addressId}`,
      payload,
    );
    return normalizeAddress(res.data.data);
  },

  /** DELETE /users/me/addresses/{addressId} */
  deleteAddress: async (addressId: AddressId): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(
      `${API_ENDPOINTS.USERS.ADDRESSES}/${addressId}`,
    );
  },
};
