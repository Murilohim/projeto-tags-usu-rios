import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import { Footer } from "../components/Footer";

export const HomeSection = () => {
    return (
        <div className="flex flex-col items-center mt-6 lg:mt-10">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
                Faça o gerenciamento
                <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">{" "}de seus clientes</span>
            </h1>
            <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                Nosso site oferece uma solução completa para o gerenciamento de seus clientes. Com uma interface intuitiva e fácil de usar, você pode criar perfis de clientes, adicionar tags personalizadas para segmentação, atualizar informações do cliente conforme necessário e até mesmo remover perfis de clientes. Tudo isso em um único lugar, otimizando seu tempo e melhorando a eficiência de sua gestão de clientes.
            </p>
            <div className="flex justify-center my-10">
                <a href="/clientes" className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md">Comece agora</a>
                <a href="https://documenter.getpostman.com/view/17589027/2sA3XWby7Q" className="py-3 px-4 mx-3 rounded-md border" target="_blank">Documentação API</a>
            </div>
            <div className="flex mt-10 justify-center">
                <video
                    autoPlay
                    loop
                    muted
                    className="rounded-lg w-1/2 border border-orange-700 shadow-orange-400 mx-2 my-4"
                >
                    <source src={video1} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <video
                    autoPlay
                    loop
                    muted
                    className="rounded-lg w-1/2 border border-orange-700 shadow-orange-400 mx-2 my-4"
                >
                    <source src={video2} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <Footer />
        </div>
    )
}