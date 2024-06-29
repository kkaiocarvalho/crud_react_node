import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    *{
    margin: 0;
    padding: 0;
}
    body{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color:#F2F2F2;
    }
`

export default GlobalStyle