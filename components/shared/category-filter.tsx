"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { getAllCategory } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";

export function CategoryFilter() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();


  useEffect(() => {
    const getCategories = async () => {
      const categoriesList = await getAllCategory();

      categoriesList && setCategories(categoriesList as ICategory[]);
    };

    getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl;
    if (categories && category !== "ALL") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>
        {categories.map((category) => (
          <SelectItem
            value={category.name}
            className="select-item p-regular-14"
            key={category._id}
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
