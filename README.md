# Gestión de Reparaciones - Arquitectura Hexagonal

Este proyecto implementa un sistema para la gestión de reparaciones, diseñado bajo el patrón de **Arquitectura Hexagonal** (o *Ports and Adapters*). La idea central es mantener el núcleo de la aplicación (la lógica de negocio) independiente de las tecnologías y frameworks externos, facilitando la mantenibilidad, escalabilidad y pruebas.

---

## Visión General

La arquitectura hexagonal organiza la aplicación en torno a un **núcleo de dominio** que contiene las reglas y la lógica de negocio. Alrededor del núcleo se definen **puertos** (interfaces) que permiten la comunicación con el exterior a través de **adaptadores**. Esto permite cambiar la infraestructura o las interfaces de usuario sin afectar la lógica central del sistema.

---

## Capas y Componentes

### 1. Núcleo de Dominio
- **Entidades y Modelos:** Aquí se encuentran las clases y estructuras que representan el dominio del problema (por ejemplo, Reparación, Técnico, Cliente, etc.).
- **Reglas de Negocio:** Contiene la lógica esencial y las validaciones inherentes al negocio de reparaciones.
- **Casos de Uso (Use Cases):** Definen las operaciones y procesos que el sistema debe realizar (registrar una reparación, actualizar el estado de una reparación, asignar técnicos, etc.).

### 2. Puertos (Interfaces)
- **Puertos de Entrada:** Definen cómo interactúan los usuarios o sistemas externos con el núcleo. Por ejemplo, interfaces REST o controladores de interfaz gráfica.
- **Puertos de Salida:** Especifican los contratos para la comunicación hacia el exterior, como el acceso a bases de datos, servicios de mensajería, o integración con otros sistemas.

### 3. Adaptadores
- **Adaptadores de Entrada:** Implementan los puertos de entrada. Ejemplos incluyen controladores HTTP, APIs REST o interfaces de usuario. Estos adaptadores se encargan de transformar las peticiones externas en llamadas a los casos de uso del dominio.
- **Adaptadores de Salida:** Implementan los puertos de salida. Por ejemplo, repositorios para persistir datos en bases de datos, clientes para servicios externos o módulos de integración. Permiten que el núcleo no dependa directamente de tecnologías específicas.

---

## Beneficios de la Arquitectura Hexagonal

- **Desacoplamiento:** La lógica de negocio se mantiene independiente de los detalles de infraestructura, facilitando cambios y mejoras sin impacto en el core.
- **Testabilidad:** Es posible probar el núcleo de la aplicación de forma aislada, simulando (mockeando) los adaptadores de entrada y salida.
- **Flexibilidad y Escalabilidad:** Permite integrar nuevos adaptadores o cambiar los existentes (por ejemplo, migrar a otra base de datos o añadir nuevos canales de entrada) sin modificar el dominio.

---

## Relación con el Proyecto

En el proyecto **GestionReparaciones** se ha adoptado este enfoque para:

- **Centralizar la lógica de negocio:** Toda la información y procesos relacionados con la gestión de reparaciones se encuentran en el núcleo, garantizando una estructura limpia y coherente.
- **Aislar dependencias:** Los detalles de la implementación (como la persistencia en bases de datos, la comunicación con APIs externas o la interfaz de usuario) se gestionan a través de adaptadores, permitiendo evolucionar cada componente de forma independiente.
- **Facilitar el mantenimiento:** Al tener una separación clara entre el dominio y las infraestructuras, el proyecto se vuelve más sencillo de mantener y extender en el tiempo.

---

## Diagrama Conceptual

A continuación, se presenta un diagrama simplificado de la arquitectura:

      ┌─────────────────────────┐
      │   Adaptadores de        │
      │   Entrada (UI, APIs)    │
      └────────────┬────────────┘
                   │
           ┌───────▼───────┐
           │    Casos de   │
           │     Uso       │
           └───────┬───────┘
                   │
           ┌───────▼───────┐
           │ Núcleo de     │
           │  Dominio      │
           └───────┬───────┘
                   │
      ┌────────────▼────────────┐
      │ Adaptadores de Salida   │
      │ (Persistencia, Integr.) │
      └─────────────────────────┘
