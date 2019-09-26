# theShoppe

A full stack LAMP & React shopping cart app.

## Technologies Used
- React.js
- Webpack 4
- Reactstrap
- Bootstrap 4
- PHP
- mySQL
- HTML5
- CSS3
- AWS EC2

## Live Demo
Try the application live at https://wicked-sales.ivanarregoitia.com/

## Features
- User can browse our fine catalog
- User can adda product to their cart
- User can view their cart, delete an item from the cart, and continue to the checkout form
- User can complete their order by filling out the checkout form


## Getting Started

1. Fork this repository to your GitHub account and clone the fork to your local directory.
2. Check out a `dev` branch and push it to `origin`.
    ```
    git push origin dev
    ```
3. Install all dependencies in `package.json` with NPM.
    ```
    npm install
    ```
4. Add the `wicked-sales.localhost` site to Apache by copying the provided virtual host configuration in the `server` directory to `/etc/apache2/sites-available`.
    ```
    sudo cp server/wicked-sales.localhost.conf /etc/apache2/sites-available
    ```
5. Enable the `wicked-sales.locahost` site.
   ```
   sudo a2ensite wicked-sales.localhost
   ```
6. Restart the Apache web server.
   ```
   sudo service apache2 restart
   ```
7. Test that the virtual host is working by sending an HTTP request to `http://wicked-sales.localhost`. You should receive `200 OK` response containing an HTML document with the title of "Wicked Sales".
   ```
   http get http://wicked-sales.localhost
   ```
## NPM Scripts

- `dev` - Start Webpack Dev Server at port `localhost:3000`
- `build` - Run Webpack to build the React client into `server/public`.
