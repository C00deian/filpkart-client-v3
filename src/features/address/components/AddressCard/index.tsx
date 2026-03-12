import { useState } from "react"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import type { AddressDto } from "@/types/address.types"

interface Props {
  address: AddressDto
  // ── account/manage mode ──
  onEdit?: (addr: AddressDto) => void
  onDelete?: (id: number) => void
  // ── checkout/select mode ──
  selectable?: boolean
  selected?: boolean
  onSelect?: (addr: AddressDto) => void
  onDeliverHere?: (addr: AddressDto) => void
}

const AddressCard = ({
  address,
  onEdit,
  onDelete,
  selectable = false,
  selected = false,
  onSelect,
  onDeliverHere,
}: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`relative border bg-white rounded-sm p-4 transition
        ${selectable
          ? `cursor-pointer ${selected
              ? "border-primary shadow-[0_0_0_2px_rgba(37,99,235,0.15)]"
              : "border-[#e0e0e0] hover:border-primary/50 hover:shadow-sm"}`
          : "border-[#e0e0e0] hover:shadow-sm"
        }`}
      onClick={() => selectable && onSelect?.(address)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex justify-between items-start">

        {/* LEFT — radio + content */}
        <div className="flex items-start gap-3 flex-1 pr-4">

          {/* Radio circle */}
          {selectable && (
            <div className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center
              ${selected ? "border-primary" : "border-slate-400"}`}>
              {selected && <div className="w-2 h-2 rounded-full bg-primary" />}
            </div>
          )}

          <div className="flex-1">
            {/* Badge */}
            <span className="inline-block text-[11px] font-semibold px-2 py-0.5 bg-[#f0f0f0] text-[#212121] rounded">
              {address.addressType}
            </span>

            {/* Name + Phone */}
            <p className="mt-2 text-[14px] font-semibold text-[#212121]">
              {address.name}&nbsp;&nbsp;
              <span className="font-normal text-[13px] text-[#212121]">{address.phoneNumber}</span>
            </p>

            {/* Address lines */}
            <p className="mt-1 text-[13px] text-[#212121] leading-5">
              {address.addressLine}, {address.locality}, {address.city},
            </p>
            <p className="text-[13px] text-[#212121] leading-5">
              {address.state} - <span className="font-semibold">{address.pincode}</span>
            </p>

            {/* DELIVER HERE — only visible on the selected card */}
            {selectable && selected && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDeliverHere?.(address)
                }}
                className="mt-3 px-6 py-2 bg-[#fb641b] hover:bg-[#e85d10] text-white text-sm font-bold
                  uppercase rounded shadow-sm transition-colors"
              >
                Deliver Here
              </button>
            )}
          </div>
        </div>

        {/* RIGHT 3-dot menu — account / manage mode only */}
        {!selectable && (onEdit || onDelete) && (
          <div className="relative flex-shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(p => !p) }}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-28 bg-white border border-[#e0e0e0] shadow-md rounded-sm z-10">
                {onEdit && (
                  <button
                    onClick={() => { onEdit(address); setOpen(false) }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#212121] hover:bg-gray-50"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => { onDelete(address.id); setOpen(false) }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-gray-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AddressCard