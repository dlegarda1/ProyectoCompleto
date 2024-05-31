import React    from 'react';
import estilos from "../Estilos/inicio.module.css";

const Inicio = () => {
    return (
        <div className={estilos.main}>
            <h1>Inicio</h1>
            <p>Bienvenido a la página de inicio</p>
            <div className={estilos.contenedor}>
                
                <div className={estilos.personajes}>
                    
                <img  src="/Ester.jpg" alt="Imagen de inicio" />
                <h3>Ester</h3>                
                <p>Ester es una heroína bíblica del Antiguo Testamento, conocida por su valentía y astucia para salvar al pueblo judío de la destrucción. Su historia se encuentra en el libro de Ester en la Biblia. Ester era una joven judía que se convirtió en reina de Persia después de ganar un concurso de belleza organizado por el rey Asuero (Jerjes I). A pesar de las circunstancias difíciles, Ester demostró coraje al interceder ante el rey para salvar a su pueblo del plan de exterminio de Amán, un oficial persa. Su historia es un ejemplo de cómo la fe y la valentía pueden tener un impacto significativo en el cumplimiento de los propósitos divinos.</p>
                </div>
                <div className={estilos.personajes}>
                <img  src="/Jose.jpg" alt="Imagen de inicio" />
                <h3>José</h3>                
                <p>José es un personaje bíblico del Antiguo Testamento, hijo de Jacob y Raquel. Es conocido por su historia narrada en el libro de Génesis. José fue vendido como esclavo por sus hermanos, pero eventualmente se convirtió en un líder en Egipto después de interpretar los sueños del faraón. Su historia es un relato de fe, perdón y providencia divina, y muestra cómo Dios puede usar incluso las circunstancias más adversas para cumplir sus propósitos.</p>
                </div>
                <div className={estilos.personajes}>
                <img  src="/Abraham.jpg" alt="Imagen de inicio" />
                <h3>Abraham</h3>                
                <p>Abraham es un personaje bíblico fundamental del Antiguo Testamento, considerado el patriarca del pueblo de Israel y un modelo de fe en Dios. Su historia se narra en varios libros de la Biblia, especialmente en Génesis. Abraham es conocido por su llamado divino para dejar su tierra natal y dirigirse a la tierra que Dios le mostraría. A lo largo de su vida, Abraham demostró una fe inquebrantable en Dios, incluso en medio de desafíos y pruebas difíciles, como la promesa de un hijo en su vejez y la disposición de sacrificar a su hijo Isaac. Su obediencia y confianza en Dios le valieron el título de "amigo de Dios" y su historia es un ejemplo inspirador de la importancia de la fe y la obediencia en la relación con Dios.</p>
                </div>                  
            </div>
            
        </div>
    );
}

export default Inicio;
