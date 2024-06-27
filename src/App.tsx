import { BrowserRouter } from "react-router-dom";
import { Layout, MainContent } from "./styles/common";
import Routes from "./routes";
import Header from "./organisms/header";
import Footer from "./organisms/footer";
import "./fonts.css";
import "./default.css";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <MainContent>
                    <Header />
                    <Routes />
                    <Footer />
                </MainContent>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
