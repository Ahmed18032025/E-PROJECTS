import { Footer } from "../../components/Footer/Footer.jsx"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Header from "../../components/Header/Hearder.jsx"
import "./style.css";
import Main from "./main.jsx";


export const Home = ()=>{
    return(
        <>

        <Navbar />
        <Header />
        <main>
            <div className="banner">
                <div className="background">
    
                    <h1 className="titleTag">Eccho Store</h1>
                    <p className="tagLine">Get Every Item @ 50% OFF</p>
                  
                </div>
            </div>
        </main>

        {/* <Collection /> */}
        <Main />
      
  

        <Footer />
        </>
    )
}
