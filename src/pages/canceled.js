import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Your purchase was canceled</h1>
    <p>Better luck next time</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
