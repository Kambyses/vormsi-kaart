# Vormsi kaart

Developed by Regio OÜ 2019

* Customer support:   Anne.Kokk@Regio.ee
* Technical support:  Jevgeni.Virves@Regio.ee



## Contents

* Docs:               `/doc/`
* App:                `/www/`
* App configuration:  `/www/js/config.js` 
* Static data files:  `/www/data/`
* App styles:         `/www/css/`
* App componets:      `/www/js/`
* Vendors:            `/www/vendors/`



## Technologies

* HTML5
* CSS3
* JavaScript ES5 (AMD modules)
* Json/GeoJson (static data)



## Libraries

* requirejs       2.3.6   https://requirejs.org/
* jquery          3.4.1   https://jquery.com/
* proj4           2.5.0   https://proj4.org/
* mapboxgl        1.1.0   https://docs.mapbox.com/mapbox-gl-js/api/
* fontawesome     5.7.2   https://fontawesome.com/



## Services

* MVT             https://api.regio.ee/documentation/#docs/vector_map_mvt



## Environment requirements

Standard web server with capability of serving static content.
Gzip, SSL/HTTP2, Cache are recommended but not required.



## Deployment

Deploy contents of `/www/` into webserver public directory.
No pre-build/pre-compiling required.
