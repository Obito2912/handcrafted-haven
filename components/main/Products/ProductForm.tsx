"use client"

import styles from "./ProductForm.module.css";
import { useActionState } from "react";
import { createProduct, updateProduct } from "@/app/(main)/lib/actions";
import { ProductFormState, ProductValue } from "@/app/(main)/lib/schemas/productSchema";
import { ProductCategories } from "@/app/(main)/lib/definitions";
import ExclamationCircleIcon from "@heroicons/react/24/solid/esm/ExclamationCircleIcon";

type ProductFormProps = {
    initialValues?: ProductValue;
    userId?: string;
};

export default function ProductForm({ initialValues, userId }: ProductFormProps) {
    const initialState: ProductFormState = {
        message: null,
        errors: null,
        values: {
            product_id: initialValues?.product_id ?? "",
            title: initialValues?.title ?? "",
            description: initialValues?.description ?? "",
            image_url: initialValues?.image_url ?? "",
            userId: initialValues?.userId ?? userId ?? "",
            quantity: initialValues?.quantity?.toString() ?? "",
            price: initialValues?.price?.toString() ?? "",
            category: initialValues?.category ?? "",
        }
    };
    const isEditMode = !!initialValues;
    const [state, formAction] = useActionState(isEditMode ? updateProduct : createProduct, initialState);
console.log("Initital values Category", initialValues?.category);
    console.log("Initial State category", state.values.category);
    
    if (!userId) {
        return <p className="text-red-500">You must be logged in to create a product.</p>;
    }
    return (
        <form action={formAction} className={`${styles.form}`}>
            <label className={`${styles.form_label}`} htmlFor="title">Name
                <input className={`${styles.form_input}`}
                    type="text" id="title" name="title" autoComplete="title"
                    defaultValue={state?.values?.title ?? initialValues?.title} />
            </label>
            <label className={`${styles.form_label}`} htmlFor="description">Description
                <textarea className={`${styles.form_input}`} id="description" name="description" rows={3} defaultValue={state?.values?.description ?? initialValues?.description} />
            </label>
            <label htmlFor="image_url">Image URL
                <input className={`${styles.form_input}`} type="text" id="image_url" name="image_url" autoComplete="image_url" defaultValue={state?.values?.image_url ?? initialValues?.image_url} />
            </label>
            <label className={`${styles.form_label}`} htmlFor="price">Price
                <input className={`${styles.form_input}`} type="number" id="price" name="price" min="0" step="0.01" inputMode="decimal" defaultValue={state?.values?.price ?? initialValues?.price} />
            </label>
            <label className={`${styles.form_label}`} htmlFor="quantity">Quantity
                <input className={`${styles.form_input}`} type="number" id="quantity" name="quantity" defaultValue={state?.values?.quantity ?? initialValues?.quantity} />
            </label>
            <label className={`${styles.form_label}`} htmlFor="category">Category
                    <select className={`${styles.form_input}`} key={state?.values?.category ?? initialValues?.category ?? ""} id="category" name="category" defaultValue={state?.values?.category ?? initialValues?.category ?? ""}>
                    <option value="" disabled>Select your category</option>
                    {ProductCategories.map((category: string) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </label>
            {isEditMode && <input type="hidden" name="product_id" value={state?.values?.product_id ?? initialValues?.product_id} />}
            <input type="hidden" name="user_id" value={state?.values?.userId ?? initialValues?.userId} />
            <button type="submit">
                {isEditMode ? "Update Product" : "Create Product"}
            </button>

            <div className="flex h-8 items-end space-x-1">
                {state?.message && (
                    <>
                        {state?.success ? null : <ExclamationCircleIcon className="h-5 w-5 text-red-500" />}
                        <p className="text-sm text-red-500">{state.message}</p>
                    </>
                )}
            </div>
        </form>
    );
}