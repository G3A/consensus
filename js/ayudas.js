export const ayudas = {
  "Visión": `
Responde a la pregunta: ¿Por qué construimos esto?

Describe la aspiración a largo plazo y el impacto que se busca generar con el producto. Es la estrella polar que guía todas las decisiones estratégicas.

Ejemplo:
"Convertirnos en la plataforma de desarrollo profesional preferida por los equipos de tecnología en Latinoamérica, impulsando su crecimiento y reduciendo la brecha de habilidades digitales."
  `.trim(),

  "Objetivo de negocio": `
Responde a la pregunta: ¿Qué resultado medible queremos lograr?

Define una meta de negocio específica, medible, alcanzable, relevante y con un plazo definido (SMART) que el sistema ayudará a conseguir. Justifica la inversión en el desarrollo del producto.

Ejemplos:
- (S.M.A.R.T.) "Reducir el tiempo promedio de incorporación para nuevos desarrolladores en un 25% (de 4 a 3 días) para el final del T3 de 2024, mejorando su tiempo de productividad inicial."
- (S.M.A.R.T.) "Incrementar la tasa de finalización de evaluaciones de desempeño del 70% al 95% antes del cierre del ciclo anual (31 de diciembre de 2024) para mejorar la toma de decisiones en promociones."
- (S.M.A.R.T.) "Disminuir los errores críticos en el procesamiento de nóminas en un 90% (de 10 por ciclo a 1 por ciclo) en los próximos 6 meses para garantizar la confianza y satisfacción del empleado."
  `.trim(),

  "ID Objetivo": `
Responde a la pregunta: ¿Cómo identificamos este objetivo?

Identificador único y trazable para el objetivo de negocio, que permite vincularlo a características, épicas e historias.

Ejemplo: OBJ-RRHH-001
  `.trim(),

  "Descripción Objetivo": `
Responde a la pregunta: ¿Qué significa este objetivo?

Detalla el objetivo de negocio, explicando su contexto, el problema que resuelve y el valor que aporta a la organización.

Ejemplo:
"Actualmente, el proceso de incorporación es manual y fragmentado, lo que retrasa la integración de nuevos talentos. Este objetivo busca automatizar y centralizar el proceso para que los nuevos empleados sean productivos más rápido."
  `.trim(),

  "KPI": `
Responde a la pregunta: ¿Cómo sabremos si logramos el objetivo de negocio?

Key Performance Indicator (KPI). Métrica cuantificable que se usará para rastrear el progreso y el éxito del objetivo de negocio.

Ejemplo:
- "Tiempo promedio de incorporación (días)"
- "Tasa de finalización de evaluaciones (%)"
- "Tasa de error en procesamiento de nómina (%)"
  `.trim(),

  "Prioridad": `
Responde a la pregunta: ¿Qué tan importante es esto?

Nivel de importancia estratégica. Puede usar escalas como Alta/Media/Baja o el método MoSCoW (Debe, Debería, Podría, No tendrá) para una mejor planificación.

Ejemplo: Alta (Impacto directo en la eficiencia operativa)
  `.trim(),

  "Responsable": `
Responde a la pregunta: ¿Quién se encarga de esto?

Rol o persona que rinde cuentas sobre el cumplimiento del objetivo de negocio o la entrega del elemento. Es preferible usar roles para evitar dependencias personales.

Ejemplo: Líder de Producto, Gerente de RRHH, Desarrollador, Tester (Validador)
  `.trim(),

  "Estado": `
Responde a la pregunta: ¿En qué fase está esto?

Fase actual del elemento dentro de su ciclo de vida, desde la concepción hasta la entrega.

Ejemplo: Pendiente, En Análisis, En Desarrollo, Listo para Pruebas, Desplegado, Completado
  `.trim(),

  "Notas": `
Responde a la pregunta: ¿Qué información adicional o aclaraciones hay?

Espacio para registrar supuestos, decisiones clave, restricciones técnicas o dependencias externas que afecten al elemento.

Ejemplo: "Se asume que la API del sistema de contabilidad estará disponible en el T3. El equipo de Finanzas validará el formato de los reportes. Dependencia del equipo de Infraestructura para la creación de la nueva base de datos."
  `.trim(),

  "Característica": `
Responde a las preguntas: ¿Qué capacidad funcional nos ayuda a alcanzar el objetivo de negocio? ó ¿Cómo el software puede ayudar?

Una capacidad de alto nivel que el sistema ofrece a los usuarios para ayudarles a alcanzar un objetivo de negocio. 

Las características ofrecen capacidades.
Las capacidades brindan a los usuarios o partes interesadas la capacidad de
realizar algún objetivo comercial o realizar alguna tarea útil. Una capacidad
representa la capacidad de hacer algo; no depende de una implementación en
particular. Por ejemplo, "la capacidad de reservar un vuelo" es una capacidad.
Las características representan la funcionalidad de software que se crea para
admitir estas capacidades. "Reservar un vuelo en línea" es una característica.
Como desarrolladores, creamos características para que los usuarios finales, y las
partes interesadas en general, puedan alcanzar sus objetivos. Los usuarios necesitan
que nuestro software les brinde las capacidades que les ayudarán a contribuir a estos
objetivos de negocio.
Las características son lo que ofrecemos a los usuarios para respaldar estas
capacidades. Una característica es una pieza tangible de funcionalidad que será
valiosa para los usuarios y que se relaciona estrechamente con lo que los usuarios
realmente piden, que puede o no ser entregable en una sola iteración. Una
característica puede entregarse de forma relativamente independiente de otras
características y ser probada por los usuarios finales de forma aislada. Las
características se utilizan a menudo para planificar y documentar lanzamientos.
Las características se expresan en términos de negocio y en un lenguaje que la
gerencia puede entender. Si estuvieras escribiendo un manual de usuario, una
característica probablemente tendría su propia sección o subsección. En el pasado,
cuando el software estándar se empaquetaba en cajas, las características eran lo
que aparecía en el costado del paquete.

Se expresa en lenguaje de negocio y agrupa un conjunto de funcionalidades relacionadas. Piensa en ella como un capítulo en el manual de usuario.

Ejemplo:
- "Gestión del ciclo de vida del empleado"
- "Plataforma de evaluación de desempeño 360°"
- "Módulo de autoservicio para solicitud de vacaciones y permisos"
  `.trim(),

  "ID Funcionalidad": `
Responde a la pregunta: ¿Cómo identificamos esta funcionalidad?

Identificador único de la funcionalidad, siguiendo una nomenclatura que refleje su relación con la característica y el objetivo de negocio.

Ejemplo: CARAC-RRHH01-001
  `.trim(),

  "Nombre de la Funcionalidad": `
Responde a la pregunta: ¿Qué hace esta funcionalidad?

Descripción concisa de una acción o capacidad específica que aporta valor al usuario. Debe ser un componente lógico y cohesivo de una característica.

Ejemplo:
- "Asignación de plan de incorporación"
- "Registro de retroalimentación continua"
- "Generar reporte consolidado de salarios por departamento"
  `.trim(),

  "Actor": `
Responde a la pregunta: ¿Quién usa esta funcionalidad?

Rol específico del usuario que interactúa con la funcionalidad. Esto define la perspectiva y los permisos necesarios.

Ejemplos:
- "Administrador de RRHH"
- "Colaborador"
- "Líder de Equipo"
- "Sistema Externo (API de Contabilidad)"
  `.trim(),

  "Impacto": `
Responde a la pregunta: ¿Qué beneficio o cambio genera esta funcionalidad?

Describe el valor de negocio o el resultado tangible que se logra. Conecta la funcionalidad con una mejora medible en el proceso o un KPI.

Ejemplo:
- "Garantiza que cada nuevo empleado reciba un plan de incorporación estandarizado, mejorando la consistencia."
- "Reduce la carga administrativa del equipo de RRHH en un 15% al permitir que los empleados actualicen sus propios datos."
- "Provee a los gerentes datos objetivos para las reuniones de retroalimentación, mejorando la calidad de las conversaciones."
  `.trim(),

  "Tags": `
Responde a la pregunta: ¿Cómo podemos clasificar o buscar esto?

Etiquetas para categorizar, filtrar y buscar elementos. Útiles para la gestión de backlogs, la planificación de pruebas y la generación de reportes.

Ejemplo: incorporacion, desempeño, reportes, autoservicio, T3-2024
  `.trim(),

  "Enlace a documentación": `
Responde a la pregunta: ¿Dónde encuentro más información o recursos?

URL a recursos de apoyo como prototipos en Figma, diagramas en Miro, especificaciones detalladas en Confluence o épicas en Jira.

Ejemplo: https://www.figma.com/file/xxxxx/Flujo-Incorporacion
  `.trim(),

  "Antecedentes": `
Responde a la pregunta: ¿Qué condiciones deben cumplirse antes de ejecutar el escenario?

Precondiciones (contexto) que deben ser verdaderas para que el escenario sea válido. Se escribe en formato Gherkin (Dado/Y).

Ejemplo:
- "Dado que soy un 'Líder de Equipo' autenticado en el sistema"
- "Y tengo al menos un colaborador a mi cargo"
- "Y estoy en la sección 'Evaluación de Desempeño' de mi equipo"
  `.trim(),

  "ID Historia": `
Responde a la pregunta: ¿Cómo identificamos esta historia de usuario?

Identificador único de la historia de usuario, que permite su seguimiento en herramientas de gestión de proyectos.

Ejemplo: HU-DES-015
  `.trim(),

  "Descripción Historia de Usuario": `
Responde a la pregunta: ¿Qué necesidad del usuario estamos resolviendo?

Las historias de usuario nos ayudarán a planificar cómo podemos ofrecer una característica.
Al compilar y entregar estas características, puede usar historias de usuario para
dividir el trabajo en partes más manejables y para planificar y organizar el
trabajo.

Una descripción corta y simple de una funcionalidad contada desde la perspectiva del usuario. Sigue el formato "Como [rol], quiero [acción], para [beneficio]".

Ejemplo:
"Como Gerente de Área,
quiero visualizar un tablero con las métricas de desempeño de mi equipo,
para identificar fácilmente áreas de mejora y reconocer a los empleados de alto rendimiento."
  `.trim(),

  "Dependencias": `
Responde a la pregunta: ¿De qué depende esta historia?

IDs de otras historias de usuario o tareas técnicas que deben completarse antes de que esta pueda ser iniciada. Ayuda a secuenciar el trabajo.

Ejemplo: HU-AUT-001 (Autenticación), TAR-BD-003 (Crear tabla de métricas)
  `.trim(),

  "Comentario Criterio de Aceptación": `
Responde a la pregunta: ¿Qué se validará con este escenario?

Una explicación en lenguaje natural del propósito del escenario de prueba. Aclara la regla de negocio o el comportamiento esperado que se está validando.

Ejemplo:
"Este escenario valida que el sistema previene el registro de usuarios con un correo electrónico que ya existe en la base de datos, garantizando la unicidad. La validación debe ser insensible a mayúsculas/minúsculas y mostrar un mensaje de error específico."
  `.trim(),

  "Tags Escenario": `
Responde a la pregunta: ¿Cómo clasificamos este escenario?

Etiquetas a nivel de escenario para organizar las pruebas. Usadas para ejecutar suites de regresión, pruebas de humo o pruebas por funcionalidad.

Ejemplo: @regresion @camino-feliz @gestion-usuarios @integracion-continua
  `.trim(),

  "Título Escenario": `
Responde a la pregunta: ¿Cómo se llama este flujo principal?

Un nombre descriptivo que resume el escenario. Es útil tener escenarios para el "camino feliz" y para los casos de error.

Ejemplo:
- "Creación exitosa de un nuevo colaborador"
- "Intento de crear un colaborador con un email duplicado"
  `.trim(),

  "Pasos del Escenario": `
Responde a la pregunta: ¿Cuál es el comportamiento específico?

Ilustraremos las característica y las historias de usuario con ejemplos.
Puede usar ejemplos para comprender cómo las características ayudarán a
sus usuarios y para guiar su trabajo en las historias de usuario. Puede usar
ejemplos para comprender tanto las características como los casos de
usuario individuales.

Los pasos concretos que describen una interacción con el sistema y su resultado esperado, siguiendo la sintaxis Gherkin (Dado, Cuando, Entonces, Y, Pero).

Ejemplo:
Dado que estoy en la página de "Nuevo Colaborador"
Y he llenado el formulario con los datos válidos incluyendo el email "nuevo.empleado@empresa.com"
Cuando presiono el botón "Guardar Colaborador"
Entonces soy redirigido a la lista de colaboradores
Y observo el mensaje de éxito "Colaborador 'Juan Pérez' creado correctamente."
  `.trim(),

"pruebas unitarias": `
Responde a la pregunta: ¿Qué código técnico verifica que ese comportamiento funciona?

Mapea un criterio de aceptación a las pruebas de código específicas que lo cubren. Esto crea una trazabilidad directa desde el requerimiento de negocio hasta la implementación técnica.
  `.trim(),

  "Contexto (Clase Java)": `
Responde a la pregunta: ¿En qué situación o estado inicial se encuentra el sistema para esta prueba?

El nombre de la clase de prueba, que debe describir el contexto o el "Dado" del escenario de una forma clara y legible (estilo BDD).

Ejemplo:
- "CuandoSeRegistraUnNuevoUsuarioValido.java"
- "CuandoSeIntentaRegistrarUnUsuarioConEmailDuplicado.java"
  `.trim(),

  "Especificación (Métodos)": `
Responde a la pregunta: ¿Qué comportamientos o resultados se esperan en este contexto?

Los métodos de prueba dentro de la clase de contexto. Cada método debe verificar un resultado esperado ("Entonces") o un comportamiento específico.

Ejemplo:
- "debePersistirElUsuarioEnLaBaseDeDatos()"
- "debePublicarUnEventoDeUsuarioCreado()"
- "debeLanzarUnaExcepcionDeReglaDeNegocio()"
  `.trim(),
  
  "Namespace/Base Package": `
Responde a la pregunta: ¿En qué módulo, dominio o espacio de nombres se agrupa esta característica?

Define el paquete raíz o namespace para un "Contexto Delimitado" (Bounded Context) del dominio. Ayuda a organizar el código en módulos cohesivos y de bajo acoplamiento.

Ejemplo:
- "com.empresa.rrhh.incorporacion"
- "com.empresa.rrhh.desempeno"
- "com.empresa.finanzas.nomina"
  `.trim(),

  "Package/Vertical Slice": `
Responde a la pregunta: ¿A qué slice, submódulo o caso de uso específico pertenece esta historia de usuario?

Define el paquete específico donde se implementa un caso de uso o "vertical slice". Fomenta una arquitectura limpia al agrupar la lógica de una solicitud. El formato muestra la separación de responsabilidades entre comandos (escritura) y consultas (lectura) del patrón CQRS.

Ejemplo:
- registrarcolaborador | aplicacion.command.registrarcolaborador
- solicitarpermiso | aplicacion.command.solicitarpermiso
- buscarcolaboradorporid | aplicacion.query.buscarcolaboradorporid
- listarcolaboradoresactivos | aplicacion.query.listarcolaboradoresactivos
  `.trim(),
  
"Diseño técnico paso a paso": `
1. Añade las clases principales necesarias para implementar el criterio.
2. Para cada clase, agrega los métodos clave, especificando:
   - Nombre del método
   - Descripción
   - Tipo y descripción de salida
3. Para cada método, agrega los parámetros necesarios, especificando:
   - Tipo
   - Nombre
   - Descripción
4. Documenta los patrones de diseño, relaciones/diagramas y notas técnicas relevantes.
`.trim()  
  
};