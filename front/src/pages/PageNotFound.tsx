

export const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center mt-6 lg:mt-10">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
                Página não encontrada
            </h1>
            <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                A página que você está procurando não existe. Verifique o endereço digitado e tente novamente.
            </p>
            <div className="flex justify-center my-10">
                <a href="/" className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md">Voltar para a página inicial</a>
            </div>
        </div>
    )
}