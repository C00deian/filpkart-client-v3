import { useAddressForm } from "./hooks/useAddressForm";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { AddressDto } from "@/features/address/types/address.types";

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
];

interface Props {
  editAddress?: AddressDto | null;
  onClose: () => void;
}

const AddressForm = ({ editAddress, onClose }: Props) => {
  const { form, onSubmit, isLoading, isEdit } = useAddressForm({
    editAddress,
    onSuccess: onClose,
  });

  const {
    register,
    formState: { errors },
    watch,
  } = form;

  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-sm font-bold text-primary uppercase">
          {isEdit ? "Edit Address" : "Add New Address"}
        </h2>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-5">
        {/* Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            {...register("name")}
            label="Full Name *"
            error={errors.name?.message}
          />
          <Input
            {...register("phoneNumber")}
            label="Mobile Number *"
            error={errors.phoneNumber?.message}
          />
        </div>

        {/* Pincode + Locality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            {...register("pincode")}
            label="Pincode *"
            error={errors.pincode?.message}
          />
          <Input
            {...register("locality")}
            label="Locality / Area / Town *"
            error={errors.locality?.message}
          />
        </div>

        {/* Address Line */}
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">
            Address (House No, Building, Street) *
          </label>
          <textarea
            {...register("addressLine")}
            rows={2}
            className={`w-full border rounded px-3 py-2.5 text-sm resize-none
              ${errors.addressLine ? "border-red-400" : "border-slate-300"}`}
          />
          {errors.addressLine && (
            <p className="text-xs text-red-500 mt-1">
              {errors.addressLine.message}
            </p>
          )}
        </div>

        {/* City + State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            {...register("city")}
            label="City / District *"
            error={errors.city?.message}
          />

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">
              State *
            </label>
            <select
              {...register("state")}
              className="w-full border border-slate-300 rounded px-3 py-2.5 text-sm"
            >
              <option value="">Select State</option>
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-xs text-red-500 mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
        </div>

        {/* Optional */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input {...register("landmark")} label="Landmark (Optional)" />
          <Input
            {...register("alternatePhone")}
            label="Alternate Phone (Optional)"
          />
        </div>

        {/* Address Type */}
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">
            Address Type
          </label>

          <div className="flex gap-3">
            {(["HOME", "WORK"] as const).map((type) => (
              <label
                key={type}
                className={`flex items-center gap-2 border rounded-lg px-5 py-2.5 cursor-pointer
                  ${
                    watch("addressType") === type
                      ? "border-primary bg-primary/5 text-primary font-semibold"
                      : "border-slate-200 text-slate-600"
                  }`}
              >
                <input
                  type="radio"
                  value={type}
                  {...register("addressType")}
                  className="sr-only"
                />
                <span>{type === "HOME" ? "🏠" : "💼"}</span>
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={onClose} fullWidth>
            Cancel
          </Button>

          <Button type="submit" isLoading={isLoading} fullWidth>
            {isEdit ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
