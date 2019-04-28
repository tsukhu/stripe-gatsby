import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from '../components/layout'

class Product extends React.Component {
  /*   constructor() {
    this.handleSubmit.bind(this);
  } */

  componentDidMount() {
    this.stripe = window.Stripe("pk_test_mu6S6VL4flxLGXYdvCcjhSUS00yNSJW447")
  }

  handleSubmit(sku) {
    return event => {
      event.preventDefault()
      this.stripe
        .redirectToCheckout({
          items: [{ sku, quantity: 1 }],

          // Note that it is not guaranteed your customers will be redirected to this
          // URL *100%* of the time, it's possible that they could e.g. close the
          // tab between form submission and the redirect.
          successUrl: "http://localhost:8000/success",
          cancelUrl: "http://localhost:8000/canceled",
        })
        .then(function(result) {
          if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            //  var displayError = document.getElementById("error-message")
            // displayError.textContent = result.error.message
            console.log(result.error.message)
          }
        })
    }
  }

  render() {
    const { id, currency, price, name } = this.props
    const priceFloat = (price / 100).toFixed(2)
    const formattedPrice = new Intl.NumberFormat("en-us", {
      style: "currency",
      currency,
    }).format(priceFloat)
    return (
      <form onSubmit={this.handleSubmit(id)}>
        <h2>
          {name} ({formattedPrice})
        </h2>
        <button type="submit">Buy Now</button>
      </form>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      {
        allStripeSku {
          edges {
            node {
              id
              price
              currency
              image
              attributes {
                name
              }
            }
          }
        }
      }
    `}
    render={data => (
        <Layout>
        {data.allStripeSku.edges.map(({node: sku})=>(
            <Product 
                id={sku.id}
                currency={sku.currency}
                price={sku.price}
                name={sku.attributes.name}
            />

        ))}
         </Layout>

    )}
  />
)

