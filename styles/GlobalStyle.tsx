import reset from "styled-reset";
import { createGlobalStyle, css } from "styled-components";
import pallete from "./pallete";

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Airbnb Cereal, sans-serif;
    color: ${pallete.black};
  }

  @font-face {
    font-family: Airbnb Cereal;
    font-weight: 400;
    font-display: swap;
    src: url("/fonts/AirbnbCerealBook.woff2") format("woff2"),
      url("/fonts/AirbnbCerealBook.woff") format("woff2");
  }

  @font-face {
    font-family: Airbnb Cereal;
    font-weight: 600;
    font-display: swap;
    src: url("/fonts/AirbnbCerealMedium.woff2") format("woff2"),
      url("/fonts/AirbnbCerealMedium.woff") format("woff");
  }
  @font-face {
    font-family: Airbnb Cereal;
    font-weight: 700;
    font-display: swap;
    src: url("/fonts/AirbnbCerealBold.woff2") format("woff2"),
      url("/fonts/AirbnbCerealBold.woff") format("woff");
  }
  @font-face {
    font-family: Airbnb Cereal;
    font-weight: 800;
    font-display: swap;
    src: url("/fonts/AirbnbCerealExtraBold.woff2") format("woff2"),
      url("/fonts/AirbnbCerealExtraBold.woff") format("woff");
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle};
`;

export default GlobalStyle;
