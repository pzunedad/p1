# Práctica 1 Front 25/26 Pedro Zuñeda Diego

Esta práctica implementa una aplicación web utilizando React consumiendo datos de la SWAPI (Star Wars API), permitiendo listar personajes en tarjetas, gestionar los estados de espera y error, y permitir cargar más resultados mediante paginación.

## Prerrequisitos

Para ejecutar este proyecto necesitas tener instalado:

- NODE
- npm
- axios
Para instalar axios solo tienes que escribir en la ruta de tu proyecto en la terminal este comando:

```bash
npm install axios
```
 Axios utiliza la API de Star Wars(SWAPI) en la cual en api.ts, crea un cliente Axios con baseURL desde VITE_API_URL (que aqui se utiliza en un archivo.env no visible que contiene la URL base de la API).

 ```bash
 https://swapi.dev/api
 ```

## Compilación y Ejecución

### Compilación

Para poder compilar y ejecutar se hace el uso en terminal del comando con el cual no podriamos ver la pagina web si no utilizamos el comando

 ```bash
 npm run dev
 ```
Despues de hacer este comando te deja abrir la pagina web de forma local en un localhost con puerto 5173

```bash
http://localhost:5173
```

## Problemas detectados y soluciones propuestas

- En paginación acumulada solo se añade 1 personaje por página
En App.tsx, cuando acumular es true, se hace:
```bash
setCharacters(prev => [...prev, e.data.results[0]])
```
por lo que agrega solo el primer elemento en este caso seria Anakin Skywalker.

- Tipado de datos en CharacterT gracias a quickType haciendolo de forma rápida y mas segura que ChatGPT
Pasandole el JSON de la API, te tipa los datos.
```bash
https://app.quicktype.io/

export type Welcome = {
    name:       string;
    height:     string;
    mass:       string;
    hair_color: string;
    skin_color: string;
    eye_color:  string;
    birth_year: string;
    gender:     Gender;
    homeworld:  string;
    films:      string[];
    species:    string[];
    vehicles:   string[];
    starships:  string[];
    created:    Date;
    edited:     Date;
    url:        string;
}

NOTA: gender lo cambie a string
```
<img width="916" height="478" alt="image" src="https://github.com/user-attachments/assets/54c06c6c-7f72-43ea-86c5-08f772f28e7a" />

- A la hora de crear los estados, estuve un rato dandole vueltas a la cabeza para saber cuantos estados hacer, los cuales se quedaron en estos 5 y de ahi ya hice todo lo demás.

```bash
 const [page, setPage] = useState<string>("1");
  const [characters, setCharacters] = useState<CharacterT[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [next, setNext] = useState<string | null>(null);
```


