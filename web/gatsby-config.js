require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
})

const isProd = process.env.NODE_ENV === "production"

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "bxkw0htn",
        dataset: "production",
        // token: process.env.SANITY_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
  ],
}
