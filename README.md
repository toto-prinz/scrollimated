![Picture](http://www.creacionesindiscriminadas.com/wp-content/themes/creaIndis/img/logo.png)

#Scrollimated

Animate visual elements to construct a composition in a puzzle way while scrolling (works better if the composition is not on top of the page).

##Configuration

###index.html
- .scrollimated (_required_): container of the composition
- data-scrollimated-transition (_required for animated elements_): data attribute used to define the direction of the motion. Elements without this data attribute remain fixed. Accepted values: top, bottom, left, right, topLeft, topRight, bottomLeft, bottomRight 
- data-scrollimated-delay: defines where the animation starts for the element

###script.js
- actionRadio:	defines the part of the window with the elements blocked in place
- spread: defines the quantity of motion
- duration: controls motion speed

###styles.css
Sizing values defined in percent to keep it responsive.

It's recommanded to do it with positionning too (but not required).