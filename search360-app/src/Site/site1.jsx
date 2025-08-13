import React from "react";
import Menu from "./Componentes/menu"
import Banner from "./Componentes/banner"
import Precos from "./Componentes/precos"
import Avaliacao from "./Componentes/features"
import Testemunho from "./Componentes/testemunho"
import Footer from "./Componentes/footer"
import Galeria from "./Componentes/galeria";
function Site(){
    return <div className="bg-inicio">
       <Menu />
       <Banner />
       <Precos />
       <Testemunho />
       <Galeria />
       <Avaliacao />
       <Footer />
    </div>
}
export default Site;