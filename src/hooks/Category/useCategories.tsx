import { useCallback, useEffect, useState } from "react"
import { deleteCategory, deleteSubCategory, getCategories, getItems } from "../../backend/Network"
import { Category, Item, SubCategory } from '../../backend/@Types'

const useCategories = () => {
  
    const [categories, setCategories] = useState<Category[]>([])

    const [items, setItems] = useState<Item[]>([])
    const [subCategories, setSubCategories] = useState<SubCategory[]>([])

    const deleteCategoryLocal = (category:Category) => {
        setItems(category.items)
        items.map(i => i.categories.map(c => {
            if(c.categoryId == category.categoryId)
                deleteCategory(c);
        }))
        setSubCategories(category.subCategories)
        subCategories.map(sc => {
            if(sc.category.categoryId == category.categoryId)
                deleteCategory(sc.category)
        })
        deleteCategory(category)
        setCategories(categories.filter(c => c.categoryId !== category.categoryId))
    }
    const fetchCategories = useCallback(async() =>{
        try {
            const categoriesArray  = await getCategories() as Category[]
            if(typeof categoriesArray === 'object') {
                return setCategories([])
            }
            setCategories(categoriesArray)
            return categoriesArray
        } catch(e) {
            console.log(e)
        }
    },[])
  
    useEffect(() => {
        fetchCategories()
    },[])

    return {categories,fetchCategories,deleteCategoryLocal}
}
  
export default useCategories