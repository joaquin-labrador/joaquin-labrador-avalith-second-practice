## ¿Qué diferencias hay entre bases de datos no relacionales y relacionales?

Las bases de datos relacionales (SQL), mantienen una estrucutura logica de diseño para almacenar los datos, los datos se gurdan en unas tablas, que en sus columnas se disponen los atributos y en las filas los datos almacenados en la misma, similar un excel. La mayor ventaja es que permite relacionar la tablas mediante relaciones y asi hacer mas eficiente las consultas.
Las bases de datos no relacionales (NOSQL), en estas no se sigue una estructura de diseño, si no que los datos no estructurados se guardan en documentos particulares. El beneficio de utilizar bases de datos no relacionales es que estas bases de datos pueden almacenar los datos y procesarlos sin modificar la arquitectura

## ¿Qué diferencias hay entre JWT y cookies, qué ventajas da cada uno?

Las cookies son informacion, que almacena nuestro navegador de tal forma que el posteriormente puede volver a utilizarla. La ventaja de esto es que nos ahora tiempo, ya que le navegador guarda las cookies, que contienen nuestra info y por ejemplo no tenemos que estar logeandos a un web cada vez que ingresemos a la misma. Pero las cookies son mas inseguras a ciberdelitos
Los JWT son un medio de autenticacion moderno, en el cual cierta información del usurio se transcribe a un token, donde por ejemplo, se puede guardar en el payload del JWT si un usuario es administrador o no, y asi limitar sus acciones en la web. La principal ventaja es que el server ya no guarda información sensible, tan solo se encargar de verificar la auntenticidad de la solicitud basandose en el token. JWT no nos ata a ningún mecanismo de persistencia de datos en el lado del cliente y tampoco a ninguna regla de cómo se debe transportar el token.

## ¿Para qué sirve el protocolo OAuth?
Es un estándar abierto para la autorización de APIs, que nos permite compartir información entre sitios sin tener que compartir la identidad o informacion sensible de los usuarios. Es un mecanismo utilizado a día de hoy por grandes compañías como Google, Facebook, Microsoft, Twitter, GitHub o LinkedIn, entre otras muchas.
Esto nos permite no tener que llener multiples formularios a la hora de querer registarnos a una web
