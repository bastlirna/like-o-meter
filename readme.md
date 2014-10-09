# Like-o-meter #

*Small gadget for show number of likes on FB page in (almost) real time*

## HW ##

**Components:**

- Raspnerry Pi, ideally B+ version – *it looks more cool*
- USB Wi-Fi dongle
- 7-segment display with driver - *the bigger the better*, we use [7-Segment Serial Display - Blue](https://www.sparkfun.com/products/retired/9765)
- some wires and power supply

**Connection**

     +-----------------------------------------------+
     |                                               |                  +---------------------+
     |      .~~.   .~~.                              | Tx (blue) ->  Rx |                     |
     |     '. \ ' ' / .'                             o------------------o                     |
     |      .~ .~~~..~.                              |                  |                     |
     |     : .~.'~'.~. :                             |                  |                     |
     |    ~ (   ) (   ) ~                            | +5V (red)        |       7-segment     |
     |   ( : '~'.~.'~' : )                           o------------------o                     |
     |    ~ .~ (   ) ~. ~                            |                  |       display       |
     |     (  : '~' :  ) Raspberry Pi                | GND (green)      |                     |
     |      '~ .~~~. ~'                              o------------------o                     |
     |          '~'                                  |                  |                     |
     |                                               |                  +---------------------+
     +-----------------------------------------------+  

## SW ##

Application is writen in node.js.
