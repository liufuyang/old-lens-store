import './form-input.styles.scss'

const FormInput = ({label, ...otherProps}) => {
  return (
    <div className={'group'}>
      {/* move input above label so the css can make label shrink when input is clicked/focused */}
      <input className={'form-input'} {...otherProps}/>
      {
        label && (
          <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
        )
      }
    </div>
  )
}

export default FormInput;