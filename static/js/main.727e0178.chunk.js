(this["webpackJsonpkruistocht-in-spijkerbroek"]=this["webpackJsonpkruistocht-in-spijkerbroek"]||[]).push([[0],{77:function(t,e,n){"use strict";n.r(e);var i=n(27),r=n(1),o=n.n(r),a=n(37),s=n.n(a),c=n(41),u=n(6),h=n(12),l=n.n(h),f=n(5),d=n(26),v=n(53),j=n(11);var b=function(t,e){var n=t*(Math.PI/180),i=Math.cos(n),r=Math.sin(n),o=Math.tan(n),a=e;return{degrees:t,radians:t*(Math.PI/180),tileSize:e,toPixels:function(t,n,o){return[(t+n)*i*e,(t-n)*r*e-a*o]},toCoords:function(t,n){var i=o*t+n;return[((n-i)/-r-i)/e,i/e]}}}(30,32);function p(t,e){var n=e.x-t.x;if(n)return-n;var i=t.y-e.y;if(i)return-i;var r=e.z-t.z;return r?-r:0}var x=n(2),O=function(t){var e=t.path,n=t.stroke,i=void 0===n?"black":n,r=t.strokeWidth,o=void 0===r?0:r,a=e.map((function(t){return b.toPixels.apply(b,Object(j.a)(t))})).map((function(t){return t.map((function(t){return t+0}))}));return Object(x.jsx)(x.Fragment,{children:a.reduce((function(t,e,n,r){return n?t.concat([Object(x.jsx)("line",{x1:e[0],y1:e[1],x2:r[n-1][0],y2:r[n-1][1],stroke:i,strokeWidth:String(o)},n)]):t}),[])})},y=function(t){var e=t.size,n=void 0===e?4:e,i=[[[-1*n,0,0],[n,0,0]],[[0,-1*n,0],[0,n,0]],[[0,0,-1*n],[0,0,n]]];return Object(x.jsx)(x.Fragment,{children:i.map((function(t,e){return Object(x.jsx)(O,{path:t,stroke:"rgba(0,0,0)",strokeWidth:.5},e)}))})},g=function(t){var e=t.x,n=void 0===e?0:e,i=t.y,o=void 0===i?0:i,a=t.z,s=void 0===a?0:a,c=t.children,u=t.crosshairSize,h=void 0===u?0:u,l=Object(r.useMemo)((function(){return b.toPixels(n,o,s)}),[n,o,s]);return Object(x.jsxs)("svg",{x:l[0],y:l[1],overflow:"visible",children:[h?Object(x.jsx)(y,{size:h}):null,c]})},m=function(t){var e=t.moveTo,n=t.moveSpeed,i=t.onRest,o=t.children,a=t.crosshairSize,s=void 0===a?0:a,c=Object(r.useMemo)((function(){return b.toPixels(e.x,e.y,e.z)}),[e]),u=Object(f.a)(c,2),h=u[0],l=u[1],j=Object(r.useMemo)((function(){return[h,l]}),[]),p=Object(f.a)(j,2),O=p[0],g=p[1],m=Object(d.useSpring)({to:{x:h,y:l},config:{duration:n},from:{x:O,y:g},onRest:i});return Object(x.jsxs)(v.animated.svg,{x:m.x,y:m.y,overflow:"visible",children:[s?Object(x.jsx)(y,{size:s}):null,o]})},k=n(15),w=n(24),z=["fill","strokeLinecap","stroke","strokeWidth","innerStroke","innerStrokeWidth"];function M(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t.map((function(t){return b.toPixels.apply(b,Object(j.a)(t))})).map((function(t){return t.map((function(t){return t+e}))}))}var S,E,W,I,F,P=b.toPixels(1,0,1).map((function(t){return t+0})),C=M([[1,1,0],[1,1,1],[0,1,1],[0,0,1],[0,0,0],[1,0,0]]),A=M([[0,0,0],[0,0,1],[1,0,1],[1,0,0]]),N=M([[1,0,0],[1,1,0],[1,1,1],[1,0,1]]),R=M([[0,0,1],[1,0,1],[1,1,1],[0,1,1]]),T=function(t){var e=t.fill,n=void 0===e?l()("#282c34"):e,i=t.strokeLinecap,r=void 0===i?"round":i,o=t.stroke,a=void 0===o?n.darken(.3).saturate(.3):o,s=t.strokeWidth,c=void 0===s?1:s,u=t.innerStroke,h=void 0===u?n.lighten(.4).desaturate(.8):u,f=t.innerStrokeWidth,d=void 0===f?c:f,v=Object(w.a)(t,z),j=h&&h.string(),b=a&&a.string(),p={};return(v.onClick||v.onContextMenu)&&(p.cursor="pointer"),Object(x.jsxs)("g",Object(k.a)(Object(k.a)({},v),{},{style:p,children:[n&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("polygon",{points:A.map((function(t){return t.join(",")})).join(" "),fill:n.string(),strokeWidth:0},"xz"),Object(x.jsx)("polygon",{points:R.map((function(t){return t.join(",")})).join(" "),fill:n.lighten(.2).string(),strokeWidth:0},"xy"),Object(x.jsx)("polygon",{points:N.map((function(t){return t.join(",")})).join(" "),fill:n.darken(.2).string(),strokeWidth:0},"yz")]}),h&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("line",{x1:P[0],y1:P[1],x2:C[3][0],y2:C[3][1],stroke:j,strokeWidth:d,strokeLinecap:r},"x-bar"),Object(x.jsx)("line",{x1:P[0],y1:P[1],x2:C[1][0],y2:C[1][1],stroke:j,strokeWidth:d,strokeLinecap:r},"y-bar"),Object(x.jsx)("line",{x1:P[0],y1:P[1],x2:C[5][0],y2:C[5][1],stroke:j,strokeWidth:d,strokeLinecap:r},"z-bar")]}),Object(x.jsx)("polygon",{points:C.map((function(t){return t.join(",")})).join(" "),stroke:b,fill:"transparent",strokeWidth:c,strokeLinecap:r},"outline")]}))},q=n(18),D=n(21),L=["zoom"],H=1/Math.pow(2,.5);function X(t){return Math.round(t)}var J,B=D.a.div(S||(S=Object(q.a)(["\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\twidth: 0;\n\theight: 0;\n\ttransition: transform 5s;\n\t> * {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t}\n"]))),U=function(t){var e=t.overlay,n=t.center,i=void 0===n?{x:0,y:0,z:0}:n,o=t.zoom,a=void 0===o?1:o,s=t.children,c=Object(r.useMemo)((function(){return b.toPixels(i.x,i.y,i.z).map((function(t,e){return X(-t)+(e?0:.5)}))}),[i]),u=Object(f.a)(c,2),h=u[0],l=u[1],d={transform:"translate(\n\t\t\t\t".concat(h*a,"px,\n\t\t\t\t").concat(l*a,"px\n\t\t\t)")};return Object(x.jsxs)(B,{style:d,children:[Object(x.jsx)(Y,{zoom:a,children:s}),e]})},Y=function(t){var e=t.zoom,n=void 0===e?1:e,i=Object(w.a)(t,L);return Object(x.jsx)("svg",Object(k.a)({width:"1px",height:"1px",overflow:"visible",shapeRendering:"geometricPrecision",viewBox:[0,0,1/n,1/n].join(" ")},i))},G=D.a.div(E||(E=Object(q.a)(["\n\t--scale-val: ",";\n\n\tposition: absolute;\n\ttransform-origin: top left;\n\ttransform: scale(var(--scale-val));\n"])),(function(t){var e=t.zoom;return void 0===e?1:e})),K=(Object(D.a)(G)(W||(W=Object(q.a)(["\n\ttransform: skewY(-","deg)\n\t\tscale(calc("," * var(--scale-val)), var(--scale-val));\n"])),b.degrees,H),Object(D.a)(G)(I||(I=Object(q.a)(["\n\ttransform: rotate(-","deg) skewX(","deg)\n\t\tscale(\n\t\t\tcalc("," * var(--scale-val)),\n\t\t\tcalc("," * var(--scale-val))\n\t\t);\n"])),b.degrees,b.degrees,Math.sqrt(H),H),Object(D.a)(G)(F||(F=Object(q.a)(["\n\ttransform: skewY(","deg)\n\t\tscale(calc("," * var(--scale-val)), var(--scale-val));\n"])),b.degrees,H),D.a.div(J||(J=Object(q.a)(["\n\tposition: relative;\n\theight: ",";\n\tbackground-image: linear-gradient(\n\t\t45deg,\n\t\trgba(255, 255, 255, 0.02) 25%,\n\t\trgba(0, 0, 0, 0.02) 25%,\n\t\trgba(0, 0, 0, 0.02) 50%,\n\t\trgba(255, 255, 255, 0.02) 50%,\n\t\trgba(255, 255, 255, 0.02) 75%,\n\t\trgba(0, 0, 0, 0.02) 75%,\n\t\trgba(0, 0, 0, 0.02) 100%\n\t);\n\tbackground-size: 56.57px 56.57px;\n\tmargin-bottom: 1em;\n"])),(function(t){var e=t.height;return"".concat(void 0===e?180:e,"px")}))),Q=function(){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(K,{children:Object(x.jsxs)(U,{zoom:1,center:{x:.5,y:.5,z:.5},children:[Object(x.jsx)(g,{x:-2,y:-2,z:0,children:Object(x.jsx)(T,{})}),Object(x.jsx)(g,{x:0,y:0,z:0,children:Object(x.jsx)(T,{innerStroke:l()("#630a0a7d"),fill:l()("#960202")})}),Object(x.jsx)(g,{x:2,y:2,z:0,children:Object(x.jsx)(T,{fill:l()("#ffffff7f"),onClick:function(){return window.alert("Clicky click!")}})})]})}),Object(x.jsx)(K,{children:Object(x.jsxs)(U,{center:{x:1,y:0,z:.5},children:[Object(x.jsx)(g,{x:0,y:0,z:0,children:Object(x.jsx)(T,{})}),Object(x.jsx)(g,{x:1,y:0,z:0,children:Object(x.jsx)(T,{})}),Object(x.jsx)(g,{x:2,y:0,z:0,children:Object(x.jsx)(T,{})}),Object(x.jsx)(g,{x:2,y:-1,z:0,children:Object(x.jsx)(T,{})})]})})]})},V=n(3),Z=n(4),$=function(){function t(e,n,i){Object(V.a)(this,t),this.x=void 0,this.y=void 0,this.z=void 0,this.x=e,this.y=n,this.z=i}return Object(Z.a)(t,[{key:"equals",value:function(t){return this===t||t&&this.x===t.x&&this.y===t.y&&this.z===t.z}},{key:"transform",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.x+=t,this.y+=e,this.z+=n,this}},{key:"hasNaN",value:function(){return isNaN(this.x)||isNaN(this.y)||isNaN(this.z)}},{key:"manhattanDistanceTo",value:function(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}},{key:"euclideanDistanceTo",value:function(t){var e=Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2));return Math.sqrt(Math.pow(e,2)+Math.pow(this.z-t.z,2))}},{key:"toString",value:function(){return[this.x,this.y,this.z].join(",")}}],[{key:"clone",value:function(e){return new t(e.x,e.y,e.z)}}]),t}(),_=n(8),tt=n(9),et=["fill","stroke","strokeWidth","zoom"],nt=[[1,0,0],[1,1,0],[0,1,0],[0,0,0]].map((function(t){return b.toPixels.apply(b,Object(j.a)(t))})).map((function(t){return t.map((function(t){return t+1}))})),it=function(t){var e=t.fill,n=void 0===e?l()("#282c34"):e,i=t.stroke,r=void 0===i?n.darken(.3).saturate(.3):i,o=t.strokeWidth,a=void 0===o?1:o,s=t.zoom,c=void 0===s?1:s,u=Object(w.a)(t,et);return Object(x.jsx)("polygon",Object(k.a)({points:nt.map((function(t){return t.map((function(t){return t*c})).join(",")})).join(" "),stroke:r.string(),fill:n.string(),strokeWidth:a},u))},rt=function(){function t(e){Object(V.a)(this,t),this.scoreFunction=void 0,this.content=[],this.content=[],this.scoreFunction=e}return Object(Z.a)(t,[{key:"push",value:function(t){this.content.push(t),this.sinkDown(this.content.length-1)}},{key:"pop",value:function(){var t=this.content[0],e=this.content.pop();return e?(this.content.length>0&&(this.content[0]=e,this.bubbleUp(0)),t):t}},{key:"remove",value:function(t){var e=this.content.indexOf(t),n=this.content.pop();n&&e!==this.content.length-1&&(this.content[e]=n,this.scoreFunction(n)<this.scoreFunction(t)?this.sinkDown(e):this.bubbleUp(e))}},{key:"size",value:function(){return this.content.length}},{key:"rescoreElement",value:function(t){this.sinkDown(this.content.indexOf(t))}},{key:"sinkDown",value:function(t){for(var e=this.content[t];t>0;){var n=(t+1>>1)-1,i=this.content[n];if(!(this.scoreFunction(e)<this.scoreFunction(i)))break;this.content[n]=e,this.content[t]=i,t=n}}},{key:"bubbleUp",value:function(t){for(var e=this.content.length,n=this.content[t],i=this.scoreFunction(n);;){var r=t+1<<1,o=r-1,a=null,s=void 0;if(o<e){var c=this.content[o];(s=this.scoreFunction(c))<i&&(a=o)}if(r<e){var u=this.content[r];this.scoreFunction(u)<(null===a?i:s)&&(a=r)}if(null===a)break;this.content[t]=this.content[a],this.content[a]=n,t=a}}}]),t}(),ot=function(t,e){return Math.abs(e.x-t.x)+Math.abs(e.y-t.y)};var at=function(){function t(e,n){var i=this;Object(V.a)(this,t),this.terrain=void 0,this.options=void 0,this.cache=void 0,this.heap=void 0,this.heuristic=void 0,this.terrain=e,this.options=n,this.cache=new Map,this.heap=new rt((function(t){var e=i.cache.get(t);if(!e)throw new Error("This is weird");return e.f})),this.heuristic=ot}return Object(Z.a)(t,[{key:"find",value:function(t,e){var n=t,i={coordinate:n,h:this.heuristic(t,e),g:0,f:0,parent:null,closed:!0,visited:!0};for(this.cache.set(t,i),this.heap.push(t);this.heap.size()>0;){var r=this.heap.pop(),o=this.cache.get(r);if(!o)throw new Error("Somehow opening a node that has no heuristic data");if(r===e)return this.tracePath(o);o.closed=!0;for(var a=this.terrain.getNeighbors(r),s=0,c=a.length;s<c;++s){var u,h=a[s],l=this.cache.get(h);if(!(null===(u=l)||void 0===u?void 0:u.closed)&&h.canWalkHere()){var f=o.g+(this.terrain,1),d=!!l;if(!d||l&&f<l.g){var v=this.heuristic(h,e);l={coordinate:h,h:v,g:f,f:f+v,parent:o,closed:!0,visited:!0},this.cache.set(h,l),this.options.closest&&(l.h<i.h||l.h===i.h&&l.g<i.g)&&(n=h,i=l),d?this.heap.rescoreElement(h):this.heap.push(h)}}}}return this.options.closest?this.tracePath(i):[]}},{key:"tracePath",value:function(t){for(var e=t,n=[];e.parent;)n.unshift(e),e=e.parent;return n.map((function(t){return t.coordinate}))}}]),t}(),st=function(){function t(){Object(V.a)(this,t),this.listeners=[]}return Object(Z.a)(t,[{key:"on",value:function(t){var e=this;return this.listeners.push(t),function(){e.listeners.splice(e.listeners.indexOf(t))}}},{key:"emit",value:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];this.listeners.forEach((function(t){return t.apply(void 0,e)}))}},{key:"clear",value:function(){this.listeners=[]}}]),t}(),ct=function(){},ut=function(){function t(e,n){var i=this;Object(V.a)(this,t),this.id=void 0,this.pathStart=new st,this.pathEnd=new st,this.pathStepStart=new st,this.pathStepEnd=new st,this.Component=function(){return null},this.location=void 0,this.job=void 0,this.id=e,this.location=n,this.pathStepEnd.on((function(t){i.location=t}))}return Object(Z.a)(t,[{key:"play",value:function(){var t;return(null===(t=this.job)||void 0===t?void 0:t.start())||ct}},{key:"doJob",value:function(t){this.job=t}},{key:"walkTo",value:function(t){var e=this;if(!this.location.terrain)throw new Error('Entity "'.concat(this.id,'" is trying to path in a detached coordinate'));var n=new at(this.location.terrain,{closest:!0}).find(this.location,t);if(n.length){var i=this.pathStepEnd.on((function(){var t=n.shift();t?e.doPathStep(t):(i(),e.pathEnd.emit())}));this.doPathStep(n.shift())}}},{key:"doPathStep",value:function(t){t.hasNaN(),this.pathStepStart.emit(t)}}]),t}(),ht=function(t){var e=t.entity,n=Object(r.useState)({destination:e.location,duration:0}),i=Object(f.a)(n,2),o=i[0],a=o.destination,s=o.duration,c=i[1];!function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=Object(r.useCallback)((function(){var e=t();return function(){return e.forEach((function(t){return t()}))}}),e);Object(r.useEffect)(n,[n])}((function(){return[e.pathStepStart.on((function(t){return c({destination:t,duration:200*e.location.euclideanDistanceTo(t)})}))]}),[e.pathStepStart]);var u=Object(r.useCallback)((function(){return e.pathStepEnd.emit(a)}),[e.pathStepEnd,a]);return Object(x.jsx)(m,{moveTo:a,moveSpeed:s,onRest:u,children:Object(x.jsx)(e.Component,{})})},lt=new $(-.25,-.25,0),ft=function(t){Object(_.a)(n,t);var e=Object(tt.a)(n);function n(){var t;Object(V.a)(this,n);for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return(t=e.call.apply(e,[this].concat(r))).Component=function(){return Object(x.jsx)(g,Object(k.a)(Object(k.a)({},lt),{},{children:Object(x.jsx)(it,{zoom:.5,fill:l()("#ff0000")})}))},t}return n}(ut),dt=function(t){Object(_.a)(n,t);var e=Object(tt.a)(n);function n(t,i){var r;if(Object(V.a)(this,n),(r=e.call(this,t)).waypoints=void 0,r.waypointIndex=void 0,i.length<2)throw new Error("A patrol must have at least 2 waypoints");return r.waypoints=i,r.waypointIndex=0,r}return Object(Z.a)(n,[{key:"start",value:function(){var t=this,e=[this.entity.pathEnd.on((function(){t.waypointIndex=(t.waypointIndex+1)%t.waypoints.length,setTimeout((function(){return t.entity.walkTo(t.waypoints[t.waypointIndex])}),500+1e3*Math.random())}))];return this.entity.walkTo(this.waypoints[0]),function(){return e.forEach((function(t){return t()}))}}}]),n}(function(){function t(e){Object(V.a)(this,t),this.entity=void 0,this.entity=e}return Object(Z.a)(t,[{key:"start",value:function(){throw new Error("Not implemented for ".concat(this.constructor.name))}}]),t}()),vt=function(t){Object(_.a)(n,t);var e=Object(tt.a)(n);function n(){var t;Object(V.a)(this,n);for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return(t=e.call.apply(e,[this].concat(r))).terrain=void 0,t}return Object(Z.a)(n,[{key:"equals",value:function(t){return this===t||t&&this.x===t.x&&this.y===t.y}},{key:"canWalkHere",value:function(){return this.z>0}}],[{key:"clone",value:function(t){return new n(t.x,t.y,t.z)}}]),n}($),jt=Symbol();function bt(t){var e=t.filter((function(t){return"number"===typeof t}));return e.reduce((function(t,e){return t+e}),0)/e.length}var pt,xt=function(){function t(e){Object(V.a)(this,t),this.size=void 0,this.max=void 0,this.map=void 0;var n=Math.ceil(Math.log(e)/Math.log(2));this.size=Math.pow(2,n)+1,this.max=this.size-1,this.map=new Float32Array(this.size*this.size)}return Object(Z.a)(t,[{key:"generate",value:function(t){this.set(0,0,this.max),this.set(this.max,0,this.max/2),this.set(this.max,this.max,0),this.set(0,this.max,this.max/2),this.divide(this.max,t)}},{key:"get",value:function(t,e){return t<0||t>this.max||e<0||e>this.max?jt:this.map[t+this.size*e]}},{key:"set",value:function(t,e,n){this.map[t+this.size*e]=n}},{key:"divide",value:function(t,e){var n,i,r=t/2,o=e*t;if(!(r<1)){for(i=r;i<this.max;i+=t)for(n=r;n<this.max;n+=t)this.square(n,i,r,Math.random()*o*2-o);for(i=0;i<=this.max;i+=r)for(n=(i+r)%t;n<=this.max;n+=t)this.diamond(n,i,r,Math.random()*o*2-o);this.divide(t/2,e)}}},{key:"square",value:function(t,e,n,i){var r=bt([this.get(t-n,e-n),this.get(t+n,e-n),this.get(t+n,e+n),this.get(t-n,e+n)]);this.set(t,e,r+i)}},{key:"diamond",value:function(t,e,n,i){var r=bt([this.get(t,e-n),this.get(t+n,e),this.get(t,e+n),this.get(t-n,e)]);this.set(t,e,r+i)}}]),t}(),Ot=function(){function t(e){var n=this;Object(V.a)(this,t),this.coordinates=void 0,this.coordinatesInRenderOrder=null,this.size=void 0,this.coordinates=e,this.coordinates.forEach((function(t){return t.terrain=n})),this.size=Math.sqrt(this.coordinates.length)}return Object(Z.a)(t,[{key:"getIndexForXy",value:function(t,e){return this.size*e+t}},{key:"getIslandOfCoordinate",value:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(t){return t.canWalkHere()},n=[],i=[],r=[t];r.length;){var o=r.shift();n.push(o);var a=this.getNeighbors(o).filter((function(t){return!i.includes(t)}));i.splice.apply(i,[0,0,o].concat(Object(j.a)(a))),r.splice.apply(r,[0,0].concat(Object(j.a)(a.filter(e))))}return n}},{key:"getIslands",value:function(){for(var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(t){return t.canWalkHere()},n=this.coordinates.slice(),i=[],r=function(){var r=n.shift();if(!e(r))return"continue";var o=t.getIslandOfCoordinate(r,e);n=n.filter((function(t){return!o.includes(t)})),i.push(o)};n.length;)r();return i}},{key:"getAtXy",value:function(t,e){if(!(t<0||t>this.size-1||e<0||e>this.size-1))return this.coordinates[this.getIndexForXy(t,e)]}},{key:"getNeighbors",value:function(t){var e=this;return[[-1,0],[1,0],[0,-1],[0,1]].map((function(n){var i=Object(f.a)(n,2),r=i[0],o=i[1];return e.getAtXy(t.x+r,t.y+o)})).filter(Boolean)}},{key:"getCoordinatesInRenderOrder",value:function(){return this.coordinatesInRenderOrder||(this.coordinatesInRenderOrder=this.coordinates.slice().sort(p)),this.coordinatesInRenderOrder}}],[{key:"generateRandom",value:function(e){var n=new xt(e);n.generate(1);var i=e,r=e,o=Array.from(new Array(i*r)).map((function(t,r){var o=r%i,a=Math.floor(r/i),s=n.get(o,a);if(s===jt)throw new Error("Out of bounds @ ".concat(o,", ").concat(a));return[o,a,2*s/e]})),a=o.map((function(t){return t[2]})).sort(),s=a[Math.floor(.25*a.length)];return new t(o.map((function(t){var e=Object(f.a)(t,3),n=e[0],i=e[1],r=e[2];return new vt(n,i,r-s)})))}}]),t}(),yt=function(){function t(e,n){Object(V.a)(this,t),this.terrain=void 0,this.entities=void 0,this.terrain=e,this.entities=n}return Object(Z.a)(t,[{key:"play",value:function(){var t=this.entities.map((function(t){return t.play()}));return function(){return t.forEach((function(t){return t()}))}}}],[{key:"generateRandom",value:function(e){var n=Ot.generateRandom(e),i=n.coordinates.filter((function(t){return t.canWalkHere()})),r=n.getIslands();return new t(n,Array.from(new Array(3)).map((function(t,e){var n=i[Math.floor(Math.random()*i.length)],o=r.find((function(t){return t.includes(n)}));if(!o)throw new Error;var a=new ft("guard-"+e,n);return a.doJob(new dt(a,Array.from(new Array(2+Math.floor(4*Math.random()))).map((function(){return o[Math.floor(Math.random()*o.length)]})))),a})))}}]),t}(),gt=D.a.section(pt||(pt=Object(q.a)(["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n"]))),mt=function(){return Object(x.jsx)(gt,{children:Object(x.jsx)("p",{children:"Heyyoo"})})},kt=["coordinate"],wt=function(t){var e=t.coordinate,n=Object(w.a)(t,kt),i=Object(r.useState)(!1),o=Object(f.a)(i,2),a=o[0],s=o[1],c=$.clone(e).transform(-.5,-.5,e.z<0?-e.z-.5:-1);return Object(x.jsx)(g,{x:c.x,y:c.y,z:c.z,children:e.z>0?Object(x.jsx)(T,Object(k.a)(Object(k.a)({},n),{},{fill:a?l()("#282c34").lighten(1):void 0,stroke:a?l()("#fff"):void 0,innerStroke:a?l()("#ccd1dd"):void 0,onMouseEnter:function(){return s(!0)},onMouseLeave:function(){return s(!1)}})):Object(x.jsx)(it,{fill:a?l()("#282c34").lighten(1).opaquer(-.5):l()("#282c34").opaquer(-.5),stroke:a?l()("#fff"):void 0,onMouseEnter:function(){return s(!0)},onMouseLeave:function(){return s(!1)}})},c.toString())},zt=function(){var t=Object(r.useMemo)((function(){var t=yt.generateRandom(40);return window.scene=t,t}),[]);Object(r.useEffect)((function(){return console.log("--- Scene#play ---"),t.play()}),[t]);var e=Object(r.useState)(t.terrain.getAtXy(Math.floor(20),Math.floor(20))),n=Object(f.a)(e,2),i=n[0],o=n[1],a=Object(r.useMemo)((function(){return t.terrain.getCoordinatesInRenderOrder().map((function(t){return Object(x.jsx)(wt,{coordinate:t,onClick:function(e){e.preventDefault(),o(t)}},t.toString())}))}),[t.terrain]),s=Object(r.useMemo)((function(){return t.entities.slice().sort((function(t,e){return p(t.location,e.location)})).map((function(t){return Object(x.jsx)(ht,{entity:t},t.id)}))}),[t.entities]);return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)(U,{center:i,zoom:1,children:[Object(x.jsx)("g",{id:"scene-terrain",children:a}),Object(x.jsx)("g",{id:"scene-entities",children:s})]}),Object(x.jsx)(mt,{})]})};function Mt(){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("ul",{children:Object(x.jsx)("li",{children:Object(x.jsx)(c.b,{to:"/tests",children:"Tests"})})}),Object(x.jsx)(u.a,{exact:!0,path:"/tests",component:Q})]})}var St,Et=function(){return Object(x.jsxs)(u.c,{children:[Object(x.jsx)(u.a,{exact:!0,path:"/",component:zt}),Object(x.jsx)(u.a,{component:Mt})]})},Wt=n.p+"static/media/nebula-282c34.dda754f6.png",It=Object(i.b)(St||(St=Object(q.a)(["\n\tbody {\n\t\tbackground: #282c34 url(",");\n\t}\n"])),Wt);s.a.render(Object(x.jsxs)(o.a.StrictMode,{children:[Object(x.jsx)(i.a,{styles:It}),Object(x.jsx)(c.a,{hashType:"slash",children:Object(x.jsx)(Et,{})})]}),document.getElementById("root"))}},[[77,1,2]]]);
//# sourceMappingURL=main.727e0178.chunk.js.map