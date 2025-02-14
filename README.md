# Software-Engineering-Project

## This is the backend README.md where I guide step by step from setting up the neccesary environment to how to set up the basic backend connecting to MongoDB as a Database:

1. Download Node.js from the website [Node.js Link](https://nodejs.org/en)
2. After downloading, double check by go to **cmd** and type:
   `node -v`
   `npm -v`
> We will use node.js version 22.14.0 and npm 10.9.2 and later on.  
3. Type in the below command to create a package.json file for a Node.js project:
   `npm init `
> Based on the tutorial, we only need to type **entry point** to **app.js** as this will be the main program we use.
> Description and Author if you want as this can be adjusted later in the Visual Studio Code (VSC).
4. Create a folder to store the project and change directory to that folder in cmd. Then type in:
   `code .`
> This is to open the project folder from cmd to VSC. This is the [Visual Studio Code Download Link](https://code.visualstudio.com/) to download if you have not downloaded yet.
> If after downloading and you cannot use **code .** in cmd, one possible problem is the environemnt variable has not been set. You can press **Ctrl + R** then type in **sysdm.cpl**. Then from System Properties, you go Advanced -> Environment Variables -> Path -> Edit. If you have not found **C:\User\AppData\Local\Programs\Microsoft VS Code\bin** or something similar like this, click new and add this in. Then click OK to confirm then open a new cmd and type in the above command again. This will be beneficial for you later on if you decide to open vsc from command prompt.
5. At VSC, copy all of the files in this repository. **No need to copy package-lock.json and package.json** because you already have them at step 3.
6. In your package.json, add this line under the line "main": "app.js"
   `"type": "module",`  
and add this line under "test":
  `"start": "env-cmd -f ./.env nodemon app.js` 
7. In cmd or VSC terminal, type in:  
  `npm install bcryptjs --save`  
and  
  `npm install env-cmd express jswonwebtoken mongodb mongoose nodemon postmark validator --save`
> These will add dependencies that we are going to use and you can see it at package.json.
> If cannot use npm command, consider this [link](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.5) and this [link](https://stackoverflow.com/questions/57673913/vsc-powershell-after-npm-updating-packages-ps1-cannot-be-loaded-because-runnin) for more information.
8. Create .env with the following:  
> In .env
```
MONGO_URL=mongodb://localhost:27071/<your choice of naming here>
JWT_KEY=<your choice of the key>
PORT=<your choice of the port, in my code I use 3000>
```
> This .env file will have the environment variables for our program to use.
8. In .env, the variable MONGODB_URL will be used to connect from the link we can have from MongoDB database. There are two ways to connect to MongoDB database:
  `MONGODB_URL=mongodb://localhost:27017/<your choice of naming here>`
> This will connect to a local MongoDB running on your machine

or  
  `mongodb+srv://<username>:<password>@...` 
> This can be obtained from your MongoDB Atlas cluster (or other cloud-hosted MongoDB services) that you have created from MongoDB website.
9. Create .gitignore with the following:
```
node_mudles
.env
```
> This will ignore these two files whenever we push using git. You can add more if you want to ignore any more files that can be sensitive or does not neccesary.
10. Finally, try to run the program by type in `node app.js` in the terminal (can be in cmd or in VSC)
