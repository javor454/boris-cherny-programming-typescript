# Programming TypeScript - Boris Cherny

| Datum     | Přečtené stránky |
|-----------|------------------|
| 27.9.2023 | 29               |

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

- zápis generického pole `T[]` nebo Array<T>
- BEST PRACTICE: udržovat pole homogenní (stejnorodé) - jinak bude třeba vynaložit více úsilí TS přesvědčit, že použití
  pole je bezpečné
- pokud nainicializuji proměnnoujako prázdné pole, TS mu přiřadí typ `any[]`, jakmile začnu přidávat elementy do pole TS
  typ pole rozšíří o typ vloženého elementu, jakmile pole upustí scope TS mu přiřadí finální typ, který již nejde
  rozšířit
- test: `make run arrays`
