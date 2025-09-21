type Props={
    comentario: string;
};

export default function Comentario({comentario}: Props){
    return( 
        <h2 className="text-2xl mt-8">{comentario}</h2>
    )
}