"use client";

import styles from "@/components/shared/Form/Form.module.css";
import { useActionState, useState } from "react";
import { createProduct, updateOrDeleteProduct } from "@/app/(main)/lib/actions";
import {
  ProductFormState,
  ProductValue,
} from "@/app/(main)/lib/schemas/productSchema";
import { ProductCategories } from "@/app/(main)/lib/definitions";
import ExclamationCircleIcon from "@heroicons/react/24/solid/esm/ExclamationCircleIcon";
import Image from "next/image.js";
import Link from "next/link";

type ProductFormProps = {
  initialValues?: ProductValue;
  userId?: string;
};

export default function ProductForm({
  initialValues,
  userId,
}: ProductFormProps) {
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
    },
  };
  const isEditMode = !!initialValues;
  const [state, formAction] = useActionState(
    isEditMode ? updateOrDeleteProduct : createProduct,
    initialState,
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const hasMessage = Boolean(state?.message);
  const isSuccess = state?.success === true;
    // const [isUploading, setIsUploading] = useState(false);
    if (!userId) {
        return <p role="alert" className={styles.form_error_text}>You must be logged in to create a product.</p>;
    }
    return (
        <form action={formAction} className={`${styles.form}`} aria-label={isEditMode ? "Edit Product Form" : "Create Product Form"}>
            <label className={`${styles.form_label}`} htmlFor="title">Name
                <input className={`${styles.form_input}`}
                    type="text" id="title" name="title" autoComplete="false" required aria-required="true"
                    defaultValue={state?.values?.title ?? initialValues?.title} 
                    // Product title validation: Required field, min 2 chars (matches CreateProductSchema)          
                    minLength={2}
                    maxLength={100}
                    title="Title must be at least 2 characters"                    
                    />
            </label>
            <label className={`${styles.form_label}`} htmlFor="description">Description
                <textarea className={`${styles.form_input}`} id="description" name="description" rows={6} 
                required 
                aria-required="true" 
                defaultValue={state?.values?.description ?? initialValues?.description} 
                // Description is required and limited to 2000 chars (matches backend schema)
                maxLength={2000}
                title="Description must be at most 2000 characters"
                />
            </label>
            {(initialValues?.image_url || previewImage) && (
                <Image src={previewImage ?? initialValues.image_url} 
                alt={`Preview of ${state?.values?.title ?? initialValues?.title}`} className="mb-4 max-h-60 object-cover"
                    width={128}
                    height={128} />
            )}
            <input
                type="hidden"
                name="image_url"
                value={state?.values?.image_url ?? initialValues?.image_url ?? ""}
            />
            <label className={`${styles.form_label}`} htmlFor="image_file">
                <input type="file" id="image_file"
                    name="image_file"
                    accept="image/*"
                    className={`${styles.form_input}`}
                    aria-describedby="imageUploadHelp"
                    onChange={(e) => {
                        const file = e.target.files?.[0] as File | undefined;
                        const url = URL.createObjectURL(file);
                        setPreviewImage(url);
                    }} />
                <span id="imageUploadHelp" className={styles.form_help_text}>Upload an image to represent your product. Accepted formats: JPG, PNG, GIF.</span>
            </label>
            <label className={`${styles.form_label}`} htmlFor="price">Price
                <input className={`${styles.form_input}`} type="number" id="price" name="price" min="0" step="0.01" inputMode="decimal"
                 defaultValue={state?.values?.price ?? initialValues?.price} 
                 required aria-required="true"
                 // Price validation: Required, must be a positive number with up to 2 decimal places (matches CreateProductSchema)
                 title="Price must be a positive number"
                 />
            </label>
            <label className={`${styles.form_label}`} htmlFor="quantity">Quantity
                <input className={`${styles.form_input}`} type="number" id="quantity" name="quantity" defaultValue={state?.values?.quantity ?? initialValues?.quantity} />
            </label>

      <label className={`${styles.form_label}`} htmlFor="category">
        Category
        <select
          className={`${styles.form_input}`}
          key={state?.values?.category ?? initialValues?.category ?? ""}
          id="category"
          name="category"
          defaultValue={
            state?.values?.category ?? initialValues?.category ?? ""
          }
          // Category selection is required (matches backend enum validation)
          required
          title="Please select a category"
        >
          <option value="" disabled>
            Select a category
          </option>
          {ProductCategories.map((category: string) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </label>
      {isEditMode && (
        <input
          type="hidden"
          name="product_id"
          value={state?.values?.product_id ?? initialValues?.product_id}
        />
      )}
      <input
        type="hidden"
        name="user_id"
        value={state?.values?.userId ?? initialValues?.userId}
      />
      <div className={styles.buttonsAcross}>      
      <button
        type="submit"
        name="_action"
        value={isEditMode ? "update" : "create"}
        
      >
        {isEditMode ? "Update Product" : "Create Product"}
      </button>

      {isEditMode && (
        <button type="submit" name="_action" value="delete" aria-label="Delete this product permanently">
          Delete Product
        </button>
      )}
            <button type="button" name="_action" value="link">
                <Link href="/products">
                    {"Go Back"}
                </Link>
            </button>            
            </div>
        <div
        className={styles.form_error}
        role={hasMessage ? (isSuccess ? "status" : "alert") : undefined}
        aria-live={hasMessage ? (isSuccess ? "polite" : "assertive") : undefined}
        aria-atomic={hasMessage ? true : undefined}
        >
        {hasMessage && (
            <>
            {!isSuccess && (
                <ExclamationCircleIcon
                className={styles.form_error_icon}
                aria-hidden="true"
                />
            )}
            <p className={isSuccess ? styles.form_success_text : styles.form_error_text}>
                {state.message}
            </p>
            </>
        )}
        </div>
    </form>
  );
}
