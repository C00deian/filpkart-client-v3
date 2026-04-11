// file: src/features/products/components/AddCategoryForm.tsx
import { useAddCategoryForm } from '../../hooks/useAddCategoryForm'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface AddCategoryFormProps {
    onClose: () => void;
}

const AddCategoryForm = ({ onClose }: AddCategoryFormProps) => {
    const { form, isLoading, autoSlug, onSubmit } = useAddCategoryForm(onClose)
    const { register, formState: { errors }, watch } = form

    return (
        <div className="bg-white border border-slate-200 rounded-md shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="text-sm font-bold text-primary uppercase">Add New Category</h2>
            </div>

            <form onSubmit={onSubmit} className="p-6 space-y-4">
                <Input
                    {...register('name')}
                    label="Category Name"
                    placeholder="e.g. Electronics"
                    error={errors.name?.message}
                    onChange={e => {
                        register('name').onChange(e)
                        autoSlug(e.target.value)
                    }}
                />
                <Input
                    {...register('slug')}
                    label="Slug"
                    placeholder="e.g. electronics"
                    error={errors.slug?.message}
                    helperText="Auto-generated from name. Lowercase, hyphens only."
                />
                <Input
                    {...register('imageUrl')}
                    label="Image URL"
                    placeholder="https://..."
                    error={errors.imageUrl?.message}
                />
                {watch('imageUrl') && (
                    <img
                        src={watch('imageUrl')}
                        alt="preview"
                        className="w-20 h-20 rounded-lg object-cover border border-slate-200"
                    />
                )}


                {/* onClose ko yahan use kiya gaya hai */}
                <Button type="button" variant="secondary" onClick={onClose} fullWidth>
                    Cancel
                </Button>
                <Button type="submit" isLoading={isLoading} fullWidth>
                    Add Category
                </Button>

            </form>
        </div>
    )
}

export default AddCategoryForm;