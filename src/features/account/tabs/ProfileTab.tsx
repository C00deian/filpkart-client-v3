import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useProfile } from '@/features/account/hooks/useProfile'

interface ProfileFormValues {
  name: string;
  gender: string;
  email: string;
  phoneNumber: string;
}

const ProfileTab = () => {
  const { profile, updateProfile, deleteAccount, isUpdating, isDeleting, isLoading } =
    useProfile();

  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit, formState: { errors, isDirty } } =
    useForm<ProfileFormValues>({
      values: {
        name: profile?.name || "",
        gender: profile?.gender || "",
        email: profile?.email || "",
        phoneNumber: profile?.phoneNumber || "",
      },
    });

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile({
      email: data.email,
      phoneNumber: data.phoneNumber,
      name: data.name,
      gender: data.gender,
    });
    setIsEdit(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-sm font-bold text-primary uppercase">
          Personal Information
        </h2>

        {!isEdit && (
          <button
            onClick={() => setIsEdit(true)}
            className="text-primary text-sm font-medium hover:underline"
          >
            Edit
          </button>
        )}
      </div>

      <div className="p-6">
        {!isEdit ? (
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{profile.name || "—"}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Gender</span>
              <span className="font-medium capitalize">
                {profile.gender ? profile.gender.toLowerCase() : "—"}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{profile.email || "—"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Mobile</span>
              <span className="font-medium">{profile.phoneNumber || "—"}</span>
            </div>

            {/* Delete Section */}
            <div className="pt-6 border-t">
              <button
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to permanently delete your account?"
                    )
                  ) {
                    deleteAccount();
                  }
                }}
                disabled={isDeleting}
                className="text-red-600 text-sm font-medium hover:underline"
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                {...register("name")}
                label="Full Name"
              />
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Gender</label>
                <select
                  {...register("gender")}
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                {...register("email", { required: "Email is required" })}
                label="Email *"
                error={errors.email?.message}
              />
              <Input
                {...register("phoneNumber", {
                  required: "Mobile number is required",
                })}
                label="Mobile Number *"
                error={errors.phoneNumber?.message}
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEdit(false)}
                fullWidth
              >
                Cancel
              </Button>

              <Button
                type="submit"
                isLoading={isUpdating}
                disabled={!isDirty}
                fullWidth
              >
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;

