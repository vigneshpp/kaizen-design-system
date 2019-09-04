import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import PageHeader from "../components/PageHeader"
import {
  Content,
  Sidebar,
  SidebarAndContent,
  SidebarTab,
} from "../components/SidebarAndContent"

const stripTrailingSlash = (str: string) => str.replace(/\/$/, "")

export default ({ data, pageContext, location }) => {
  const md = data.markdownRemark
  const allPages = data.allMarkdownRemark.edges
  const currentPath = location.pathname

  const GuidelinesPageHeader = (
    <PageHeader
      headingText={md.frontmatter.title}
      summaryParagraph={md.frontmatter.summaryParagraph}
      tags={[
        {
          text: "tag name",
          link: "",
        },
        {
          text: "tag 2",
          link: "",
        },
        {
          text: "other thing",
          link: "",
        },
        {
          text: "tag 67",
          link: "",
        },
        {
          text: "I love tags",
          link: "",
        },
      ]}
    />
  )

  return (
    <Layout
      pageTitle={md.frontmatter.title}
      currentPath={currentPath}
      pageHeader={GuidelinesPageHeader}
    >
      <SidebarAndContent>
        <Sidebar>
          {allPages.map(node => (
            <SidebarTab
              href={node!.node!.fields!.slug}
              active={
                stripTrailingSlash(node!.node!.fields!.slug) ===
                stripTrailingSlash(currentPath)
              }
            >
              {node!.node!.frontmatter!.navTitle}
            </SidebarTab>
          ))}
        </Sidebar>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: md.html }} />
        </Content>
      </SidebarAndContent>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "^/guidelines/" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            navTitle
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        summaryParagraph
      }
    }
  }
`

// <pre>data: {JSON.stringify(data)}</pre>
// <pre>pageContext: {JSON.stringify(pageContext)}</pre>
// <pre>location.pathname: {JSON.stringify(location)}</pre>
