

const settings = {
  imagenes: [
    { 
      nombre: "bienvenida", 
      recurso: "assets/images/bienvenida.jpeg" 
    },
    { 
      nombre: "logo-unamba", 
      recurso: "assets/images/logo-unamba.png" 
    },
    { 
      nombre: "logo-educacion", 
      recurso: "assets/images/logo-educacion.png" 
    },
    { 
      nombre: "btn_nivel_1", 
      recurso: "assets/buttons/btn_nivel_1.png" 
    },
    { 
      nombre: "btn_nivel_2", 
      recurso: "assets/buttons/btn_nivel_2.png" 
    },
    { 
      nombre: "btn_nivel_3", 
      recurso: "assets/buttons/btn_nivel_3.png" 
    },
    { 
      nombre: "calcular", 
      recurso: "assets/buttons/calcular.png" 
    },
    { 
      nombre: "siguiente", 
      recurso: "assets/buttons/siguiente.png" 
    },
    {
      nombre: "popup",
      recurso: "assets/images/popup.png"
    },
    {
      nombre: "ecenario1",
      recurso: "assets/images/ecenario1.jpg"
    },
    {
      nombre: "ecenario2",
      recurso: "assets/images/ecenario2.jpg"
    },
    {
      nombre: "ecenario3",
      recurso: "assets/images/ecenario3.jpg"
    },
    {
      nombre: "cuerda_principal",
      recurso: "assets/sprites/cuerdas/cuerda_principal.png"
    },
    { 
      nombre: "mas", 
      recurso: "assets/sprites/operacion/mas.png" 
    },
    { 
      nombre: "igual", 
      recurso: "assets/sprites/operacion/igual.png" 
    },
    { 
      nombre: "marco", 
      recurso: "assets/images/marco.png" 
    },
  ],

  cuerdas: [
    { 
      nombre: "cuerda_naranja", 
      recurso: "assets/sprites/cuerdas/cuerda_naranja.png" 
    },
    { 
      nombre: "cuerda_azul", 
      recurso: "assets/sprites/cuerdas/cuerda_azul.png" 
    },
    { 
      nombre: "cuerda_amarillo", 
      recurso: "assets/sprites/cuerdas/cuerda_amarillo.png" 
    },
    { 
      nombre: "cuerda_verde", 
      recurso: "assets/sprites/cuerdas/cuerda_verde.png" 
    },
  ],

  figuras: {
    
    frutas: [
      { 
        nombre: "freza", 
        recurso: "assets/sprites/frutas/freza.png" 
      },
      { 
        nombre: "manzana", 
        recurso: "assets/sprites/frutas/manzana.png" 
      },
      { 
        nombre: "naranja", 
        recurso: "assets/sprites/frutas/naranja.png" 
      },
      { 
        nombre: "pera", 
        recurso: "assets/sprites/frutas/pera.png" 
      },
      { 
        nombre: "platano", 
        recurso: "assets/sprites/frutas/platano.png" 
      },
      { 
        nombre: "uva", 
        recurso: "assets/sprites/frutas/uva.png" 
      },
      { 
        nombre: "zandia", 
        recurso: "assets/sprites/frutas/zandia.png" 
      },
    ],
    
    geometricas: [
      { 
        nombre: "circulo", 
        recurso: "assets/sprites/figuras/circulo.png" 
      },
      { 
        nombre: "cuadrado", 
        recurso: "assets/sprites/figuras/cuadrado.png" 
      },
      { 
        nombre: "rectangulo", 
        recurso: "assets/sprites/figuras/rectangulo.png" 
      },
      { 
        nombre: "rombo", 
        recurso: "assets/sprites/figuras/rombo.png" 
      },
      { 
        nombre: "trapecio", 
        recurso: "assets/sprites/figuras/trapecio.png" 
      },
      { 
        nombre: "triangulo", 
        recurso: "assets/sprites/figuras/triangulo.png" 
      },
    ],

    animales: [
      { 
        nombre: "cerdo", 
        recurso: "assets/sprites/animales/cerdo.png" 
      },
      { 
        nombre: "conejo", 
        recurso: "assets/sprites/animales/conejo.png" 
      },
      { 
        nombre: "cuy", 
        recurso: "assets/sprites/animales/cuy.png" 
      },
      { 
        nombre: "gallina", 
        recurso: "assets/sprites/animales/gallina.png" 
      },
      { 
        nombre: "gato", 
        recurso: "assets/sprites/animales/gato.png" 
      },
      { 
        nombre: "pato", 
        recurso: "assets/sprites/animales/pato.png" 
      },
      { 
        nombre: "perro", 
        recurso: "assets/sprites/animales/perro.png" 
      },
      { 
        nombre: "vaca", 
        recurso: "assets/sprites/animales/vaca.png" 
      },
    ],
    
    manos: [
      { 
        nombre: "cero", 
        recurso: "assets/sprites/manos/0.png" 
      },
      { 
        nombre: "uno", 
        recurso: "assets/sprites/manos/1.png" 
      },
      { 
        nombre: "dos", 
        recurso: "assets/sprites/manos/2.png" 
      },
      { 
        nombre: "tres", 
        recurso: "assets/sprites/manos/3.png" 
      },
      { 
        nombre: "cuatro", 
        recurso: "assets/sprites/manos/4.png" 
      },
      { 
        nombre: "cinco", 
        recurso: "assets/sprites/manos/5.png" 
      },
    ],
  },

  audios: [
    { 
      nombre: "correcto", 
      recurso: "assets/audio/correcto.ogg" 
    },
    { 
      nombre: "error", 
      recurso: "assets/audio/error.ogg" 
    },
    { 
      nombre: "bub", 
      recurso: "assets/audio/bub.ogg" 
    },
    {
      nombre: "numeros", 
      recurso: "assets/audio/numeros.ogg",
      spritemap: {
        "1": { start: 2, end: 3, loop: false },
        "2": { start: 4, end: 5.5, loop: false },
        "3": { start: 6.5, end: 7.5, loop: false },
        "4": { start: 8.5, end: 10, loop: false },
        "5": { start: 11, end: 12.5, loop: false },
        "6": { start: 13, end: 14.5, loop: false },
        "7": { start: 16, end: 17, loop: false },
        "8": { start: 18.5, end: 20, loop: false },
        "9": { start: 21, end: 22, loop: false },
        "10": { start: 23, end: 24, loop: false },
      }
    }
  ]

}


export default settings