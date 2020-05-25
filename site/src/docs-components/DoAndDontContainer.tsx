import classnames from "classnames"
import * as React from "react"

const styles = require("./DoAndDontContainer.scss")

export default ({ children }) => (
  <div className={styles.container}>{children}</div>
)
