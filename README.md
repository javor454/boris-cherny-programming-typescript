# Programming TypeScript - Boris Cherny

| Datum     | Přečtené stránky |
|-----------|------------------|
| 27.9.2023 | 29               |
| 4.10.2023 | 36               |
| 9.10.2023 | 53               |

| Úkoly       | Je hotovo |
|-------------|-----------|
| Github repo | ANO       |

## Poznámky

### Javascript

- **dynamic type binding** - typy zjistí za runtimu
- **slabě typovaný** - pokud udělám nevalidní operaci snaží se z kontextu odhadnout co chci udělat
	- `3 + [1] //"31"`
- vyhazuje chyby a provádí implicitní konverze typů za runtimu

### TypeScript

- **statická analýza kódu** - kontroluje kód za kompilace
- vyhazuje chyby v syntaxi a v typech za kompilace
- pokud používám inkrementálně kompilovaný jazyk (jako TS) mohou se zobrazit při psaní kódu

### Prostředí

- **tsc** = kompilátor
- **nodejs** = runtime prostředí
- **tsnode** = kompilace a spuštění v 1 kroku

### Typy

- **typ** = sada hodnot a akcí co s nimi můžu dělat
	- např. boolean
		- hodnoty: true, false
		- operace: ||, &&, !
- **nominální typování** - 2 proměnné jsou typově kompatibilní, pokud mají stejný typ
- **strukturální typování** - 2 proměnné jsou typově kompatibilní, pokud mají stejnou strukturu (TS)

#### `any`

- reprezentuje všechny hodnoty
- defaultní typ
- použivat jen pokud je opravdu nutné

#### `unknown`

- reprezentuje neznámou hodnotu, typescript mě donutí zjistit co to je za typ (pomocí typeof, instanceof apod)

#### `boolean`

- **type literal** = typ, který reprezentuje 1 hodnotu
	- `let a: true = true;`

#### `number`

- typ, který reprezentuje všechna čísla - celá, desetinná, kladná, záporná, `Infinity`, `NaN`
- operace -, +, *, /, % (modulo), <, >, <=, >= (porovnání)
- hodnota max 2^53
- [konstanty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON)
	- `Number.MAX_SAFE_INTEGER // (2^53-1)`
	- `Number.MIN_SAFE_INTEGER // -(2^53 - 1)`

#### `bigint`

- uchová čísla větší, než můžeme uložit do `number`
- pro dlouhá čísla použít oddělovač
	- `let milion: 1_000_000 = 1_000_000;`
- zápis možný pokud za číslo napíšu n
	- `console.log(9007199254740995n)`

#### `string`

- řetězec znaků

#### `symbol`

- objekt, jehož identita je unikátní
- není možné vytvořit dva stejné symboly
	- `Symbol("ahoj") === Symbol("ahoj") // false`

#### `object`

- typ říká, že hodnota je Javascriptový objekt a není primitivní typ
- lepší nepoužívat stejně jako typ `{}`
- **object literal (shape)** - zápis typu `let a: { b: number };`
- test: `make run object-literal`
- **definitive assignment** - nejdříve vytvoříme deklaraci typu, poté inicializujeme hodnotou
- test: `make run definitive-assignment`
- **index signature** - způsob, jak řeknu TS že může objekt obsahovat více klíčů nějakého typu
	- typ klíče musí být number nebo string

```ts
let a: { [key: string]: string } = {
	"ahoj": "nashle"
}
```

- neplést `object` a `Object` (JS objektový konstruktor)

#### Typové aliasy

- podobně jako proměnnou vytvářím alias pro hodnotu, typovým aliasem vytvářím alias pro typ
- stejně jako `let` a `const` mají typové aliasy **block-scope** -> alias zanořený ve vnitřím bloku má prioritu
- funkce a bloky mají vlastní scope
- test: `make run type-alias`

#### Sjednocení (UNION `|`) a Průnik (INTERSECTION `&`)

- Sjednocení: A nebo B nebo kombinace A a B
- Průnik: kombinace A a B
- test: `make run union-intersection`

#### Pole

- dynamická velikost - mohou růst nebo se zmenšovat dle potřeby
  - může vést k problémům s výkonem pokud často odebírám prvky ze začátku nebo prostředku pole -> v takovém případě je lepší použít **spojový seznam** nebo **Map**
- iterace - pomocí metod `for`, `forEach`, `map` nebo `filter` je obecně efektivní, avšak používání `for...in` a `for...of` může mít vliv na výkon vzhledem k tomu, že iterují přes **prototype chain** a nenumerické properties
- hledání - může být ve velkém neseřazeném poli problém, pro rychlejší lookup použít **Set** nebo **Map**
- https://www.npmjs.com/package/immutable
- zápis generického pole `T[]` nebo Array<T>
- BEST PRACTICE: udržovat pole homogenní (stejnorodé) - jinak bude třeba vynaložit více úsilí TS přesvědčit, že použití
  pole je bezpečné
- pokud nainicializuji proměnnoujako prázdné pole, TS mu přiřadí typ `any[]`, jakmile začnu přidávat elementy do pole TS
  typ pole rozšíří o typ vloženého elementu, jakmile pole upustí scope TS mu přiřadí finální typ, který již nejde
  rozšířit
- test: `make run arrays`

##### Tuples

- subtyp pole s fixní délkou, kde každý prvek má daný typ
  - `let a: [number] = [1];`
- podporuje optional elementy (`let optionalTuple: [number, number?];`)
- podporuje rest elementy - pole s minimálním počtem elementů (`let restTuple: [string, ..string[]]; // min 1 element`)
- mutující metoda `splice` umožňuje smazat z pole elementy
- nemutující metoda `concat` umožňuje mergnout 2 a více polí, vrátí nové pole
- nemutující metoda `slice` umožňuje vybrat subpole pomocí indexu začátečního a konečného elementu, vrátí nové pole
- podpora readonly pole
  - `let readonlyArray: readonly number[] = [1, 2, 3];`
  - `let readonlyArray: ReadonlyArray<string> = [1, 2, 3]`
  - `let readonlyArray: Readonly<string[]> = [1, 2, 3];`
  - `let readonlyArray: readonly [number, string] = [1, 'a'];`
-

## Prototype chain
- mechanismus, který umožňuje objektům podědit properties a metody jiných objektů
- každý objekt v JS má interní link na jiný objekt, který je jeho prototyp
  - tento objekt může mít taky prototyp -> takto objekty tvoří řetězec prototypů, který dosáhne nejvyšší úrovně objektu, kterým je `Object.prototype`
- když přistupují k property objektu, JS se nejdřív podívá zda tento objekt property nemá, pokud ne podívá se o úroveň výše v řetězci prototypů -> pokud v řetězci nenajde, vrátí `undefined`

#### `null`
- chybějící hodnota (snažil jsem se vypočítat ale nastala chyba)
	- žádoucí používat v tsconfigu `strictNullChecks`

#### `undefined`
- něco nebylo nadefinované

#### `void`
- návratový typ - nevracím nic

#### `never`
- návratový typ - nikdy nevrátím (narazím na chybu, nekonečný cyklus)

#### `enum`
- výpis hodnot, klíč => hodnota
- mapují:
  - string => string
  - string => number
- BEST PRACTICE: Klíče i hodnoty by měli být s velkým písmenem na začátku a v jednotném čísle
- přístup k hodnotám:
  - Enum.hodnota
  - Enum['hodnota']
- umožňuje rozdělit deklaraci, jazyk jí pak mergne

### Funkce
- nepoužívat `let a = new Function('par', 'return par + 1');`
  - typem a je `Function` - a je tedy callable (můžu zavolat pomocí a()), má všechny metody Function.prototype ale jeho parametry a návratový typ jsou neotypované
- **parametry** jsou součástí deklarace funkce - data která potřebují k provolání
- **argument** jsou data, se kterými provolávám funkci
- podpora výchozích a nepovinných hodnot
- provolání možné pomocí metod `apply`, `call`, `bind` (vrací novou funkci kterou mohu provolat pomocí ())
- `this` proměnná je definovaná pro každou funkci, má jinou hodnotu podle toho jak provolám funkci
  - obecně `this` pojme hodnotu na levo od tečky když provolávám funkci

#### Generátory
- lazy generování hodnot - vypočítají další hodnotu pokud si o ní řeknu

#### Rest parametry
- arguments - magický objekt zapouzdřující argumenty funkce
  - umožňuje iterovat nad dynamickým množstvím argumentů
  - nebezpečné - argumenty jsou v neotypované
- rest parametr `...numbers: number[]` umožňuje použití dynamického množství argumentů bezpečně

