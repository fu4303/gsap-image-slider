import React from "react"
import styles from "./dot.module.css"

const Dot = ({ slide, activeSlide, setActiveSlide }) => {
  return (
    <button
      className={styles.dot}
      aria-expanded="false"
      onClick={() => setActiveSlide(slide)}
    >
      {activeSlide === slide ? (
        <svg
          width="10"
          height="10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.25 5a4.25 4.25 0 11-8.5 0 4.25 4.25 0 018.5 0z"
            stroke="#ffffff"
            stroke-width="1.5"
          />
        </svg>
      ) : (
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10Z" />
        </svg>
      )}
      <span hidden className="srOnly">
        {`Go to slide ${slide}`}
      </span>
    </button>
  )
}

export default Dot
