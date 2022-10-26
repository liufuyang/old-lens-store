import CategoryItem from "../category-item/category-item.components";
import './directory.styles.scss'

const Directory = ({categories}) => {
  return (
    <div className={"directory-container"}>
      {categories.map((c) =>
        <CategoryItem key={c.id} category={c}/>
      )}
    </div>
  )
}

export default Directory;