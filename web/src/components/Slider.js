import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { gsap, Draggable } from "gsap/all"

gsap.registerPlugin(Draggable)

const Slider = () => {
  const data = useStaticQuery(graphql`
    {
      allSanitySlide {
        edges {
          node {
            image {
              asset {
                fluid {
                  ...GatsbySanityImageFluid
                }
              }
            }
            caption
          }
        }
      }
    }
  `)
  return (
    <div>
      {data.allSanitySlide.edges.map(({ node: slide }, i) => (
        <Img fluid={slide.image.asset.fluid} />
      ))}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Slider
