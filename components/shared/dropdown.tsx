"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ICategory } from "@/lib/database/models/category.model";
import { Input } from "../ui/input";
import { createCategory, getAllCategory } from "@/lib/actions/category.actions";

interface DropdownProps {
  value?: string;
  onChangeHandler?: () => void;
}

export function Dropdown({ value, onChangeHandler }: DropdownProps) {
  const [isPending, startTransition] = useTransition();
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);

  const handleAddCategory = () => {
    startTransition(() => {
      createCategory({
        categoryName: newCategory.trim(),
      }).then((category) => setCategories((prev) => [...prev, category]));
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoriesList = await getAllCategory();

      categoriesList && setCategories(categoriesList as ICategory[]);
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              value={category._id}
              className="select-item p-regular-14"
              key={category._id}
            >
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  disabled={isPending}
                  placeholder="Category name"
                  className=" mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={isPending}
                onClick={handleAddCategory}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
}
