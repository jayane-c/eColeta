import Barra_de_navegacao from '../../Components/Barra-de-navegacao/barra-de-navegacao'
import './home.css'
import '../../CSS/global.css'
<<<<<<< HEAD:frontend/src/Pages/home/home.tsx
import Card_morador from '../../Components/Card-morador/card-morador'
import Card_coletor from '../../Components/Card-coletor/card-coletor'
import Card_cooperativa from '../../Components/Card-cooperativa/card-cooperativa'
=======
import Card_morador from '../Card-morador/card-morador'
import Card_coletor from '../Card-coletor/card-coletor'
import Card_cooperativa from '../Card-cooperativa/card-cooperativa'
import Hero from '../Hero/hero'
//import Como_funciona from '../Como-funciona/como-funciona'

>>>>>>> d96e670d77c924fd8703fa74f87fc274dc56a5af:frontend/src/Components/Home/home.tsx


export default function Home() {
    return (
        <>
            <Barra_de_navegacao />

            <div className="home-container">
                <section className='hero'>
                    <Hero/>

                </section>
                <section className='cads'>
                    <Card_morador />
                    <Card_coletor />
                    <Card_cooperativa />


                </section>

               {/* <section className='Como-funciona-container'>
                    <Como_funciona/>

                </section>*/}
            </div>
        </>
    )
}
