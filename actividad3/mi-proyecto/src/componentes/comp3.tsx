type Props={
    enunciado: string;
};

export default function Enunciado({enunciado}: Props){
    return(
        <section>
            <p>
                {enunciado}
            </p>
        </section>
    )
}