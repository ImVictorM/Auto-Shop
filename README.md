# Auto Shop 🏎️

## Project Context 💡
API that manages a vehicle concessionaire using the four basic CRUD operations. I designed the project architecture with a layered approach based on Domain-Driven Design (DDD), incorporating Object-Oriented Programming (OOP) and SOLID principles. To ensure correctness, I developed unit and integration tests to cover almost 99% of the project's functionalities.

### Acquired Knowledge 📖

In this project, I was able to:
- Create an API CRUD using OOP and SOLID principles;
- Use MongoDB;
- Use Mongoose ODM;
- Create unit tests;
- Create Integration tests.

## Main Technologies 🧰
<table>
    <caption align="center"><h3>Development</h3></caption>
    <thead>
        <tr>
            <th>TypeScript</th>
            <th>Express</th>
            <th>Mongoose</th>
            <th>Node.JS</th>
            <th>MongoDB</th>
            <th>Docker</th>
            <th>Insomnia</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" 
                        alt="typescript" 
                        width="40" 
                        height="40"
                    />
                </a>
            </td>
            <td align="center">
                <a href="https://expressjs.com/" target="_blank">
                    <img
                        src="https://www.orafox.com/wp-content/uploads/2019/01/expressjs.png"
                        alt="express"
                        width="40"
                        height="40"
                    />
                </a>
            </td>
            <td align="center">
                <a href="https://mongoosejs.com/" target="_blank">
                    <img
                        src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongoose/mongoose.png"
                        alt="mongoose"
                        width="40"
                        height="40"
                    />
                </a>
            </td>
            <td align="center">
                <a href="https://nodejs.org" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" 
                        alt="nodejs" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                 <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> 
                     <img 
                         src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" 
                         alt="mongodb" 
                         width="40" 
                         height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" 
                        alt="docker" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                <a href="https://insomnia.rest/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://storage.googleapis.com/indie-hackers.appspot.com/product-avatars/insomnia/ibTLPyjwVebnZjMGKvz6ztarnuV2" 
                        alt="insomnia" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
        </tr>
    </tbody>
</table>
<table>
    <caption align="center"><h3>Test</h3></caption>
    <thead>
        <tr>
            <th>Mocha</th>
            <th>Chai</th>
            <th>Sinon</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://mochajs.org/" target="_blank" rel"noreferrer">
                    <img
                        src="https://avatars.githubusercontent.com/u/8770005?s=200&v=4"
                        alt="mocha-js"
                        width="40"
                        height="40"
                    />
                </a>
            </td>
             <td align="center">
                <a href="https://www.chaijs.com/" target="_blank" rel="noreferrer"> 
                    <img src="https://raw.githubusercontent.com/gist/keithamus/3d8cfbaeddf8bdf5f7cd94a3bdae0934/raw/63ca295f3aa7e1b94b598d84dfe0330383497a8c/Chai%20Logo%20(C).svg"
                        alt="chai-js" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
             <td align="center">
                <a href="https://sinonjs.org/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://sinonjs.org/assets/images/logo.png" 
                        alt="sinon-js" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
        </tr>
    </tbody>
</table>

## Running the application ⚙️

1. Clone the repository and enter it
```
git clone git@github.com:ImVictorM/Auto-Shop.git && cd Auto-Shop
```

### Methods

<details>
<summary><h4>🐋 Running with docker (recommended)</h4></summary>

 > You must have docker and docker-compose installed
 
2. Get the containers running
```
docker-compose up -d
```

</details>

<details>
<summary><h4>🖥️ Running locally</h4></summary>

 > You must have node on version 16 and MongoDB installed
 
2. Install the dependencies
```
npm install
```

3. Rename the file `.env.example` to `.env`

4. Start the server
```
npm run dev
```
</details>

## Testing 🛠️
<strong>Note:</strong> if you're running the app using docker, you must use the following commands inside the car_shop container. To enter the container, type:
```
docker exec -it car_shop bash
```

Running all tests:
```
npm test
```
Running integration tests:
```
npm run test:integration
```
Running unit tests:
```
npm run test:unit
```
Run all tests and see its coverage:
```
npm run test:coverage
```

## Endpoints 🌐

Click here to export automatically:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Auto%20Shop&uri=https%3A%2F%2Fraw.githubusercontent.com%2FImVictorM%2FAuto-Shop%2Freadme%2FinsomniaRoutes.json)

Or just import the file `insomniaRoutes.json` inside your environment: https://docs.insomnia.rest/insomnia/import-export-data
