import React, { useEffect, useState, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { gsap, Draggable } from "gsap/all"
import styles from "./slider.module.css"
import Arrow from "./Arrow"

gsap.registerPlugin(Draggable)

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [dimensions, setDimensions] = useState({
    width: 590,
  })
  let outerRef = useRef(null)
  let sliderRef = useRef(null)

  useEffect(() => {
    gsap.to(sliderRef.current, {
      duration: 0.7,
      x: -(dimensions.width * activeSlide),
    })
  }, [activeSlide, dimensions])

  useEffect(() => {
    setDimensions({
      width: outerRef.current.clientWidth,
    })
  }, [])

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: outerRef.current.clientWidth,
      })
    }

    window.addEventListener("resize", handleResize)
    return (_) => {
      window.removeEventListener("resize", handleResize)
    }
  })

  const handleGoToPrevious = () => {
    setActiveSlide(activeSlide - 1)
  }

  const handleGoToNext = () => {
    setActiveSlide(activeSlide + 1)
  }

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

  const numberOfSlides = data.allSanitySlide.edges.length

  return (
    <div className={styles.container}>
      <div className={styles.outer} ref={outerRef}>
        <div
          style={{ width: `${dimensions.width * numberOfSlides}px` }}
          className={styles.inner}
          ref={sliderRef}
        >
          {data.allSanitySlide.edges.map(({ node: slide }, i) => (
            <Img
              key={i}
              fluid={slide.image.asset.fluid}
              style={{ width: `${dimensions.width}px` }}
            />
          ))}
        </div>
        <div className={styles.controlContainer}>
          <button
            className={`${styles.controlButton} ${styles.controlButtonLeft}`}
            onClick={handleGoToPrevious}
            disabled={activeSlide === 0}
          >
            <Arrow />
          </button>
          <button
            className={styles.controlButton}
            onClick={handleGoToNext}
            disabled={activeSlide === 3}
          >
            <Arrow />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Slider
