import  './category-item.styles.scss'

const CategoryItem = ({category}) => {
  return (
    <div className={"category-container"}>
      <div className={"background-image"} style={{
        // the javascript object here will be translated to html style value like `background-image: ...`
        backgroundImage: `url(${category.imageUrl})`
      }}></div>
      <div className={"category-body-container"}>
        <h2>{category.title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  )
}

export default CategoryItem;