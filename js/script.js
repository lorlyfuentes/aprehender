/* 1) cerrar el menú móvil al elegir una opción
   bootstrap abre el menú con el botón hamburguesa pero no lo cierra
   al hacer clic en un enlace; sin esto el menú tapa la sección a la que se salta */
document.querySelectorAll('#navMenu .menu-enlace').forEach(function (enlace) {
  enlace.addEventListener('click', function () {
    const menu = document.getElementById('navMenu');
    bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});


/* 2) resaltar en el menú la sección visible
   se escribió a mano en vez de usar el scrollspy de bootstrap.
   rootMargin deja una franja en el centro de la pantalla: la sección
   que cruza esa franja es la activa, aunque sea más alta que la pantalla */
const secciones = document.querySelectorAll('main section[id]');
const enlacesMenu = document.querySelectorAll('#navMenu .menu-enlace');

const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      const idVisible = entrada.target.getAttribute('id');
      enlacesMenu.forEach(function (enlace) {
        enlace.classList.toggle('active', enlace.getAttribute('href') === '#' + idVisible);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

secciones.forEach(function (seccion) {
  observador.observe(seccion);
});