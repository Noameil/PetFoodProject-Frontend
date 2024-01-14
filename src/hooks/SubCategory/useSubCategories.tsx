import { useCallback, useEffect, useState } from "react"
import { deleteItem, deleteSubCategory, getItems, getSubCategories } from "../../backend/Network"
import { Category, Item, SubCategory } from '../../backend/@Types'

const useSubCategories = () => {
  
    const [subCategories, setSubCategories] = useState<SubCategory[]>([])

    const [items, setItems] = useState<Item[]>([])
    const [category, setCategory] = useState<Category>()

    const deleteSubCategoryLocal = (subCategory:SubCategory) => {
        setItems(subCategory.items)
        items.map(i => i.subCategories.map(sc => {
            if(sc.subCategoryId == subCategory.subCategoryId)
                deleteSubCategory(sc);
        }))
        subCategories.map(sc1 => {
            setCategory(sc1.category)
            category?.subCategories.map(sc2 => {
                if(sc2.subCategoryId == subCategory.subCategoryId)
                    deleteSubCategory(sc2)
            })
        })
        deleteSubCategory(subCategory)
        setSubCategories(subCategories.filter(sc => sc.subCategoryId !== subCategory.subCategoryId))
    }

    const fetchSubCategories = useCallback(async() =>{
        try {
            const subCategoriesArray  = await getSubCategories() as SubCategory[]
            setSubCategories(subCategoriesArray)
            return subCategoriesArray
        } catch(e) {
            console.log(e)
        }
    },[])
  
    useEffect(() => {
        fetchSubCategories()
    },[])

    return {subCategories,fetchSubCategories,deleteSubCategoryLocal}
}
  
export default useSubCategories