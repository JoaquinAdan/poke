import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
 
const Pokemon = ({ data }) => {
    const router = useRouter()
    console.log(router)

    if (router.isFallback) {
        return <p>Cargando...</p>
    }
    return (
        <div>
            <h1>{data.name} número #{data.id}</h1>
            <Image src={data.sprites.front_default} width={200} height={200} />
            {/* <Link href={`/pokemones/${data.id == 1 ? data.id : data.id-1}`}>anterior    </Link>
            <Link href={`/pokemones/${data.id == 151 ? data.id : data.id+1}`}>Siguiente</Link><br/> */}
            <Link href="/">Volver al inicio</Link><br/>
            {/* <img src={data.sprites.back_default} />
            <img src={data.sprites.back_shiny} />
            <img src={data.sprites.front_default} />
            <img src={data.sprites.front_shiny} /> */}
        </div>
    )
}

export default Pokemon

export const getStaticProps = async ({ params }) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()

    return { props: { data } }
}

export const getStaticPaths = async () => {
    const paths = [
        { params: { id: '1' } },
        { params: { id: '2' } },
    ]
    return {
        paths,
        fallback: true, // true, false, 'blocking'
    }
}

// export const getServerSideProps = async ({ params }) => {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
//     const data = await response.json()

//     return { props: { data } }
// }