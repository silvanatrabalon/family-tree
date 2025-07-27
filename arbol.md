# Árbol Genealógico - Tabla de Personas

| "id"     | "pids"                       | "nombre"                           | "gender" | "fid"     | "mid"     | "nacimiento" | "Descendientes"     | "tags"                   |
|----------|------------------------------|------------------------------------|----------|-----------|-----------|---------------|----------------------|--------------------------|
| "_d0il"  | ["_42bq"]                    | "Maria Inisida Fernandez Gonzalez" | "female" | ""        | ""        | ""            | ""                   | ["Descendientes", "0"]   |
| "_42bq"  | ["_d0il", "_7wme"]           | "Rosendo Meana Cueto"              | "male"   | ""        | ""        | ""            | ""                   | ["Descendientes", "0"]   |
| "_pjrh"  | ["_1ach", "_t3an"]           | "Leonarda"                         | "female" | "_42bq"   | "_d0il"   | ""            | "Leonarda"           | ["Descendientes", "1"]   |
| "_30k8"  | []                           | "Jose"                             | "male"   | "_42bq"   | "_d0il"   | ""            | "Jose"               | ["Descendientes", "2"]   |
| "_vcyx"  | []                           | "Marino"                           | "male"   | "_d0il"   | "_42bq"   | ""            | "Marino"             | ["Descendientes", "3"]   |

Ejemplo de pareja agregada en sheet:

"_d9rk"	["_vcyx"]	esposa de marino	female			123	Marino	["Descendientes","3"]