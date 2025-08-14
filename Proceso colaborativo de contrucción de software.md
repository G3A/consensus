Narrative-style testing / Specification-style testing vs Context/Specification (C/S)

Para simplificar, podemos verlo como un espectro:

Narrative (Narrativo): Se enfoca en contar una historia desde la perspectiva del usuario. Es descriptivo.
Specification (Especificación): Se enfoca en definir una regla de negocio o un comportamiento esperado. Es declarativo.
Context/Specification (C/S): Es una metodología estructurada para escribir especificaciones de forma clara e inequívoca, ideal para la automatización.


La mejor manera de ver la diferencia es pensar en una jerarquía:

Usas el Estilo Narrativo para tener una conversación con tu equipo de producto y acordar qué se va a construir (User Story).
A partir de esa conversación, defines las reglas del negocio en un Estilo Especificación. Esto se convierte en tu "documento de diseño" vivo y en los criterios de aceptación de la User Story.
Finalmente, cada una de esas reglas (o escenarios de la tabla) se implementa como una o más pruebas Context/Specification (C/S) para garantizar que el código cumpla con esa especificación exacta y que no se rompa en el futuro.
No son estilos "vs", sino más bien pasos evolutivos en la definición y verificación del comportamiento de un sistema.

Decir que no son estilos "vs" sino "pasos evolutivos" es cambiar la perspectiva de una **elección técnica** a un **proceso de desarrollo colaborativo**. Piénsalo como la construcción de un coche:

1.  **Narrativa (El Boceto del Cliente):** El cliente le dice al diseñador: "Quiero un coche rápido, seguro y que se vea elegante". Es una visión, una historia. No habla de motores, chasis ni tipos de acero. Es el **inicio de la conversación**.
2.  **Especificación (El Pliego de Condiciones del Ingeniero):** El equipo de ingeniería traduce esa visión en reglas concretas: "El motor debe entregar 500 CV", "Debe pasar la prueba de impacto frontal Euro NCAP", "La aerodinámica debe generar un coeficiente de arrastre inferior a 0.25". Son especificaciones medibles y verificables, pero aún no son piezas de metal. Es el **contrato de lo que se va a construir**.
3.  **Context/Specification (La Prueba del Tornillo):** Un ingeniero en la línea de montaje necesita verificar que un tornillo específico en el chasis esté apretado con una fuerza de 5 Newton-metros. Escribe una prueba unitaria para la máquina atornilladora: "Dado que la máquina está calibrada, cuando atornille un tornillo M8, entonces debe registrar una torsión de 5 N·m". Es una prueba **aislada, rápida y automatizada** de una única unidad de trabajo.

Las tres son necesarias y se construyen una sobre la otra. La prueba del tornillo no reemplaza el pliego de condiciones, y el pliego de condiciones no reemplaza el boceto original. Juntos, aseguran que el coche final cumpla con la visión original del cliente.

---

### Manual de Usuario para Programadores Java: De la Conversación al Código Robusto

Este manual te guiará a través del flujo de trabajo evolutivo, mostrando cómo cada estilo de prueba se manifiesta en un proyecto Java típico usando herramientas populares como **Spring Boot, JUnit 5, Mockito y Cucumber-JVM**.

#### El Flujo de Trabajo Evolutivo en la Práctica

1.  **Paso 1: La Especificación como Contrato (Narrativa + Especificación)**
    *   **Herramientas:** Conversación con el Product Owner, pizarra, Cucumber (archivo `.feature`).
    *   **Objetivo:** Acordar el comportamiento externo visible del sistema sin entrar en detalles de implementación. Crear una "documentación viva".

2.  **Paso 2: La Especificación Ejecutable (Context/Specification a alto nivel)**
    *   **Herramientas:** Cucumber-JVM, Step Definitions.
    *   **Objetivo:** Traducir el contrato del Paso 1 a pruebas automatizadas de alto nivel (integración) que verifiquen flujos completos a través de la API o la UI.

3.  **Paso 3: La Implementación Guiada por la Especificación**
    *   **Herramientas:** Tu IDE, Spring Boot, lógica de negocio.
    *   **Objetivo:** Escribir el código de la aplicación (servicios, controladores, repositorios) que haga pasar las pruebas de Cucumber.

4.  **Paso 4: La Verificación a Nivel de Unidad (Context/Specification puro)**
    *   **Herramientas:** JUnit 5, Mockito.
    *   **Objetivo:** Descomponer la lógica compleja de tus servicios en unidades pequeñas y probarlas de forma aislada para garantizar su corrección y facilitar el refactorizado.

---

### Ejemplo Concreto: Feature de Registro de Usuario

Imaginemos que queremos implementar el registro de un nuevo usuario.

#### Paso 1: La Conversación y el Criterio de Aceptación (Archivo `.feature`)

El equipo de desarrollo, QA y el Product Owner acuerdan el comportamiento. Lo documentan en un archivo Gherkin dentro del proyecto (`src/test/resources/features/registro_usuario.feature`).

```gherkin
# src/test/resources/features/registro_usuario.feature

Feature: Registro de Nuevo Usuario
  Para que pueda acceder a la plataforma
  Como un nuevo visitante
  Quiero poder registrarme con mi email y una contraseña segura

  Scenario: Registro exitoso con datos válidos
    Given no existe un usuario registrado con el email "nuevo@email.com"
    When un visitante intenta registrarse con el email "nuevo@email.com" y la contraseña "UnaPasswordSegura123!"
    Then el sistema debe confirmar el registro
    And el nuevo usuario debe existir en la base de datos

  Scenario: No se permite el registro con un email ya existente
    Given un usuario con el email "ya.existe@email.com" ya está registrado
    When un visitante intenta registrarse con el email "ya.existe@email.com" y cualquier contraseña
    Then el sistema debe rechazar el registro
    And debe mostrar un mensaje de error "El email ya está en uso"
```

Este archivo es el **corazón del proceso**. Es el acuerdo único que guiará a todos los desarrolladores.

#### Paso 2: Conectando el Mundo Real con la Especificación (Step Definitions)

Ahora, creamos una clase Java que "escucha" los pasos definidos en el `.feature`. Esta clase orquestará la aplicación para ejecutar el escenario.

**Dependencias en `pom.xml`:**
```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>7.14.0</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-junit-platform-engine</artifactId>
    <version>7.14.0</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.junit.platform</groupId>
    <artifactId>junit-platform-suite</artifactId>
    <version>1.10.1</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <scope>test</scope>
</dependency>
```

**Clase del Runner de Cucumber:**
```java
// src/test/java/com/tuempresa/app/RunCucumberTest.java
package com.tuempresa.app;

import io.cucumber.junit.platform.engine.Cucumber;
import org.junit.platform.suite.api.SelectClasspathResource;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectClasspathResource("features")
@Cucumber
public class RunCucumberTest {
}
```

**Clase de Step Definitions:**
Esta clase contiene la lógica para cada paso `Given`, `When`, `Then`. Inyecta los servicios de la aplicación para poder interactuar con ella.

```java
// src/test/java/com/tuempresa/app/stepdefs/UsuarioStepDefinitions.java
package com.tuempresa.app.stepdefs;

import com.tuempresa.app.domain.Usuario;
import com.tuempresa.app.service.UsuarioService;
import io.cucumber.java.es.Cuando;
import io.cucumber.java.es.Dado;
import io.cucumber.java.es.Entonces;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UsuarioStepDefinitions {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TestRestTemplate restTemplate;

    private ResponseEntity<String> respuesta;
    private String email;

    @Dado("no existe un usuario registrado con el email {string}")
    public void no_existe_un_usuario_registrado_con_el_email(String email) {
        // Aseguramos el estado inicial limpio
        usuarioService.eliminarPorEmail(email);
    }

    @Dado("un usuario con el email {string} ya está registrado")
    public void un_usuario_con_el_email_ya_está_registrado(String email) {
        // Preparamos el estado para el segundo escenario
        usuarioService.registrar(email, "cualquier_contraseña");
    }
    
    @Cuando("un visitante intenta registrarse con el email {string} y la contraseña {string}")
    public void un_visitante_intenta_registrarse_con_el_email_y_la_contraseña(String email, String password) {
        this.email = email;
        // Simulamos una llamada HTTP POST a nuestra API de registro
        respuesta = restTemplate.postForEntity(
            "/api/usuarios/registro",
            new Usuario(null, email, password),
            String.class
        );
    }

    @Entonces("el sistema debe confirmar el registro")
    public void el_sistema_debe_confirmar_el_registro() {
        assertThat(respuesta.getStatusCode(), is(HttpStatus.CREATED));
    }

    @Entonces("el nuevo usuario debe existir en la base de datos")
    public void el_nuevo_usuario_debe_existir_en_la_base_de_datos() {
        assertThat(usuarioService.existePorEmail(email), is(true));
    }

    @Entonces("el sistema debe rechazar el registro")
    public void el_sistema_debe_rechazar_el_registro() {
        assertThat(respuesta.getStatusCode(), is(HttpStatus.BAD_REQUEST));
    }

    @Entonces("debe mostrar un mensaje de error {string}")
    public void debe_mostrar_un_mensaje_de_error(String mensajeEsperado) {
        assertThat(respuesta.getBody(), containsString(mensajeEsperado));
    }
}
```
**Importante:** En este punto, los tests de Cucumber fallarán porque el `UsuarioService` todavía no tiene la lógica implementada. ¡Estamos construyendo el test primero!

#### Paso 3: Implementación Guiada por la Especificación

Ahora, el desarrollador implementa el `UsuarioService` (y el `UsuarioController`) para que los tests de Cucumber pasen.

```java
// src/main/java/com/tuempresa/app/service/UsuarioService.java
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario registrar(String email, String password) {
        if (usuarioRepository.existsByEmail(email)) {
            throw new UsuarioYaExisteException("El email ya está en uso");
        }
        // Lógica de validación de password, encriptación, etc.
        Usuario nuevoUsuario = new Usuario(null, email, passwordEncriptada);
        return usuarioRepository.save(nuevoUsuario);
    }
    
    // ... otros métodos como existePorEmail, eliminarPorEmail ...
}

// Excepción personalizada
public class UsuarioYaExisteException extends RuntimeException {
    // ...
}
```
Al ejecutar `mvn test`, los tests de Cucumber ahora pasarán. ¡Hemos cumplido el contrato!

#### Paso 4: Verificación a Nivel de Unidad (JUnit 5 + Mockito)

El `UsuarioService` parece funcionar, pero ¿y si la lógica dentro de `registrar` se vuelve más compleja? Debemos probarla de forma aislada. Aquí es donde entra JUnit y Mockito.

Creamos un test de unidad para `UsuarioService`, **sin necesidad de Spring ni una base de datos real**.

```java
// src/test/java/com/tuempresa/app/service/UsuarioServiceTest.java
package com.tuempresa.app.service;

import com.tuempresa.app.exception.UsuarioYaExisteException;
import com.tuempresa.app.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository; // Mockeamos el repositorio

    @InjectMocks
    private UsuarioService usuarioService; // Inyectamos el mock en el servicio

    @Test
    void registrar_DeberiaLanzarExcepcion_WhenEmailYaExiste() {
        // Arrange (Contexto)
        String emailExistente = "ya.existente@email.com";
        when(usuarioRepository.existsByEmail(emailExistente)).thenReturn(true);

        // Act & Assert (Especificación/Resultado)
        // Esperamos que al llamar a registrar con un email existente, se lance la excepción
        assertThrows(UsuarioYaExisteException.class, () -> {
            usuarioService.registrar(emailExistente, "una-password-cualquiera");
        });

        // Verificamos que el método del repositorio fue llamado
        // verify(usuarioRepository).existsByEmail(emailExistente);
    }
}
```
Este test es **extremadamente rápido**, **aislado** y verifica la lógica de negocio de `UsuarioService` sin depender de ninguna otra capa.

### Resumen del Flujo Completo

1.  **Acuerdas el comportamiento** en un archivo `.feature` (Narrativa/Especificación).
2.  **Escribes un test de integración con Cucumber** que usa esa especificación como guía. El test falla.
3.  **Implementas el código de la aplicación (servicios, controladores)** hasta que el test de Cucumber pase.
4.  **Revisas el servicio implementado**. Si tiene lógica compleja, **escribes tests unitarios con JUnit y Mockito** para verificar cada parte de esa lógica en aislamiento. Estos tests también fallarán al principio.
5.  **Refactorizas tu servicio** sabiendo que tienes una red de seguridad de tests unitarios que te dicen si rompiste algo.
6.  Los tests de Cucumber siguen pasando, dándote confianza de que el flujo de negocio completo sigue intacto.

Este ciclo evolutivo te proporciona la máxima claridad, desde la visión del negocio hasta la implementación más íntima del código, con una suite de pruebas robusta y multifacética.