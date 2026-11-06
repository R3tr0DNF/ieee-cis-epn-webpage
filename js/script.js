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
    document.title=titles[id]+' | IEEE CIS EPN';
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


  // Red neuronal animada en canvas (siempre activa)
  (function(){
    var cv=document.getElementById('net'), cx=cv.getContext('2d'), hero=document.getElementById('hero');
    var COLORS=['#00B5E2','#E87722','#FFFFFF'], LINK=140, P=[], W=0, H=0, dirty=true;
    function resize(){
      var r=hero.getBoundingClientRect();
      if(!r.width) return false;                       // la pestaña Inicio no está visible
      if(r.width===W && r.height===H) return true;
      var dpr=Math.min(window.devicePixelRatio||1,2);
      W=r.width; H=r.height; cv.width=W*dpr; cv.height=H*dpr; cx.setTransform(dpr,0,0,dpr,0,0);
      var n=Math.min(110,Math.round(W*H/9000)); P=[];
      for(var i=0;i<n;i++) P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.7,vy:(Math.random()-.5)*.7,r:Math.random()*2+1.2,c:COLORS[Math.floor(Math.random()*3)]});
      dirty=true; return true;
    }
    function draw(step){
      cx.clearRect(0,0,W,H);
      var i,j,a,b,dx,dy,d;
      if(step) for(i=0;i<P.length;i++){a=P[i];a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1}
      cx.lineWidth=.9;
      for(i=0;i<P.length;i++) for(j=i+1;j<P.length;j++){
        a=P[i];b=P[j];dx=a.x-b.x;dy=a.y-b.y;d=Math.sqrt(dx*dx+dy*dy);
        if(d<LINK){cx.strokeStyle='rgba(0,181,226,'+((1-d/LINK)*.55).toFixed(3)+')';cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()}
      }
      for(i=0;i<P.length;i++){a=P[i];cx.fillStyle=a.c;cx.beginPath();cx.arc(a.x,a.y,a.r,0,6.2832);cx.fill()}
    }
    function loop(){
      if(resize()){
        var paused=false;
        if(!paused||dirty){draw(!paused);dirty=false}
      }
      requestAnimationFrame(loop);
    }
    loop();
  })();

  burger.addEventListener('click',function(){
    var open=menu.classList.toggle('open');
    burger.setAttribute('aria-expanded',open);
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
