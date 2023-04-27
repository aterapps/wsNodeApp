# Conexion Api desde POSTMAN

## Indice

1. [Requisitos](#requisitos)
2. [Configurar Certificados](#configurar-certificado)
3. [Importar Apis](#importar-apis)
4. [Definir Variables de Entorno](#definir-variable-de-entorno)
5. [Configurar Token Bearer](#configurar-token-bearer)

### Requisitos


1. Tener un client_id
2. Tener los Certificados:
    * .crt
    * .key
    * .pfx

3. Tener postman instalado  [Pagina oficial de postman](#https://www.postman.com/downloads/)

### Configurar certificado 

Para configurar los certificados en Postman, debemos dirigirnos al icono de engranaje que se encuentra en la parte superior derecha y elegir la opción "Settings".

![Descripción de la imagen](https://i.ibb.co/mCp7bck/2023-04-05-11-28-01-gobierno-automotores-My-Workspace.png)

Luego, debemos dirigirnos a la casilla "Certificates" y hacer clic en la opción "Add Certificate".

![Descripción de la imagen](https://i.ibb.co/JpPh0fN/2023-04-05-11-35-33-gobierno-automotores-My-Workspace.png)

Para continuar, es necesario indicar "api.ater.gob.ar" en el campo de host y luego seleccionar cada uno de los certificados: archivo CRT, archivo KEY y archivo PFX. En el campo "Passphrase", debemos dejarlo vacío.

![Descripción de la imagen](https://i.ibb.co/0G504Zd/2023-04-05-11-42-08-get-token-My-Workspace.png)

Finalmente, presionamos el botón "Add" para finalizar la configuración.

### Importar apis

Para importar las APIs disponibles de la Administradora, es necesario descargar el archivo "API-ATER.postman_collection.json" que se encuentra en la carpeta "Postman" de este repositorio.

Una vez que tenga el archivo descargado, diríjase a Postman y seleccione la opción "Import" que se encuentra en la parte superior izquierda. Luego, arrastre el archivo descargado a la ventana de importación de Postman.

![Descripción de la imagen](https://i.ibb.co/LS4Vw38/2023-04-05-11-52-39-Import.png)

Si la importación fue satisfactoria, debería ver en su workspace una nueva carpeta dentro de sus colecciones denominada "API-ATER", la cual contiene todas las solicitudes HTTP disponibles.

![Descripción de la imagen](https://i.ibb.co/qCXdmcN/2023-04-05-11-56-59-API-ATER-Team-Workspace.png)

### Definir variable de entorno

Por último, nos queda definir una variable de entorno que contendrá su CLIENT_ID. Para hacer esto, haga clic sobre "Environments" que se encuentra en el lateral izquierdo de Postman y luego haga click en el icono mas (+) como se muestra en la siguiente imagen.

![Descripción de la imagen](https://i.ibb.co/BNZBZRm/2023-04-05-12-06-26-API-ATER-Team-Workspace.png)

En esta sección, deberá cargar como nombre de la variable "CLIENT_ID" y en el "Initial Value" y "Current Value" su client_id correspondiente. Es muy importante que la variable se denomine CLIENT_ID

![Descripción de la imagen](https://i.ibb.co/fnVVxSW/2023-04-05-12-09-50-New-Environment-Team-Workspace.png)


Si todo ha finalizado correctamente, debería poder ejecutar sin errores la API denominada "get_token" que se encuentra dentro de la carpeta "API-ATER". Para verificar que está utilizando la variable de entorno que creó anteriormente, deberá dirigirse al lateral derecho y observar que este seleccionada las variables creadas.

![Descripción de la imagen](https://i.ibb.co/cLC72GL/2023-04-05-12-18-23-docu-postman-md-Visual-Studio-Code.png)

Si todo funciona correctamente deberia de recibir como respuesta el token Bearer que necesitara utilizar para poder consultar las demas apis.

![Descripción de la imagen](https://i.ibb.co/R2st52S/2023-04-05-12-20-53-get-token-My-Workspace.png)

### Configurar token Bearer

Una vez que tengamos el token Bearer, solo nos queda indicar que se lo utilice para todas las solicitudes. Para hacer esto, haga clic con el botón izquierdo sobre la carpeta "API-ATER" que se encuentra en la colección de su Workspace. Luego, en la sección de "Authorization", seleccione el type "Bearer Token" y agregue el token obtenido en la sección anterior. De esta manera, todas las solicitudes dentro de la carpeta "API-ATER" utilizarán automáticamente el token Bearer para autenticarse.

![Descripción de la imagen](https://i.ibb.co/Bqs7kWq/2023-04-05-12-28-58-API-ATER-My-Workspace.png)
