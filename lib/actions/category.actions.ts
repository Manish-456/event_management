"use server";

import { CreateCategoryParams } from "@/types";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import Category from "@/lib/database/models/category.model";

export const createCategory = async({ categoryName }: CreateCategoryParams) => {
 try {
    await connectToDatabase();

    const newCategory = await Category.create({
        name: categoryName
    });

    return JSON.parse(JSON.stringify(newCategory));
 } catch (error) {
    handleError(error)
 }
}

export const getAllCategory = async() => {
 try {
    await connectToDatabase();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
 } catch (error) {
    handleError(error)
 }
}