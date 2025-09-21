import Image from "next/image";

export default function Imagen(){
    return(
        //mt-8 --> agrega margen superior a "Imagen de Prueba"
        <figure>
            <h2 className="text-2xl mt-8"> Imagen de Prueba </h2>
            <Image 
                src="/imagenPrueba.png"
                alt=""
                width={300}
                height={300}
            />
        </figure>
    )
}