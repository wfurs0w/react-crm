# React CRM

[DEMO](https://react-crm-2bab5.web.app/)

This project implemented a small CPM for passenger transportation.
During registration, users are given a choice of roles (passenger, driver, dispatcher).
When you log in again, the role selection is skipped.
The role you choose determines the content and capabilities that you choose to display.
For example, drivers and dispatchers can create new trips and see their list, but this function is not available for a passenger.
There is also an admin role that gives access to all content and features. 
This role cannot be selected during registration, in order to enter the application with the "admin" role, you need to log in to a pre-created account:

        mail:  admin@mail.com
    password:  user1234

The admin has access to a list with data about all users that he can edit.

You can also log in to pre-created accounts for all roles:

        mail:  passenger@mail.com
               driver@mail.com
               dispatcher@mail.com
    password: user1234 (for everyone);
    
You can sign in in several ways:
  - Google;
  - Facebook;
  - Phone 
      Using your real number or test: 
      +1 650-505-5050 
      Verification code: 555555  
  - Mail;

## Technologies

- React:
  - React Router;
  - React Icons;
  - JSX
- Firebase:
  - Firestore;
  - FirebaseUI;
- Bootstrap 4;
- SCSS

## For start:

- Clone repo.
- Run `npm install` to install dependencies.
- Run `npm start` to open in browser.