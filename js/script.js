/* =========================================================
   1)cerrar el menú móvil al elegir una opción
   bootstrap abre el menú con el botón hamburguesa, pero no lo
   cierra automáticamente cuando el usuario hace clic en un
   enlace. sin esto, el menú se quedaría abierto tapando la
   sección a la que se acaba de saltar
========================================================= */
document.querySelectorAll('#navMenu .menu-enlace').forEach(function (enlace) {
  enlace.addEventListener('click', function () {
    var menu = document.getElementById('navMenu');
    var instancia = bootstrap.Collapse.getOrCreateInstance(menu);
    instancia.hide();
  });
});


/* =========================================================
   2) resaltar en el menú la sección visible en pantalla
   mientras el usuario hace scroll, este bloque detecta qué
   sección está viendo y le cambia el color al enlace del menú
   correspondiente (como el punto que se mueve en un gps).
   se escribió a mano, en vez de usar el scrollspy de bootstrap,
   para tener control total sobre cómo funciona
========================================================= */
const secciones = document.querySelectorAll('main section[id]');
const enlacesMenu = document.querySelectorAll('#navMenu .menu-enlace');

const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      const idVisible = entrada.target.getAttribute('id');
      enlacesMenu.forEach(function (enlace) {
        enlace.classList.remove('active');
        if (enlace.getAttribute('href') === '#' + idVisible) {
          enlace.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.5 });

secciones.forEach(function (seccion) {
  observador.observe(seccion);
});