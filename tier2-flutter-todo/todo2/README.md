# todo2

A simple to do list in flutter based on: https://daily-dev-tips.com/posts/build-a-todo-list-app-with-flutter/

## Getting Started

 - To run this app, open the folder todo2 in the terminal. 
 - You need to have flutter installed and in your path variables. Follow the docs if unsure how to do this.
 - Type flutter run.
 - you should be given options on how to open the app depending on the emulators you have installed. If you dont have any select 1, which should be native windows or macOS.
 - Give the app some time to open, then use as intended :)

## What are the significant software concepts that this combination of technologies has that each previous set of technologies did not? Or that they handle significantly differently?

Compared to just html, JS and CSS, a lot of the styling is handled separetly by packages and defaults. Additionally, there is a greater focus on handling 
widgets are like a combo of html and css. In the layout of the app in the main widget there is: 
 - The scaffold is the widget that helps us create a proper material layout without the worry of manual styling
 - The AppBar is a widget that creates a Nav Bar
 Normally, in HTML this would have to all be created manually and styled to look like a Nav bar with CSS

 ### Now we need to worry about states
 States are a new functionality where when changed, the entire component will be re-rendered. If a component on screen is dynamic, it needs to be controlled thru its state.