import React from "react"
import styles from "./dot.module.css"

const Dot = ({ slide, activeSlide, setActiveSlide }) => {
  return (
    <button
      className={`${styles.dot} ${activeSlide === slide ? styles.space : ""} ${
        activeSlide >= slide ? styles.white : ""
      }`}
      aria-expanded="false"
      onClick={() => setActiveSlide(slide)}
    >
      <svg
        viewBox="0 0 5 5"
        width="5"
        height="5"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="2.5" cy="2.5" r="2.5" />
      </svg>
      <span hidden className="srOnly">
        {`Go to slide ${slide}`}
      </span>
    </button>
  )
}

export default Dot
