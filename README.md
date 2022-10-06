

# API.ATER

## Pre-requisitos:

-	**Enlace de acceso**:
    En caso de que desee conectarse a nuestros servicios le proporcionaremos un enlace de acceso para darse de alta en los mismos.

-	**Openssl**: 
>Todos los scripts para la generación y exportación de certificados, clave privada y solicitud de firma serán proporcionados por la interfaz de usuario en el registro.


Es una herramienta que se utilizara para:

-  *Generar clave y solicitud de certificado.*
-  *Exportar sus certificados a diferentes formatos en el caso que sea necesario.*


-	**IP de tu servidor**
    -    Es necesario para autenticarse ya que nuestra autoridad certificante validará que las peticiones https provengan desde el servidor que usted especifique al darse de alta.

-   **Aplicación cliente**:
    -   Aplicación que presentará certificado a través de una solicitud https para obtener tokens.
    -   Podrá redistribuir dichos tokens con sus propios usuarios o hacer uso de ellos para consumir nuestros servicios y los datos siempre que se encuentre autorizado.

---
## Pasos para la implementación:

**Paso 1:** Obtener certificado.
1.	Ingresar por la URL que le proveerá la ATER
2.	Completar el formulario con los datos solicitados. (la IP a especificar deberá ser la del servidor que utilizará para establecer la comunicación con nuestros servicios).
3.	Generar clave privada y solicitud de firma.
4.	Subir la solicitud de firma.
5.	Descargar certificado e ID de cliente.
6.	Recomendación: mover el certificado al mismo directorio donde se encuentran la clave privada y solicitud de firma.
7.	Opcional: exportar el certificado al formato que necesite 

**Paso 2:** Autenticación y autorización.
1.	Solicitud https utilizando el certificado obtenido a:
https://api.ater.gob.ar/autenticar
2.	Obtendrá un token que le proporcionará autorización para consumir nuestros servicios web.

**Paso 3:** Generar hash. 
1.	Concatenar ID cliente (obtenido en el paso 1) con los parámetros respetando el orden de los mismos.
2.	Hacer un sha512 con el resultado del paso anterior.
3.	Codificar en base 64 el resultado del paso anterior.
4.	Extraer los primeros 10 caracteres de la cadena obtenida en el paso anterior.

```javascript 
//Node.js:

crypto.createHash('sha512')
    .update(clientID+parametrosConcatenados)
    .digest('base64')
    .slice(0,10)
```

```csharp
//C#:

public static string CrearHash(string frase)
    {
        SHA512Managed HashTool = new SHA512Managed();
        Byte[] FraseComoBytes = System.Text.Encoding.UTF8.GetBytes(string.Concat(frase));
        Byte[] BytesEncriptados = HashTool.ComputeHash(FraseComoBytes);
        HashTool.Clear();
        return Convert.ToBase64String(BytesEncriptados);
    }
}

```

**Paso 4:** Consumir el servicio web.
1.  Para consumir un servicio deberá hacer una solicitud https enviando el hash obtenido en el paso 3 como último parámetro de la URL:
```javascript
    https://api.ater.gob.ar/parametro1/parametro2/.../parametroN/[hash]
```

2.  En la solicitud deberá establecer en el header la clave o campo Authorization el cual tendrá el valor de “token” (en token debe ir el valor del token obtenido en el paso 2)

```javascript
    headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
```

# Cliente APP
- Crear la carpeta **certs** en la raíz del proyecto.
- Copiar certificado y clave privada (en caso que sea necesario) a la carpeta /certs como se muestra en la estructura.

```
├── certs
│   ├── client.crt
│   ├── client.key
│   └── client.pfx
```
- Editar el config.js

>Ingresar el *client_id* obtenido al momento del registro y el *nombre de su certificado* **sin la extensión**. *El passphrase es la contraseña de su certificado en el caso que el mismo sea .pfx*.


```javascript
 const config = {
        client_id: '[CLIENT_ID]',
        cert_name: '[NOMBRE DEL CERTIFICADO (sin extensión)]',
        passphrase: '[PASSWORD DEL CERTIFICADO]'
    };
```

- Instalar las dependencias:

    ```poweshell
    npm install
    ```

- Moverme a la carpeta de la app

    ```poweshell
    cd app
    ```
- Instalar las dependencias de la app

    ```poweshell
    yarn install
    ```
- Compilar la app
    
    ```poweshell
    yarn build
    ```
- Iniciar el servidor desde la raiz del proyecto

    ```poweshell
    npm start
    ```


- Verificar que el servidor esté funcionando:

```poweshell
curl -k GET https://localhost:5000/status
```
- Verificar si se puede obtener un token a través del certificado:

```poweshell
curl -k GET https://localhost:5000/api/token
```