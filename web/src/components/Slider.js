import React, { useEffect, useState, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import Arrow from "./Arrow"
import Dot from "./Dot"
import styles from "./slider.module.css"

const Slider = () => {
  const outerRef = useRef(null)
  const sliderRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [dimensions, setDimensions] = useState({
    width: null,
  })

  useEffect(() => {
    setDimensions({
      width: outerRef.current.clientWidth,
    })
  }, [])

  useEffect(() => {
    gsap.registerPlugin(Draggable)
    Draggable.create(sliderRef.current, {
      type: "x",
      edgeResistance: 0.9,
      bounds: outerRef.current,
      onDragEnd: function () {
        if (this.endX < this.startX) {
          handleGoToNext()
        }
        if (this.endX > this.startX) {
          handleGoToPrevious()
        }
      },
    })
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

  useEffect(() => {
    gsap.to(sliderRef.current, {
      duration: 0.5,
      x: -(dimensions.width * activeSlide),
    })
  }, [activeSlide, dimensions])

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
        <button
          className={`${styles.controlButton} ${styles.controlButtonLeft}`}
          onClick={handleGoToPrevious}
          disabled={activeSlide === 0}
        >
          <Arrow />
        </button>
        <button
          className={`${styles.controlButton} ${styles.controlButtonRight}`}
          onClick={handleGoToNext}
          disabled={activeSlide === numberOfSlides - 1}
        >
          <Arrow />
        </button>
        <div className={styles.dotsContainer}>
          {Array.from(Array(numberOfSlides)).map((_x, i) => (
            <Dot
              key={i}
              slide={i}
              activeSlide={activeSlide}
              setActiveSlide={setActiveSlide}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Slider
