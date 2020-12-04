# Add package.json file
yarn init -y

# Add express
yarn add express
yarn add @types/express -D

# Add tsconfig.json file
yarn tsc --init

# Set outDir, rootDir
/* Redirect output structure to the directory. */
"outDir": "./dist",
/* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
"rootDir": "./src",

# Convert typescript to javascript
yarn tsc

# Set dev server with auto refresh.
yarn add ts-node-dev -D

# Eslint as dev dependêncy
Problems with version 7.*
yarn add eslint@6.8.0 -D

# Add eslint settings file
yarn eslint --init
yarn add @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.21.2 @typescript-eslint/parser@latest -D

# Add .eslintignore
/*.js
node_modules
dist

# Eslint import resolver
yarn add eslint-import-resolver-typescript -D

add to .eslintrc.json

"extends": [
    "plugin:@typescript-eslint/recommended"
],

 "rules": {
    "import/extensions": [
        "error",
        "ignorePackages",
        {
        "ts": "never"
        }
    ]

"settings": {
    "import/resolver": {
      "typescript": {}
    }
  }

# Prettier
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

{
	...
  "extends": [
		...
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  ...
  "plugins": [
    ...
    "prettier"
  ],
  "rules": {
    ...
		"prettier/prettier": "error"
  },
  ...
}

# Add prttier config js
prettier.config.js

# Debug
add lunch.json
"request": "attach",
"protocol": "inspector",
"restart": true,
Add flag --inspect to dev:server

# UUIDV4
yarn add uuidv4

# Date Library
yarn add date-fns


# Database postgres
yarn add typeorm pg

# ORMConfig

{
    "type":"postgres",
    "host":"gobarber.postgres.database.azure.com",
    "port": 5432,
    "username":"admroot@gobarber",
    "password":"m4cAdm123",
    "database":"gostack_gobarber",
    "migrations":[
        "./src/database/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir":"./src/database/migrations"
    }
}

# Configure typescript migrations package.json script tag
 "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"

# Create migration
yarn typeorm migration:create -n CreateAppointments

# Execute migrations
yarn typeorm migration:run

# Revert non commited migrations
yarn typeorm migrations:revert

# Package to metadate typeorm
yarn add reflect-metadata
