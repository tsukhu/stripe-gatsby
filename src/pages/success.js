import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Yes the purchase was a success</h1>
    <p>Congratulations !!</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
