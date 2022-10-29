import './button.styles.scss'

const Button = ({children, buttonType, ...otherProps}) => {
  /*
   * 3 types of buttons, control styling by change className
   * [default, inverted, google-style]
   *
   */
  const BUTTON_TYPES_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
  }
  return (
    <div>
      <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...otherProps}>
        {children}
      </button>
    </div>
  )
}

export default Button