# Epaper-site

Tech stack:
ReactJS, NextJS, Firebase

Firebase database rules - database.rules.json
Firebase storage rules - storage.rules
Firebase functions dir - functions

Variables for firebase
Set the projectid of your project in .firebaserc

### To download before deploying

Download and config node and npm

1. Download from https://github.com/coreybutler/nvm-windows
2. Go to windows powershell type nvm to verify install
3. Run `nvm list available` to get a list of all version to install
4. Run `nvm install {version}` where version will be the highest no. from the lts column
5. Run `nvm use {version}` to use it
6. Run `node -v` to verify version

Install firebase and vercel(zeit) and login

1. Run `npm i -g firebase-tools vercel`
2. Run `firebase login` and log in to account of project
3. Run `vercel login` and login to vercel account you want to host on
To logout of existing accounts run `firebase logout` and `vercel logout` to logout from the respective accounts

Deploy project

1. Create a firebase project
2. CD into the folder
3. Rum `npm installl` to install dependecies
4. Open config.js and paste your firebase config in firebaseConfig key
5. copy your porjectId and paste it in .firebaserc in default key
6. Open firebase and enable authentication, database (realtime) and storage
7. Run `npm run deploy` to deploy to firebase and vercel

### Loging into admin panel first time

When you first deploy youll have to make an admin account
Goto /admin
Enter email admin@enewspaper.com and enter the password you want to create for admin panel
Click sign up.

New after this all logins will use this email and password.

Only account with email admin@enewspaper.com can make changes even tho others can sign up and login so there is no harm in keeping the sign up button.

### Other

To start local development run `npm run dev` the site will be avail on localhost:3000. edit the contents of config.js and you'll see live changes
To deploy the new one just run `vercel` and `vercel --prod`

The path of logo is reletive to public, if the file is directly inside public and not in any subfolders path will be "/logo.png" if it is in a folder "img" path will be "/img/logo.png"

To add files to hosting put them in the public directory and deploy only hosting with `vercel`
