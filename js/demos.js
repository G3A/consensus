export const demoGestionConocimientos= {
  "vision": "Ser la plataforma líder en gestión del conocimiento y colaboración organizacional.",
  "objetivos_de_negocio": [
    {
      "id": "OBJ-1",
      "descripcion": "Incrementar la reutilización de conocimiento en un 35% en 2025 y reducir el tiempo de búsqueda de información crítica.",
      "kpi": "Tasa de reutilización > 60%; Tiempo medio de búsqueda < 2 min",
      "prioridad": "Alta",
      "responsable": "Chief Knowledge Officer",
      "estado": "En desarrollo",
      "notas": "Este objetivo es clave para acelerar la toma de decisiones, estandarizar procesos y mejorar el onboarding.",
      "funcionalidades": [
        {
          "id": "FUNC-1-1",
          "nombre": "Gestión de Contribuciones y Publicación",
          "namespace": "com.empresa.conocimiento.contribuciones",
          "actor": "Colaborador, Editor, Administrador",
          "impacto": "Facilitar la captura, revisión, versionado y publicación de artículos y guías con metadatos y trazabilidad.",
          "tags": "conocimiento, contribuciones, aprobacion, versionado, metadatos",
          "estado": "En desarrollo",
          "responsable": "Equipo Backend",
          "notas": "Soportar plantillas de contenido, editor WYSIWYG/Markdown, etiquetas, categorías y control de versiones. Auditoría completa.",
          "enlace_doc": "https://miempresa.com/docs/contribuciones",
          "background": "Dado que el usuario es colaborador autenticado con permisos de autor",
          "historias": [
            {
              "id": "HIST-1-1-1",
              "descripcion": "Como colaborador, quiero crear y enviar para aprobación una nueva guía de procesos con metadatos y etiquetas, para que pueda ser publicada en el portal de conocimiento.",
              "package": "internal.command.crearcontribucion",
              "dependencias": "",
              "estado": "Listo para QA",
              "responsable": "Analista de requisitos",
              "notas": "",
              "criterios": [
                {
                  "comentario": "Registro exitoso de una contribución con contenido, metadatos y notificación a editores.",
                  "tags": "@publicacion @metadatos @aprobacion",
                  "titulo": "Crear y enviar artículo para aprobación",
                  "estado": "Aprobado",
                  "notas": "",
                  "given": "Given que el usuario es colaborador con permisos de autor\nAnd existe la plantilla 'Guía de Proceso'\nAnd se han definido categorías y etiquetas",
                  "when": "When completa el contenido y metadatos del artículo\nAnd selecciona categoría y etiquetas\nAnd presiona 'Enviar para aprobación'",
                  "then": "Then la contribución queda registrada con un ID único\nAnd se crea la versión 1.0 en estado 'En revisión'\nAnd se notifica a los editores por correo",
                  "clases_unitarias": {
                    "contexto": "CuandoElColaboradorCreaUnArticulo.java",
                    "especificacion": [
                      "debeRegistrarContribucionConMetadatos",
                      "debeEnviarNotificacionAEditores"
                    ]
                  },
                  "diseno_tecnico": {
                    "clases": [
                      {
                        "nombre": "ContribucionService",
                        "metodos": [
                          {
                            "nombre": "crearContribucion",
                            "descripcion": "Registra una contribución de conocimiento con contenido, metadatos y estado inicial.",
                            "parametros": [
                              { "tipo": "Long", "nombre": "idUsuario", "descripcion": "ID del autor de la contribución" },
                              { "tipo": "Custom...", "custom": "ContenidoArticulo", "nombre": "contenido", "descripcion": "Contenido y metadatos del artículo", "propiedades": [
                                  { "tipo": "String", "nombre": "titulo", "descripcion": "Título del artículo" },
                                  { "tipo": "String", "nombre": "cuerpoMarkdown", "descripcion": "Contenido en formato Markdown o HTML" },
                                  { "tipo": "List", "nombre": "etiquetas", "descripcion": "Lista de etiquetas asociadas" },
                                  { "tipo": "Custom...", "custom": "MetadatosContenido", "nombre": "metadatos", "descripcion": "Metadatos de clasificación y cumplimiento", "propiedades": [
                                      { "tipo": "String", "nombre": "categoria", "descripcion": "Categoría principal del contenido" },
                                      { "tipo": "Custom...", "custom": "Idioma", "nombre": "idioma", "descripcion": "Idioma del contenido", "propiedades": [
                                          { "tipo": "String", "nombre": "codigoISO", "descripcion": "Código ISO del idioma" },
                                          { "tipo": "String", "nombre": "nombre", "descripcion": "Nombre del idioma" }
                                        ]
                                      },
                                      { "tipo": "Custom...", "custom": "Cumplimiento", "nombre": "cumplimiento", "descripcion": "Información de clasificación y retención", "propiedades": [
                                          { "tipo": "String", "nombre": "clasificacion", "descripcion": "Nivel de acceso (p.ej. Público, Interno, Restringido)" },
                                          { "tipo": "String", "nombre": "retencionMeses", "descripcion": "Política de retención en meses" }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ],
                            "salida": { "tipo": "Custom...", "custom": "ResultadoContribucion", "descripcion": "Resultado detallado de la creación de la contribución", "propiedades": [
                                { "tipo": "boolean", "nombre": "exito", "descripcion": "Si la operación fue exitosa" },
                                { "tipo": "String", "nombre": "mensaje", "descripcion": "Mensaje para el usuario" },
                                { "tipo": "Long", "nombre": "idContribucion", "descripcion": "ID generado para la contribución" }
                              ]
                            }
                          }
                        ]
                      },
                      {
                        "nombre": "NotificacionService",
                        "metodos": [
                          {
                            "nombre": "enviarCorreoRevision",
                            "descripcion": "Envía un correo de notificación de revisión a los editores.",
                            "parametros": [
                              { "tipo": "String", "nombre": "email", "descripcion": "Correo del editor" },
                              { "tipo": "String", "nombre": "tituloArticulo", "descripcion": "Título del artículo a revisar" },
                              { "tipo": "Custom...", "custom": "ArchivoAdjunto", "nombre": "adjunto", "descripcion": "Permite adjuntar un resumen del artículo", "propiedades": [
                                  { "tipo": "String", "nombre": "nombreArchivo", "descripcion": "Nombre del archivo con su extensión" },
                                  { "tipo": "Object", "nombre": "data", "descripcion": "Array de bytes" }
                                ]
                              }
                            ],
                            "salida": { "tipo": "void", "descripcion": "No retorna valor" }
                          }
                        ]
                      }
                    ],
                    "patrones": "Service, Repository",
                    "diagrama": "El ContribucionService valida autor y plantilla, guarda la contribución con versión inicial y llama a NotificacionService para avisar a editores.",
                    "notas": "Se usará Spring Boot para la inyección de dependencias. El envío de correo es asíncrono e idempotente. Auditoría y control de versiones habilitados."
                  }
                }
              ]
            }
          ]
        },
        {
          "id": "FUNC-1-2",
          "nombre": "Búsqueda Semántica y Descubrimiento",
          "namespace": "com.empresa.conocimiento.busqueda",
          "actor": "Empleado, Gerente de Área",
          "impacto": "Permitir encontrar contenido relevante rápidamente con ranking, sinónimos, filtros y extractos.",
          "tags": "busqueda, discovery, semantica, filtros, ranking",
          "estado": "En análisis",
          "responsable": "Equipo Fullstack",
          "notas": "Crucial para la adopción. Considerar relevancia, sinónimos, stemming, multi-idioma y rendimiento de consultas.",
          "enlace_doc": "https://miempresa.com/docs/busqueda",
          "background": "Dado que el usuario está autenticado en la plataforma",
          "historias": [
            {
              "id": "HIST-1-2-1",
              "descripcion": "Como empleado, quiero realizar una búsqueda y ver resultados con extractos y filtros por categoría e idioma para encontrar rápidamente la información que necesito.",
              "package": "internal.query.buscarcontenido",
              "dependencias": "FUNC-1-1",
              "estado": "En análisis",
              "responsable": "Analista de UX/UI",
              "notas": "La caja de búsqueda será el entry point principal para usuarios.",
              "criterios": [
                {
                  "comentario": "Visualización de resultados relevantes con extractos y filtros activos.",
                  "tags": "@busqueda @filtros @snippet",
                  "titulo": "Mostrar resultados con extractos y filtros aplicados",
                  "estado": "Pendiente",
                  "notas": "",
                  "given": "Given que existen 2 artículos, 'Guía OKR' con categoría 'Guías' e idioma 'es' y 'Política de Seguridad' con categoría 'Políticas' e idioma 'es'",
                  "when": "When busco 'OKR' y aplico el filtro de categoría 'Guías'",
                  "then": "Then veo el resultado 'Guía OKR' con un extracto resaltando el término buscado\nAnd no veo 'Política de Seguridad' en los resultados",
                  "clases_unitarias": {
                    "contexto": "CuandoElUsuarioRealizaUnaBusqueda.java",
                    "especificacion": [
                      "debeRetornarResultadosRelevantesConExtractos"
                    ]
                  },
                  "diseno_tecnico": {
                    "clases": [
                      {
                        "nombre": "BusquedaQueryService",
                        "metodos": [
                          {
                            "nombre": "buscarContenido",
                            "descripcion": "Recupera resultados de búsqueda con ranking y extractos.",
                            "parametros": [
                              { "tipo": "String", "nombre": "consulta", "descripcion": "Texto de búsqueda" },
                              { "tipo": "Custom...", "custom": "FiltroBusqueda", "nombre": "filtro", "descripcion": "Filtros de búsqueda", "propiedades": [
                                  { "tipo": "List", "nombre": "categorias", "descripcion": "Categorías a incluir" },
                                  { "tipo": "List", "nombre": "etiquetas", "descripcion": "Etiquetas a incluir" },
                                  { "tipo": "String", "nombre": "idioma", "descripcion": "Idioma del contenido" },
                                  { "tipo": "Long", "nombre": "pagina", "descripcion": "Número de página" },
                                  { "tipo": "Long", "nombre": "tamanoPagina", "descripcion": "Tamaño de página" },
                                  { "tipo": "String", "nombre": "ordenarPor", "descripcion": "Criterio de orden (relevancia, fecha_desc, fecha_asc)" }
                                ]
                              }
                            ],
                            "salida": { "tipo": "Custom...", "custom": "ResultadosBusquedaDTO", "descripcion": "Objeto con la información de los resultados de búsqueda", "propiedades": [
                                { "tipo": "List", "nombre": "resultados", "descripcion": "Lista de DTOs de contenido encontrado" },
                                { "tipo": "Long", "nombre": "total", "descripcion": "Total de resultados" },
                                { "tipo": "Long", "nombre": "tiempoMs", "descripcion": "Tiempo de respuesta en milisegundos" }
                              ]
                            }
                          }
                        ]
                      }
                    ],
                    "patrones": "Query, DTO, Service",
                    "diagrama": "El Frontend llama un endpoint gestionado por BusquedaQueryService que consulta el índice de búsqueda y retorna resultados con extractos.",
                    "notas": "Cachear consultas frecuentes por 5 minutos. Invalidar caché al publicar/actualizar contenido."
                  }
                }
              ]
            }
          ]
        },
        {
          "id": "FUNC-1-3",
          "nombre": "Notificaciones y Recordatorios de Mantenimiento",
          "namespace": "com.empresa.conocimiento.notificaciones",
          "actor": "Autor, Editor",
          "impacto": "Reducir el contenido obsoleto mediante recordatorios oportunos para revisión y actualización.",
          "tags": "notificaciones, email, recordatorios, mantenimiento, obsolescencia",
          "estado": "En análisis",
          "responsable": "Equipo de Plataforma",
          "notas": "Integración con servicios de email (SendGrid, AWS SES) y, futuro, notificaciones a Slack o MS Teams.",
          "enlace_doc": "https://miempresa.com/docs/notificaciones-conocimiento",
          "background": "Dado que los autores han aceptado recibir notificaciones y los artículos tienen políticas de revisión",
          "historias": [
            {
              "id": "HIST-1-3-1",
              "descripcion": "Como autor, quiero recibir una notificación por correo si mi artículo no se ha actualizado en los últimos 180 días, para revisarlo y mantenerlo vigente.",
              "package": "internal.job.enviarrecordatoriorevisioncontenido",
              "dependencias": "",
              "estado": "En análisis",
              "responsable": "Desarrollador Backend",
              "notas": "Este proceso debe ser un cron job diario que evalúe políticas de revisión por categoría.",
              "criterios": [
                {
                  "comentario": "Envío de recordatorio por contenido pendiente de revisión.",
                  "tags": "@recordatorio @job @email @mantenimiento",
                  "titulo": "Enviar correo por artículo obsoleto",
                  "estado": "Pendiente",
                  "notas": "",
                  "given": "Given que el artículo 'Guía OKR' no se actualiza desde hace 180 días y tiene política de revisión semestral",
                  "when": "When se ejecuta el trabajo programado de recordatorios",
                  "then": "Then se envía un correo al autor con el enlace al artículo 'Guía OKR' y la recomendación de actualización",
                  "clases_unitarias": {
                    "contexto": "CuandoSeEjecutaElJobDeRecordatoriosDeRevision.java",
                    "especificacion": [
                      "debeIdentificarArticulosObsoletosCorrectamente",
                      "debeDispararElEnvioDeCorreoParaCadaAutor"
                    ]
                  },
                  "diseno_tecnico": {
                    "clases": [
                      {
                        "nombre": "RecordatorioRevisionJob",
                        "metodos": [
                          {
                            "nombre": "ejecutarBusquedaYEnvio",
                            "descripcion": "Busca artículos con revisión pendiente y coordina el envío de correos a sus autores.",
                            "parametros": [],
                            "salida": { "tipo": "void", "descripcion": "No retorna valor" }
                          }
                        ]
                      }
                    ],
                    "patrones": "Scheduled Job, Batch Processing",
                    "diagrama": "Un Scheduler (ej. Spring @Scheduled) ejecuta RecordatorioRevisionJob, que consulta la base de datos y llama a un servicio de correo.",
                    "notas": "El job debe registrar métricas de cuántos correos se enviaron y errores encontrados."
                  }
                }
              ]
            }
          ]
        },
        {
          "id": "FUNC-1-4",
          "nombre": "Generación de Resúmenes y Reconocimiento Social",
          "namespace": "com.empresa.conocimiento.resumenes",
          "actor": "Colaborador, Administrador",
          "impacto": "Proveer resúmenes y 'knowledge cards' verificables para compartir logros y facilitar la difusión del conocimiento.",
          "tags": "resumenes, pdf, linkedin, reconocimiento, share",
          "estado": "En análisis",
          "responsable": "Equipo Backend",
          "notas": "La generación de PDF puede ser intensiva. Considerar iText o un servicio externo. Integración con LinkedIn/Tenant requiere API key.",
          "enlace_doc": "https://miempresa.com/docs/resumenes",
          "background": "Dado que un artículo ha sido aprobado y publicado",
          "historias": [
            {
              "id": "HIST-1-4-1",
              "descripcion": "Como colaborador, una vez publicado un artículo, quiero generar automáticamente un resumen en PDF y una knowledge card para compartir con mi equipo.",
              "package": "internal.command.generarresumen",
              "dependencias": "FUNC-1-2",
              "estado": "En análisis",
              "responsable": "Desarrollador Backend",
              "notas": "El resumen debe incluir título, autor, fecha de publicación y un ID de verificación.",
              "criterios": [
                {
                  "comentario": "Generación del resumen PDF al publicar el artículo.",
                  "tags": "@resumen @pdf @share",
                  "titulo": "Generar PDF de resumen al publicar artículo",
                  "estado": "Pendiente",
                  "notas": "",
                  "given": "Given que el artículo 'Guía OKR' ha sido aprobado y publicado",
                  "when": "When el sistema procesa el evento de 'ArticuloPublicado'",
                  "then": "Then se genera un resumen en PDF con título 'Guía OKR', autor y fecha actual\nAnd el archivo queda disponible para descarga y compartir en el portal de conocimiento",
                  "clases_unitarias": {
                    "contexto": "CuandoUnArticuloEsPublicado.java",
                    "especificacion": [
                      "debeInvocarElServicioDeGeneracionDeResumenes"
                    ]
                  },
                  "diseno_tecnico": {
                    "clases": [
                      {
                        "nombre": "ResumenService",
                        "metodos": [
                          {
                            "nombre": "generarResumenParaArticulo",
                            "descripcion": "Crea el archivo PDF del resumen a partir de una plantilla y datos del artículo.",
                            "parametros": [
                              { "tipo": "Long", "nombre": "idArticulo", "descripcion": "ID del artículo publicado" },
                              { "tipo": "Long", "nombre": "idAutor", "descripcion": "ID del autor del artículo" }
                            ],
                            "salida": { "tipo": "Custom...", "custom": "ResumenGenerado", "descripcion": "Objeto con los datos del PDF generado", "propiedades": [
                                { "tipo": "String", "nombre": "urlDescarga", "descripcion": "URL para descargar el PDF" },
                                { "tipo": "String", "nombre": "idVerificacion", "descripcion": "Código único para verificar la autenticidad" }
                              ]
                            }
                          }
                        ]
                      }
                    ],
                    "patrones": "Service, Template Method (para las plantillas de PDF)",
                    "diagrama": "Un evento 'ArticuloPublicado' dispara la llamada a ResumenService, que usa una librería de PDF para crear el archivo y guardarlo en un storage (ej. S3).",
                    "notas": ""
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const demoInventarios = {
  "vision": "Ser la plataforma líder en gestión integral de inventarios y cadena de suministro para empresas.",
  "objetivos_de_negocio": [
    {
      "id": "OBJ-1",
      "descripcion": "Reducir los quiebres de stock en un 40% en 2025 y aumentar la exactitud del inventario.",
      "kpi": "Exactitud de inventario > 99%",
      "prioridad": "Alta",
      "responsable": "Director de Operaciones",
      "estado": "En desarrollo",
      "notas": "Este objetivo es clave para la continuidad operativa y la satisfacción del cliente.",
      "funcionalidades": [
        {
          "id": "FUNC-1-1",
          "nombre": "Recepción y Registro de Mercancía",
          "namespace": "com.empresa.inventarios.recepcion",
          "actor": "Operador de Almacén, Supervisor de Almacén",
          "impacto": "Permitir registrar recepciones de órdenes de compra con trazabilidad de lotes y ubicación.",
          "tags": "recepcion, compras, ubicaciones, lotes",
          "estado": "En desarrollo",
          "responsable": "Equipo Backend",
          "notas": "La recepción debe soportar múltiples ubicaciones, lotes y adjuntar documentos de respaldo.",
          "enlace_doc": "https://miempresa.com/docs/recepcion",
          "background": "Dado que el usuario tiene permisos de recepción en el almacén",
          "historias": [
            {
              "id": "HIST-1-1-1",
              "descripcion": "Como operario de almacén, quiero registrar la recepción de una orden de compra y ubicar los ítems recibidos para actualizar el stock y generar el acta de recepción.",
              "package": "internal.command.registrarrecepcion",
              "dependencias": "",
              "estado": "Listo para QA",
              "responsable": "Analista de requisitos",
              "notas": "",
              "criterios": [
                {
                  "comentario": "Registro exitoso de la recepción con datos de ubicación y envío de notificación.",
                  "tags": "@recepcion @ubicacion @documento",
                  "titulo": "Registrar recepción con ubicación de almacén",
                  "estado": "Aprobado",
                  "notas": "",
                  "given": "Given que el usuario es operario con permisos\nAnd existe la orden de compra 'OC-12345' aprobada\nAnd el almacén 'Central' está operativo",
                  "when": "When selecciona la orden y registra las cantidades recibidas\nAnd indica la ubicación de almacén\nAnd presiona 'Confirmar recepción'",
                  "then": "Then la recepción queda registrada con un número único\nAnd el stock se actualiza en la ubicación indicada\nAnd se envía un correo con el acta de recepción adjunta",
                  "clases_unitarias": {
                    "contexto": "CuandoSeRegistraLaRecepcionDeMercancia.java",
                    "especificacion": [
                      "debeRegistrarRecepcionConUbicacion",
                      "debeEnviarNotificacionConActaAdjunta"
                    ]
                  },
                  "diseno_tecnico": {
                    "clases": [
                      {
                        "nombre": "RecepcionService",
                        "metodos": [
                          {
                            "nombre": "registrarRecepcion",
                            "descripcion": "Registra la recepción de una orden de compra y almacena la ubicación de los productos.",
                            "parametros": [
                              { "tipo": "Long", "nombre": "idProveedor", "descripcion": "ID del proveedor" },
                              { "tipo": "Long", "nombre": "idOrdenCompra", "descripcion": "ID de la orden de compra" },
                              { "tipo": "Custom...", "custom": "UbicacionAlmacen", "nombre": "ubicacionAlmacen", "descripcion": "Ubicación destino de los productos", "propiedades": [
                                  { "tipo": "String", "nombre": "pasillo", "descripcion": "Código del pasillo" },
                                  { "tipo": "String", "nombre": "estanteria", "descripcion": "Identificador de la estantería" },
                                  { "tipo": "String", "nombre": "nivel", "descripcion": "Nivel de la ubicación" },
                                  { "tipo": "Custom...", "custom": "Almacen", "nombre": "almacen", "descripcion": "Almacén físico", "propiedades": [
                                      { "tipo": "String", "nombre": "nombre", "descripcion": "Nombre del almacén" },
                                      { "tipo": "String", "nombre": "codigo", "descripcion": "Código interno del almacén" },
                                      { "tipo": "Custom...", "custom": "Region", "nombre": "region", "descripcion": "Región geográfica", "propiedades": [
                                          { "tipo": "String", "nombre": "nombreRegion", "descripcion": "Nombre de la región" },
                                          { "tipo": "String", "nombre": "codigoRegion", "descripcion": "Código de la región" }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ],
                            "salida": { "tipo": "Custom...", "custom": "ResultadoRecepcion", "descripcion": "Resultado detallado de la recepción", "propiedades": [
                                { "tipo": "boolean", "nombre": "exito", "descripcion": "Si la recepción fue exitosa" },
                                { "tipo": "String", "nombre": "mensaje", "descripcion": "Mensaje para el usuario" },
                                { "tipo": "Long", "nombre": "idRecepcion", "descripcion": "ID generado para la recepción" }
                              ]
                            }
                          }
                        ]
                      },
                      {
                        "nombre": "NotificacionService",
                        "metodos": [
                          {
                            "nombre": "enviarCorreoRecepcion",
                            "descripcion": "Envía un correo de confirmación de recepción.",
                            "parametros": [
                              { "tipo": "String", "nombre": "email", "descripcion": "Correo del destinatario" },
                              { "tipo": "String", "nombre": "numeroRecepcion", "descripcion": "Número de la recepción" },
                              { "tipo": "Custom...", "custom": "ArchivoAdjunto", "nombre": "adjunto", "descripcion": "Permite especificar el acta de recepción como adjunto", "propiedades": [
                                  { "tipo": "String", "nombre": "nombreArchivo", "descripcion": "Nombre del archivo con su extensión" },
                                  { "tipo": "Object", "nombre": "data", "descripcion": "Array de bytes" }
                                ]
                              }
                            ],
                            "salida": { "tipo": "void", "descripcion": "No retorna valor" }
                          }
                        ]
                      }
                    ],
                    "patrones": "Service, Repository",
                    "diagrama": "El RecepcionService valida proveedor y orden de compra, guarda la recepción y llama a NotificacionService.",
                    "notas": "Se usará Spring Boot para la inyección de dependencias. El envío de correo es asíncrono e idempotente."
                  }
                }
              ]
            }
          ]
        },
        {
          "id": "FUNC-1-2",
          "nombre": "Control de Stock y Tablero de Inventario",
          "namespace": "com.empresa.inventarios.dashboard",
          "actor": "Operador de Almacén, Gerente de Operaciones",
          "impacto": "Mantener visibilidad clara del stock disponible, reservado y en tránsito por producto y ubicación, proporcionando métricas y reportes accionables.",
          "tags": "stock, dashboard, reportes, kpi",
          "estado": "En análisis",
          "responsable": "Equipo Fullstack",
          "notas": "Esta funcionalidad es crucial para la toma de decisiones. Considerar la performance al calcular agregaciones de muchos productos.",
          "enlace_doc": "https://miempresa.com/docs/dashboard-inventario",
          "background": "Dado que el usuario está autenticado en la plataforma y tiene acceso a un centro de distribución",
          "historias": [
            {
              "id": "HIST-1-2-1",
              "descripcion": "Como gerente de operaciones, quiero ver un dashboard con el stock disponible por producto y almacén para priorizar reposiciones.",
              "package": "internal.query.verdashboardinventario",
              "dependencias": "FUNC-1-1",
              "estado": "En análisis",
              "responsable": "Analista de UX/UI",
              "notas": "El dashboard debe ser la página de inicio para usuarios de operaciones.",
              "criterios": [
                {
                  "comentario": "Visualización del stock en el dashboard de inventario.",
                  "tags": "@dashboard @stock",
                  "titulo": "Visualizar dashboard con productos y su stock",
                  "estado": "Pendiente",
                  "notas": "",
                  "given": "Given que existen 2 productos, 'SKU-ABC' con 150 unidades en 'Bodega Central' y 'SKU-XYZ' con 20 unidades en 'Sucursal Norte'",
                  "when": "When accedo a mi dashboard de inventario",
                  "then": "Then veo una tarjeta para 'SKU-ABC' con 150 unidades disponibles\nAnd veo una tarjeta para 'SKU-XYZ' con 20 unidades disponibles",
                  "clases_unitarias": {
                    "contexto": "CuandoElUsuarioConsultaSuDashboardDeInventario.java",
                    "especificacion": [
                      "debeRetornarTodosLosProductosConSuStock"
                    ]
                  },
                  "diseno_tecnico": {
                    "clases": [
                      {
                        "nombre": "DashboardInventarioQueryService",
                        "metodos": [
                          {
                            "nombre": "obtenerDatosDashboardInventario",
                            "descripcion": "Recupera los datos de stock de los productos para el dashboard de un usuario.",
                            "parametros": [
                              { "tipo": "Long", "nombre": "idUsuario", "descripcion": "ID del usuario logueado" }
                            ],
                            "salida": { "tipo": "Custom...", "custom": "DashboardInventarioDTO", "descripcion": "Objeto con la información para el dashboard de inventario", "propiedades": [
                                { "tipo": "List", "nombre": "productosConStock", "descripcion": "Lista de DTOs de productos con su stock" }
                              ]
                            }
                          }
                        ]
                      }
                    ],
                    "patrones": "Query, DTO, Service",
                    "diagrama": "El Frontend llama a un endpoint que es manejado por DashboardInventarioQueryService para obtener los datos agregados de stock.",
                    "notas": "Cachear los resultados del dashboard por 5 minutos para mejorar la performance. Invalidad caché al registrar recepciones o movimientos."
                  }
                }
              ]
            }
          ]
        },
        {
          "id": "FUNC-1-3",
          "nombre": "Alertas y Recordatorios Inteligentes de Stock",
          "namespace": "com.empresa.inventarios.alertas",
          "actor": "Responsable de Compras",
          "impacto": "Reducir los quiebres de stock mediante recordatorios oportunos y comunicación relevante, ayudando a mantener niveles óptimos.",
          "tags": "alertas, email, recordatorios, reposicion",
          "estado": "En análisis",
          "responsable": "Equipo de Plataforma",
          "notas": "Se debe integrar con un servicio de email (ej. SendGrid, AWS SES). Considerar la opción de notificaciones a Slack en el futuro.",
          "enlace_doc": "https://miempresa.com/docs/alertas",
          "background": "Dado que el usuario ha configurado umbrales de stock y políticas de reposición",
          "historias": [
            {
              "id": "HIST-1-3-1",
              "descripcion": "Como responsable de compras, quiero recibir una notificación por correo si el stock de un producto se mantiene por debajo del mínimo en los últimos 7 días, para ejecutar una reposición.",
              "package": "internal.job.enviarrecordatoriostockbajo",
              "dependencias": "",
              "estado": "En análisis",
              "responsable": "Desarrollador Backend",
              "notas": "Este proceso debe ser un trabajo programado (cron job) que se ejecute diariamente.",
              "criterios": [
                {
                  "comentario": "Envío de recordatorio por stock bajo.",
                  "tags": "@recordatorio @job @email @stock",
                  "titulo": "Enviar correo por stock menor al mínimo",
                  "estado": "Pendiente",
                  "notas": "",
                  "given": "Given que el producto 'SKU-ABC' tiene stock disponible por debajo del mínimo desde hace 7 días",
                  "when": "When el trabajo programado de alertas se ejecuta",
                  "then": "Then se envía un correo de recordatorio al responsable de compras mencionando el producto 'SKU-ABC' y el umbral configurado",
                  "clases_unitarias": {
                    "contexto": "CuandoSeEjecutaElJobDeAlertasDeStock.java",
                    "especificacion": [
                      "debeIdentificarProductosConStockBajoCorrectamente",
                      "debeDispararElEnvioDeCorreoParaCadaProducto"
                    ]
                  },
                  "diseno_tecnico": {
                    "clases": [
                      {
                        "nombre": "AlertasStockJob",
                        "metodos": [
                          {
                            "nombre": "ejecutarBusquedaYEnvio",
                            "descripcion": "Busca productos con stock bajo y coordina el envío de correos.",
                            "parametros": [],
                            "salida": { "tipo": "void", "descripcion": "No retorna valor" }
                          }
                        ]
                      }
                    ],
                    "patrones": "Scheduled Job, Batch Processing",
                    "diagrama": "Un Scheduler (ej. Spring @Scheduled) ejecuta AlertasStockJob, que consulta la base de datos y llama a un servicio de correo.",
                    "notas": "El job debe tener logs detallados de cuántas alertas se enviaron y si hubo errores."
                  }
                }
              ]
            }
          ]
        },
        {
          "id": "FUNC-1-4",
          "nombre": "Generación de Documentos y Etiquetas de Inventario",
          "namespace": "com.empresa.inventarios.documentos",
          "actor": "Operador de Almacén, Administrador",
          "impacto": "Proveer documentos y etiquetas verificables al recibir productos, facilitando la trazabilidad y el cumplimiento operativo.",
          "tags": "documentos, pdf, etiquetas, barcode, qr",
          "estado": "En análisis",
          "responsable": "Equipo Backend",
          "notas": "La generación de PDF puede ser intensiva en recursos. Considerar una librería como iText o un servicio externo. Impresión compatible con impresoras de etiquetas.",
          "enlace_doc": "https://miempresa.com/docs/documentos",
          "background": "Dado que se ha registrado la recepción de un lote de productos",
          "historias": [
            {
              "id": "HIST-1-4-1",
              "descripcion": "Como operador, una vez que se haya registrado un lote, quiero recibir automáticamente un PDF con las etiquetas del producto para impresión y trazabilidad.",
              "package": "internal.command.generaretiquetas",
              "dependencias": "FUNC-1-2",
              "estado": "En análisis",
              "responsable": "Desarrollador Backend",
              "notas": "Las etiquetas deben incluir SKU, lote, fecha de recepción y un código de verificación.",
              "criterios": [
                {
                  "comentario": "Generación de etiquetas en PDF al registrar un lote.",
                  "tags": "@etiquetas @pdf @barcode",
                  "titulo": "Generar PDF de etiquetas al confirmar recepción de lote",
                  "estado": "Pendiente",
                  "notas": "",
                  "given": "Given que se ha registrado el lote 'L-2025-001' del producto 'SKU-ABC' en el almacén 'Central'",
                  "when": "When el sistema procesa el evento de recepción confirmada",
                  "then": "Then se generan etiquetas en PDF con SKU 'SKU-ABC', lote 'L-2025-001' y la fecha actual\nAnd las etiquetas están disponibles para su descarga en el módulo de documentos",
                  "clases_unitarias": {
                    "contexto": "CuandoSeGeneranEtiquetasTrasRecepcion.java",
                    "especificacion": [
                      "debeInvocarElServicioDeGeneracionDeEtiquetas"
                    ]
                  },
                  "diseno_tecnico": {
                    "clases": [
                      {
                        "nombre": "DocumentoInventarioService",
                        "metodos": [
                          {
                            "nombre": "generarEtiquetasParaLote",
                            "descripcion": "Crea el archivo PDF de etiquetas a partir de una plantilla.",
                            "parametros": [
                              { "tipo": "Long", "nombre": "idProducto", "descripcion": "ID del producto" },
                              { "tipo": "Long", "nombre": "idLote", "descripcion": "ID del lote recibido" }
                            ],
                            "salida": { "tipo": "Custom...", "custom": "DocumentoGenerado", "descripcion": "Objeto con los datos del PDF generado", "propiedades": [
                                { "tipo": "String", "nombre": "urlDescarga", "descripcion": "URL para descargar el PDF" },
                                { "tipo": "String", "nombre": "idVerificacion", "descripcion": "Código único para verificar la autenticidad" }
                              ]
                            }
                          }
                        ]
                      }
                    ],
                    "patrones": "Service, Template Method (para las plantillas de PDF)",
                    "diagrama": "Un evento de 'RecepcionConfirmada' dispara la llamada a DocumentoInventarioService, que usa una librería de PDF para crear el archivo y guardarlo en un storage (ej. S3).",
                    "notas": ""
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export function cargarDemoDesdeJson(data, setVision, setObjetivos, renderObjetivos) {
  setVision(data.vision || '');
  document.getElementById("visionGeneral").value = data.vision || '';
  setObjetivos(Array.isArray(data.objetivos_de_negocio) ? data.objetivos_de_negocio : []);
  renderObjetivos();
}