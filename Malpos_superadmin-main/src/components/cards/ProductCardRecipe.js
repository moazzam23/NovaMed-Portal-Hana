import React from 'react'
import RecipeTable from '../tables/RecipeTable'

export default function ProductCardRecipe({ title, dotsMenu, table }) {
  return (
    <div>
        <RecipeTable thead={ table.thead } tbody={ table.tbody }/>
    </div>
  )
}
