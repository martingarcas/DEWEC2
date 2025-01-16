//npx tsc ej1.ts
let nombre: string = "Martin";
console.log(nombre);
const nameAgeMap: { [index: string]: number} = {};
nameAgeMap.Jack = 25; //no error
nameAgeMap.Mark = 50; //error: type 'string' is not assignable to type 'number'.
nameAgeMap[7] = 50;
