# Como consumir a API

## Configuração de ambiente

Para utilizar os serviços disponibilizados pela API, será necessário realizar uma pré-configuração, para que seja mais fácil a sua utilização e não haja preocupação com tipos de dados futuramente.

### Configuração Inicial:

-   O path utilizado na interpolação, é a rota que será utilizada.

```js
const URL_BASE = `https://api-minhas-tarefas.herokuapp.com/api/${path}`;
```

### Configuração após autenticação:

-   O path utilizado na interpolação, é a rota que será utilizada.
-   Os recursos de “USER_TOKEN” e “USER_ID”, serão disponibilizados após a autenticação.

```js

const URL_BASE = `https://api-minhas-tarefas.herokuapp.com/api/${path}`
const USER_TOKEN = “user-token”
const USER_ID = “user-id”

```

## Rotas

As rotas são dividas em duas partes, sendo as públicas, que não precisam utilizar nenhuma configuração de indentificação, sendo assim você não precisará passar nenhum header ou parametro. Nas rotas privadas, será nescessário informar, quem é o usuário com dois argumntos, sendo eles: <br/>

### Publicas

-   [SignUp](#signup---method-post)
-   [SignIn](#signin---method-post)
-   [Recover Account](#recover-account---container)
-   [Reset Account Password](#recover-account---container)

### Privadas

-   [New](#signUp)
-   [Find](#ignIn)
-   [Find One](#RecoverAccount)
-   [Edit](#ResetAccountPassword)
-   [Edit One](#ResetAccountPassword)
-   [Delete](#ResetAccountPassword)
-   [Delete One](#ResetAccountPassword)

```js

    const USER_TOKEN = “user-token”
    const USER_ID = “user-id”

```

### Exemplo rota publica:

```js
const URL_BASE = `https://api-minhas-tarefas.herokuapp.com/api/${path}`;

function newRequest() {
    const path = 'exemple';
    const responseRequest = await fetch(URL_BASE)
        .then((response) => response.json())
        .catch((error) => console.error(error));

    return responseRequest;
}
```

### Exemplo rota privada:

```js
const URL_BASE = `https://api-minhas-tarefas.herokuapp.com/api/${path}`;
const USER_TOKEN = “user-token”
const USER_ID = “user-id”

function newRequest() {
    const path = `example?userID=${USER_ID}`;
    const headers = new Headers();
    headers.append('Authorization', `${USER_TOKEN}`);

    const Settings = {
        headers: headers,
    };

    const responseRequest = await fetch(URL_BASE, Settings)
        .then((response) => response.json())
        .catch((error) => console.error(error));

    return responseRequest;
}
```

## Rotas

### SignUp - Method (**POST**)

```js
// Valor de entrada

const path = 'signUp';
const URL_BASE = `https://api-minhas-tarefas.herokuapp.com/api/${path}`;

const RequestConfig = {
    body: {
        username: 'John Doe', // Required
        email: 'JohnDoe@Doe.com', // Required
        password: '**********', // Required
    },
};
```

```json
// Expectativa do valor de saída

{
    "authentication": {
        "user": {
            "createAt": "DATE",
            "_id": "USER_ID",
            "email": "JohnDoe@Doe.com",
            "username": "John Doe"
        },
        "token": "USER_TOKEN"
    }
}
```

### SignIn - Method (**POST**)

```js
// Valor de entrada
const path = 'signIn';
const URL_BASE = `https://api-minhas-tarefas.herokuapp.com/api/${path}`;

const RequestConfig = {
    body: {
        email: 'JohnDoe@Doe.com', // Obrigatório
        password: '**********', // Obrigatório
    },
};
```

```json
// Expectativa do valor de saída

{
    "authentication": {
        "user": {
            "createAt": "DATE",
            "_id": "USER_ID",
            "email": "JohnDoe@Doe.com",
            "username": "John Doe"
        },
        "token": "USER_TOKEN"
    }
}
```

### Recover Account - Container

Para a recuperação da conta, será enviado um email automático, para o usuário no qual conterá um sequência numérica denominada TOKEN, nos métodos seguintes.

##### Recover Account - Method (**POST**)

```js
// Valor de entrada
const path = 'recoverAccount';
const URL_BASE = `https://api-minhas-tarefas.herokuapp.com/api/${path}`;

const RequestConfig = {
    headers: {
        query: {
            email: 'JohnDoe@Doe.com', // Obrigatório
        },
    },
};
```

```
Expectativa do valor de saída

A resposta esperada é código 204 do protocolo HTTP e um email enviado para o usuário.
```

#### Reset Account Password - Method (**POST**)

```js
// Valor de entrada
const path = 'resetAccountPassword';
const URL_BASE = `https://api-minhas-tarefas.herokuapp.com/api/${path}`;

const RequestConfig = {
    headers: {
        query: {
            token: 'TOKEN', // Obrigatório
        },
    },
    body: {
        email: 'JohnDoe@Doe.com', // Obrigatório
        password: '**********', // Obrigatório, o password pedido aqui é referente a nova senha do usuário.
    },
};
```

```
Expectativa do valor de saída

A resposta esperada é código 204 do protocolo HTTP.

Também é indicado que após isso o cliente seja redirecionado para a página de login.
```

### New - Method (**POST**)

```js
// Valor de entrada
const path = 'new';
const URL_BASE = `https://api-minhas-tarefas.herokuapp.com/api/${path}`;

const RequestConfig = {
    headers: {
        Authorization: 'Authorization', // Obrigatório
        query: {
            userID: 'userID', // Obrigatório
        },
    },
    body: {
        title: 'jonDoe - Clean House', // Obrigatório
        description: '...', // Opcional
        priority: '0 ou 1 ou 2', // Opcional
        StartedAt: 'DATE', // Opcional
        FinishAt: 'DATE', // Opcional
    },
};
```

```json
// Expectativa do valor de saída

{
    "todo": {
        "description": "Not have description yet",
        "priority": 0,
        "StartedAt": "DATE",
        "_id": "ID",
        "title": "jonDoe - Clean House",
        "__v": 0
    }
}
```

### Find - Container

Cada tarefa possui um identificação, nomeada na api de **"id"**

#### Find One Method (**GET**)

```js
const path = 'findOne';
const URL_BASE = `https://api-minhas-tarefas.herokuapp.com/api/${path}`;

const RequestConfig = {
    headers: {
        Authorization: 'Authorization', // Obrigatório
        query: {
            userID: 'userID', // Obrigatório
            id: 'id', // Obrigatório
        },
    },
};
```

```json
// Expectativa do valor de saída

{
    "todo": {
        "description": "???",
        "priority": "???",
        "StartedAt": "???",
        "_id": "???",
        "title": "???",
        "StartedAt": "???",
        "FinishAt": "???",
        "__v": 0
    }
}
```

#### Find Method (**GET**)

```js
const path = 'find';
const URL_BASE = `https://api-minhas-tarefas.herokuapp.com/api/${path}`;

const RequestConfig = {
    headers: {
        Authorization: 'Authorization', // Obrigatório
        query: {
            userID: 'userID', // Obrigatório
        },
    },
};
```

```json
// Expectativa do valor de saída

{
    "todo": [
        {
            "description": "???",
            "priority": "???",
            "StartedAt": "???",
            "_id": "???",
            "title": "???",
            "StartedAt": "???",
            "FinishAt": "???",
            "__v": 0
        },
        {
            "description": "???",
            "priority": "???",
            "StartedAt": "???",
            "_id": "???",
            "title": "???",
            "StartedAt": "???",
            "FinishAt": "???",
            "__v": 0
        },
        {
            "description": "???",
            "priority": "???",
            "StartedAt": "???",
            "_id": "???",
            "title": "???",
            "StartedAt": "???",
            "FinishAt": "???",
            "__v": 0
        }
        // ...
    ]
}
```
