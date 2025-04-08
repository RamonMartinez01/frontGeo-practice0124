# Geo-Escuelas: Frontend

Repositorio del frontend del proyecto Geo-Escuelas, desarrollado en React.js. Esta aplicación visualiza escuelas geolocalizadas en un mapa interactivo, permitiendo búsquedas por nombre o dirección, filtrado por categoría y navegación por páginas.


**I - Tecnologías utilizadas**

 -- React.js + Vite

 -- Redux Toolkit

 -- React Leaflet (para visualización de mapas)

 -- Boxicons (para iconografía)

 -- Netlify (despliegue continuo desde GitHub)




**II - Despliegue**

 -- Esta aplicación está desplegada en Netlify.

 -- Cada push al repositorio principal actualiza automáticamente el sitio en producción.



**III - Instalación local**

1.- Clona este repositorio:

 -- ```git clone https://github.com/tu-usuario/frontGeo-practice0124.git```

 -- cd frontGeo-practice0124

2.- Instala las dependencias:

 -- ```npm install```

3.- Inicia el servidor de desarrollo:

 -- ```npm run dev```

 -- La app estará disponible en http://localhost:5173


 **IV - Funcionalidades destacadas**
* Búsqueda precisa por nombre o dirección.
* Filtrado por categoría (preescolar, primaria, secundaria…).
* Paginación dinámica con indicador de página actual.
* Mapa interactivo con marcadores personalizados.
* Diseño 100% responsive, optimizado para dispositivos móviles.
* Interacción entre cards y mapa: selección cruzada de escuelas.


**V - Conexiones**

 -- Este frontend consume los datos desde una API REST desarrollada en FastAPI, que a su vez se conecta a una base de datos PostgreSQL alojada en Amazon RDS.

 -- El backend está contenerizado y desplegado en AWS ECR.

 -- Puedes conectarte a otra API en el archivo apiConfig.js en ```src/utils/apiConfig.js```

 
**VI - Licencia**

 -- Este proyecto es de uso educativo y colaborativo. Puedes adaptarlo o extenderlo según tus necesidades.
 Si lo haces, ¡no olvides dar crédito! 

 **VII - ¿Quieres colaborar?**

 #Próximos pasos#
 
  -- Agregar paginación con botones numerados

  -- Mejorar vista detallada por escuela

  -- Mejorar el diseño en pantallas pequeñas

  -- Desplegar en Netlify + Render

  -- Crear un Header de Navegación y un Footer
