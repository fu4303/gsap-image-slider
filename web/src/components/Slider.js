import React, { useEffect, useState, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
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
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            width="100%"
            height="100%"
          >
            <path d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" />
          </svg>
        </button>
        <button
          className={`${styles.controlButton} ${styles.controlButtonRight}`}
          onClick={handleGoToNext}
          disabled={activeSlide === numberOfSlides - 1}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            width="100%"
            height="100%"
          >
            <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
          </svg>
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
