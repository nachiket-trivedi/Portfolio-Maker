rm -rf build
rm -rf node_modules
npm i
npm run build
git config --global --unset user.name
git config --global --unset user.email
git config --global  credential.helper
git init
node deploy.js