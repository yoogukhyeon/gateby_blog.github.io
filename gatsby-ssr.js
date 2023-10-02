/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `ko` });
};

exports.onrenderbody = ({ setheadcomponents }, pluginoptions) => {
  setheadcomponents([
    <script
      src="https://code.jquery.com/jquery-3.4.1.min.js"
      integrity="sha256-csxorxvzctkaix6yvo6hppczgetbymgwsflbw8hfcjo="
      crossorigin="anonymous"
    ></script>,
  ]);
};
