# Exercices Webpack

## 1 - Utilisation de bibliothèques externes

Installer la bibliothèque `moment` avec npm ou Yarn en `dependencies`

(Notons que cette bibliothèque n'est pas recommandée pour des nouveaux projets)

Dans le code de `horloge.js`, importer moment :

```js
import moment from 'moment';
```

(Notons que cet import fonctionne avec la même convention que dans Node.js, si vous regardez dans `node_modules/moment` vous verrez également que moment n'est pas exportée en ESM)

puis remplacer la ligne :

```js
this._container.innerText = now.toLocaleTimeString();
```

par :

```js
this._container.innerText = moment(now).format('HH:mm:ss');
```

Le code fonctionne toujours.

## 2 - Config au format JSON

Créer un fichier `src/js/config.json` et y ajouter la config suivante :

```json
{
  "timeFormat": "HH:mm:ss"
}
```

Dans `horloge.js` importer cette config :

```js
import config from './config';
```

Remarquez que `config` est un objet et remplacer la ligne où l'heure est formattée par la valeur présente dans la config.

## 3 - Config au format JSON5

Remplacer la config par :

```json5
{
  "timeFormat": "HH:mm:ss" // le format de l'horloge
}
```

Webpack supporte les fichiers `.json` par défaut et les transforme en objet.

Le problème du JSON :
- pas de commentaires,
- pas de single quotes,
- les clés entre quotes,
- ...

Le projet JSON5 propose une évolution qui contourne ces limitations :
https://json5.org/

Installer le paquet npm `json5` en `devDependencies`

Modifier la config pour autoriser les fichiers `.json5` en  vous inspirant de l'exemple suivant :
https://github.com/webpack/webpack/tree/main/examples/custom-json-modules

Vous devrez ajouter un fichier `.d.ts` dans le répertoire types pour supporter l'extension `.json5` en TypeScript.

## 4 - Banner Plugin

En suivant la doc : https://webpack.js.org/plugins/banner-plugin/

Charger le plugin banner dans la liste des plugins comme ceci :
`new webpack.BannerPlugin('Copyright STMicroelectronics')`

Un commentaire devrait apparaitre en début de bundle.

## 5 - CSS Loader et Style Loader

Créer un fichier `src/css/app.css` contenant :

```css
body {
  margin: 0;
  width: 100vh;
  height: 100vh;
  display: flex;
  font-size: 3em;
}

.horloge {
  margin: auto;
}
```

Installer les loaders `css-loader` et `style-loader` puis suivre la doc de `style-loader` pour charger le CSS

https://webpack.js.org/loaders/style-loader/

Dans index.js il faut importer app.css comme ceci :

```js
import '../css/app.css`
```

## 6 - MiniCssExtractPlugin

Suivre la doc suivante pour remplacer `style-loader` qui écrit le css dans une balise style, par un fichier .css externe qui chargera dans une balise link :

https://webpack.js.org/plugins/mini-css-extract-plugin/

Ne le faire que si le mode est `production`
