try {
 self["workbox:window:6.1.5"] && _();
} catch (t) {}
function t(t, s) {
 return new Promise((i) => {
  const e = new MessageChannel();
  (e.port1.onmessage = (t) => {
   i(t.data);
  }),
   t.postMessage(s, [e.port2]);
 });
}
try {
 self["workbox:core:6.1.5"] && _();
} catch (t) {}
class s {
 constructor() {
  this.promise = new Promise((t, s) => {
   (this.resolve = t), (this.reject = s);
  });
 }
}
function i(t, s) {
 const { href: i } = location;
 return new URL(t, i).href === new URL(s, i).href;
}
class e {
 constructor(t, s) {
  (this.type = t), Object.assign(this, s);
 }
}
const h = { type: "SKIP_WAITING" };
class n extends class {
 constructor() {
  this.Lt = new Map();
 }
 addEventListener(t, s) {
  this.It(t).add(s);
 }
 removeEventListener(t, s) {
  this.It(t).delete(s);
 }
 dispatchEvent(t) {
  t.target = this;
  const s = this.It(t.type);
  for (const i of s) i(t);
 }
 It(t) {
  return this.Lt.has(t) || this.Lt.set(t, new Set()), this.Lt.get(t);
 }
} {
 constructor(t, h = {}) {
  super(),
   (this.Bt = {}),
   (this.Tt = 0),
   (this.Mt = new s()),
   (this.At = new s()),
   (this.Gt = new s()),
   (this.Kt = 0),
   (this.Nt = new Set()),
   (this.Ot = () => {
    const t = this.zt,
     s = t.installing;
    this.Tt > 0 || !i(s.scriptURL, this.Ft) || performance.now() > this.Kt + 6e4
     ? ((this.Ht = s), t.removeEventListener("updatefound", this.Ot))
     : ((this.Jt = s), this.Nt.add(s), this.Mt.resolve(s)),
     ++this.Tt,
     s.addEventListener("statechange", this.Qt);
   }),
   (this.Qt = (t) => {
    const s = this.zt,
     i = t.target,
     { state: h } = i,
     n = i === this.Ht,
     a = { sw: i, isExternal: n, originalEvent: t };
    !n && this.Vt && (a.isUpdate = !0),
     this.dispatchEvent(new e(h, a)),
     "installed" === h
      ? (this.Xt = self.setTimeout(() => {
         "installed" === h && s.waiting === i && this.dispatchEvent(new e("waiting", a));
        }, 200))
      : "activating" === h && (clearTimeout(this.Xt), n || this.At.resolve(i));
   }),
   (this.Yt = (t) => {
    const s = this.Jt,
     i = s !== navigator.serviceWorker.controller;
    this.dispatchEvent(
     new e("controlling", { isExternal: i, originalEvent: t, sw: s, isUpdate: this.Vt })
    ),
     i || this.Gt.resolve(s);
   }),
   (this.Zt = async (t) => {
    const { data: s, source: i } = t;
    await this.getSW(),
     this.Nt.has(i) && this.dispatchEvent(new e("message", { data: s, sw: i, originalEvent: t }));
   }),
   (this.Ft = t),
   (this.Bt = h),
   navigator.serviceWorker.addEventListener("message", this.Zt);
 }
 async register({ immediate: t = !1 } = {}) {
  t ||
   "complete" === document.readyState ||
   (await new Promise((t) => window.addEventListener("load", t))),
   (this.Vt = Boolean(navigator.serviceWorker.controller)),
   (this.ts = this.ss()),
   (this.zt = await this.es()),
   this.ts &&
    ((this.Jt = this.ts),
    this.At.resolve(this.ts),
    this.Gt.resolve(this.ts),
    this.ts.addEventListener("statechange", this.Qt, { once: !0 }));
  const s = this.zt.waiting;
  return (
   s &&
    i(s.scriptURL, this.Ft) &&
    ((this.Jt = s),
    Promise.resolve()
     .then(() => {
      this.dispatchEvent(new e("waiting", { sw: s, wasWaitingBeforeRegister: !0 }));
     })
     .then(() => {})),
   this.Jt && (this.Mt.resolve(this.Jt), this.Nt.add(this.Jt)),
   this.zt.addEventListener("updatefound", this.Ot),
   navigator.serviceWorker.addEventListener("controllerchange", this.Yt, { once: !0 }),
   this.zt
  );
 }
 async update() {
  this.zt && (await this.zt.update());
 }
 get active() {
  return this.At.promise;
 }
 get controlling() {
  return this.Gt.promise;
 }
 getSW() {
  return void 0 !== this.Jt ? Promise.resolve(this.Jt) : this.Mt.promise;
 }
 async messageSW(s) {
  return t(await this.getSW(), s);
 }
 messageSkipWaiting() {
  this.zt && this.zt.waiting && t(this.zt.waiting, h);
 }
 ss() {
  const t = navigator.serviceWorker.controller;
  return t && i(t.scriptURL, this.Ft) ? t : void 0;
 }
 async es() {
  try {
   const t = await navigator.serviceWorker.register(this.Ft, this.Bt);
   return (this.Kt = performance.now()), t;
  } catch (t) {
   throw t;
  }
 }
}
export { n as Workbox, t as messageSW };
//# sourceMappingURL=workbox-window.prod.mjs.map
