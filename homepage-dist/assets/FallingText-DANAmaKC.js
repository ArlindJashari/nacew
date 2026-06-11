import{a as e}from"./rolldown-runtime-Cyuzqnbw.js";import{c as t,s as n}from"./motion-BJb03Ltd.js";import{t as r}from"./physics-D_14IlgW.js";var i=e(t(),1),a=e(r(),1),o=n(),s=({className:e=``,text:t=``,highlightWords:n=[],highlightClass:r=`highlighted`,trigger:s=`scroll`,backgroundColor:c=`transparent`,wireframes:l=!1,gravity:u=.6,mouseConstraintStiffness:d=.9,fontSize:f=`1rem`})=>{let p=(0,i.useRef)(null),m=(0,i.useRef)(null),h=(0,i.useRef)(null),[g,_]=(0,i.useState)(!1);(0,i.useEffect)(()=>{let e=t.split(` `).map((e,t)=>({"Product-Building":`<div class="word shape-tooltip shape-product">
            <div class="tooltip-tag" style="background: #eab308; color: #111;">Product</div>
            <svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" style="margin-right: 6px; vertical-align: middle;">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 7v10" />
              <path d="M12 12v10" />
              <path d="M22 7v10" />
            </svg>
            <span style="vertical-align: middle;">Product-Building</span>
          </div>`,Development:`<div class="word shape-development">
            <svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: middle;">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="10" y1="6" x2="10.01" y2="6" />
              <line x1="14" y1="6" x2="14.01" y2="6" />
            </svg>
            <span class="dev-text" style="vertical-align: middle;">Development</span>
            <span class="cursor-blink">_</span>
          </div>`,"UI/UX":`<div class="word shape-tooltip shape-uiux">
            <div class="tooltip-tag" style="background: #ff7a29; color: #fff;">Alice</div>
            <svg class="uiux-cursor" width="14" height="14" viewBox="0 0 24 24" fill="#ff7a29" style="position: absolute; left: -8px; top: -12px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); z-index: 5;">
              <path d="M4.5 2.5v19l5.5-5.5h8.5z"/>
            </svg>
            <svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff7a29" stroke-width="2" style="margin-right: 6px; vertical-align: middle;">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M21 12H3" />
              <path d="M12 3v18" />
            </svg>
            <span style="vertical-align: middle;">UI/UX</span>
          </div>`,"UX-Strategy":`<div class="word shape-tooltip shape-uxstrategy">
            <div class="tooltip-tag" style="background: #a855f7; color: #fff;">Vincent</div>
            <svg class="uiux-cursor" width="14" height="14" viewBox="0 0 24 24" fill="#a855f7" style="position: absolute; left: -8px; top: -12px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); z-index: 5;">
              <path d="M4.5 2.5v19l5.5-5.5h8.5z"/>
            </svg>
            <svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" style="margin-right: 6px; vertical-align: middle;">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <span style="vertical-align: middle;">UX-Strategy</span>
          </div>`,Dashboards:`<div class="word shape-dashboard">
            <svg class="icon-svg" width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" style="margin-right: 8px; vertical-align: middle;">
              <line x1="6" y1="20" x2="6" y2="12" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="18" y1="20" x2="18" y2="8" />
            </svg>
            <span style="vertical-align: middle; color: #fff;">Dashboards</span>
            <svg class="icon-svg sparkline" width="18" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linejoin="round" style="margin-left: 8px; vertical-align: middle;">
              <path d="M3 17l6-6 4 4 8-8" />
            </svg>
          </div>`,CRMs:`<div class="word shape-crm">
            <div class="avatar-circle">C</div>
            <span style="vertical-align: middle; margin-right: 6px;">CRMs</span>
            <svg class="icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>`,Automations:`<div class="word shape-automation">
            <svg class="icon-svg spark-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d084" stroke-width="2" style="margin-right: 6px; vertical-align: middle;">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#00d084" />
            </svg>
            <span class="node-dot"></span>
            <span style="vertical-align: middle; margin: 0 4px;">Automations</span>
            <span class="node-dot glow"></span>
          </div>`,"Web-Apps":`<div class="word shape-webapp">
            <span class="browser-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </span>
            <span style="vertical-align: middle;">Web-Apps</span>
            <svg class="icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 8px; vertical-align: middle; opacity: 0.5;">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>`,"Mobile-Apps":`<div class="word shape-mobileapp">
            <span class="phone-notch"></span>
            <svg class="icon-svg" width="12" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" style="margin-right: 6px; vertical-align: middle; opacity: 0.8;">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12" y2="18" />
            </svg>
            <span style="vertical-align: middle;">Mobile-Apps</span>
            <span class="battery-icon"></span>
          </div>`,Graphics:`<div class="word shape-graphics">
            <svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ec4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12" />
              <circle cx="12" cy="12" r="3" fill="#ec4899" />
            </svg>
            <span style="vertical-align: middle; margin-right: 8px;">Graphics</span>
            <span class="toolbar-hint">B <i>I</i> <u>U</u></span>
          </div>`,"Motion-Design":`<div class="word shape-motion">
            <span class="motion-play">▶</span>
            <span style="vertical-align: middle; margin: 0 4px;">Motion-Design</span>
            <span class="keyframe-diamond">◆</span>
          </div>`,"SaaS-Replacement":`<div class="word shape-saas">
            <span style="vertical-align: middle; margin-right: 8px;">SaaS-Replacement</span>
            <span class="toggle-switch active"><span class="toggle-handle"></span></span>
          </div>`,"Custom-Code":`<div class="word shape-customcode">
            <svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: middle;">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span style="vertical-align: middle; color: #fff; font-family: monospace;">Custom-Code</span>
          </div>`,"Software-Engineering":`<div class="word shape-software">
            <svg class="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: middle;">
              <line x1="6" y1="3" x2="6" y2="15" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
            <span style="vertical-align: middle; margin-right: 6px;">Software-Engineering</span>
            <span class="branch-badge">main</span>
          </div>`,Branding:`<div class="word shape-branding">
            <svg class="branding-pentol" width="28" height="24" viewBox="0 0 28 24" fill="none" style="margin-right: 6px; display: inline-block; vertical-align: middle;">
              <path d="M2 18 C 6 6, 12 6, 18 14" stroke="url(#pentol-curve-${t})" stroke-width="2" fill="none" />
              <line x1="6" y1="6" x2="12" y2="6" stroke="#eb144c" stroke-width="1.2" stroke-dasharray="2 2" />
              <circle cx="6" cy="6" r="2" fill="#eb144c" />
              <circle cx="12" cy="6" r="2" fill="#eb144c" />
              <circle cx="18" cy="14" r="3.5" fill="#fff" stroke="#eb144c" stroke-width="1.5" />
              <g transform="translate(18, 14) rotate(45) translate(-6, -6)">
                <path d="M0 12 L4 4 L8 12 L4 10 Z" fill="url(#nib-gradient-${t})" />
                <circle cx="4" cy="7" r="1" fill="#fff" />
              </g>
              <defs>
                <linearGradient id="pentol-curve-${t}" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#eb144c" stop-opacity="0.2" />
                  <stop offset="100%" stop-color="#eb144c" />
                </linearGradient>
                <linearGradient id="nib-gradient-${t}" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#fff" />
                  <stop offset="100%" stop-color="#eb144c" />
                </linearGradient>
              </defs>
            </svg>
            <span style="vertical-align: middle;">Branding</span>
          </div>`,Marketing:`<div class="word shape-marketing">
            <svg class="icon-svg megaphone-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke-dasharray="2 2" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            <span style="vertical-align: middle;">Marketing</span>
          </div>`})[e]||`<div class="word shape-chat">${e}</div>`).join(` `);m.current.innerHTML=e},[t,n,r]),(0,i.useEffect)(()=>{if(s===`auto`){_(!0);return}if(s===`scroll`&&p.current){let e=document.querySelector(`.framer-1u2ch62`)||document.querySelector(`.framer-wxx824-container`)||p.current,t=new IntersectionObserver(([e])=>{e.isIntersecting&&(_(!0),t.disconnect())},{threshold:.1});return t.observe(e),()=>t.disconnect()}},[s]),(0,i.useEffect)(()=>{if(!g)return;if(window.innerWidth<=900){p.current&&p.current.classList.add(`mobile-static-mode`);return}let{Engine:e,Render:t,World:n,Bodies:r,Runner:i,Mouse:o,MouseConstraint:s}=a.default,f=p.current.getBoundingClientRect(),_=f.width,v=p.current.closest(`section`),y=v?v.getBoundingClientRect().bottom-f.top:f.height;if(_<=0||y<=0)return;let b=e.create();b.world.gravity.y=u;let x=t.create({element:h.current,engine:b,options:{width:_,height:y,background:c,wireframes:l}}),S={isStatic:!0,render:{fillStyle:`transparent`}},C=e=>e<480?380:e<768?300:e<1024?240:170,w=C(_);p.current.style.height=w+80+`px`;let T=r.rectangle(_/2,w,_,50,S),E=r.rectangle(-25,y/2,50,y,S),D=r.rectangle(_+25,y/2,50,y,S),O=r.rectangle(_/2,-1e3,_,50,S),k=setTimeout(()=>{a.default.Body.setPosition(O,{x:_/2,y:-300})},2500),A=[...m.current.querySelectorAll(`.word`)].map((e,t)=>{let n=e.getBoundingClientRect(),i=n.left-f.left+n.width/2,o=-80-t*45-Math.random()*30,s=r.rectangle(i,o,n.width,n.height,{render:{fillStyle:`transparent`},restitution:.15,frictionAir:.04,friction:.3});return a.default.Body.setVelocity(s,{x:(Math.random()-.5)*1.5,y:0}),a.default.Body.setAngularVelocity(s,(Math.random()-.5)*.015),{elem:e,body:s}});A.forEach(({elem:e,body:t})=>{e.style.position=`absolute`,e.style.left=`${t.position.x}px`,e.style.top=`${t.position.y}px`,e.style.transform=`translate(-50%, -50%)`});let j=o.create(p.current),M=s.create(b,{mouse:j,constraint:{stiffness:d,render:{visible:!1}}});x.mouse=j,n.add(b.world,[T,E,D,O,M,...A.map(e=>e.body)]);let N=i.create();i.run(N,b),t.run(x);let P=p.current,F=e=>{e.target.closest(`.word`)&&(P.style.pointerEvents=`auto`)},I=()=>{P.style.pointerEvents=`none`,j.button=-1};P.addEventListener(`mousedown`,F,!0),P.addEventListener(`touchstart`,F,!0),window.addEventListener(`mouseup`,I),window.addEventListener(`touchend`,I);let L,R=()=>{A.forEach(({body:e,elem:t})=>{let{x:n,y:r}=e.position;t.style.left=`${n}px`,t.style.top=`${r}px`,t.style.transform=`translate(-50%, -50%) rotate(${e.angle}rad)`}),a.default.Engine.update(b),L=requestAnimationFrame(R)};L=requestAnimationFrame(R);let z=()=>{if(!p.current)return;let e=p.current.getBoundingClientRect(),t=e.width,n=p.current.closest(`section`),r=n?n.getBoundingClientRect().bottom-e.top:500;if(t<=0||r<=0)return;x.options.width=t,x.options.height=r,x.canvas&&(x.canvas.width=t,x.canvas.height=r);let i=C(t);p.current.style.height=i+80+`px`,a.default.Body.setPosition(T,{x:t/2,y:i}),a.default.Body.setPosition(D,{x:t+25,y:r/2}),a.default.Body.setPosition(E,{x:-25,y:r/2}),O.position.y>-100?a.default.Body.setPosition(O,{x:t/2,y:-25}):a.default.Body.setPosition(O,{x:t/2,y:-1e3})};return window.addEventListener(`resize`,z),()=>{if(P.removeEventListener(`mousedown`,F,!0),P.removeEventListener(`touchstart`,F,!0),window.removeEventListener(`mouseup`,I),window.removeEventListener(`touchend`,I),window.removeEventListener(`resize`,z),clearTimeout(k),cancelAnimationFrame(L),t.stop(x),i.stop(N),x.canvas&&h.current)try{h.current.removeChild(x.canvas)}catch{}n.clear(b.world),e.clear(b)}},[g,u,l,c,d]);let v=()=>{!g&&(s===`click`||s===`hover`)&&_(!0)};return(0,o.jsxs)(`div`,{ref:p,className:`falling-text-container ${e}`,onClick:s===`click`?v:void 0,onMouseEnter:s===`hover`?v:void 0,style:{position:`relative`,overflow:`visible`},children:[(0,o.jsx)(`div`,{ref:m,className:`falling-text-target`,style:{fontSize:f,lineHeight:1.4,opacity:+!!g,visibility:g?`visible`:`hidden`,transition:`opacity 0.3s ease`}}),(0,o.jsx)(`div`,{ref:h,className:`falling-text-canvas`})]})};export{s as default};