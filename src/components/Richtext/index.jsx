import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import styles from "./richtext.module.scss"

const Richtext = ({ value, readOnly = false, contentOnly = false, onChange }) => {
  return (
    <ReactQuill
      value={value || ""}
      onChange={content => {
        onChange && onChange(content)
      }}
      readOnly={readOnly || contentOnly}
      modules={{
        toolbar: !contentOnly
      }}
      className={contentOnly ? styles.contentOnly : ""}
    />
  )
}
export default Richtext
