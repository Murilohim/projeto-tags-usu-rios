import sobre from '../assets/sobre.jpg'
import { Footer } from '../components/Footer'

export const AboutSection = () => {
    return (
        <div className="flex flex-col items-center mt-4 lg:mt-4">
            <h1 className="text-4xl sm:text-6xl lg:text-6xl text-center tracking-wide">
                A empresa
                <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">{" "}ClientTrackr</span>
            </h1>
            <img src={sobre} alt="Sobre" className="rounded-lg border border-orange-700 shadow-orange-400 mx-2 my-8 lg:w-1/2"
            />

            <p className=" text-lg text-center text-neutral-500 max-w-4xl">
                A ClientTrackr é uma empresa de tecnologia que oferece soluções inovadoras para o gerenciamento de clientes. Nossa equipe é formada por profissionais altamente qualificados e experientes, prontos para atender às necessidades de nossos clientes e oferecer suporte personalizado. Com uma abordagem centrada no cliente, buscamos sempre superar as expectativas de nossos clientes e garantir sua satisfação.
            </p>
            <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                Nossa solução de gerenciamento de clientes é desenvolvida com base nas melhores práticas do mercado e nas mais recentes tecnologias disponíveis. Com uma interface intuitiva e fácil de usar, nossa plataforma permite que você gerencie seus clientes de forma eficiente e eficaz, economizando tempo e recursos. Além disso, oferecemos suporte técnico especializado e treinamento personalizado para garantir que você aproveite ao máximo nossa solução.
            </p>
            <Footer />
        </div >
    )
}