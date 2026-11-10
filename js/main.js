/* IEEE CIS EPN · Rama Estudiantil — Navegación por pestañas, menú móvil,
   barra superior, control de animación y formulario de contacto. */
(function(){
  var tabs=['inicio','directiva','iniciativas','contacto'];
  var menu=document.getElementById('menu'), burger=document.getElementById('burger');
  var titles={inicio:'Inicio',directiva:'Directiva y voluntarios',iniciativas:'Iniciativas',contacto:'Contacto'};

  function show(id,focus){
    if(tabs.indexOf(id)<0) id='inicio';
    tabs.forEach(function(t){document.getElementById(t).classList.toggle('active',t===id)});
    document.querySelectorAll('nav a').forEach(function(a){
      if(a.dataset.tab===id) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
    document.title=titles[id]+' | IEEE SB EPN';
    menu.classList.remove('open'); burger.setAttribute('aria-expanded','false');
    window.scrollTo(0,0);
    if(focus) document.getElementById('contenido').focus({preventScroll:true});
  }
  window.addEventListener('hashchange',function(){show(location.hash.slice(1),true)});
  show(location.hash.slice(1),false);

  // La barra superior IEEE se oculta al bajar y reaparece al volver arriba
  var top=document.getElementById('top'), ticking=false;
  function onScroll(){
    var y=window.scrollY;
    if(y>80) top.classList.add('scrolled');
    else if(y<10) top.classList.remove('scrolled');
    ticking=false;
  }
  window.addEventListener('scroll',function(){
    if(!ticking){ticking=true;requestAnimationFrame(onScroll)}
  },{passive:true});
  onScroll();

  burger.addEventListener('click',function(){
    var open=menu.classList.toggle('open');
    burger.setAttribute('aria-expanded',open);
  });

  var motion=document.getElementById('motion'), hero=document.getElementById('hero');
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){hero.classList.add('paused');motion.textContent='Reanudar animación';motion.setAttribute('aria-pressed','true')}
  motion.addEventListener('click',function(){
    var p=hero.classList.toggle('paused');
    motion.textContent=p?'Reanudar animación':'Pausar animación';
    motion.setAttribute('aria-pressed',p);
  });

  // Formulario: abre el correo del usuario hasta conectar un servicio de envío real.
  var RAMA_EMAIL='correo-rama@ieee.org'; // TODO: reemplazar por el correo oficial @ieee.org
  document.getElementById('form').addEventListener('submit',function(e){
    e.preventDefault();
    var f=e.target, msg=document.getElementById('form-msg');
    if(!f.checkValidity()){msg.textContent='Completa todos los campos con un correo válido.';f.reportValidity();return}
    var body='Nombre: '+f.nombre.value+'\nCorreo: '+f.email.value+'\n\n'+f.mensaje.value;
    location.href='mailto:'+RAMA_EMAIL+'?subject='+encodeURIComponent(f.asunto.value)+'&body='+encodeURIComponent(body);
    msg.textContent='Se abrió tu aplicación de correo para enviar el mensaje.';
  });
})();
