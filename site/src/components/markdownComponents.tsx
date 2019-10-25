import { Icon } from "@cultureamp/kaizen-component-library"
import * as React from "react"
const linkIcon = require("./images/link.icon.svg").default

export default {
  p: (props: any) => <p className={"md-p"} {...props} />,
  h1: (props: any) => (
    <h1 className={"md-h1"} {...props}>
      {createAnchor(props.children)}
      {props.children}
    </h1>
  ),
  h2: (props: any) => (
    <h2 className={"md-h2"} {...props}>
      {createAnchor(props.children)}
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 className={"md-h3"} {...props}>
      {createAnchor(props.children)}
      {props.children}
    </h3>
  ),
  h4: (props: any) => (
    <h4 className={"md-h4"} {...props}>
      {createAnchor(props.children)}
      {props.children}
    </h4>
  ),
  h5: (props: any) => (
    <h5 className={"md-h5"} {...props}>
      {createAnchor(props.children)}
      {props.children}
    </h5>
  ),
  h6: (props: any) => (
    <h6 className={"md-h6"} {...props}>
      {createAnchor(props.children)}
      {props.children}
    </h6>
  ),
  blockquote: (props: any) => (
    <blockquote className={"md-blockquote"} {...props} />
  ),
  ul: (props: any) => <ul className={"md-ul"} {...props} />,
  ol: (props: any) => <ol className={"md-ol"} {...props} />,
  li: (props: any) => <li className={"md-li"} {...props} />,
  table: (props: any) => <table className={"md-table"} {...props} />,
  tr: (props: any) => <tr className={"md-tr"} {...props} />,
  td: (props: any) => <td className={"md-td"} {...props} />,
  th: (props: any) => <th className={"md-th"} {...props} />,
  pre: (props: any) => <pre className={"md-pre"} {...props} />,
  code: (props: any) => <code className={"md-code"} {...props} />,
  em: (props: any) => <em className={"md-em"} {...props} />,
  strong: (props: any) => <strong className={"md-strong"} {...props} />,
  hr: (props: any) => <hr className={"md-hr"} {...props} />,
  a: (props: any) => <a className={"md-a"} {...props} />,
  img: (props: any) => <img className={"md-img"} {...props} />,
}

/**
 * Creates an anchor + a clickable link for a heading, using the heading's children prop to generate an ID for the anchor
 * Children should usually just be a string, but we also need to cover cases where there's something like a bold tag which creates a tree of React nodes.
 */
const createAnchor = (headingChildren: any): React.ReactNode => {
  if (headingChildren) {
    const title = getInnerText(headingChildren)

    if (title) {
      const id = title
        .replace(/[^A-Za-z0-9_ -&/]/g, "") // remove anything that isn't alphanumeric, with a few exceptions
        .trim()
        .replace(/\s+/g, "-") // replace white spaces with hyphens
        .toLowerCase()

      return (
        <>
          <a id={id} className={`md-anchor`} aria-hidden="true" />
          <a href={`#${id}`} className={`md-anchor-link`}>
            <Icon icon={linkIcon} role="img" title="Anchor" />
          </a>
        </>
      )
    }
  }

  return
}

/**
 * Get innerText for React children.
 * (We need this 'cause we don't have the ability to reference elements and use JS innerText)
 */
const getInnerText = (children: any): string | undefined => {
  if (typeof children === "string") {
    return children
  }

  if (Array.isArray(children)) {
    return children
      .map((node: any) => {
        if (typeof node === "string") {
          return node
        } else if (node.props.children) {
          return getInnerText(node.props.children)
        }
      })
      .join(" ")
  }

  return
}
