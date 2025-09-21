type Props={
    titulo: string;
};

export default function Titulo({titulo}: Props){
    return (
        //Modifico la etiqueta para que el titulo aparezca con una fuente mas grande, en negrita y centrado
        //text-4xl --> Fuente
        //font-bold --> negrita
        //text-center --> centrar
        //underline --> Subrayado
        <h1 className="underline text-4xl font-bold text-center">{titulo}</h1>  
    )
}