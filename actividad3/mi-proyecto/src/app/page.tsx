import Titulo from "@/componentes/comp1";
import Comentario from "@/componentes/comp2";
import Enunciado from "@/componentes/comp3";
import Imagen from "@/componentes/comp4";

export default function Home() {
  return ( 
    //bg-gray-100 --> Fondo gris claro
    //min-h-screen --> Ocupa toda la pantalla
    <main className="bg-gray-100 min-h-screen">
      <Titulo titulo = "ACTIVIDAD 3"/>
      <Comentario comentario = "Esta es la actividad 3"/>
      <Enunciado enunciado="La idea ahora es, en una nueva rama llamada 'actividad3': inicializar un proyecto de Next.js. Luego, crear un archivo dentro de la carpeta 'app', llamado 'page.tsx' y dentro de eso exportar un componente (por default), con el contenido que el alumno quiera. Tienen una lista de etiquetas en el siguiente link
        https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements.
        Idealmente utilizar varios componentes.
        Luego profundizaremos mas en esta parte."
      />
      <Imagen/>
    </main>
  );
}
