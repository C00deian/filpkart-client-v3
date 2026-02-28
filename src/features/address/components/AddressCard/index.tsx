import { useState } from "react"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import type { AddressDto } from "@/types/address.types"

interface Props {
  address: AddressDto
  onEdit: (addr: AddressDto) => void
  onDelete?: (id: number) => void
}

const AddressCard = ({ address, onEdit, onDelete }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative border border-[#e0e0e0] bg-white rounded-sm p-4 transition hover:shadow-sm"
      onMouseLeave={() => setOpen(false)}
    >
      {/* Top Row */}
      <div className="flex justify-between items-start">

        {/* LEFT */}
        <div className="flex-1 pr-4">

          {/* Badge */}
          <span className="inline-block text-[11px] font-semibold px-2 py-1 bg-[#f0f0f0] text-[#212121] rounded">
            {address.addressType}
          </span>

          {/* Name + Phone */}
          <p className="mt-2 text-[14px] font-semibold text-[#212121]">
            {address.name} &nbsp; {address.phoneNumber}
          </p>

          {/* Address */}
          <p className="mt-2 text-[13px] text-[#212121] leading-5">
            {address.addressLine}, {address.locality}, {address.city},{" "}
          </p>
            <p className="text-[13px] text-[#212121] leading-5"> {address.state} - <span className="font-semibold">{address.pincode}</span></p>
        </div>

        {/* RIGHT 3 DOT MENU */}
        <div className="relative">
          <button
            onClick={() => setOpen(prev => !prev)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-28 bg-white border border-[#e0e0e0] shadow-md rounded-sm z-10">

              <button
                onClick={() => {
                  onEdit(address)
                  setOpen(false)
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#212121] hover:bg-gray-50"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>

              <button
                onClick={() => {
                  onDelete?.(address.id)
                  setOpen(false)
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-gray-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default AddressCard