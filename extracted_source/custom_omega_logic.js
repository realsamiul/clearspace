// STANDALONE CUSTOM OMEGA CLEARSPACE SITE LOGIC
// Extracted from Module 508 of appv2.js (unpacked & unminified)

    508(t, e, n) {
      "use strict";

      n.d(e, {
        x: () => ad
      });
      var r = {};
      n.r(r);
      n.d(r, {
        Clean: () => $f,
        Hud: () => bf,
        Intro: () => fl,
        Numbers: () => bu,
        SkyView: () => hh,
        TopView: () => Sl,
        Wireframe: () => Au
      });
      var i = n(105);
      var o = n(437);
      class a extends o.aHM {
        constructor(t) {
          super(t);
          this.dracoLoader = null;
          this.ktx2Loader = null;
          this.meshoptDecoder = null;
          this.pluginCallbacks = [];
          this.register(function (t) {
            return new f(t);
          });
          this.register(function (t) {
            return new b(t);
          });
          this.register(function (t) {
            return new _(t);
          });
          this.register(function (t) {
            return new d(t);
          });
          this.register(function (t) {
            return new m(t);
          });
          this.register(function (t) {
            return new g(t);
          });
          this.register(function (t) {
            return new v(t);
          });
          this.register(function (t) {
            return new h(t);
          });
          this.register(function (t) {
            return new y(t);
          });
          this.register(function (t) {
            return new p(t);
          });
          this.register(function (t) {
            return new u(t);
          });
          this.register(function (t) {
            return new w(t);
          });
          this.register(function (t) {
            return new x(t);
          });
        }
        load(t, e, n, r) {
          const i = this;
          let a;
          a = this.resourcePath !== "" ? this.resourcePath : this.path !== "" ? this.path : o.r6x.extractUrlBase(t);
          this.manager.itemStart(t);
          const s = function (e) {
            if (r) {
              r(e);
            } else {
              console.error(e);
            }
            i.manager.itemError(t);
            i.manager.itemEnd(t);
          };
          const l = new o.Y9S(this.manager);
          l.setPath(this.path);
          l.setResponseType("arraybuffer");
          l.setRequestHeader(this.requestHeader);
          l.setWithCredentials(this.withCredentials);
          l.load(t, function (n) {
            try {
              i.parse(n, a, function (n) {
                e(n);
                i.manager.itemEnd(t);
              }, s);
            } catch (t) {
              s(t);
            }
          }, n, s);
        }
        setDRACOLoader(t) {
          this.dracoLoader = t;
          return this;
        }
        setDDSLoader() {
          throw new Error("THREE.GLTFLoader: \"MSFT_texture_dds\" no longer supported. Please update to \"KHR_texture_basisu\".");
        }
        setKTX2Loader(t) {
          this.ktx2Loader = t;
          return this;
        }
        setMeshoptDecoder(t) {
          this.meshoptDecoder = t;
          return this;
        }
        register(t) {
          if (this.pluginCallbacks.indexOf(t) === -1) {
            this.pluginCallbacks.push(t);
          }
          return this;
        }
        unregister(t) {
          if (this.pluginCallbacks.indexOf(t) !== -1) {
            this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t), 1);
          }
          return this;
        }
        parse(t, e, n, r) {
          let i;
          const a = {};
          const s = {};
          if (typeof t == "string") {
            i = JSON.parse(t);
          } else if (t instanceof ArrayBuffer) {
            if (o.r6x.decodeText(new Uint8Array(t, 0, 4)) === S) {
              try {
                a[l.KHR_BINARY_GLTF] = new O(t);
              } catch (t) {
                if (r) {
                  r(t);
                }
                return;
              }
              i = JSON.parse(a[l.KHR_BINARY_GLTF].content);
            } else {
              i = JSON.parse(o.r6x.decodeText(new Uint8Array(t)));
            }
          } else {
            i = t;
          }
          if (i.asset === undefined || i.asset.version[0] < 2) {
            if (r) {
              r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
            }
            return;
          }
          const u = new J(i, {
            path: e || this.resourcePath || "",
            crossOrigin: this.crossOrigin,
            requestHeader: this.requestHeader,
            manager: this.manager,
            ktx2Loader: this.ktx2Loader,
            meshoptDecoder: this.meshoptDecoder
          });
          u.fileLoader.setRequestHeader(this.requestHeader);
          for (let t = 0; t < this.pluginCallbacks.length; t++) {
            const e = this.pluginCallbacks[t](u);
            s[e.name] = e;
            a[e.name] = true;
          }
          if (i.extensionsUsed) {
            for (let t = 0; t < i.extensionsUsed.length; ++t) {
              const e = i.extensionsUsed[t];
              const n = i.extensionsRequired || [];
              switch (e) {
                case l.KHR_MATERIALS_UNLIT:
                  a[e] = new c();
                  break;
                case l.KHR_DRACO_MESH_COMPRESSION:
                  a[e] = new P(i, this.dracoLoader);
                  break;
                case l.KHR_TEXTURE_TRANSFORM:
                  a[e] = new E();
                  break;
                case l.KHR_MESH_QUANTIZATION:
                  a[e] = new C();
                  break;
                default:
                  if (n.indexOf(e) >= 0 && s[e] === undefined) {
                    console.warn("THREE.GLTFLoader: Unknown extension \"" + e + "\".");
                  }
              }
            }
          }
          u.setExtensions(a);
          u.setPlugins(s);
          u.parse(n, r);
        }
        parseAsync(t, e) {
          const n = this;
          return new Promise(function (r, i) {
            n.parse(t, e, r, i);
          });
        }
      }
      function s() {
        let t = {};
        return {
          get: function (e) {
            return t[e];
          },
          add: function (e, n) {
            t[e] = n;
          },
          remove: function (e) {
            delete t[e];
          },
          removeAll: function () {
            t = {};
          }
        };
      }
      const l = {
        KHR_BINARY_GLTF: "KHR_binary_glTF",
        KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
        KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
        KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
        KHR_MATERIALS_IOR: "KHR_materials_ior",
        KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
        KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
        KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
        KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
        KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
        KHR_MATERIALS_VOLUME: "KHR_materials_volume",
        KHR_TEXTURE_BASISU: "KHR_texture_basisu",
        KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
        KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
        KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
        EXT_TEXTURE_WEBP: "EXT_texture_webp",
        EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
        EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
      };
      class u {
        constructor(t) {
          this.parser = t;
          this.name = l.KHR_LIGHTS_PUNCTUAL;
          this.cache = {
            refs: {},
            uses: {}
          };
        }
        _markDefs() {
          const t = this.parser;
          const e = this.parser.json.nodes || [];
          for (let n = 0, r = e.length; n < r; n++) {
            const r = e[n];
            if (r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== undefined) {
              t._addNodeRef(this.cache, r.extensions[this.name].light);
            }
          }
        }
        _loadLight(t) {
          const e = this.parser;
          const n = "light:" + t;
          let r = e.cache.get(n);
          if (r) {
            return r;
          }
          const i = e.json;
          const a = ((i.extensions && i.extensions[this.name] || {}).lights || [])[t];
          let s;
          const l = new o.Q1f(16777215);
          if (a.color !== undefined) {
            l.fromArray(a.color);
          }
          const u = a.range !== undefined ? a.range : 0;
          switch (a.type) {
            case "directional":
              s = new o.ZyN(l);
              s.target.position.set(0, 0, -1);
              s.add(s.target);
              break;
            case "point":
              s = new o.HiM(l);
              s.distance = u;
              break;
            case "spot":
              s = new o.nCl(l);
              s.distance = u;
              a.spot = a.spot || {};
              a.spot.innerConeAngle = a.spot.innerConeAngle !== undefined ? a.spot.innerConeAngle : 0;
              a.spot.outerConeAngle = a.spot.outerConeAngle !== undefined ? a.spot.outerConeAngle : Math.PI / 4;
              s.angle = a.spot.outerConeAngle;
              s.penumbra = 1 - a.spot.innerConeAngle / a.spot.outerConeAngle;
              s.target.position.set(0, 0, -1);
              s.add(s.target);
              break;
            default:
              throw new Error("THREE.GLTFLoader: Unexpected light type: " + a.type);
          }
          s.position.set(0, 0, 0);
          s.decay = 2;
          q(s, a);
          if (a.intensity !== undefined) {
            s.intensity = a.intensity;
          }
          s.name = e.createUniqueName(a.name || "light_" + t);
          r = Promise.resolve(s);
          e.cache.add(n, r);
          return r;
        }
        getDependency(t, e) {
          if (t === "light") {
            return this._loadLight(e);
          }
        }
        createNodeAttachment(t) {
          const e = this;
          const n = this.parser;
          const r = n.json.nodes[t];
          const i = (r.extensions && r.extensions[this.name] || {}).light;
          if (i === undefined) {
            return null;
          } else {
            return this._loadLight(i).then(function (t) {
              return n._getNodeRef(e.cache, i, t);
            });
          }
        }
      }
      class c {
        constructor() {
          this.name = l.KHR_MATERIALS_UNLIT;
        }
        getMaterialType() {
          return o.V9B;
        }
        extendParams(t, e, n) {
          const r = [];
          t.color = new o.Q1f(1, 1, 1);
          t.opacity = 1;
          const i = e.pbrMetallicRoughness;
          if (i) {
            if (Array.isArray(i.baseColorFactor)) {
              const e = i.baseColorFactor;
              t.color.fromArray(e);
              t.opacity = e[3];
            }
            if (i.baseColorTexture !== undefined) {
              r.push(n.assignTexture(t, "map", i.baseColorTexture, o.S2Q));
            }
          }
          return Promise.all(r);
        }
      }
      class h {
        constructor(t) {
          this.parser = t;
          this.name = l.KHR_MATERIALS_EMISSIVE_STRENGTH;
        }
        extendMaterialParams(t, e) {
          const n = this.parser.json.materials[t];
          if (!n.extensions || !n.extensions[this.name]) {
            return Promise.resolve();
          }
          const r = n.extensions[this.name].emissiveStrength;
          if (r !== undefined) {
            e.emissiveIntensity = r;
          }
          return Promise.resolve();
        }
      }
      class f {
        constructor(t) {
          this.parser = t;
          this.name = l.KHR_MATERIALS_CLEARCOAT;
        }
        getMaterialType(t) {
          const e = this.parser.json.materials[t];
          if (e.extensions && e.extensions[this.name]) {
            return o.uSd;
          } else {
            return null;
          }
        }
        extendMaterialParams(t, e) {
          const n = this.parser;
          const r = n.json.materials[t];
          if (!r.extensions || !r.extensions[this.name]) {
            return Promise.resolve();
          }
          const i = [];
          const a = r.extensions[this.name];
          if (a.clearcoatFactor !== undefined) {
            e.clearcoat = a.clearcoatFactor;
          }
          if (a.clearcoatTexture !== undefined) {
            i.push(n.assignTexture(e, "clearcoatMap", a.clearcoatTexture));
          }
          if (a.clearcoatRoughnessFactor !== undefined) {
            e.clearcoatRoughness = a.clearcoatRoughnessFactor;
          }
          if (a.clearcoatRoughnessTexture !== undefined) {
            i.push(n.assignTexture(e, "clearcoatRoughnessMap", a.clearcoatRoughnessTexture));
          }
          if (a.clearcoatNormalTexture !== undefined && (i.push(n.assignTexture(e, "clearcoatNormalMap", a.clearcoatNormalTexture)), a.clearcoatNormalTexture.scale !== undefined)) {
            const t = a.clearcoatNormalTexture.scale;
            e.clearcoatNormalScale = new o.I9Y(t, t);
          }
          return Promise.all(i);
        }
      }
      class p {
        constructor(t) {
          this.parser = t;
          this.name = l.KHR_MATERIALS_IRIDESCENCE;
        }
        getMaterialType(t) {
          const e = this.parser.json.materials[t];
          if (e.extensions && e.extensions[this.name]) {
            return o.uSd;
          } else {
            return null;
          }
        }
        extendMaterialParams(t, e) {
          const n = this.parser;
          const r = n.json.materials[t];
          if (!r.extensions || !r.extensions[this.name]) {
            return Promise.resolve();
          }
          const i = [];
          const o = r.extensions[this.name];
          if (o.iridescenceFactor !== undefined) {
            e.iridescence = o.iridescenceFactor;
          }
          if (o.iridescenceTexture !== undefined) {
            i.push(n.assignTexture(e, "iridescenceMap", o.iridescenceTexture));
          }
          if (o.iridescenceIor !== undefined) {
            e.iridescenceIOR = o.iridescenceIor;
          }
          if (e.iridescenceThicknessRange === undefined) {
            e.iridescenceThicknessRange = [100, 400];
          }
          if (o.iridescenceThicknessMinimum !== undefined) {
            e.iridescenceThicknessRange[0] = o.iridescenceThicknessMinimum;
          }
          if (o.iridescenceThicknessMaximum !== undefined) {
            e.iridescenceThicknessRange[1] = o.iridescenceThicknessMaximum;
          }
          if (o.iridescenceThicknessTexture !== undefined) {
            i.push(n.assignTexture(e, "iridescenceThicknessMap", o.iridescenceThicknessTexture));
          }
          return Promise.all(i);
        }
      }
      class d {
        constructor(t) {
          this.parser = t;
          this.name = l.KHR_MATERIALS_SHEEN;
        }
        getMaterialType(t) {
          const e = this.parser.json.materials[t];
          if (e.extensions && e.extensions[this.name]) {
            return o.uSd;
          } else {
            return null;
          }
        }
        extendMaterialParams(t, e) {
          const n = this.parser;
          const r = n.json.materials[t];
          if (!r.extensions || !r.extensions[this.name]) {
            return Promise.resolve();
          }
          const i = [];
          e.sheenColor = new o.Q1f(0, 0, 0);
          e.sheenRoughness = 0;
          e.sheen = 1;
          const a = r.extensions[this.name];
          if (a.sheenColorFactor !== undefined) {
            e.sheenColor.fromArray(a.sheenColorFactor);
          }
          if (a.sheenRoughnessFactor !== undefined) {
            e.sheenRoughness = a.sheenRoughnessFactor;
          }
          if (a.sheenColorTexture !== undefined) {
            i.push(n.assignTexture(e, "sheenColorMap", a.sheenColorTexture, o.S2Q));
          }
          if (a.sheenRoughnessTexture !== undefined) {
            i.push(n.assignTexture(e, "sheenRoughnessMap", a.sheenRoughnessTexture));
          }
          return Promise.all(i);
        }
      }
      class m {
        constructor(t) {
          this.parser = t;
          this.name = l.KHR_MATERIALS_TRANSMISSION;
        }
        getMaterialType(t) {
          const e = this.parser.json.materials[t];
          if (e.extensions && e.extensions[this.name]) {
            return o.uSd;
          } else {
            return null;
          }
        }
        extendMaterialParams(t, e) {
          const n = this.parser;
          const r = n.json.materials[t];
          if (!r.extensions || !r.extensions[this.name]) {
            return Promise.resolve();
          }
          const i = [];
          const o = r.extensions[this.name];
          if (o.transmissionFactor !== undefined) {
            e.transmission = o.transmissionFactor;
          }
          if (o.transmissionTexture !== undefined) {
            i.push(n.assignTexture(e, "transmissionMap", o.transmissionTexture));
          }
          return Promise.all(i);
        }
      }
      class g {
        constructor(t) {
          this.parser = t;
          this.name = l.KHR_MATERIALS_VOLUME;
        }
        getMaterialType(t) {
          const e = this.parser.json.materials[t];
          if (e.extensions && e.extensions[this.name]) {
            return o.uSd;
          } else {
            return null;
          }
        }
        extendMaterialParams(t, e) {
          const n = this.parser;
          const r = n.json.materials[t];
          if (!r.extensions || !r.extensions[this.name]) {
            return Promise.resolve();
          }
          const i = [];
          const a = r.extensions[this.name];
          e.thickness = a.thicknessFactor !== undefined ? a.thicknessFactor : 0;
          if (a.thicknessTexture !== undefined) {
            i.push(n.assignTexture(e, "thicknessMap", a.thicknessTexture));
          }
          e.attenuationDistance = a.attenuationDistance || Infinity;
          const s = a.attenuationColor || [1, 1, 1];
          e.attenuationColor = new o.Q1f(s[0], s[1], s[2]);
          return Promise.all(i);
        }
      }
      class v {
        constructor(t) {
          this.parser = t;
          this.name = l.KHR_MATERIALS_IOR;
        }
        getMaterialType(t) {
          const e = this.parser.json.materials[t];
          if (e.extensions && e.extensions[this.name]) {
            return o.uSd;
          } else {
            return null;
          }
        }
        extendMaterialParams(t, e) {
          const n = this.parser.json.materials[t];
          if (!n.extensions || !n.extensions[this.name]) {
            return Promise.resolve();
          }
          const r = n.extensions[this.name];
          e.ior = r.ior !== undefined ? r.ior : 1.5;
          return Promise.resolve();
        }
      }
      class y {
        constructor(t) {
          this.parser = t;
          this.name = l.KHR_MATERIALS_SPECULAR;
        }
        getMaterialType(t) {
          const e = this.parser.json.materials[t];
          if (e.extensions && e.extensions[this.name]) {
            return o.uSd;
          } else {
            return null;
          }
        }
        extendMaterialParams(t, e) {
          const n = this.parser;
          const r = n.json.materials[t];
          if (!r.extensions || !r.extensions[this.name]) {
            return Promise.resolve();
          }
          const i = [];
          const a = r.extensions[this.name];
          e.specularIntensity = a.specularFactor !== undefined ? a.specularFactor : 1;
          if (a.specularTexture !== undefined) {
            i.push(n.assignTexture(e, "specularIntensityMap", a.specularTexture));
          }
          const s = a.specularColorFactor || [1, 1, 1];
          e.specularColor = new o.Q1f(s[0], s[1], s[2]);
          if (a.specularColorTexture !== undefined) {
            i.push(n.assignTexture(e, "specularColorMap", a.specularColorTexture, o.S2Q));
          }
          return Promise.all(i);
        }
      }
      class b {
        constructor(t) {
          this.parser = t;
          this.name = l.KHR_TEXTURE_BASISU;
        }
        loadTexture(t) {
          const e = this.parser;
          const n = e.json;
          const r = n.textures[t];
          if (!r.extensions || !r.extensions[this.name]) {
            return null;
          }
          const i = r.extensions[this.name];
          const o = e.options.ktx2Loader;
          if (!o) {
            if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0) {
              throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
            }
            return null;
          }
          return e.loadTextureImage(t, i.source, o);
        }
      }
      class _ {
        constructor(t) {
          this.parser = t;
          this.name = l.EXT_TEXTURE_WEBP;
          this.isSupported = null;
        }
        loadTexture(t) {
          const e = this.name;
          const n = this.parser;
          const r = n.json;
          const i = r.textures[t];
          if (!i.extensions || !i.extensions[e]) {
            return null;
          }
          const o = i.extensions[e];
          const a = r.images[o.source];
          let s = n.textureLoader;
          if (a.uri) {
            const t = n.options.manager.getHandler(a.uri);
            if (t !== null) {
              s = t;
            }
          }
          return this.detectSupport().then(function (i) {
            if (i) {
              return n.loadTextureImage(t, o.source, s);
            }
            if (r.extensionsRequired && r.extensionsRequired.indexOf(e) >= 0) {
              throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
            }
            return n.loadTexture(t);
          });
        }
        detectSupport() {
          this.isSupported ||= new Promise(function (t) {
            const e = new Image();
            e.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
            e.onload = e.onerror = function () {
              t(e.height === 1);
            };
          });
          return this.isSupported;
        }
      }
      class w {
        constructor(t) {
          this.name = l.EXT_MESHOPT_COMPRESSION;
          this.parser = t;
        }
        loadBufferView(t) {
          const e = this.parser.json;
          const n = e.bufferViews[t];
          if (n.extensions && n.extensions[this.name]) {
            const t = n.extensions[this.name];
            const r = this.parser.getDependency("buffer", t.buffer);
            const i = this.parser.options.meshoptDecoder;
            if (!i || !i.supported) {
              if (e.extensionsRequired && e.extensionsRequired.indexOf(this.name) >= 0) {
                throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
              }
              return null;
            }
            return r.then(function (e) {
              const n = t.byteOffset || 0;
              const r = t.byteLength || 0;
              const o = t.count;
              const a = t.byteStride;
              const s = new Uint8Array(e, n, r);
              if (i.decodeGltfBufferAsync) {
                return i.decodeGltfBufferAsync(o, a, s, t.mode, t.filter).then(function (t) {
                  return t.buffer;
                });
              } else {
                return i.ready.then(function () {
                  const e = new ArrayBuffer(o * a);
                  i.decodeGltfBuffer(new Uint8Array(e), o, a, s, t.mode, t.filter);
                  return e;
                });
              }
            });
          }
          return null;
        }
      }
      class x {
        constructor(t) {
          this.name = l.EXT_MESH_GPU_INSTANCING;
          this.parser = t;
        }
        createNodeMesh(t) {
          const e = this.parser.json;
          const n = e.nodes[t];
          if (!n.extensions || !n.extensions[this.name] || n.mesh === undefined) {
            return null;
          }
          const r = e.meshes[n.mesh];
          for (const t of r.primitives) {
            if (t.mode !== D.TRIANGLES && t.mode !== D.TRIANGLE_STRIP && t.mode !== D.TRIANGLE_FAN && t.mode !== undefined) {
              return null;
            }
          }
          const i = n.extensions[this.name].attributes;
          const a = [];
          const s = {};
          for (const t in i) {
            a.push(this.parser.getDependency("accessor", i[t]).then(e => {
              s[t] = e;
              return s[t];
            }));
          }
          if (a.length < 1) {
            return null;
          } else {
            a.push(this.parser.createNodeMesh(t));
            return Promise.all(a).then(t => {
              const e = t.pop();
              const n = e.isGroup ? e.children : [e];
              const r = t[0].count;
              const i = [];
              for (const t of n) {
                const e = new o.kn4();
                const n = new o.Pq0();
                const a = new o.PTz();
                const l = new o.Pq0(1, 1, 1);
                const u = new o.ZLX(t.geometry, t.material, r);
                for (let t = 0; t < r; t++) {
                  if (s.TRANSLATION) {
                    n.fromBufferAttribute(s.TRANSLATION, t);
                  }
                  if (s.ROTATION) {
                    a.fromBufferAttribute(s.ROTATION, t);
                  }
                  if (s.SCALE) {
                    l.fromBufferAttribute(s.SCALE, t);
                  }
                  u.setMatrixAt(t, e.compose(n, a, l));
                }
                for (const e in s) {
                  if (e !== "TRANSLATION" && e !== "ROTATION" && e !== "SCALE") {
                    t.geometry.setAttribute(e, s[e]);
                  }
                }
                o.B69.prototype.copy.call(u, t);
                u.frustumCulled = false;
                this.parser.assignFinalMaterial(u);
                i.push(u);
              }
              if (e.isGroup) {
                e.clear();
                e.add(...i);
                return e;
              } else {
                return i[0];
              }
            });
          }
        }
      }
      const S = "glTF";
      const T = 1313821514;
      const M = 5130562;
      class O {
        constructor(t) {
          this.name = l.KHR_BINARY_GLTF;
          this.content = null;
          this.body = null;
          const e = new DataView(t, 0, 12);
          this.header = {
            magic: o.r6x.decodeText(new Uint8Array(t.slice(0, 4))),
            version: e.getUint32(4, true),
            length: e.getUint32(8, true)
          };
          if (this.header.magic !== S) {
            throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
          }
          if (this.header.version < 2) {
            throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
          }
          const n = this.header.length - 12;
          const r = new DataView(t, 12);
          let i = 0;
          while (i < n) {
            const e = r.getUint32(i, true);
            i += 4;
            const n = r.getUint32(i, true);
            i += 4;
            if (n === T) {
              const n = new Uint8Array(t, 12 + i, e);
              this.content = o.r6x.decodeText(n);
            } else if (n === M) {
              const n = 12 + i;
              this.body = t.slice(n, n + e);
            }
            i += e;
          }
          if (this.content === null) {
            throw new Error("THREE.GLTFLoader: JSON content not found.");
          }
        }
      }
      class P {
        constructor(t, e) {
          if (!e) {
            throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
          }
          this.name = l.KHR_DRACO_MESH_COMPRESSION;
          this.json = t;
          this.dracoLoader = e;
          this.dracoLoader.preload();
        }
        decodePrimitive(t, e) {
          const n = this.json;
          const r = this.dracoLoader;
          const i = t.extensions[this.name].bufferView;
          const o = t.extensions[this.name].attributes;
          const a = {};
          const s = {};
          const l = {};
          for (const t in o) {
            const e = z[t] || t.toLowerCase();
            a[e] = o[t];
          }
          for (const e in t.attributes) {
            const r = z[e] || e.toLowerCase();
            if (o[e] !== undefined) {
              const i = n.accessors[t.attributes[e]];
              const o = I[i.componentType];
              l[r] = o.name;
              s[r] = i.normalized === true;
            }
          }
          return e.getDependency("bufferView", i).then(function (t) {
            return new Promise(function (e) {
              r.decodeDracoFile(t, function (t) {
                for (const e in t.attributes) {
                  const n = t.attributes[e];
                  const r = s[e];
                  if (r !== undefined) {
                    n.normalized = r;
                  }
                }
                e(t);
              }, a, l);
            });
          });
        }
      }
      class E {
        constructor() {
          this.name = l.KHR_TEXTURE_TRANSFORM;
        }
        extendTexture(t, e) {
          if (e.texCoord !== undefined) {
            console.warn("THREE.GLTFLoader: Custom UV sets in \"" + this.name + "\" extension not yet supported.");
          }
          if (e.offset !== undefined || e.rotation !== undefined || e.scale !== undefined) {
            t = t.clone();
            if (e.offset !== undefined) {
              t.offset.fromArray(e.offset);
            }
            if (e.rotation !== undefined) {
              t.rotation = e.rotation;
            }
            if (e.scale !== undefined) {
              t.repeat.fromArray(e.scale);
            }
            t.needsUpdate = true;
          }
          return t;
        }
      }
      class C {
        constructor() {
          this.name = l.KHR_MESH_QUANTIZATION;
        }
      }
      class A extends o.lGw {
        constructor(t, e, n, r) {
          super(t, e, n, r);
        }
        copySampleValue_(t) {
          const e = this.resultBuffer;
          const n = this.sampleValues;
          const r = this.valueSize;
          const i = t * r * 3 + r;
          for (let t = 0; t !== r; t++) {
            e[t] = n[i + t];
          }
          return e;
        }
        interpolate_(t, e, n, r) {
          const i = this.resultBuffer;
          const o = this.sampleValues;
          const a = this.valueSize;
          const s = a * 2;
          const l = a * 3;
          const u = r - e;
          const c = (n - e) / u;
          const h = c * c;
          const f = h * c;
          const p = t * l;
          const d = p - l;
          const m = f * -2 + h * 3;
          const g = f - h;
          const v = 1 - m;
          const y = g - h + c;
          for (let t = 0; t !== a; t++) {
            const e = o[d + t + a];
            const n = o[d + t + s] * u;
            const r = o[p + t + a];
            const l = o[p + t] * u;
            i[t] = v * e + y * n + m * r + g * l;
          }
          return i;
        }
      }
      const R = new o.PTz();
      class L extends A {
        interpolate_(t, e, n, r) {
          const i = super.interpolate_(t, e, n, r);
          R.fromArray(i).normalize().toArray(i);
          return i;
        }
      }
      const D = {
        FLOAT: 5126,
        FLOAT_MAT3: 35675,
        FLOAT_MAT4: 35676,
        FLOAT_VEC2: 35664,
        FLOAT_VEC3: 35665,
        FLOAT_VEC4: 35666,
        LINEAR: 9729,
        REPEAT: 10497,
        SAMPLER_2D: 35678,
        POINTS: 0,
        LINES: 1,
        LINE_LOOP: 2,
        LINE_STRIP: 3,
        TRIANGLES: 4,
        TRIANGLE_STRIP: 5,
        TRIANGLE_FAN: 6,
        UNSIGNED_BYTE: 5121,
        UNSIGNED_SHORT: 5123
      };
      const I = {
        5120: Int8Array,
        5121: Uint8Array,
        5122: Int16Array,
        5123: Uint16Array,
        5125: Uint32Array,
        5126: Float32Array
      };
      const j = {
        9728: o.hxR,
        9729: o.k6q,
        9984: o.pHI,
        9985: o.kRr,
        9986: o.Cfg,
        9987: o.$_I
      };
      const k = {
        33071: o.ghU,
        33648: o.kTW,
        10497: o.GJx
      };
      const N = {
        SCALAR: 1,
        VEC2: 2,
        VEC3: 3,
        VEC4: 4,
        MAT2: 4,
        MAT3: 9,
        MAT4: 16
      };
      const z = {
        POSITION: "position",
        NORMAL: "normal",
        TANGENT: "tangent",
        TEXCOORD_0: "uv",
        TEXCOORD_1: "uv2",
        COLOR_0: "color",
        WEIGHTS_0: "skinWeight",
        JOINTS_0: "skinIndex"
      };
      const U = {
        scale: "scale",
        translation: "position",
        rotation: "quaternion",
        weights: "morphTargetInfluences"
      };
      const F = {
        CUBICSPLINE: undefined,
        LINEAR: o.PJ3,
        STEP: o.ljd
      };
      const B = "OPAQUE";
      const W = "MASK";
      const H = "BLEND";
      function V(t) {
        if (t.DefaultMaterial === undefined) {
          t.DefaultMaterial = new o._4j({
            color: 16777215,
            emissive: 0,
            metalness: 1,
            roughness: 1,
            transparent: false,
            depthTest: true,
            side: o.hB5
          });
        }
        return t.DefaultMaterial;
      }
      function G(t, e, n) {
        for (const r in n.extensions) {
          if (t[r] === undefined) {
            e.userData.gltfExtensions = e.userData.gltfExtensions || {};
            e.userData.gltfExtensions[r] = n.extensions[r];
          }
        }
      }
      function q(t, e) {
        if (e.extras !== undefined) {
          if (typeof e.extras == "object") {
            Object.assign(t.userData, e.extras);
          } else {
            console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras);
          }
        }
      }
      function X(t, e) {
        t.updateMorphTargets();
        if (e.weights !== undefined) {
          for (let n = 0, r = e.weights.length; n < r; n++) {
            t.morphTargetInfluences[n] = e.weights[n];
          }
        }
        if (e.extras && Array.isArray(e.extras.targetNames)) {
          const n = e.extras.targetNames;
          if (t.morphTargetInfluences.length === n.length) {
            t.morphTargetDictionary = {};
            for (let e = 0, r = n.length; e < r; e++) {
              t.morphTargetDictionary[n[e]] = e;
            }
          } else {
            console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
          }
        }
      }
      function Y(t) {
        const e = t.extensions && t.extensions[l.KHR_DRACO_MESH_COMPRESSION];
        let n;
        n = e ? "draco:" + e.bufferView + ":" + e.indices + ":" + Q(e.attributes) : t.indices + ":" + Q(t.attributes) + ":" + t.mode;
        return n;
      }
      function Q(t) {
        let e = "";
        const n = Object.keys(t).sort();
        for (let r = 0, i = n.length; r < i; r++) {
          e += n[r] + ":" + t[n[r]] + ";";
        }
        return e;
      }
      function K(t) {
        switch (t) {
          case Int8Array:
            return 1 / 127;
          case Uint8Array:
            return 1 / 255;
          case Int16Array:
            return 1 / 32767;
          case Uint16Array:
            return 1 / 65535;
          default:
            throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
        }
      }
      const Z = new o.kn4();
      class J {
        constructor(t = {}, e = {}) {
          this.json = t;
          this.extensions = {};
          this.plugins = {};
          this.options = e;
          this.cache = new s();
          this.associations = new Map();
          this.primitiveCache = {};
          this.meshCache = {
            refs: {},
            uses: {}
          };
          this.cameraCache = {
            refs: {},
            uses: {}
          };
          this.lightCache = {
            refs: {},
            uses: {}
          };
          this.sourceCache = {};
          this.textureCache = {};
          this.nodeNamesUsed = {};
          let n = false;
          let r = false;
          let i = -1;
          if (typeof navigator != "undefined") {
            n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === true;
            r = navigator.userAgent.indexOf("Firefox") > -1;
            i = r ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1;
          }
          if (typeof createImageBitmap == "undefined" || n || r && i < 98) {
            this.textureLoader = new o.Tap(this.options.manager);
          } else {
            this.textureLoader = new o.Kzg(this.options.manager);
          }
          this.textureLoader.setCrossOrigin(this.options.crossOrigin);
          this.textureLoader.setRequestHeader(this.options.requestHeader);
          this.fileLoader = new o.Y9S(this.options.manager);
          this.fileLoader.setResponseType("arraybuffer");
          if (this.options.crossOrigin === "use-credentials") {
            this.fileLoader.setWithCredentials(true);
          }
        }
        setExtensions(t) {
          this.extensions = t;
        }
        setPlugins(t) {
          this.plugins = t;
        }
        parse(t, e) {
          const n = this;
          const r = this.json;
          const i = this.extensions;
          this.cache.removeAll();
          this._invokeAll(function (t) {
            return t._markDefs && t._markDefs();
          });
          Promise.all(this._invokeAll(function (t) {
            return t.beforeRoot && t.beforeRoot();
          })).then(function () {
            return Promise.all([n.getDependencies("scene"), n.getDependencies("animation"), n.getDependencies("camera")]);
          }).then(function (e) {
            const o = {
              scene: e[0][r.scene || 0],
              scenes: e[0],
              animations: e[1],
              cameras: e[2],
              asset: r.asset,
              parser: n,
              userData: {}
            };
            G(i, o, r);
            q(o, r);
            Promise.all(n._invokeAll(function (t) {
              return t.afterRoot && t.afterRoot(o);
            })).then(function () {
              t(o);
            });
          }).catch(e);
        }
        _markDefs() {
          const t = this.json.nodes || [];
          const e = this.json.skins || [];
          const n = this.json.meshes || [];
          for (let n = 0, r = e.length; n < r; n++) {
            const r = e[n].joints;
            for (let e = 0, n = r.length; e < n; e++) {
              t[r[e]].isBone = true;
            }
          }
          for (let e = 0, r = t.length; e < r; e++) {
            const r = t[e];
            if (r.mesh !== undefined) {
              this._addNodeRef(this.meshCache, r.mesh);
              if (r.skin !== undefined) {
                n[r.mesh].isSkinnedMesh = true;
              }
            }
            if (r.camera !== undefined) {
              this._addNodeRef(this.cameraCache, r.camera);
            }
          }
        }
        _addNodeRef(t, e) {
          if (e !== undefined) {
            if (t.refs[e] === undefined) {
              t.refs[e] = t.uses[e] = 0;
            }
            t.refs[e]++;
          }
        }
        _getNodeRef(t, e, n) {
          if (t.refs[e] <= 1) {
            return n;
          }
          const r = n.clone();
          const i = (t, e) => {
            const n = this.associations.get(t);
            if (n != null) {
              this.associations.set(e, n);
            }
            for (const [n, r] of t.children.entries()) {
              i(r, e.children[n]);
            }
          };
          i(n, r);
          r.name += "_instance_" + t.uses[e]++;
          return r;
        }
        _invokeOne(t) {
          const e = Object.values(this.plugins);
          e.push(this);
          for (let n = 0; n < e.length; n++) {
            const r = t(e[n]);
            if (r) {
              return r;
            }
          }
          return null;
        }
        _invokeAll(t) {
          const e = Object.values(this.plugins);
          e.unshift(this);
          const n = [];
          for (let r = 0; r < e.length; r++) {
            const i = t(e[r]);
            if (i) {
              n.push(i);
            }
          }
          return n;
        }
        getDependency(t, e) {
          const n = t + ":" + e;
          let r = this.cache.get(n);
          if (!r) {
            switch (t) {
              case "scene":
                r = this.loadScene(e);
                break;
              case "node":
                r = this._invokeOne(function (t) {
                  return t.loadNode && t.loadNode(e);
                });
                break;
              case "mesh":
                r = this._invokeOne(function (t) {
                  return t.loadMesh && t.loadMesh(e);
                });
                break;
              case "accessor":
                r = this.loadAccessor(e);
                break;
              case "bufferView":
                r = this._invokeOne(function (t) {
                  return t.loadBufferView && t.loadBufferView(e);
                });
                break;
              case "buffer":
                r = this.loadBuffer(e);
                break;
              case "material":
                r = this._invokeOne(function (t) {
                  return t.loadMaterial && t.loadMaterial(e);
                });
                break;
              case "texture":
                r = this._invokeOne(function (t) {
                  return t.loadTexture && t.loadTexture(e);
                });
                break;
              case "skin":
                r = this.loadSkin(e);
                break;
              case "animation":
                r = this._invokeOne(function (t) {
                  return t.loadAnimation && t.loadAnimation(e);
                });
                break;
              case "camera":
                r = this.loadCamera(e);
                break;
              default:
                r = this._invokeOne(function (n) {
                  return n != this && n.getDependency && n.getDependency(t, e);
                });
                if (!r) {
                  throw new Error("Unknown type: " + t);
                }
            }
            this.cache.add(n, r);
          }
          return r;
        }
        getDependencies(t) {
          let e = this.cache.get(t);
          if (!e) {
            const n = this;
            const r = this.json[t + (t === "mesh" ? "es" : "s")] || [];
            e = Promise.all(r.map(function (e, r) {
              return n.getDependency(t, r);
            }));
            this.cache.add(t, e);
          }
          return e;
        }
        loadBuffer(t) {
          const e = this.json.buffers[t];
          const n = this.fileLoader;
          if (e.type && e.type !== "arraybuffer") {
            throw new Error("THREE.GLTFLoader: " + e.type + " buffer type is not supported.");
          }
          if (e.uri === undefined && t === 0) {
            return Promise.resolve(this.extensions[l.KHR_BINARY_GLTF].body);
          }
          const r = this.options;
          return new Promise(function (t, i) {
            n.load(o.r6x.resolveURL(e.uri, r.path), t, undefined, function () {
              i(new Error("THREE.GLTFLoader: Failed to load buffer \"" + e.uri + "\"."));
            });
          });
        }
        loadBufferView(t) {
          const e = this.json.bufferViews[t];
          return this.getDependency("buffer", e.buffer).then(function (t) {
            const n = e.byteLength || 0;
            const r = e.byteOffset || 0;
            return t.slice(r, r + n);
          });
        }
        loadAccessor(t) {
          const e = this;
          const n = this.json;
          const r = this.json.accessors[t];
          if (r.bufferView === undefined && r.sparse === undefined) {
            const t = N[r.type];
            const e = I[r.componentType];
            const n = r.normalized === true;
            const i = new e(r.count * t);
            return Promise.resolve(new o.THS(i, t, n));
          }
          const i = [];
          if (r.bufferView !== undefined) {
            i.push(this.getDependency("bufferView", r.bufferView));
          } else {
            i.push(null);
          }
          if (r.sparse !== undefined) {
            i.push(this.getDependency("bufferView", r.sparse.indices.bufferView));
            i.push(this.getDependency("bufferView", r.sparse.values.bufferView));
          }
          return Promise.all(i).then(function (t) {
            const i = t[0];
            const a = N[r.type];
            const s = I[r.componentType];
            const l = s.BYTES_PER_ELEMENT;
            const u = l * a;
            const c = r.byteOffset || 0;
            const h = r.bufferView !== undefined ? n.bufferViews[r.bufferView].byteStride : undefined;
            const f = r.normalized === true;
            let p;
            let d;
            if (h && h !== u) {
              const t = Math.floor(c / h);
              const n = "InterleavedBuffer:" + r.bufferView + ":" + r.componentType + ":" + t + ":" + r.count;
              let u = e.cache.get(n);
              if (!u) {
                p = new s(i, t * h, r.count * h / l);
                u = new o.eB$(p, h / l);
                e.cache.add(n, u);
              }
              d = new o.eHs(u, a, c % h / l, f);
            } else {
              p = i === null ? new s(r.count * a) : new s(i, c, r.count * a);
              d = new o.THS(p, a, f);
            }
            if (r.sparse !== undefined) {
              const e = N.SCALAR;
              const n = I[r.sparse.indices.componentType];
              const l = r.sparse.indices.byteOffset || 0;
              const u = r.sparse.values.byteOffset || 0;
              const c = new n(t[1], l, r.sparse.count * e);
              const h = new s(t[2], u, r.sparse.count * a);
              if (i !== null) {
                d = new o.THS(d.array.slice(), d.itemSize, d.normalized);
              }
              for (let t = 0, e = c.length; t < e; t++) {
                const e = c[t];
                d.setX(e, h[t * a]);
                if (a >= 2) {
                  d.setY(e, h[t * a + 1]);
                }
                if (a >= 3) {
                  d.setZ(e, h[t * a + 2]);
                }
                if (a >= 4) {
                  d.setW(e, h[t * a + 3]);
                }
                if (a >= 5) {
                  throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
                }
              }
            }
            return d;
          });
        }
        loadTexture(t) {
          const e = this.json;
          const n = this.options;
          const r = e.textures[t].source;
          const i = e.images[r];
          let o = this.textureLoader;
          if (i.uri) {
            const t = n.manager.getHandler(i.uri);
            if (t !== null) {
              o = t;
            }
          }
          return this.loadTextureImage(t, r, o);
        }
        loadTextureImage(t, e, n) {
          const r = this;
          const i = this.json;
          const a = i.textures[t];
          const s = i.images[e];
          const l = (s.uri || s.bufferView) + ":" + a.sampler;
          if (this.textureCache[l]) {
            return this.textureCache[l];
          }
          const u = this.loadImageSource(e, n).then(function (e) {
            e.flipY = false;
            e.name = a.name || s.name || "";
            const n = (i.samplers || {})[a.sampler] || {};
            e.magFilter = j[n.magFilter] || o.k6q;
            e.minFilter = j[n.minFilter] || o.$_I;
            e.wrapS = k[n.wrapS] || o.GJx;
            e.wrapT = k[n.wrapT] || o.GJx;
            r.associations.set(e, {
              textures: t
            });
            return e;
          }).catch(function () {
            return null;
          });
          this.textureCache[l] = u;
          return u;
        }
        loadImageSource(t, e) {
          const n = this;
          const r = this.json;
          const i = this.options;
          if (this.sourceCache[t] !== undefined) {
            return this.sourceCache[t].then(t => t.clone());
          }
          const a = r.images[t];
          const s = self.URL || self.webkitURL;
          let l = a.uri || "";
          let u = false;
          if (a.bufferView !== undefined) {
            l = n.getDependency("bufferView", a.bufferView).then(function (t) {
              u = true;
              const e = new Blob([t], {
                type: a.mimeType
              });
              l = s.createObjectURL(e);
              return l;
            });
          } else if (a.uri === undefined) {
            throw new Error("THREE.GLTFLoader: Image " + t + " is missing URI and bufferView");
          }
          const c = Promise.resolve(l).then(function (t) {
            return new Promise(function (n, r) {
              let a = n;
              if (e.isImageBitmapLoader === true) {
                a = function (t) {
                  const e = new o.gPd(t);
                  e.needsUpdate = true;
                  n(e);
                };
              }
              e.load(o.r6x.resolveURL(t, i.path), a, undefined, r);
            });
          }).then(function (t) {
            var e;
            if (u === true) {
              s.revokeObjectURL(l);
            }
            t.userData.mimeType = a.mimeType || ((e = a.uri).search(/\.jpe?g($|\?)/i) > 0 || e.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : e.search(/\.webp($|\?)/i) > 0 || e.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png");
            return t;
          }).catch(function (t) {
            console.error("THREE.GLTFLoader: Couldn't load texture", l);
            throw t;
          });
          this.sourceCache[t] = c;
          return c;
        }
        assignTexture(t, e, n, r) {
          const i = this;
          return this.getDependency("texture", n.index).then(function (o) {
            if (!o) {
              return null;
            }
            if (n.texCoord !== undefined && n.texCoord != 0 && (e !== "aoMap" || n.texCoord != 1)) {
              console.warn("THREE.GLTFLoader: Custom UV set " + n.texCoord + " for texture " + e + " not yet supported.");
            }
            if (i.extensions[l.KHR_TEXTURE_TRANSFORM]) {
              const t = n.extensions !== undefined ? n.extensions[l.KHR_TEXTURE_TRANSFORM] : undefined;
              if (t) {
                const e = i.associations.get(o);
                o = i.extensions[l.KHR_TEXTURE_TRANSFORM].extendTexture(o, t);
                i.associations.set(o, e);
              }
            }
            if (r !== undefined) {
              o.encoding = r;
            }
            t[e] = o;
            return o;
          });
        }
        assignFinalMaterial(t) {
          const e = t.geometry;
          let n = t.material;
          const r = e.attributes.tangent === undefined;
          const i = e.attributes.color !== undefined;
          const a = e.attributes.normal === undefined;
          if (t.isPoints) {
            const t = "PointsMaterial:" + n.uuid;
            let e = this.cache.get(t);
            if (!e) {
              e = new o.BH$();
              o.imn.prototype.copy.call(e, n);
              e.color.copy(n.color);
              e.map = n.map;
              e.sizeAttenuation = false;
              this.cache.add(t, e);
            }
            n = e;
          } else if (t.isLine) {
            const t = "LineBasicMaterial:" + n.uuid;
            let e = this.cache.get(t);
            if (!e) {
              e = new o.mrM();
              o.imn.prototype.copy.call(e, n);
              e.color.copy(n.color);
              this.cache.add(t, e);
            }
            n = e;
          }
          if (r || i || a) {
            let t = "ClonedMaterial:" + n.uuid + ":";
            if (r) {
              t += "derivative-tangents:";
            }
            if (i) {
              t += "vertex-colors:";
            }
            if (a) {
              t += "flat-shading:";
            }
            let e = this.cache.get(t);
            if (!e) {
              e = n.clone();
              if (i) {
                e.vertexColors = true;
              }
              if (a) {
                e.flatShading = true;
              }
              if (r) {
                if (e.normalScale) {
                  e.normalScale.y *= -1;
                }
                if (e.clearcoatNormalScale) {
                  e.clearcoatNormalScale.y *= -1;
                }
              }
              this.cache.add(t, e);
              this.associations.set(e, this.associations.get(n));
            }
            n = e;
          }
          if (n.aoMap && e.attributes.uv2 === undefined && e.attributes.uv !== undefined) {
            e.setAttribute("uv2", e.attributes.uv);
          }
          t.material = n;
        }
        getMaterialType() {
          return o._4j;
        }
        loadMaterial(t) {
          const e = this;
          const n = this.json;
          const r = this.extensions;
          const i = n.materials[t];
          let a;
          const s = {};
          const u = [];
          if ((i.extensions || {})[l.KHR_MATERIALS_UNLIT]) {
            const t = r[l.KHR_MATERIALS_UNLIT];
            a = t.getMaterialType();
            u.push(t.extendParams(s, i, e));
          } else {
            const n = i.pbrMetallicRoughness || {};
            s.color = new o.Q1f(1, 1, 1);
            s.opacity = 1;
            if (Array.isArray(n.baseColorFactor)) {
              const t = n.baseColorFactor;
              s.color.fromArray(t);
              s.opacity = t[3];
            }
            if (n.baseColorTexture !== undefined) {
              u.push(e.assignTexture(s, "map", n.baseColorTexture, o.S2Q));
            }
            s.metalness = n.metallicFactor !== undefined ? n.metallicFactor : 1;
            s.roughness = n.roughnessFactor !== undefined ? n.roughnessFactor : 1;
            if (n.metallicRoughnessTexture !== undefined) {
              u.push(e.assignTexture(s, "metalnessMap", n.metallicRoughnessTexture));
              u.push(e.assignTexture(s, "roughnessMap", n.metallicRoughnessTexture));
            }
            a = this._invokeOne(function (e) {
              return e.getMaterialType && e.getMaterialType(t);
            });
            u.push(Promise.all(this._invokeAll(function (e) {
              return e.extendMaterialParams && e.extendMaterialParams(t, s);
            })));
          }
          if (i.doubleSided === true) {
            s.side = o.$EB;
          }
          const c = i.alphaMode || B;
          if (c === H) {
            s.transparent = true;
            s.depthWrite = false;
          } else {
            s.transparent = false;
            if (c === W) {
              s.alphaTest = i.alphaCutoff !== undefined ? i.alphaCutoff : 0.5;
            }
          }
          if (i.normalTexture !== undefined && a !== o.V9B && (u.push(e.assignTexture(s, "normalMap", i.normalTexture)), s.normalScale = new o.I9Y(1, 1), i.normalTexture.scale !== undefined)) {
            const t = i.normalTexture.scale;
            s.normalScale.set(t, t);
          }
          if (i.occlusionTexture !== undefined && a !== o.V9B) {
            u.push(e.assignTexture(s, "aoMap", i.occlusionTexture));
            if (i.occlusionTexture.strength !== undefined) {
              s.aoMapIntensity = i.occlusionTexture.strength;
            }
          }
          if (i.emissiveFactor !== undefined && a !== o.V9B) {
            s.emissive = new o.Q1f().fromArray(i.emissiveFactor);
          }
          if (i.emissiveTexture !== undefined && a !== o.V9B) {
            u.push(e.assignTexture(s, "emissiveMap", i.emissiveTexture, o.S2Q));
          }
          return Promise.all(u).then(function () {
            const n = new a(s);
            if (i.name) {
              n.name = i.name;
            }
            q(n, i);
            e.associations.set(n, {
              materials: t
            });
            if (i.extensions) {
              G(r, n, i);
            }
            return n;
          });
        }
        createUniqueName(t) {
          const e = o.Nwf.sanitizeNodeName(t || "");
          let n = e;
          for (let t = 1; this.nodeNamesUsed[n]; ++t) {
            n = e + "_" + t;
          }
          this.nodeNamesUsed[n] = true;
          return n;
        }
        loadGeometries(t) {
          const e = this;
          const n = this.extensions;
          const r = this.primitiveCache;
          function i(t) {
            return n[l.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(t, e).then(function (n) {
              return $(n, t, e);
            });
          }
          const a = [];
          for (let n = 0, s = t.length; n < s; n++) {
            const s = t[n];
            const u = Y(s);
            const c = r[u];
            if (c) {
              a.push(c.promise);
            } else {
              let t;
              t = s.extensions && s.extensions[l.KHR_DRACO_MESH_COMPRESSION] ? i(s) : $(new o.LoY(), s, e);
              r[u] = {
                primitive: s,
                promise: t
              };
              a.push(t);
            }
          }
          return Promise.all(a);
        }
        loadMesh(t) {
          const e = this;
          const n = this.json;
          const r = this.extensions;
          const i = n.meshes[t];
          const a = i.primitives;
          const s = [];
          for (let t = 0, e = a.length; t < e; t++) {
            const e = a[t].material === undefined ? V(this.cache) : this.getDependency("material", a[t].material);
            s.push(e);
          }
          s.push(e.loadGeometries(a));
          return Promise.all(s).then(function (n) {
            const s = n.slice(0, n.length - 1);
            const l = n[n.length - 1];
            const u = [];
            for (let n = 0, c = l.length; n < c; n++) {
              const c = l[n];
              const h = a[n];
              let f;
              const p = s[n];
              if (h.mode === D.TRIANGLES || h.mode === D.TRIANGLE_STRIP || h.mode === D.TRIANGLE_FAN || h.mode === undefined) {
                f = i.isSkinnedMesh === true ? new o.I46(c, p) : new o.eaF(c, p);
                if (f.isSkinnedMesh === true && !f.geometry.attributes.skinWeight.normalized) {
                  f.normalizeSkinWeights();
                }
                if (h.mode === D.TRIANGLE_STRIP) {
                  f.geometry = tt(f.geometry, o.O49);
                } else if (h.mode === D.TRIANGLE_FAN) {
                  f.geometry = tt(f.geometry, o.rYR);
                }
              } else if (h.mode === D.LINES) {
                f = new o.DXC(c, p);
              } else if (h.mode === D.LINE_STRIP) {
                f = new o.N1A(c, p);
              } else if (h.mode === D.LINE_LOOP) {
                f = new o.FCc(c, p);
              } else {
                if (h.mode !== D.POINTS) {
                  throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + h.mode);
                }
                f = new o.ONl(c, p);
              }
              if (Object.keys(f.geometry.morphAttributes).length > 0) {
                X(f, i);
              }
              f.name = e.createUniqueName(i.name || "mesh_" + t);
              q(f, i);
              if (h.extensions) {
                G(r, f, h);
              }
              e.assignFinalMaterial(f);
              u.push(f);
            }
            for (let n = 0, r = u.length; n < r; n++) {
              e.associations.set(u[n], {
                meshes: t,
                primitives: n
              });
            }
            if (u.length === 1) {
              return u[0];
            }
            const c = new o.YJl();
            e.associations.set(c, {
              meshes: t
            });
            for (let t = 0, e = u.length; t < e; t++) {
              c.add(u[t]);
            }
            return c;
          });
        }
        loadCamera(t) {
          let e;
          const n = this.json.cameras[t];
          const r = n[n.type];
          if (r) {
            if (n.type === "perspective") {
              e = new o.ubm(o.cj9.radToDeg(r.yfov), r.aspectRatio || 1, r.znear || 1, r.zfar || 2000000);
            } else if (n.type === "orthographic") {
              e = new o.qUd(-r.xmag, r.xmag, r.ymag, -r.ymag, r.znear, r.zfar);
            }
            if (n.name) {
              e.name = this.createUniqueName(n.name);
            }
            q(e, n);
            return Promise.resolve(e);
          }
          console.warn("THREE.GLTFLoader: Missing camera parameters.");
        }
        loadSkin(t) {
          const e = this.json.skins[t];
          const n = [];
          for (let t = 0, r = e.joints.length; t < r; t++) {
            n.push(this.getDependency("node", e.joints[t]));
          }
          if (e.inverseBindMatrices !== undefined) {
            n.push(this.getDependency("accessor", e.inverseBindMatrices));
          } else {
            n.push(null);
          }
          return Promise.all(n).then(function (t) {
            const n = t.pop();
            const r = t;
            const i = [];
            const a = [];
            for (let t = 0, s = r.length; t < s; t++) {
              const s = r[t];
              if (s) {
                i.push(s);
                const e = new o.kn4();
                if (n !== null) {
                  e.fromArray(n.array, t * 16);
                }
                a.push(e);
              } else {
                console.warn("THREE.GLTFLoader: Joint \"%s\" could not be found.", e.joints[t]);
              }
            }
            return new o.EAD(i, a);
          });
        }
        loadAnimation(t) {
          const e = this.json.animations[t];
          const n = [];
          const r = [];
          const i = [];
          const a = [];
          const s = [];
          for (let t = 0, o = e.channels.length; t < o; t++) {
            const o = e.channels[t];
            const l = e.samplers[o.sampler];
            const u = o.target;
            const c = u.node;
            const h = e.parameters !== undefined ? e.parameters[l.input] : l.input;
            const f = e.parameters !== undefined ? e.parameters[l.output] : l.output;
            n.push(this.getDependency("node", c));
            r.push(this.getDependency("accessor", h));
            i.push(this.getDependency("accessor", f));
            a.push(l);
            s.push(u);
          }
          return Promise.all([Promise.all(n), Promise.all(r), Promise.all(i), Promise.all(a), Promise.all(s)]).then(function (n) {
            const r = n[0];
            const i = n[1];
            const a = n[2];
            const s = n[3];
            const l = n[4];
            const u = [];
            for (let t = 0, e = r.length; t < e; t++) {
              const e = r[t];
              const n = i[t];
              const c = a[t];
              const h = s[t];
              const f = l[t];
              if (e === undefined) {
                continue;
              }
              let p;
              e.updateMatrix();
              switch (U[f.path]) {
                case U.weights:
                  p = o.Hit;
                  break;
                case U.rotation:
                  p = o.MBL;
                  break;
                default:
                  p = o.RiT;
              }
              const d = e.name ? e.name : e.uuid;
              const m = h.interpolation !== undefined ? F[h.interpolation] : o.PJ3;
              const g = [];
              if (U[f.path] === U.weights) {
                e.traverse(function (t) {
                  if (t.morphTargetInfluences) {
                    g.push(t.name ? t.name : t.uuid);
                  }
                });
              } else {
                g.push(d);
              }
              let v = c.array;
              if (c.normalized) {
                const t = K(v.constructor);
                const e = new Float32Array(v.length);
                for (let n = 0, r = v.length; n < r; n++) {
                  e[n] = v[n] * t;
                }
                v = e;
              }
              for (let t = 0, e = g.length; t < e; t++) {
                const e = new p(g[t] + "." + U[f.path], n.array, v, m);
                if (h.interpolation === "CUBICSPLINE") {
                  e.createInterpolant = function (t) {
                    return new (this instanceof o.MBL ? L : A)(this.times, this.values, this.getValueSize() / 3, t);
                  };
                  e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;
                }
                u.push(e);
              }
            }
            const c = e.name ? e.name : "animation_" + t;
            return new o.tz3(c, undefined, u);
          });
        }
        createNodeMesh(t) {
          const e = this.json;
          const n = this;
          const r = e.nodes[t];
          if (r.mesh === undefined) {
            return null;
          } else {
            return n.getDependency("mesh", r.mesh).then(function (t) {
              const e = n._getNodeRef(n.meshCache, r.mesh, t);
              if (r.weights !== undefined) {
                e.traverse(function (t) {
                  if (t.isMesh) {
                    for (let e = 0, n = r.weights.length; e < n; e++) {
                      t.morphTargetInfluences[e] = r.weights[e];
                    }
                  }
                });
              }
              return e;
            });
          }
        }
        loadNode(t) {
          const e = this.json;
          const n = this.extensions;
          const r = this;
          const i = e.nodes[t];
          const a = i.name ? r.createUniqueName(i.name) : "";
          return function () {
            const e = [];
            const n = r._invokeOne(function (e) {
              return e.createNodeMesh && e.createNodeMesh(t);
            });
            if (n) {
              e.push(n);
            }
            if (i.camera !== undefined) {
              e.push(r.getDependency("camera", i.camera).then(function (t) {
                return r._getNodeRef(r.cameraCache, i.camera, t);
              }));
            }
            r._invokeAll(function (e) {
              return e.createNodeAttachment && e.createNodeAttachment(t);
            }).forEach(function (t) {
              e.push(t);
            });
            const o = [];
            const a = i.children || [];
            for (let t = 0, e = a.length; t < e; t++) {
              o.push(r.getDependency("node", a[t]));
            }
            const s = i.skin === undefined ? Promise.resolve(null) : r.getDependency("skin", i.skin);
            return Promise.all([Promise.all(e), Promise.all(o), s]);
          }().then(function (e) {
            const s = e[0];
            const l = e[1];
            const u = e[2];
            let c;
            c = i.isBone === true ? new o.$Kf() : s.length > 1 ? new o.YJl() : s.length === 1 ? s[0] : new o.B69();
            if (c !== s[0]) {
              for (let t = 0, e = s.length; t < e; t++) {
                c.add(s[t]);
              }
            }
            if (i.name) {
              c.userData.name = i.name;
              c.name = a;
            }
            q(c, i);
            if (i.extensions) {
              G(n, c, i);
            }
            if (i.matrix !== undefined) {
              const t = new o.kn4();
              t.fromArray(i.matrix);
              c.applyMatrix4(t);
            } else {
              if (i.translation !== undefined) {
                c.position.fromArray(i.translation);
              }
              if (i.rotation !== undefined) {
                c.quaternion.fromArray(i.rotation);
              }
              if (i.scale !== undefined) {
                c.scale.fromArray(i.scale);
              }
            }
            if (!r.associations.has(c)) {
              r.associations.set(c, {});
            }
            r.associations.get(c).nodes = t;
            if (u !== null) {
              c.traverse(function (t) {
                if (t.isSkinnedMesh) {
                  t.bind(u, Z);
                }
              });
            }
            for (let t = 0, e = l.length; t < e; t++) {
              c.add(l[t]);
            }
            return c;
          });
        }
        loadScene(t) {
          const e = this.extensions;
          const n = this.json.scenes[t];
          const r = this;
          const i = new o.YJl();
          if (n.name) {
            i.name = r.createUniqueName(n.name);
          }
          q(i, n);
          if (n.extensions) {
            G(e, i, n);
          }
          const a = n.nodes || [];
          const s = [];
          for (let t = 0, e = a.length; t < e; t++) {
            s.push(r.getDependency("node", a[t]));
          }
          return Promise.all(s).then(function (t) {
            for (let e = 0, n = t.length; e < n; e++) {
              i.add(t[e]);
            }
            r.associations = (t => {
              const e = new Map();
              for (const [t, n] of r.associations) {
                if (t instanceof o.imn || t instanceof o.gPd) {
                  e.set(t, n);
                }
              }
              t.traverse(t => {
                const n = r.associations.get(t);
                if (n != null) {
                  e.set(t, n);
                }
              });
              return e;
            })(i);
            return i;
          });
        }
      }
      function $(t, e, n) {
        const r = e.attributes;
        const i = [];
        function a(e, r) {
          return n.getDependency("accessor", e).then(function (e) {
            t.setAttribute(r, e);
          });
        }
        for (const e in r) {
          const n = z[e] || e.toLowerCase();
          if (!(n in t.attributes)) {
            i.push(a(r[e], n));
          }
        }
        if (e.indices !== undefined && !t.index) {
          const r = n.getDependency("accessor", e.indices).then(function (e) {
            t.setIndex(e);
          });
          i.push(r);
        }
        q(t, e);
        (function (t, e, n) {
          const r = e.attributes;
          const i = new o.NRn();
          if (r.POSITION === undefined) {
            return;
          }
          {
            const t = n.json.accessors[r.POSITION];
            const e = t.min;
            const a = t.max;
            if (e === undefined || a === undefined) {
              console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
              return;
            }
            i.set(new o.Pq0(e[0], e[1], e[2]), new o.Pq0(a[0], a[1], a[2]));
            if (t.normalized) {
              const e = K(I[t.componentType]);
              i.min.multiplyScalar(e);
              i.max.multiplyScalar(e);
            }
          }
          const a = e.targets;
          if (a !== undefined) {
            const t = new o.Pq0();
            const e = new o.Pq0();
            for (let r = 0, i = a.length; r < i; r++) {
              const i = a[r];
              if (i.POSITION !== undefined) {
                const r = n.json.accessors[i.POSITION];
                const o = r.min;
                const a = r.max;
                if (o !== undefined && a !== undefined) {
                  e.setX(Math.max(Math.abs(o[0]), Math.abs(a[0])));
                  e.setY(Math.max(Math.abs(o[1]), Math.abs(a[1])));
                  e.setZ(Math.max(Math.abs(o[2]), Math.abs(a[2])));
                  if (r.normalized) {
                    const t = K(I[r.componentType]);
                    e.multiplyScalar(t);
                  }
                  t.max(e);
                } else {
                  console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
                }
              }
            }
            i.expandByVector(t);
          }
          t.boundingBox = i;
          const s = new o.iyt();
          i.getCenter(s.center);
          s.radius = i.min.distanceTo(i.max) / 2;
          t.boundingSphere = s;
        })(t, e, n);
        return Promise.all(i).then(function () {
          if (e.targets !== undefined) {
            return function (t, e, n) {
              let r = false;
              let i = false;
              let o = false;
              for (let t = 0, n = e.length; t < n; t++) {
                const n = e[t];
                if (n.POSITION !== undefined) {
                  r = true;
                }
                if (n.NORMAL !== undefined) {
                  i = true;
                }
                if (n.COLOR_0 !== undefined) {
                  o = true;
                }
                if (r && i && o) {
                  break;
                }
              }
              if (!r && !i && !o) {
                return Promise.resolve(t);
              }
              const a = [];
              const s = [];
              const l = [];
              for (let u = 0, c = e.length; u < c; u++) {
                const c = e[u];
                if (r) {
                  const e = c.POSITION !== undefined ? n.getDependency("accessor", c.POSITION) : t.attributes.position;
                  a.push(e);
                }
                if (i) {
                  const e = c.NORMAL !== undefined ? n.getDependency("accessor", c.NORMAL) : t.attributes.normal;
                  s.push(e);
                }
                if (o) {
                  const e = c.COLOR_0 !== undefined ? n.getDependency("accessor", c.COLOR_0) : t.attributes.color;
                  l.push(e);
                }
              }
              return Promise.all([Promise.all(a), Promise.all(s), Promise.all(l)]).then(function (e) {
                const n = e[0];
                const a = e[1];
                const s = e[2];
                if (r) {
                  t.morphAttributes.position = n;
                }
                if (i) {
                  t.morphAttributes.normal = a;
                }
                if (o) {
                  t.morphAttributes.color = s;
                }
                t.morphTargetsRelative = true;
                return t;
              });
            }(t, e.targets, n);
          } else {
            return t;
          }
        });
      }
      function tt(t, e) {
        let n = t.getIndex();
        if (n === null) {
          const e = [];
          const r = t.getAttribute("position");
          if (r === undefined) {
            console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.");
            return t;
          }
          for (let t = 0; t < r.count; t++) {
            e.push(t);
          }
          t.setIndex(e);
          n = t.getIndex();
        }
        const r = n.count - 2;
        const i = [];
        if (e === o.rYR) {
          for (let t = 1; t <= r; t++) {
            i.push(n.getX(0));
            i.push(n.getX(t));
            i.push(n.getX(t + 1));
          }
        } else {
          for (let t = 0; t < r; t++) {
            if (t % 2 == 0) {
              i.push(n.getX(t));
              i.push(n.getX(t + 1));
              i.push(n.getX(t + 2));
            } else {
              i.push(n.getX(t + 2));
              i.push(n.getX(t + 1));
              i.push(n.getX(t));
            }
          }
        }
        if (i.length / 3 !== r) {
          console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
        }
        const a = t.clone();
        a.setIndex(i);
        return a;
      }
      function et(t) {
        return URL.createObjectURL(new Blob([t], {
          type: "text/javascript"
        }));
      }
      try {
        URL.revokeObjectURL(et(""));
      } catch (t) {
        et = function (t) {
          return "data:application/javascript;charset=UTF-8," + encodeURI(t);
        };
      }
      var nt = Uint8Array;
      var rt = Uint16Array;
      var it = Uint32Array;
      var ot = new nt([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
      var at = new nt([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
      var st = new nt([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
      function lt(t, e) {
        var n = new rt(31);
        for (var r = 0; r < 31; ++r) {
          n[r] = e += 1 << t[r - 1];
        }
        var i = new it(n[30]);
        for (r = 1; r < 30; ++r) {
          for (var o = n[r]; o < n[r + 1]; ++o) {
            i[o] = o - n[r] << 5 | r;
          }
        }
        return [n, i];
      }
      var ut = lt(ot, 2);
      var ct = ut[0];
      var ht = ut[1];
      ct[28] = 258;
      ht[258] = 28;
      var ft = lt(at, 0);
      var pt = ft[0];
      ft[1];
      var dt = new rt(32768);
      for (var mt = 0; mt < 32768; ++mt) {
        var gt = (mt & 43690) >>> 1 | (mt & 21845) << 1;
        gt = ((gt = (gt & 52428) >>> 2 | (gt & 13107) << 2) & 61680) >>> 4 | (gt & 3855) << 4;
        dt[mt] = ((gt & 65280) >>> 8 | (gt & 255) << 8) >>> 1;
      }
      function vt(t, e, n) {
        for (var r = t.length, i = 0, o = new rt(e); i < r; ++i) {
          ++o[t[i] - 1];
        }
        var a;
        var s = new rt(e);
        for (i = 0; i < e; ++i) {
          s[i] = s[i - 1] + o[i - 1] << 1;
        }
        if (n) {
          a = new rt(1 << e);
          var l = 15 - e;
          for (i = 0; i < r; ++i) {
            if (t[i]) {
              var u = i << 4 | t[i];
              var c = e - t[i];
              for (var h = s[t[i] - 1]++ << c, f = h | (1 << c) - 1; h <= f; ++h) {
                a[dt[h] >>> l] = u;
              }
            }
          }
        } else {
          a = new rt(r);
          i = 0;
          for (; i < r; ++i) {
            if (t[i]) {
              a[i] = dt[s[t[i] - 1]++] >>> 15 - t[i];
            }
          }
        }
        return a;
      }
      var yt = new nt(288);
      for (mt = 0; mt < 144; ++mt) {
        yt[mt] = 8;
      }
      for (mt = 144; mt < 256; ++mt) {
        yt[mt] = 9;
      }
      for (mt = 256; mt < 280; ++mt) {
        yt[mt] = 7;
      }
      for (mt = 280; mt < 288; ++mt) {
        yt[mt] = 8;
      }
      var bt = new nt(32);
      for (mt = 0; mt < 32; ++mt) {
        bt[mt] = 5;
      }
      var _t = vt(yt, 9, 1);
      var wt = vt(bt, 5, 1);
      function xt(t) {
        var e = t[0];
        for (var n = 1; n < t.length; ++n) {
          if (t[n] > e) {
            e = t[n];
          }
        }
        return e;
      }
      function St(t, e, n) {
        var r = e / 8 | 0;
        return (t[r] | t[r + 1] << 8) >> (e & 7) & n;
      }
      function Tt(t, e) {
        var n = e / 8 | 0;
        return (t[n] | t[n + 1] << 8 | t[n + 2] << 16) >> (e & 7);
      }
      function Mt(t) {
        return (t / 8 | 0) + (t & 7 && 1);
      }
      function Ot(t, e, n) {
        if (e == null || e < 0) {
          e = 0;
        }
        if (n == null || n > t.length) {
          n = t.length;
        }
        var r = new (t instanceof rt ? rt : t instanceof it ? it : nt)(n - e);
        r.set(t.subarray(e, n));
        return r;
      }
      function Pt(t, e, n) {
        var r = t.length;
        if (!r || n && !n.l && r < 5) {
          return e || new nt(0);
        }
        var i = !e || n;
        var o = !n || n.i;
        n ||= {};
        e ||= new nt(r * 3);
        function a(t) {
          var n = e.length;
          if (t > n) {
            var r = new nt(Math.max(n * 2, t));
            r.set(e);
            e = r;
          }
        }
        var s = n.f || 0;
        var l = n.p || 0;
        var u = n.b || 0;
        var c = n.l;
        var h = n.d;
        var f = n.m;
        var p = n.n;
        var d = r * 8;
        do {
          if (!c) {
            n.f = s = St(t, l, 1);
            var m = St(t, l + 1, 3);
            l += 3;
            if (!m) {
              var g = t[(P = Mt(l) + 4) - 4] | t[P - 3] << 8;
              var v = P + g;
              if (v > r) {
                if (o) {
                  throw "unexpected EOF";
                }
                break;
              }
              if (i) {
                a(u + g);
              }
              e.set(t.subarray(P, v), u);
              n.b = u += g;
              n.p = l = v * 8;
              continue;
            }
            if (m == 1) {
              c = _t;
              h = wt;
              f = 9;
              p = 5;
            } else {
              if (m != 2) {
                throw "invalid block type";
              }
              var y = St(t, l, 31) + 257;
              var b = St(t, l + 10, 15) + 4;
              var _ = y + St(t, l + 5, 31) + 1;
              l += 14;
              var w = new nt(_);
              var x = new nt(19);
              for (var S = 0; S < b; ++S) {
                x[st[S]] = St(t, l + S * 3, 7);
              }
              l += b * 3;
              var T = xt(x);
              var M = (1 << T) - 1;
              var O = vt(x, T, 1);
              for (S = 0; S < _;) {
                var P;
                var E = O[St(t, l, M)];
                l += E & 15;
                if ((P = E >>> 4) < 16) {
                  w[S++] = P;
                } else {
                  var C = 0;
                  var A = 0;
                  for (P == 16 ? (A = 3 + St(t, l, 3), l += 2, C = w[S - 1]) : P == 17 ? (A = 3 + St(t, l, 7), l += 3) : P == 18 && (A = 11 + St(t, l, 127), l += 7); A--;) {
                    w[S++] = C;
                  }
                }
              }
              var R = w.subarray(0, y);
              var L = w.subarray(y);
              f = xt(R);
              p = xt(L);
              c = vt(R, f, 1);
              h = vt(L, p, 1);
            }
            if (l > d) {
              if (o) {
                throw "unexpected EOF";
              }
              break;
            }
          }
          if (i) {
            a(u + 131072);
          }
          var D = (1 << f) - 1;
          var I = (1 << p) - 1;
          for (var j = l;; j = l) {
            var k = (C = c[Tt(t, l) & D]) >>> 4;
            if ((l += C & 15) > d) {
              if (o) {
                throw "unexpected EOF";
              }
              break;
            }
            if (!C) {
              throw "invalid length/literal";
            }
            if (k < 256) {
              e[u++] = k;
            } else {
              if (k == 256) {
                j = l;
                c = null;
                break;
              }
              var N = k - 254;
              if (k > 264) {
                var z = ot[S = k - 257];
                N = St(t, l, (1 << z) - 1) + ct[S];
                l += z;
              }
              var U = h[Tt(t, l) & I];
              var F = U >>> 4;
              if (!U) {
                throw "invalid distance";
              }
              l += U & 15;
              L = pt[F];
              if (F > 3) {
                z = at[F];
                L += Tt(t, l) & (1 << z) - 1;
                l += z;
              }
              if (l > d) {
                if (o) {
                  throw "unexpected EOF";
                }
                break;
              }
              if (i) {
                a(u + 131072);
              }
              for (var B = u + N; u < B; u += 4) {
                e[u] = e[u - L];
                e[u + 1] = e[u + 1 - L];
                e[u + 2] = e[u + 2 - L];
                e[u + 3] = e[u + 3 - L];
              }
              u = B;
            }
          }
          n.l = c;
          n.p = j;
          n.b = u;
          if (c) {
            s = 1;
            n.m = f;
            n.d = h;
            n.n = p;
          }
        } while (!s);
        if (u == e.length) {
          return e;
        } else {
          return Ot(e, 0, u);
        }
      }
      var Et = new nt(0);
      function Ct(t) {
        if ((t[0] & 15) != 8 || t[0] >>> 4 > 7 || (t[0] << 8 | t[1]) % 31) {
          throw "invalid zlib data";
        }
        if (t[1] & 32) {
          throw "invalid zlib data: preset dictionaries not supported";
        }
      }
      function At(t, e) {
        return Pt((Ct(t), t.subarray(2, -4)), e);
      }
      var Rt = typeof TextDecoder != "undefined" && new TextDecoder();
      try {
        Rt.decode(Et, {
          stream: true
        });
      } catch (t) {}
      function Lt(t, e, n) {
        const r = n.length - t - 1;
        if (e >= n[r]) {
          return r - 1;
        }
        if (e <= n[t]) {
          return t;
        }
        let i = t;
        let o = r;
        let a = Math.floor((i + o) / 2);
        while (e < n[a] || e >= n[a + 1]) {
          if (e < n[a]) {
            o = a;
          } else {
            i = a;
          }
          a = Math.floor((i + o) / 2);
        }
        return a;
      }
      function Dt(t, e, n, r) {
        const i = [];
        const o = [];
        const a = [];
        i[0] = 1;
        for (let s = 1; s <= n; ++s) {
          o[s] = e - r[t + 1 - s];
          a[s] = r[t + s] - e;
          let n = 0;
          for (let t = 0; t < s; ++t) {
            const e = a[t + 1];
            const r = o[s - t];
            const l = i[t] / (e + r);
            i[t] = n + e * l;
            n = r * l;
          }
          i[s] = n;
        }
        return i;
      }
      function It(t, e) {
        let n = 1;
        for (let e = 2; e <= t; ++e) {
          n *= e;
        }
        let r = 1;
        for (let t = 2; t <= e; ++t) {
          r *= t;
        }
        for (let n = 2; n <= t - e; ++n) {
          r *= n;
        }
        return n / r;
      }
      function jt(t, e, n, r, i) {
        const a = function (t, e, n, r, i) {
          const a = i < t ? i : t;
          const s = [];
          const l = Lt(t, r, e);
          const u = function (t, e, n, r, i) {
            const o = [];
            for (let t = 0; t <= n; ++t) {
              o[t] = 0;
            }
            const a = [];
            for (let t = 0; t <= r; ++t) {
              a[t] = o.slice(0);
            }
            const s = [];
            for (let t = 0; t <= n; ++t) {
              s[t] = o.slice(0);
            }
            s[0][0] = 1;
            const l = o.slice(0);
            const u = o.slice(0);
            for (let r = 1; r <= n; ++r) {
              l[r] = e - i[t + 1 - r];
              u[r] = i[t + r] - e;
              let n = 0;
              for (let t = 0; t < r; ++t) {
                const e = u[t + 1];
                const i = l[r - t];
                s[r][t] = e + i;
                const o = s[t][r - 1] / s[r][t];
                s[t][r] = n + e * o;
                n = i * o;
              }
              s[r][r] = n;
            }
            for (let t = 0; t <= n; ++t) {
              a[0][t] = s[t][n];
            }
            for (let t = 0; t <= n; ++t) {
              let e = 0;
              let i = 1;
              const l = [];
              for (let t = 0; t <= n; ++t) {
                l[t] = o.slice(0);
              }
              l[0][0] = 1;
              for (let o = 1; o <= r; ++o) {
                let r = 0;
                const u = t - o;
                const c = n - o;
                if (t >= o) {
                  l[i][0] = l[e][0] / s[c + 1][u];
                  r = l[i][0] * s[u][c];
                }
                const h = t - 1 <= c ? o - 1 : n - t;
                for (let t = u >= -1 ? 1 : -u; t <= h; ++t) {
                  l[i][t] = (l[e][t] - l[e][t - 1]) / s[c + 1][u + t];
                  r += l[i][t] * s[u + t][c];
                }
                if (t <= c) {
                  l[i][o] = -l[e][o - 1] / s[c + 1][t];
                  r += l[i][o] * s[t][c];
                }
                a[o][t] = r;
                const f = e;
                e = i;
                i = f;
              }
            }
            let c = n;
            for (let t = 1; t <= r; ++t) {
              for (let e = 0; e <= n; ++e) {
                a[t][e] *= c;
              }
              c *= n - t;
            }
            return a;
          }(l, r, t, a, e);
          const c = [];
          for (let t = 0; t < n.length; ++t) {
            const e = n[t].clone();
            const r = e.w;
            e.x *= r;
            e.y *= r;
            e.z *= r;
            c[t] = e;
          }
          for (let e = 0; e <= a; ++e) {
            const n = c[l - t].clone().multiplyScalar(u[e][0]);
            for (let r = 1; r <= t; ++r) {
              n.add(c[l - t + r].clone().multiplyScalar(u[e][r]));
            }
            s[e] = n;
          }
          for (let t = a + 1; t <= i + 1; ++t) {
            s[t] = new o.IUQ(0, 0, 0);
          }
          return s;
        }(t, e, n, r, i);
        return function (t) {
          const e = t.length;
          const n = [];
          const r = [];
          for (let i = 0; i < e; ++i) {
            const e = t[i];
            n[i] = new o.Pq0(e.x, e.y, e.z);
            r[i] = e.w;
          }
          const i = [];
          for (let t = 0; t < e; ++t) {
            const e = n[t].clone();
            for (let n = 1; n <= t; ++n) {
              e.sub(i[t - n].clone().multiplyScalar(It(t, n) * r[n]));
            }
            i[t] = e.divideScalar(r[0]);
          }
          return i;
        }(a);
      }
      class kt extends o.Ipv {
        constructor(t, e, n, r, i) {
          super();
          this.degree = t;
          this.knots = e;
          this.controlPoints = [];
          this.startKnot = r || 0;
          this.endKnot = i || this.knots.length - 1;
          for (let t = 0; t < n.length; ++t) {
            const e = n[t];
            this.controlPoints[t] = new o.IUQ(e.x, e.y, e.z, e.w);
          }
        }
        getPoint(t, e = new o.Pq0()) {
          const n = e;
          const r = this.knots[this.startKnot] + t * (this.knots[this.endKnot] - this.knots[this.startKnot]);
          const i = function (t, e, n, r) {
            const i = Lt(t, r, e);
            const a = Dt(i, r, t, e);
            const s = new o.IUQ(0, 0, 0, 0);
            for (let e = 0; e <= t; ++e) {
              const r = n[i - t + e];
              const o = a[e];
              const l = r.w * o;
              s.x += r.x * l;
              s.y += r.y * l;
              s.z += r.z * l;
              s.w += r.w * o;
            }
            return s;
          }(this.degree, this.knots, this.controlPoints, r);
          if (i.w !== 1) {
            i.divideScalar(i.w);
          }
          return n.set(i.x, i.y, i.z);
        }
        getTangent(t, e = new o.Pq0()) {
          const n = e;
          const r = this.knots[0] + t * (this.knots[this.knots.length - 1] - this.knots[0]);
          const i = jt(this.degree, this.knots, this.controlPoints, r, 1);
          n.copy(i[1]).normalize();
          return n;
        }
      }
      let Nt;
      let zt;
      let Ut;
      class Ft extends o.aHM {
        constructor(t) {
          super(t);
        }
        load(t, e, n, r) {
          const i = this;
          const a = i.path === "" ? o.r6x.extractUrlBase(t) : i.path;
          const s = new o.Y9S(this.manager);
          s.setPath(i.path);
          s.setResponseType("arraybuffer");
          s.setRequestHeader(i.requestHeader);
          s.setWithCredentials(i.withCredentials);
          s.load(t, function (n) {
            try {
              e(i.parse(n, a));
            } catch (e) {
              if (r) {
                r(e);
              } else {
                console.error(e);
              }
              i.manager.itemError(t);
            }
          }, n, r);
        }
        parse(t, e) {
          if (function (t) {
            const e = "Kaydara FBX Binary  \0";
            return t.byteLength >= e.length && e === re(t, 0, e.length);
          }(t)) {
            Nt = new Gt().parse(t);
          } else {
            const e = re(t);
            if (!function (t) {
              const e = ["K", "a", "y", "d", "a", "r", "a", "\\", "F", "B", "X", "\\", "B", "i", "n", "a", "r", "y", "\\", "\\"];
              let n = 0;
              function r(e) {
                const r = t[e - 1];
                t = t.slice(n + e);
                n++;
                return r;
              }
              for (let t = 0; t < e.length; ++t) {
                if (r(1) === e[t]) {
                  return false;
                }
              }
              return true;
            }(e)) {
              throw new Error("THREE.FBXLoader: Unknown format.");
            }
            if (Yt(e) < 7000) {
              throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + Yt(e));
            }
            Nt = new Vt().parse(e);
          }
          const n = new o.Tap(this.manager).setPath(this.resourcePath || e).setCrossOrigin(this.crossOrigin);
          return new Bt(n, this.manager).parse(Nt);
        }
      }
      class Bt {
        constructor(t, e) {
          this.textureLoader = t;
          this.manager = e;
        }
        parse() {
          zt = this.parseConnections();
          const t = this.parseImages();
          const e = this.parseTextures(t);
          const n = this.parseMaterials(e);
          const r = this.parseDeformers();
          const i = new Wt().parse(r);
          this.parseScene(r, i, n);
          return Ut;
        }
        parseConnections() {
          const t = new Map();
          if ("Connections" in Nt) {
            Nt.Connections.connections.forEach(function (e) {
              const n = e[0];
              const r = e[1];
              const i = e[2];
              if (!t.has(n)) {
                t.set(n, {
                  parents: [],
                  children: []
                });
              }
              const o = {
                ID: r,
                relationship: i
              };
              t.get(n).parents.push(o);
              if (!t.has(r)) {
                t.set(r, {
                  parents: [],
                  children: []
                });
              }
              const a = {
                ID: n,
                relationship: i
              };
              t.get(r).children.push(a);
            });
          }
          return t;
        }
        parseImages() {
          const t = {};
          const e = {};
          if ("Video" in Nt.Objects) {
            const n = Nt.Objects.Video;
            for (const r in n) {
              const i = n[r];
              t[parseInt(r)] = i.RelativeFilename || i.Filename;
              if ("Content" in i) {
                const t = i.Content instanceof ArrayBuffer && i.Content.byteLength > 0;
                const o = typeof i.Content == "string" && i.Content !== "";
                if (t || o) {
                  const t = this.parseImage(n[r]);
                  e[i.RelativeFilename || i.Filename] = t;
                }
              }
            }
          }
          for (const n in t) {
            const r = t[n];
            if (e[r] !== undefined) {
              t[n] = e[r];
            } else {
              t[n] = t[n].split("\\").pop();
            }
          }
          return t;
        }
        parseImage(t) {
          const e = t.Content;
          const n = t.RelativeFilename || t.Filename;
          const r = n.slice(n.lastIndexOf(".") + 1).toLowerCase();
          let i;
          switch (r) {
            case "bmp":
              i = "image/bmp";
              break;
            case "jpg":
            case "jpeg":
              i = "image/jpeg";
              break;
            case "png":
              i = "image/png";
              break;
            case "tif":
              i = "image/tiff";
              break;
            case "tga":
              if (this.manager.getHandler(".tga") === null) {
                console.warn("FBXLoader: TGA loader not found, skipping ", n);
              }
              i = "image/tga";
              break;
            default:
              console.warn("FBXLoader: Image type \"" + r + "\" is not supported.");
              return;
          }
          if (typeof e == "string") {
            return "data:" + i + ";base64," + e;
          }
          {
            const t = new Uint8Array(e);
            return window.URL.createObjectURL(new Blob([t], {
              type: i
            }));
          }
        }
        parseTextures(t) {
          const e = new Map();
          if ("Texture" in Nt.Objects) {
            const n = Nt.Objects.Texture;
            for (const r in n) {
              const i = this.parseTexture(n[r], t);
              e.set(parseInt(r), i);
            }
          }
          return e;
        }
        parseTexture(t, e) {
          const n = this.loadTexture(t, e);
          n.ID = t.id;
          n.name = t.attrName;
          const r = t.WrapModeU;
          const i = t.WrapModeV;
          const a = r !== undefined ? r.value : 0;
          const s = i !== undefined ? i.value : 0;
          n.wrapS = a === 0 ? o.GJx : o.ghU;
          n.wrapT = s === 0 ? o.GJx : o.ghU;
          if ("Scaling" in t) {
            const e = t.Scaling.value;
            n.repeat.x = e[0];
            n.repeat.y = e[1];
          }
          if ("Translation" in t) {
            const e = t.Translation.value;
            n.offset.x = e[0];
            n.offset.y = e[1];
          }
          return n;
        }
        loadTexture(t, e) {
          let n;
          const r = this.textureLoader.path;
          const i = zt.get(t.id).children;
          let a;
          if (i !== undefined && i.length > 0 && e[i[0].ID] !== undefined) {
            n = e[i[0].ID];
            if (n.indexOf("blob:") === 0 || n.indexOf("data:") === 0) {
              this.textureLoader.setPath(undefined);
            }
          }
          const s = t.FileName.slice(-3).toLowerCase();
          if (s === "tga") {
            const e = this.manager.getHandler(".tga");
            if (e === null) {
              console.warn("FBXLoader: TGA loader not found, creating placeholder texture for", t.RelativeFilename);
              a = new o.gPd();
            } else {
              e.setPath(this.textureLoader.path);
              a = e.load(n);
            }
          } else if (s === "psd") {
            console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for", t.RelativeFilename);
            a = new o.gPd();
          } else {
            a = this.textureLoader.load(n);
          }
          this.textureLoader.setPath(r);
          return a;
        }
        parseMaterials(t) {
          const e = new Map();
          if ("Material" in Nt.Objects) {
            const n = Nt.Objects.Material;
            for (const r in n) {
              const i = this.parseMaterial(n[r], t);
              if (i !== null) {
                e.set(parseInt(r), i);
              }
            }
          }
          return e;
        }
        parseMaterial(t, e) {
          const n = t.id;
          const r = t.attrName;
          let i = t.ShadingModel;
          if (typeof i == "object") {
            i = i.value;
          }
          if (!zt.has(n)) {
            return null;
          }
          const a = this.parseParameters(t, e, n);
          let s;
          switch (i.toLowerCase()) {
            case "phong":
              s = new o.tXL();
              break;
            case "lambert":
              s = new o.G_z();
              break;
            default:
              console.warn("THREE.FBXLoader: unknown material type \"%s\". Defaulting to MeshPhongMaterial.", i);
              s = new o.tXL();
          }
          s.setValues(a);
          s.name = r;
          return s;
        }
        parseParameters(t, e, n) {
          const r = {};
          if (t.BumpFactor) {
            r.bumpScale = t.BumpFactor.value;
          }
          if (t.Diffuse) {
            r.color = new o.Q1f().fromArray(t.Diffuse.value);
          } else if (!!t.DiffuseColor && (t.DiffuseColor.type === "Color" || t.DiffuseColor.type === "ColorRGB")) {
            r.color = new o.Q1f().fromArray(t.DiffuseColor.value);
          }
          if (t.DisplacementFactor) {
            r.displacementScale = t.DisplacementFactor.value;
          }
          if (t.Emissive) {
            r.emissive = new o.Q1f().fromArray(t.Emissive.value);
          } else if (!!t.EmissiveColor && (t.EmissiveColor.type === "Color" || t.EmissiveColor.type === "ColorRGB")) {
            r.emissive = new o.Q1f().fromArray(t.EmissiveColor.value);
          }
          if (t.EmissiveFactor) {
            r.emissiveIntensity = parseFloat(t.EmissiveFactor.value);
          }
          if (t.Opacity) {
            r.opacity = parseFloat(t.Opacity.value);
          }
          if (r.opacity < 1) {
            r.transparent = true;
          }
          if (t.ReflectionFactor) {
            r.reflectivity = t.ReflectionFactor.value;
          }
          if (t.Shininess) {
            r.shininess = t.Shininess.value;
          }
          if (t.Specular) {
            r.specular = new o.Q1f().fromArray(t.Specular.value);
          } else if (t.SpecularColor && t.SpecularColor.type === "Color") {
            r.specular = new o.Q1f().fromArray(t.SpecularColor.value);
          }
          const i = this;
          zt.get(n).children.forEach(function (t) {
            const n = t.relationship;
            switch (n) {
              case "Bump":
                r.bumpMap = i.getTexture(e, t.ID);
                break;
              case "Maya|TEX_ao_map":
                r.aoMap = i.getTexture(e, t.ID);
                break;
              case "DiffuseColor":
              case "Maya|TEX_color_map":
                r.map = i.getTexture(e, t.ID);
                if (r.map !== undefined) {
                  r.map.encoding = o.S2Q;
                }
                break;
              case "DisplacementColor":
                r.displacementMap = i.getTexture(e, t.ID);
                break;
              case "EmissiveColor":
                r.emissiveMap = i.getTexture(e, t.ID);
                if (r.emissiveMap !== undefined) {
                  r.emissiveMap.encoding = o.S2Q;
                }
                break;
              case "NormalMap":
              case "Maya|TEX_normal_map":
                r.normalMap = i.getTexture(e, t.ID);
                break;
              case "ReflectionColor":
                r.envMap = i.getTexture(e, t.ID);
                if (r.envMap !== undefined) {
                  r.envMap.mapping = o.wfO;
                  r.envMap.encoding = o.S2Q;
                }
                break;
              case "SpecularColor":
                r.specularMap = i.getTexture(e, t.ID);
                if (r.specularMap !== undefined) {
                  r.specularMap.encoding = o.S2Q;
                }
                break;
              case "TransparentColor":
              case "TransparencyFactor":
                r.alphaMap = i.getTexture(e, t.ID);
                r.transparent = true;
                break;
              default:
                console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.", n);
            }
          });
          return r;
        }
        getTexture(t, e) {
          if ("LayeredTexture" in Nt.Objects && e in Nt.Objects.LayeredTexture) {
            console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer.");
            e = zt.get(e).children[0].ID;
          }
          return t.get(e);
        }
        parseDeformers() {
          const t = {};
          const e = {};
          if ("Deformer" in Nt.Objects) {
            const n = Nt.Objects.Deformer;
            for (const r in n) {
              const i = n[r];
              const o = zt.get(parseInt(r));
              if (i.attrType === "Skin") {
                const e = this.parseSkeleton(o, n);
                e.ID = r;
                if (o.parents.length > 1) {
                  console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported.");
                }
                e.geometryID = o.parents[0].ID;
                t[r] = e;
              } else if (i.attrType === "BlendShape") {
                const t = {
                  id: r
                };
                t.rawTargets = this.parseMorphTargets(o, n);
                t.id = r;
                if (o.parents.length > 1) {
                  console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported.");
                }
                e[r] = t;
              }
            }
          }
          return {
            skeletons: t,
            morphTargets: e
          };
        }
        parseSkeleton(t, e) {
          const n = [];
          t.children.forEach(function (t) {
            const r = e[t.ID];
            if (r.attrType !== "Cluster") {
              return;
            }
            const i = {
              ID: t.ID,
              indices: [],
              weights: [],
              transformLink: new o.kn4().fromArray(r.TransformLink.a)
            };
            if ("Indexes" in r) {
              i.indices = r.Indexes.a;
              i.weights = r.Weights.a;
            }
            n.push(i);
          });
          return {
            rawBones: n,
            bones: []
          };
        }
        parseMorphTargets(t, e) {
          const n = [];
          for (let r = 0; r < t.children.length; r++) {
            const i = t.children[r];
            const o = e[i.ID];
            const a = {
              name: o.attrName,
              initialWeight: o.DeformPercent,
              id: o.id,
              fullWeights: o.FullWeights.a
            };
            if (o.attrType !== "BlendShapeChannel") {
              return;
            }
            a.geoID = zt.get(parseInt(i.ID)).children.filter(function (t) {
              return t.relationship === undefined;
            })[0].ID;
            n.push(a);
          }
          return n;
        }
        parseScene(t, e, n) {
          Ut = new o.YJl();
          const r = this.parseModels(t.skeletons, e, n);
          const i = Nt.Objects.Model;
          const a = this;
          r.forEach(function (t) {
            const e = i[t.ID];
            a.setLookAtProperties(t, e);
            zt.get(t.ID).parents.forEach(function (e) {
              const n = r.get(e.ID);
              if (n !== undefined) {
                n.add(t);
              }
            });
            if (t.parent === null) {
              Ut.add(t);
            }
          });
          this.bindSkeleton(t.skeletons, e, r);
          this.createAmbientLight();
          Ut.traverse(function (t) {
            if (t.userData.transformData) {
              if (t.parent) {
                t.userData.transformData.parentMatrix = t.parent.matrix;
                t.userData.transformData.parentMatrixWorld = t.parent.matrixWorld;
              }
              const e = te(t.userData.transformData);
              t.applyMatrix4(e);
              t.updateWorldMatrix();
            }
          });
          const s = new Ht().parse();
          if (Ut.children.length === 1 && Ut.children[0].isGroup) {
            Ut.children[0].animations = s;
            Ut = Ut.children[0];
          }
          Ut.animations = s;
        }
        parseModels(t, e, n) {
          const r = new Map();
          const i = Nt.Objects.Model;
          for (const a in i) {
            const s = parseInt(a);
            const l = i[a];
            const u = zt.get(s);
            let c = this.buildSkeleton(u, t, s, l.attrName);
            if (!c) {
              switch (l.attrType) {
                case "Camera":
                  c = this.createCamera(u);
                  break;
                case "Light":
                  c = this.createLight(u);
                  break;
                case "Mesh":
                  c = this.createMesh(u, e, n);
                  break;
                case "NurbsCurve":
                  c = this.createCurve(u, e);
                  break;
                case "LimbNode":
                case "Root":
                  c = new o.$Kf();
                  break;
                default:
                  c = new o.YJl();
              }
              c.name = l.attrName ? o.Nwf.sanitizeNodeName(l.attrName) : "";
              c.ID = s;
            }
            this.getTransformData(c, l);
            r.set(s, c);
          }
          return r;
        }
        buildSkeleton(t, e, n, r) {
          let i = null;
          t.parents.forEach(function (t) {
            for (const a in e) {
              const s = e[a];
              s.rawBones.forEach(function (e, a) {
                if (e.ID === t.ID) {
                  const t = i;
                  i = new o.$Kf();
                  i.matrixWorld.copy(e.transformLink);
                  i.name = r ? o.Nwf.sanitizeNodeName(r) : "";
                  i.ID = n;
                  s.bones[a] = i;
                  if (t !== null) {
                    i.add(t);
                  }
                }
              });
            }
          });
          return i;
        }
        createCamera(t) {
          let e;
          let n;
          t.children.forEach(function (t) {
            const e = Nt.Objects.NodeAttribute[t.ID];
            if (e !== undefined) {
              n = e;
            }
          });
          if (n === undefined) {
            e = new o.B69();
          } else {
            let t = 0;
            if (n.CameraProjectionType !== undefined && n.CameraProjectionType.value === 1) {
              t = 1;
            }
            let r = 1;
            if (n.NearPlane !== undefined) {
              r = n.NearPlane.value / 1000;
            }
            let i = 1000;
            if (n.FarPlane !== undefined) {
              i = n.FarPlane.value / 1000;
            }
            let a = window.innerWidth;
            let s = window.innerHeight;
            if (n.AspectWidth !== undefined && n.AspectHeight !== undefined) {
              a = n.AspectWidth.value;
              s = n.AspectHeight.value;
            }
            const l = a / s;
            let u = 45;
            if (n.FieldOfView !== undefined) {
              u = n.FieldOfView.value;
            }
            const c = n.FocalLength ? n.FocalLength.value : null;
            switch (t) {
              case 0:
                e = new o.ubm(u, l, r, i);
                if (c !== null) {
                  e.setFocalLength(c);
                }
                break;
              case 1:
                e = new o.qUd(-a / 2, a / 2, s / 2, -s / 2, r, i);
                break;
              default:
                console.warn("THREE.FBXLoader: Unknown camera type " + t + ".");
                e = new o.B69();
            }
          }
          return e;
        }
        createLight(t) {
          let e;
          let n;
          t.children.forEach(function (t) {
            const e = Nt.Objects.NodeAttribute[t.ID];
            if (e !== undefined) {
              n = e;
            }
          });
          if (n === undefined) {
            e = new o.B69();
          } else {
            let t;
            t = n.LightType === undefined ? 0 : n.LightType.value;
            let r = 16777215;
            if (n.Color !== undefined) {
              r = new o.Q1f().fromArray(n.Color.value);
            }
            let i = n.Intensity === undefined ? 1 : n.Intensity.value / 100;
            if (n.CastLightOnObject !== undefined && n.CastLightOnObject.value === 0) {
              i = 0;
            }
            let a = 0;
            if (n.FarAttenuationEnd !== undefined) {
              a = n.EnableFarAttenuation !== undefined && n.EnableFarAttenuation.value === 0 ? 0 : n.FarAttenuationEnd.value;
            }
            const s = 1;
            switch (t) {
              case 0:
                e = new o.HiM(r, i, a, s);
                break;
              case 1:
                e = new o.ZyN(r, i);
                break;
              case 2:
                let t = Math.PI / 3;
                if (n.InnerAngle !== undefined) {
                  t = o.cj9.degToRad(n.InnerAngle.value);
                }
                let l = 0;
                if (n.OuterAngle !== undefined) {
                  l = o.cj9.degToRad(n.OuterAngle.value);
                  l = Math.max(l, 1);
                }
                e = new o.nCl(r, i, a, t, l, s);
                break;
              default:
                console.warn("THREE.FBXLoader: Unknown light type " + n.LightType.value + ", defaulting to a PointLight.");
                e = new o.HiM(r, i);
            }
            if (n.CastShadows !== undefined && n.CastShadows.value === 1) {
              e.castShadow = true;
            }
          }
          return e;
        }
        createMesh(t, e, n) {
          let r;
          let i = null;
          let a = null;
          const s = [];
          t.children.forEach(function (t) {
            if (e.has(t.ID)) {
              i = e.get(t.ID);
            }
            if (n.has(t.ID)) {
              s.push(n.get(t.ID));
            }
          });
          if (s.length > 1) {
            a = s;
          } else if (s.length > 0) {
            a = s[0];
          } else {
            a = new o.tXL({
              color: 13421772
            });
            s.push(a);
          }
          if ("color" in i.attributes) {
            s.forEach(function (t) {
              t.vertexColors = true;
            });
          }
          if (i.FBX_Deformer) {
            r = new o.I46(i, a);
            r.normalizeSkinWeights();
          } else {
            r = new o.eaF(i, a);
          }
          return r;
        }
        createCurve(t, e) {
          const n = t.children.reduce(function (t, n) {
            if (e.has(n.ID)) {
              t = e.get(n.ID);
            }
            return t;
          }, null);
          const r = new o.mrM({
            color: 3342591,
            linewidth: 1
          });
          return new o.N1A(n, r);
        }
        getTransformData(t, e) {
          const n = {};
          if ("InheritType" in e) {
            n.inheritType = parseInt(e.InheritType.value);
          }
          n.eulerOrder = "RotationOrder" in e ? ee(e.RotationOrder.value) : "ZYX";
          if ("Lcl_Translation" in e) {
            n.translation = e.Lcl_Translation.value;
          }
          if ("PreRotation" in e) {
            n.preRotation = e.PreRotation.value;
          }
          if ("Lcl_Rotation" in e) {
            n.rotation = e.Lcl_Rotation.value;
          }
          if ("PostRotation" in e) {
            n.postRotation = e.PostRotation.value;
          }
          if ("Lcl_Scaling" in e) {
            n.scale = e.Lcl_Scaling.value;
          }
          if ("ScalingOffset" in e) {
            n.scalingOffset = e.ScalingOffset.value;
          }
          if ("ScalingPivot" in e) {
            n.scalingPivot = e.ScalingPivot.value;
          }
          if ("RotationOffset" in e) {
            n.rotationOffset = e.RotationOffset.value;
          }
          if ("RotationPivot" in e) {
            n.rotationPivot = e.RotationPivot.value;
          }
          t.userData.transformData = n;
        }
        setLookAtProperties(t, e) {
          if ("LookAtProperty" in e) {
            zt.get(t.ID).children.forEach(function (e) {
              if (e.relationship === "LookAtProperty") {
                const n = Nt.Objects.Model[e.ID];
                if ("Lcl_Translation" in n) {
                  const e = n.Lcl_Translation.value;
                  if (t.target !== undefined) {
                    t.target.position.fromArray(e);
                    Ut.add(t.target);
                  } else {
                    t.lookAt(new o.Pq0().fromArray(e));
                  }
                }
              }
            });
          }
        }
        bindSkeleton(t, e, n) {
          const r = this.parsePoseNodes();
          for (const i in t) {
            const a = t[i];
            zt.get(parseInt(a.ID)).parents.forEach(function (t) {
              if (e.has(t.ID)) {
                const e = t.ID;
                zt.get(e).parents.forEach(function (t) {
                  if (n.has(t.ID)) {
                    n.get(t.ID).bind(new o.EAD(a.bones), r[t.ID]);
                  }
                });
              }
            });
          }
        }
        parsePoseNodes() {
          const t = {};
          if ("Pose" in Nt.Objects) {
            const e = Nt.Objects.Pose;
            for (const n in e) {
              if (e[n].attrType === "BindPose" && e[n].NbPoseNodes > 0) {
                const r = e[n].PoseNode;
                if (Array.isArray(r)) {
                  r.forEach(function (e) {
                    t[e.Node] = new o.kn4().fromArray(e.Matrix.a);
                  });
                } else {
                  t[r.Node] = new o.kn4().fromArray(r.Matrix.a);
                }
              }
            }
          }
          return t;
        }
        createAmbientLight() {
          if ("GlobalSettings" in Nt && "AmbientColor" in Nt.GlobalSettings) {
            const t = Nt.GlobalSettings.AmbientColor.value;
            const e = t[0];
            const n = t[1];
            const r = t[2];
            if (e !== 0 || n !== 0 || r !== 0) {
              const t = new o.Q1f(e, n, r);
              Ut.add(new o.$p8(t, 1));
            }
          }
        }
      }
      class Wt {
        constructor() {
          this.negativeMaterialIndices = false;
        }
        parse(t) {
          const e = new Map();
          if ("Geometry" in Nt.Objects) {
            const n = Nt.Objects.Geometry;
            for (const r in n) {
              const i = zt.get(parseInt(r));
              const o = this.parseGeometry(i, n[r], t);
              e.set(parseInt(r), o);
            }
          }
          if (this.negativeMaterialIndices === true) {
            console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected.");
          }
          return e;
        }
        parseGeometry(t, e, n) {
          switch (e.attrType) {
            case "Mesh":
              return this.parseMeshGeometry(t, e, n);
            case "NurbsCurve":
              return this.parseNurbsGeometry(e);
          }
        }
        parseMeshGeometry(t, e, n) {
          const r = n.skeletons;
          const i = [];
          const o = t.parents.map(function (t) {
            return Nt.Objects.Model[t.ID];
          });
          if (o.length === 0) {
            return;
          }
          const a = t.children.reduce(function (t, e) {
            if (r[e.ID] !== undefined) {
              t = r[e.ID];
            }
            return t;
          }, null);
          t.children.forEach(function (t) {
            if (n.morphTargets[t.ID] !== undefined) {
              i.push(n.morphTargets[t.ID]);
            }
          });
          const s = o[0];
          const l = {};
          if ("RotationOrder" in s) {
            l.eulerOrder = ee(s.RotationOrder.value);
          }
          if ("InheritType" in s) {
            l.inheritType = parseInt(s.InheritType.value);
          }
          if ("GeometricTranslation" in s) {
            l.translation = s.GeometricTranslation.value;
          }
          if ("GeometricRotation" in s) {
            l.rotation = s.GeometricRotation.value;
          }
          if ("GeometricScaling" in s) {
            l.scale = s.GeometricScaling.value;
          }
          const u = te(l);
          return this.genGeometry(e, a, i, u);
        }
        genGeometry(t, e, n, r) {
          const i = new o.LoY();
          if (t.attrName) {
            i.name = t.attrName;
          }
          const a = this.parseGeoNode(t, e);
          const s = this.genBuffers(a);
          const l = new o.qtW(s.vertex, 3);
          l.applyMatrix4(r);
          i.setAttribute("position", l);
          if (s.colors.length > 0) {
            i.setAttribute("color", new o.qtW(s.colors, 3));
          }
          if (e) {
            i.setAttribute("skinIndex", new o.A$4(s.weightsIndices, 4));
            i.setAttribute("skinWeight", new o.qtW(s.vertexWeights, 4));
            i.FBX_Deformer = e;
          }
          if (s.normal.length > 0) {
            const t = new o.dwI().getNormalMatrix(r);
            const e = new o.qtW(s.normal, 3);
            e.applyNormalMatrix(t);
            i.setAttribute("normal", e);
          }
          s.uvs.forEach(function (t, e) {
            let n = "uv" + (e + 1).toString();
            if (e === 0) {
              n = "uv";
            }
            i.setAttribute(n, new o.qtW(s.uvs[e], 2));
          });
          if (a.material && a.material.mappingType !== "AllSame") {
            let t = s.materialIndex[0];
            let e = 0;
            s.materialIndex.forEach(function (n, r) {
              if (n !== t) {
                i.addGroup(e, r - e, t);
                t = n;
                e = r;
              }
            });
            if (i.groups.length > 0) {
              const e = i.groups[i.groups.length - 1];
              const n = e.start + e.count;
              if (n !== s.materialIndex.length) {
                i.addGroup(n, s.materialIndex.length - n, t);
              }
            }
            if (i.groups.length === 0) {
              i.addGroup(0, s.materialIndex.length, s.materialIndex[0]);
            }
          }
          this.addMorphTargets(i, t, n, r);
          return i;
        }
        parseGeoNode(t, e) {
          const n = {
            vertexPositions: t.Vertices !== undefined ? t.Vertices.a : [],
            vertexIndices: t.PolygonVertexIndex !== undefined ? t.PolygonVertexIndex.a : []
          };
          if (t.LayerElementColor) {
            n.color = this.parseVertexColors(t.LayerElementColor[0]);
          }
          if (t.LayerElementMaterial) {
            n.material = this.parseMaterialIndices(t.LayerElementMaterial[0]);
          }
          if (t.LayerElementNormal) {
            n.normal = this.parseNormals(t.LayerElementNormal[0]);
          }
          if (t.LayerElementUV) {
            n.uv = [];
            let e = 0;
            while (t.LayerElementUV[e]) {
              if (t.LayerElementUV[e].UV) {
                n.uv.push(this.parseUVs(t.LayerElementUV[e]));
              }
              e++;
            }
          }
          n.weightTable = {};
          if (e !== null) {
            n.skeleton = e;
            e.rawBones.forEach(function (t, e) {
              t.indices.forEach(function (r, i) {
                if (n.weightTable[r] === undefined) {
                  n.weightTable[r] = [];
                }
                n.weightTable[r].push({
                  id: e,
                  weight: t.weights[i]
                });
              });
            });
          }
          return n;
        }
        genBuffers(t) {
          const e = {
            vertex: [],
            normal: [],
            colors: [],
            uvs: [],
            materialIndex: [],
            vertexWeights: [],
            weightsIndices: []
          };
          let n = 0;
          let r = 0;
          let i = false;
          let o = [];
          let a = [];
          let s = [];
          let l = [];
          let u = [];
          let c = [];
          const h = this;
          t.vertexIndices.forEach(function (f, p) {
            let d;
            let m = false;
            if (f < 0) {
              f ^= -1;
              m = true;
            }
            let g = [];
            let v = [];
            o.push(f * 3, f * 3 + 1, f * 3 + 2);
            if (t.color) {
              const e = Zt(p, n, f, t.color);
              s.push(e[0], e[1], e[2]);
            }
            if (t.skeleton) {
              if (t.weightTable[f] !== undefined) {
                t.weightTable[f].forEach(function (t) {
                  v.push(t.weight);
                  g.push(t.id);
                });
              }
              if (v.length > 4) {
                if (!i) {
                  console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights.");
                  i = true;
                }
                const t = [0, 0, 0, 0];
                const e = [0, 0, 0, 0];
                v.forEach(function (n, r) {
                  let i = n;
                  let o = g[r];
                  e.forEach(function (e, n, r) {
                    if (i > e) {
                      r[n] = i;
                      i = e;
                      const a = t[n];
                      t[n] = o;
                      o = a;
                    }
                  });
                });
                g = t;
                v = e;
              }
              while (v.length < 4) {
                v.push(0);
                g.push(0);
              }
              for (let t = 0; t < 4; ++t) {
                u.push(v[t]);
                c.push(g[t]);
              }
            }
            if (t.normal) {
              const e = Zt(p, n, f, t.normal);
              a.push(e[0], e[1], e[2]);
            }
            if (t.material && t.material.mappingType !== "AllSame") {
              d = Zt(p, n, f, t.material)[0];
              if (d < 0) {
                h.negativeMaterialIndices = true;
                d = 0;
              }
            }
            if (t.uv) {
              t.uv.forEach(function (t, e) {
                const r = Zt(p, n, f, t);
                if (l[e] === undefined) {
                  l[e] = [];
                }
                l[e].push(r[0]);
                l[e].push(r[1]);
              });
            }
            r++;
            if (m) {
              if (r > 4) {
                console.warn("THREE.FBXLoader: Polygons with more than four sides are not supported. Make sure to triangulate the geometry during export.");
              }
              h.genFace(e, t, o, d, a, s, l, u, c, r);
              n++;
              r = 0;
              o = [];
              a = [];
              s = [];
              l = [];
              u = [];
              c = [];
            }
          });
          return e;
        }
        genFace(t, e, n, r, i, o, a, s, l, u) {
          for (let c = 2; c < u; c++) {
            t.vertex.push(e.vertexPositions[n[0]]);
            t.vertex.push(e.vertexPositions[n[1]]);
            t.vertex.push(e.vertexPositions[n[2]]);
            t.vertex.push(e.vertexPositions[n[(c - 1) * 3]]);
            t.vertex.push(e.vertexPositions[n[(c - 1) * 3 + 1]]);
            t.vertex.push(e.vertexPositions[n[(c - 1) * 3 + 2]]);
            t.vertex.push(e.vertexPositions[n[c * 3]]);
            t.vertex.push(e.vertexPositions[n[c * 3 + 1]]);
            t.vertex.push(e.vertexPositions[n[c * 3 + 2]]);
            if (e.skeleton) {
              t.vertexWeights.push(s[0]);
              t.vertexWeights.push(s[1]);
              t.vertexWeights.push(s[2]);
              t.vertexWeights.push(s[3]);
              t.vertexWeights.push(s[(c - 1) * 4]);
              t.vertexWeights.push(s[(c - 1) * 4 + 1]);
              t.vertexWeights.push(s[(c - 1) * 4 + 2]);
              t.vertexWeights.push(s[(c - 1) * 4 + 3]);
              t.vertexWeights.push(s[c * 4]);
              t.vertexWeights.push(s[c * 4 + 1]);
              t.vertexWeights.push(s[c * 4 + 2]);
              t.vertexWeights.push(s[c * 4 + 3]);
              t.weightsIndices.push(l[0]);
              t.weightsIndices.push(l[1]);
              t.weightsIndices.push(l[2]);
              t.weightsIndices.push(l[3]);
              t.weightsIndices.push(l[(c - 1) * 4]);
              t.weightsIndices.push(l[(c - 1) * 4 + 1]);
              t.weightsIndices.push(l[(c - 1) * 4 + 2]);
              t.weightsIndices.push(l[(c - 1) * 4 + 3]);
              t.weightsIndices.push(l[c * 4]);
              t.weightsIndices.push(l[c * 4 + 1]);
              t.weightsIndices.push(l[c * 4 + 2]);
              t.weightsIndices.push(l[c * 4 + 3]);
            }
            if (e.color) {
              t.colors.push(o[0]);
              t.colors.push(o[1]);
              t.colors.push(o[2]);
              t.colors.push(o[(c - 1) * 3]);
              t.colors.push(o[(c - 1) * 3 + 1]);
              t.colors.push(o[(c - 1) * 3 + 2]);
              t.colors.push(o[c * 3]);
              t.colors.push(o[c * 3 + 1]);
              t.colors.push(o[c * 3 + 2]);
            }
            if (e.material && e.material.mappingType !== "AllSame") {
              t.materialIndex.push(r);
              t.materialIndex.push(r);
              t.materialIndex.push(r);
            }
            if (e.normal) {
              t.normal.push(i[0]);
              t.normal.push(i[1]);
              t.normal.push(i[2]);
              t.normal.push(i[(c - 1) * 3]);
              t.normal.push(i[(c - 1) * 3 + 1]);
              t.normal.push(i[(c - 1) * 3 + 2]);
              t.normal.push(i[c * 3]);
              t.normal.push(i[c * 3 + 1]);
              t.normal.push(i[c * 3 + 2]);
            }
            if (e.uv) {
              e.uv.forEach(function (e, n) {
                if (t.uvs[n] === undefined) {
                  t.uvs[n] = [];
                }
                t.uvs[n].push(a[n][0]);
                t.uvs[n].push(a[n][1]);
                t.uvs[n].push(a[n][(c - 1) * 2]);
                t.uvs[n].push(a[n][(c - 1) * 2 + 1]);
                t.uvs[n].push(a[n][c * 2]);
                t.uvs[n].push(a[n][c * 2 + 1]);
              });
            }
          }
        }
        addMorphTargets(t, e, n, r) {
          if (n.length === 0) {
            return;
          }
          t.morphTargetsRelative = true;
          t.morphAttributes.position = [];
          const i = this;
          n.forEach(function (n) {
            n.rawTargets.forEach(function (n) {
              const o = Nt.Objects.Geometry[n.geoID];
              if (o !== undefined) {
                i.genMorphGeometry(t, e, o, r, n.name);
              }
            });
          });
        }
        genMorphGeometry(t, e, n, r, i) {
          const a = e.PolygonVertexIndex !== undefined ? e.PolygonVertexIndex.a : [];
          const s = n.Vertices !== undefined ? n.Vertices.a : [];
          const l = n.Indexes !== undefined ? n.Indexes.a : [];
          const u = t.attributes.position.count * 3;
          const c = new Float32Array(u);
          for (let t = 0; t < l.length; t++) {
            const e = l[t] * 3;
            c[e] = s[t * 3];
            c[e + 1] = s[t * 3 + 1];
            c[e + 2] = s[t * 3 + 2];
          }
          const h = {
            vertexIndices: a,
            vertexPositions: c
          };
          const f = this.genBuffers(h);
          const p = new o.qtW(f.vertex, 3);
          p.name = i || n.attrName;
          p.applyMatrix4(r);
          t.morphAttributes.position.push(p);
        }
        parseNormals(t) {
          const e = t.MappingInformationType;
          const n = t.ReferenceInformationType;
          const r = t.Normals.a;
          let i = [];
          if (n === "IndexToDirect") {
            if ("NormalIndex" in t) {
              i = t.NormalIndex.a;
            } else if ("NormalsIndex" in t) {
              i = t.NormalsIndex.a;
            }
          }
          return {
            dataSize: 3,
            buffer: r,
            indices: i,
            mappingType: e,
            referenceType: n
          };
        }
        parseUVs(t) {
          const e = t.MappingInformationType;
          const n = t.ReferenceInformationType;
          const r = t.UV.a;
          let i = [];
          if (n === "IndexToDirect") {
            i = t.UVIndex.a;
          }
          return {
            dataSize: 2,
            buffer: r,
            indices: i,
            mappingType: e,
            referenceType: n
          };
        }
        parseVertexColors(t) {
          const e = t.MappingInformationType;
          const n = t.ReferenceInformationType;
          const r = t.Colors.a;
          let i = [];
          if (n === "IndexToDirect") {
            i = t.ColorIndex.a;
          }
          return {
            dataSize: 4,
            buffer: r,
            indices: i,
            mappingType: e,
            referenceType: n
          };
        }
        parseMaterialIndices(t) {
          const e = t.MappingInformationType;
          const n = t.ReferenceInformationType;
          if (e === "NoMappingInformation") {
            return {
              dataSize: 1,
              buffer: [0],
              indices: [0],
              mappingType: "AllSame",
              referenceType: n
            };
          }
          const r = t.Materials.a;
          const i = [];
          for (let t = 0; t < r.length; ++t) {
            i.push(t);
          }
          return {
            dataSize: 1,
            buffer: r,
            indices: i,
            mappingType: e,
            referenceType: n
          };
        }
        parseNurbsGeometry(t) {
          const e = parseInt(t.Order);
          if (isNaN(e)) {
            console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s", t.Order, t.id);
            return new o.LoY();
          }
          const n = e - 1;
          const r = t.KnotVector.a;
          const i = [];
          const a = t.Points.a;
          for (let t = 0, e = a.length; t < e; t += 4) {
            i.push(new o.IUQ().fromArray(a, t));
          }
          let s;
          let l;
          if (t.Form === "Closed") {
            i.push(i[0]);
          } else if (t.Form === "Periodic") {
            s = n;
            l = r.length - 1 - s;
            for (let t = 0; t < n; ++t) {
              i.push(i[t]);
            }
          }
          const u = new kt(n, r, i, s, l).getPoints(i.length * 12);
          return new o.LoY().setFromPoints(u);
        }
      }
      class Ht {
        parse() {
          const t = [];
          const e = this.parseClips();
          if (e !== undefined) {
            for (const n in e) {
              const r = e[n];
              const i = this.addClip(r);
              t.push(i);
            }
          }
          return t;
        }
        parseClips() {
          if (Nt.Objects.AnimationCurve === undefined) {
            return;
          }
          const t = this.parseAnimationCurveNodes();
          this.parseAnimationCurves(t);
          const e = this.parseAnimationLayers(t);
          return this.parseAnimStacks(e);
        }
        parseAnimationCurveNodes() {
          const t = Nt.Objects.AnimationCurveNode;
          const e = new Map();
          for (const n in t) {
            const r = t[n];
            if (r.attrName.match(/S|R|T|DeformPercent/) !== null) {
              const t = {
                id: r.id,
                attr: r.attrName,
                curves: {}
              };
              e.set(t.id, t);
            }
          }
          return e;
        }
        parseAnimationCurves(t) {
          const e = Nt.Objects.AnimationCurve;
          for (const n in e) {
            const r = {
              id: e[n].id,
              times: e[n].KeyTime.a.map(Qt),
              values: e[n].KeyValueFloat.a
            };
            const i = zt.get(r.id);
            if (i !== undefined) {
              const e = i.parents[0].ID;
              const n = i.parents[0].relationship;
              if (n.match(/X/)) {
                t.get(e).curves.x = r;
              } else if (n.match(/Y/)) {
                t.get(e).curves.y = r;
              } else if (n.match(/Z/)) {
                t.get(e).curves.z = r;
              } else if (n.match(/d|DeformPercent/) && t.has(e)) {
                t.get(e).curves.morph = r;
              }
            }
          }
        }
        parseAnimationLayers(t) {
          const e = Nt.Objects.AnimationLayer;
          const n = new Map();
          for (const r in e) {
            const e = [];
            const i = zt.get(parseInt(r));
            if (i !== undefined) {
              i.children.forEach(function (n, r) {
                if (t.has(n.ID)) {
                  const i = t.get(n.ID);
                  if (i.curves.x !== undefined || i.curves.y !== undefined || i.curves.z !== undefined) {
                    if (e[r] === undefined) {
                      const t = zt.get(n.ID).parents.filter(function (t) {
                        return t.relationship !== undefined;
                      })[0].ID;
                      if (t !== undefined) {
                        const i = Nt.Objects.Model[t.toString()];
                        if (i === undefined) {
                          console.warn("THREE.FBXLoader: Encountered a unused curve.", n);
                          return;
                        }
                        const a = {
                          modelName: i.attrName ? o.Nwf.sanitizeNodeName(i.attrName) : "",
                          ID: i.id,
                          initialPosition: [0, 0, 0],
                          initialRotation: [0, 0, 0],
                          initialScale: [1, 1, 1]
                        };
                        Ut.traverse(function (t) {
                          if (t.ID === i.id) {
                            a.transform = t.matrix;
                            if (t.userData.transformData) {
                              a.eulerOrder = t.userData.transformData.eulerOrder;
                            }
                          }
                        });
                        a.transform ||= new o.kn4();
                        if ("PreRotation" in i) {
                          a.preRotation = i.PreRotation.value;
                        }
                        if ("PostRotation" in i) {
                          a.postRotation = i.PostRotation.value;
                        }
                        e[r] = a;
                      }
                    }
                    if (e[r]) {
                      e[r][i.attr] = i;
                    }
                  } else if (i.curves.morph !== undefined) {
                    if (e[r] === undefined) {
                      const t = zt.get(n.ID).parents.filter(function (t) {
                        return t.relationship !== undefined;
                      })[0].ID;
                      const i = zt.get(t).parents[0].ID;
                      const a = zt.get(i).parents[0].ID;
                      const s = zt.get(a).parents[0].ID;
                      const l = Nt.Objects.Model[s];
                      const u = {
                        modelName: l.attrName ? o.Nwf.sanitizeNodeName(l.attrName) : "",
                        morphName: Nt.Objects.Deformer[t].attrName
                      };
                      e[r] = u;
                    }
                    e[r][i.attr] = i;
                  }
                }
              });
              n.set(parseInt(r), e);
            }
          }
          return n;
        }
        parseAnimStacks(t) {
          const e = Nt.Objects.AnimationStack;
          const n = {};
          for (const r in e) {
            const i = zt.get(parseInt(r)).children;
            if (i.length > 1) {
              console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");
            }
            const o = t.get(i[0].ID);
            n[r] = {
              name: e[r].attrName,
              layer: o
            };
          }
          return n;
        }
        addClip(t) {
          let e = [];
          const n = this;
          t.layer.forEach(function (t) {
            e = e.concat(n.generateTracks(t));
          });
          return new o.tz3(t.name, -1, e);
        }
        generateTracks(t) {
          const e = [];
          let n = new o.Pq0();
          let r = new o.PTz();
          let i = new o.Pq0();
          if (t.transform) {
            t.transform.decompose(n, r, i);
          }
          n = n.toArray();
          r = new o.O9p().setFromQuaternion(r, t.eulerOrder).toArray();
          i = i.toArray();
          if (t.T !== undefined && Object.keys(t.T.curves).length > 0) {
            const r = this.generateVectorTrack(t.modelName, t.T.curves, n, "position");
            if (r !== undefined) {
              e.push(r);
            }
          }
          if (t.R !== undefined && Object.keys(t.R.curves).length > 0) {
            const n = this.generateRotationTrack(t.modelName, t.R.curves, r, t.preRotation, t.postRotation, t.eulerOrder);
            if (n !== undefined) {
              e.push(n);
            }
          }
          if (t.S !== undefined && Object.keys(t.S.curves).length > 0) {
            const n = this.generateVectorTrack(t.modelName, t.S.curves, i, "scale");
            if (n !== undefined) {
              e.push(n);
            }
          }
          if (t.DeformPercent !== undefined) {
            const n = this.generateMorphTrack(t);
            if (n !== undefined) {
              e.push(n);
            }
          }
          return e;
        }
        generateVectorTrack(t, e, n, r) {
          const i = this.getTimesForAllAxes(e);
          const a = this.getKeyframeTrackValues(i, e, n);
          return new o.RiT(t + "." + r, i, a);
        }
        generateRotationTrack(t, e, n, r, i, a) {
          if (e.x !== undefined) {
            this.interpolateRotations(e.x);
            e.x.values = e.x.values.map(o.cj9.degToRad);
          }
          if (e.y !== undefined) {
            this.interpolateRotations(e.y);
            e.y.values = e.y.values.map(o.cj9.degToRad);
          }
          if (e.z !== undefined) {
            this.interpolateRotations(e.z);
            e.z.values = e.z.values.map(o.cj9.degToRad);
          }
          const s = this.getTimesForAllAxes(e);
          const l = this.getKeyframeTrackValues(s, e, n);
          if (r !== undefined) {
            (r = r.map(o.cj9.degToRad)).push(a);
            r = new o.O9p().fromArray(r);
            r = new o.PTz().setFromEuler(r);
          }
          if (i !== undefined) {
            (i = i.map(o.cj9.degToRad)).push(a);
            i = new o.O9p().fromArray(i);
            i = new o.PTz().setFromEuler(i).invert();
          }
          const u = new o.PTz();
          const c = new o.O9p();
          const h = [];
          for (let t = 0; t < l.length; t += 3) {
            c.set(l[t], l[t + 1], l[t + 2], a);
            u.setFromEuler(c);
            if (r !== undefined) {
              u.premultiply(r);
            }
            if (i !== undefined) {
              u.multiply(i);
            }
            u.toArray(h, t / 3 * 4);
          }
          return new o.MBL(t + ".quaternion", s, h);
        }
        generateMorphTrack(t) {
          const e = t.DeformPercent.curves.morph;
          const n = e.values.map(function (t) {
            return t / 100;
          });
          const r = Ut.getObjectByName(t.modelName).morphTargetDictionary[t.morphName];
          return new o.Hit(t.modelName + ".morphTargetInfluences[" + r + "]", e.times, n);
        }
        getTimesForAllAxes(t) {
          let e = [];
          if (t.x !== undefined) {
            e = e.concat(t.x.times);
          }
          if (t.y !== undefined) {
            e = e.concat(t.y.times);
          }
          if (t.z !== undefined) {
            e = e.concat(t.z.times);
          }
          e = e.sort(function (t, e) {
            return t - e;
          });
          if (e.length > 1) {
            let t = 1;
            let n = e[0];
            for (let r = 1; r < e.length; r++) {
              const i = e[r];
              if (i !== n) {
                e[t] = i;
                n = i;
                t++;
              }
            }
            e = e.slice(0, t);
          }
          return e;
        }
        getKeyframeTrackValues(t, e, n) {
          const r = n;
          const i = [];
          let o = -1;
          let a = -1;
          let s = -1;
          t.forEach(function (t) {
            if (e.x) {
              o = e.x.times.indexOf(t);
            }
            if (e.y) {
              a = e.y.times.indexOf(t);
            }
            if (e.z) {
              s = e.z.times.indexOf(t);
            }
            if (o !== -1) {
              const t = e.x.values[o];
              i.push(t);
              r[0] = t;
            } else {
              i.push(r[0]);
            }
            if (a !== -1) {
              const t = e.y.values[a];
              i.push(t);
              r[1] = t;
            } else {
              i.push(r[1]);
            }
            if (s !== -1) {
              const t = e.z.values[s];
              i.push(t);
              r[2] = t;
            } else {
              i.push(r[2]);
            }
          });
          return i;
        }
        interpolateRotations(t) {
          for (let e = 1; e < t.values.length; e++) {
            const n = t.values[e - 1];
            const r = t.values[e] - n;
            const i = Math.abs(r);
            if (i >= 180) {
              const o = i / 180;
              const a = r / o;
              let s = n + a;
              const l = t.times[e - 1];
              const u = (t.times[e] - l) / o;
              let c = l + u;
              const h = [];
              const f = [];
              while (c < t.times[e]) {
                h.push(c);
                c += u;
                f.push(s);
                s += a;
              }
              t.times = ie(t.times, e, h);
              t.values = ie(t.values, e, f);
            }
          }
        }
      }
      class Vt {
        getPrevNode() {
          return this.nodeStack[this.currentIndent - 2];
        }
        getCurrentNode() {
          return this.nodeStack[this.currentIndent - 1];
        }
        getCurrentProp() {
          return this.currentProp;
        }
        pushStack(t) {
          this.nodeStack.push(t);
          this.currentIndent += 1;
        }
        popStack() {
          this.nodeStack.pop();
          this.currentIndent -= 1;
        }
        setCurrentProp(t, e) {
          this.currentProp = t;
          this.currentPropName = e;
        }
        parse(t) {
          this.currentIndent = 0;
          this.allNodes = new Xt();
          this.nodeStack = [];
          this.currentProp = [];
          this.currentPropName = "";
          const e = this;
          const n = t.split(/[\r\n]+/);
          n.forEach(function (t, r) {
            const i = t.match(/^[\s\t]*;/);
            const o = t.match(/^[\s\t]*$/);
            if (i || o) {
              return;
            }
            const a = t.match("^\\t{" + e.currentIndent + "}(\\w+):(.*){", "");
            const s = t.match("^\\t{" + e.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)");
            const l = t.match("^\\t{" + (e.currentIndent - 1) + "}}");
            if (a) {
              e.parseNodeBegin(t, a);
            } else if (s) {
              e.parseNodeProperty(t, s, n[++r]);
            } else if (l) {
              e.popStack();
            } else if (t.match(/^[^\s\t}]/)) {
              e.parseNodePropertyContinued(t);
            }
          });
          return this.allNodes;
        }
        parseNodeBegin(t, e) {
          const n = e[1].trim().replace(/^"/, "").replace(/"$/, "");
          const r = e[2].split(",").map(function (t) {
            return t.trim().replace(/^"/, "").replace(/"$/, "");
          });
          const i = {
            name: n
          };
          const o = this.parseNodeAttr(r);
          const a = this.getCurrentNode();
          if (this.currentIndent === 0) {
            this.allNodes.add(n, i);
          } else if (n in a) {
            if (n === "PoseNode") {
              a.PoseNode.push(i);
            } else if (a[n].id !== undefined) {
              a[n] = {};
              a[n][a[n].id] = a[n];
            }
            if (o.id !== "") {
              a[n][o.id] = i;
            }
          } else if (typeof o.id == "number") {
            a[n] = {};
            a[n][o.id] = i;
          } else if (n !== "Properties70") {
            a[n] = n === "PoseNode" ? [i] : i;
          }
          if (typeof o.id == "number") {
            i.id = o.id;
          }
          if (o.name !== "") {
            i.attrName = o.name;
          }
          if (o.type !== "") {
            i.attrType = o.type;
          }
          this.pushStack(i);
        }
        parseNodeAttr(t) {
          let e = t[0];
          if (t[0] !== "") {
            e = parseInt(t[0]);
            if (isNaN(e)) {
              e = t[0];
            }
          }
          let n = "";
          let r = "";
          if (t.length > 1) {
            n = t[1].replace(/^(\w+)::/, "");
            r = t[2];
          }
          return {
            id: e,
            name: n,
            type: r
          };
        }
        parseNodeProperty(t, e, n) {
          let r = e[1].replace(/^"/, "").replace(/"$/, "").trim();
          let i = e[2].replace(/^"/, "").replace(/"$/, "").trim();
          if (r === "Content" && i === ",") {
            i = n.replace(/"/g, "").replace(/,$/, "").trim();
          }
          const o = this.getCurrentNode();
          if (o.name !== "Properties70") {
            if (r === "C") {
              const t = i.split(",").slice(1);
              const e = parseInt(t[0]);
              const n = parseInt(t[1]);
              let a = i.split(",").slice(3);
              a = a.map(function (t) {
                return t.trim().replace(/^"/, "");
              });
              r = "connections";
              i = [e, n];
              (function (t, e) {
                for (let n = 0, r = t.length, i = e.length; n < i; n++, r++) {
                  t[r] = e[n];
                }
              })(i, a);
              if (o[r] === undefined) {
                o[r] = [];
              }
            }
            if (r === "Node") {
              o.id = i;
            }
            if (r in o && Array.isArray(o[r])) {
              o[r].push(i);
            } else if (r !== "a") {
              o[r] = i;
            } else {
              o.a = i;
            }
            this.setCurrentProp(o, r);
            if (r === "a" && i.slice(-1) !== ",") {
              o.a = ne(i);
            }
          } else {
            this.parseNodeSpecialProperty(t, r, i);
          }
        }
        parseNodePropertyContinued(t) {
          const e = this.getCurrentNode();
          e.a += t;
          if (t.slice(-1) !== ",") {
            e.a = ne(e.a);
          }
        }
        parseNodeSpecialProperty(t, e, n) {
          const r = n.split("\",").map(function (t) {
            return t.trim().replace(/^\"/, "").replace(/\s/, "_");
          });
          const i = r[0];
          const o = r[1];
          const a = r[2];
          const s = r[3];
          let l = r[4];
          switch (o) {
            case "int":
            case "enum":
            case "bool":
            case "ULongLong":
            case "double":
            case "Number":
            case "FieldOfView":
              l = parseFloat(l);
              break;
            case "Color":
            case "ColorRGB":
            case "Vector3D":
            case "Lcl_Translation":
            case "Lcl_Rotation":
            case "Lcl_Scaling":
              l = ne(l);
          }
          this.getPrevNode()[i] = {
            type: o,
            type2: a,
            flag: s,
            value: l
          };
          this.setCurrentProp(this.getPrevNode(), i);
        }
      }
      class Gt {
        parse(t) {
          const e = new qt(t);
          e.skip(23);
          const n = e.getUint32();
          if (n < 6400) {
            throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + n);
          }
          const r = new Xt();
          while (!this.endOfContent(e)) {
            const t = this.parseNode(e, n);
            if (t !== null) {
              r.add(t.name, t);
            }
          }
          return r;
        }
        endOfContent(t) {
          if (t.size() % 16 == 0) {
            return (t.getOffset() + 160 + 16 & -16) >= t.size();
          } else {
            return t.getOffset() + 160 + 16 >= t.size();
          }
        }
        parseNode(t, e) {
          const n = {};
          const r = e >= 7500 ? t.getUint64() : t.getUint32();
          const i = e >= 7500 ? t.getUint64() : t.getUint32();
          if (e >= 7500) {
            t.getUint64();
          } else {
            t.getUint32();
          }
          const o = t.getUint8();
          const a = t.getString(o);
          if (r === 0) {
            return null;
          }
          const s = [];
          for (let e = 0; e < i; e++) {
            s.push(this.parseProperty(t));
          }
          const l = s.length > 0 ? s[0] : "";
          const u = s.length > 1 ? s[1] : "";
          const c = s.length > 2 ? s[2] : "";
          for (n.singleProperty = i === 1 && t.getOffset() === r; r > t.getOffset();) {
            const r = this.parseNode(t, e);
            if (r !== null) {
              this.parseSubNode(a, n, r);
            }
          }
          n.propertyList = s;
          if (typeof l == "number") {
            n.id = l;
          }
          if (u !== "") {
            n.attrName = u;
          }
          if (c !== "") {
            n.attrType = c;
          }
          if (a !== "") {
            n.name = a;
          }
          return n;
        }
        parseSubNode(t, e, n) {
          if (n.singleProperty === true) {
            const t = n.propertyList[0];
            if (Array.isArray(t)) {
              e[n.name] = n;
              n.a = t;
            } else {
              e[n.name] = t;
            }
          } else if (t === "Connections" && n.name === "C") {
            const t = [];
            n.propertyList.forEach(function (e, n) {
              if (n !== 0) {
                t.push(e);
              }
            });
            if (e.connections === undefined) {
              e.connections = [];
            }
            e.connections.push(t);
          } else if (n.name === "Properties70") {
            Object.keys(n).forEach(function (t) {
              e[t] = n[t];
            });
          } else if (t === "Properties70" && n.name === "P") {
            let t = n.propertyList[0];
            let r = n.propertyList[1];
            const i = n.propertyList[2];
            const o = n.propertyList[3];
            let a;
            if (t.indexOf("Lcl ") === 0) {
              t = t.replace("Lcl ", "Lcl_");
            }
            if (r.indexOf("Lcl ") === 0) {
              r = r.replace("Lcl ", "Lcl_");
            }
            a = r === "Color" || r === "ColorRGB" || r === "Vector" || r === "Vector3D" || r.indexOf("Lcl_") === 0 ? [n.propertyList[4], n.propertyList[5], n.propertyList[6]] : n.propertyList[4];
            e[t] = {
              type: r,
              type2: i,
              flag: o,
              value: a
            };
          } else if (e[n.name] === undefined) {
            if (typeof n.id == "number") {
              e[n.name] = {};
              e[n.name][n.id] = n;
            } else {
              e[n.name] = n;
            }
          } else if (n.name === "PoseNode") {
            if (!Array.isArray(e[n.name])) {
              e[n.name] = [e[n.name]];
            }
            e[n.name].push(n);
          } else if (e[n.name][n.id] === undefined) {
            e[n.name][n.id] = n;
          }
        }
        parseProperty(t) {
          const e = t.getString(1);
          let n;
          switch (e) {
            case "C":
              return t.getBoolean();
            case "D":
              return t.getFloat64();
            case "F":
              return t.getFloat32();
            case "I":
              return t.getInt32();
            case "L":
              return t.getInt64();
            case "R":
              n = t.getUint32();
              return t.getArrayBuffer(n);
            case "S":
              n = t.getUint32();
              return t.getString(n);
            case "Y":
              return t.getInt16();
            case "b":
            case "c":
            case "d":
            case "f":
            case "i":
            case "l":
              const r = t.getUint32();
              const i = t.getUint32();
              const o = t.getUint32();
              if (i === 0) {
                switch (e) {
                  case "b":
                  case "c":
                    return t.getBooleanArray(r);
                  case "d":
                    return t.getFloat64Array(r);
                  case "f":
                    return t.getFloat32Array(r);
                  case "i":
                    return t.getInt32Array(r);
                  case "l":
                    return t.getInt64Array(r);
                }
              }
              const a = At(new Uint8Array(t.getArrayBuffer(o)));
              const s = new qt(a.buffer);
              switch (e) {
                case "b":
                case "c":
                  return s.getBooleanArray(r);
                case "d":
                  return s.getFloat64Array(r);
                case "f":
                  return s.getFloat32Array(r);
                case "i":
                  return s.getInt32Array(r);
                case "l":
                  return s.getInt64Array(r);
              }
              break;
            default:
              throw new Error("THREE.FBXLoader: Unknown property type " + e);
          }
        }
      }
      class qt {
        constructor(t, e) {
          this.dv = new DataView(t);
          this.offset = 0;
          this.littleEndian = e === undefined || e;
        }
        getOffset() {
          return this.offset;
        }
        size() {
          return this.dv.buffer.byteLength;
        }
        skip(t) {
          this.offset += t;
        }
        getBoolean() {
          return !(~this.getUint8() & 1);
        }
        getBooleanArray(t) {
          const e = [];
          for (let n = 0; n < t; n++) {
            e.push(this.getBoolean());
          }
          return e;
        }
        getUint8() {
          const t = this.dv.getUint8(this.offset);
          this.offset += 1;
          return t;
        }
        getInt16() {
          const t = this.dv.getInt16(this.offset, this.littleEndian);
          this.offset += 2;
          return t;
        }
        getInt32() {
          const t = this.dv.getInt32(this.offset, this.littleEndian);
          this.offset += 4;
          return t;
        }
        getInt32Array(t) {
          const e = [];
          for (let n = 0; n < t; n++) {
            e.push(this.getInt32());
          }
          return e;
        }
        getUint32() {
          const t = this.dv.getUint32(this.offset, this.littleEndian);
          this.offset += 4;
          return t;
        }
        getInt64() {
          let t;
          let e;
          if (this.littleEndian) {
            t = this.getUint32();
            e = this.getUint32();
          } else {
            e = this.getUint32();
            t = this.getUint32();
          }
          if (e & 2147483648) {
            e = ~e & 4294967295;
            t = ~t & 4294967295;
            if (t === 4294967295) {
              e = e + 1 & 4294967295;
            }
            t = t + 1 & 4294967295;
            return -(e * 4294967296 + t);
          } else {
            return e * 4294967296 + t;
          }
        }
        getInt64Array(t) {
          const e = [];
          for (let n = 0; n < t; n++) {
            e.push(this.getInt64());
          }
          return e;
        }
        getUint64() {
          let t;
          let e;
          if (this.littleEndian) {
            t = this.getUint32();
            e = this.getUint32();
          } else {
            e = this.getUint32();
            t = this.getUint32();
          }
          return e * 4294967296 + t;
        }
        getFloat32() {
          const t = this.dv.getFloat32(this.offset, this.littleEndian);
          this.offset += 4;
          return t;
        }
        getFloat32Array(t) {
          const e = [];
          for (let n = 0; n < t; n++) {
            e.push(this.getFloat32());
          }
          return e;
        }
        getFloat64() {
          const t = this.dv.getFloat64(this.offset, this.littleEndian);
          this.offset += 8;
          return t;
        }
        getFloat64Array(t) {
          const e = [];
          for (let n = 0; n < t; n++) {
            e.push(this.getFloat64());
          }
          return e;
        }
        getArrayBuffer(t) {
          const e = this.dv.buffer.slice(this.offset, this.offset + t);
          this.offset += t;
          return e;
        }
        getString(t) {
          let e = [];
          for (let n = 0; n < t; n++) {
            e[n] = this.getUint8();
          }
          const n = e.indexOf(0);
          if (n >= 0) {
            e = e.slice(0, n);
          }
          return o.r6x.decodeText(new Uint8Array(e));
        }
      }
      class Xt {
        add(t, e) {
          this[t] = e;
        }
      }
      function Yt(t) {
        const e = t.match(/FBXVersion: (\d+)/);
        if (e) {
          return parseInt(e[1]);
        }
        throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.");
      }
      function Qt(t) {
        return t / 46186158000;
      }
      const Kt = [];
      function Zt(t, e, n, r) {
        let i;
        switch (r.mappingType) {
          case "ByPolygonVertex":
            i = t;
            break;
          case "ByPolygon":
            i = e;
            break;
          case "ByVertice":
            i = n;
            break;
          case "AllSame":
            i = r.indices[0];
            break;
          default:
            console.warn("THREE.FBXLoader: unknown attribute mapping type " + r.mappingType);
        }
        if (r.referenceType === "IndexToDirect") {
          i = r.indices[i];
        }
        const o = i * r.dataSize;
        const a = o + r.dataSize;
        return function (t, e, n, r) {
          for (let i = n, o = 0; i < r; i++, o++) {
            t[o] = e[i];
          }
          return t;
        }(Kt, r.buffer, o, a);
      }
      const Jt = new o.O9p();
      const $t = new o.Pq0();
      function te(t) {
        const e = new o.kn4();
        const n = new o.kn4();
        const r = new o.kn4();
        const i = new o.kn4();
        const a = new o.kn4();
        const s = new o.kn4();
        const l = new o.kn4();
        const u = new o.kn4();
        const c = new o.kn4();
        const h = new o.kn4();
        const f = new o.kn4();
        const p = new o.kn4();
        const d = t.inheritType ? t.inheritType : 0;
        if (t.translation) {
          e.setPosition($t.fromArray(t.translation));
        }
        if (t.preRotation) {
          const e = t.preRotation.map(o.cj9.degToRad);
          e.push(t.eulerOrder || o.O9p.DefaultOrder);
          n.makeRotationFromEuler(Jt.fromArray(e));
        }
        if (t.rotation) {
          const e = t.rotation.map(o.cj9.degToRad);
          e.push(t.eulerOrder || o.O9p.DefaultOrder);
          r.makeRotationFromEuler(Jt.fromArray(e));
        }
        if (t.postRotation) {
          const e = t.postRotation.map(o.cj9.degToRad);
          e.push(t.eulerOrder || o.O9p.DefaultOrder);
          i.makeRotationFromEuler(Jt.fromArray(e));
          i.invert();
        }
        if (t.scale) {
          a.scale($t.fromArray(t.scale));
        }
        if (t.scalingOffset) {
          l.setPosition($t.fromArray(t.scalingOffset));
        }
        if (t.scalingPivot) {
          s.setPosition($t.fromArray(t.scalingPivot));
        }
        if (t.rotationOffset) {
          u.setPosition($t.fromArray(t.rotationOffset));
        }
        if (t.rotationPivot) {
          c.setPosition($t.fromArray(t.rotationPivot));
        }
        if (t.parentMatrixWorld) {
          f.copy(t.parentMatrix);
          h.copy(t.parentMatrixWorld);
        }
        const m = n.clone().multiply(r).multiply(i);
        const g = new o.kn4();
        g.extractRotation(h);
        const v = new o.kn4();
        v.copyPosition(h);
        const y = v.clone().invert().multiply(h);
        const b = g.clone().invert().multiply(y);
        const _ = a;
        const w = new o.kn4();
        if (d === 0) {
          w.copy(g).multiply(m).multiply(b).multiply(_);
        } else if (d === 1) {
          w.copy(g).multiply(b).multiply(m).multiply(_);
        } else {
          const t = new o.kn4().scale(new o.Pq0().setFromMatrixScale(f)).clone().invert();
          const e = b.clone().multiply(t);
          w.copy(g).multiply(m).multiply(e).multiply(_);
        }
        const x = c.clone().invert();
        const S = s.clone().invert();
        let T = e.clone().multiply(u).multiply(c).multiply(n).multiply(r).multiply(i).multiply(x).multiply(l).multiply(s).multiply(a).multiply(S);
        const M = new o.kn4().copyPosition(T);
        const O = h.clone().multiply(M);
        p.copyPosition(O);
        T = p.clone().multiply(w);
        T.premultiply(h.invert());
        return T;
      }
      function ee(t) {
        const e = ["ZYX", "YZX", "XZY", "ZXY", "YXZ", "XYZ"];
        if ((t = t || 0) === 6) {
          console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect.");
          return e[0];
        } else {
          return e[t];
        }
      }
      function ne(t) {
        return t.split(",").map(function (t) {
          return parseFloat(t);
        });
      }
      function re(t, e = 0, n = t.byteLength) {
        return o.r6x.decodeText(new Uint8Array(t, e, n));
      }
      function ie(t, e, n) {
        return t.slice(0, e).concat(n).concat(t.slice(e));
      }
      class oe extends o.BRH {
        constructor(t) {
          super(t);
          this.type = o.ix0;
        }
        parse(t) {
          const e = function (t, e) {
            switch (t) {
              case 1:
                console.error("THREE.RGBELoader Read Error: " + (e || ""));
                break;
              case 2:
                console.error("THREE.RGBELoader Write Error: " + (e || ""));
                break;
              case 3:
                console.error("THREE.RGBELoader Bad File Format: " + (e || ""));
                break;
              default:
                console.error("THREE.RGBELoader: Error: " + (e || ""));
            }
            return -1;
          };
          const n = function (t, e, n) {
            e = e || 1024;
            let r = t.pos;
            let i = -1;
            let o = 0;
            let a = "";
            let s = String.fromCharCode.apply(null, new Uint16Array(t.subarray(r, r + 128)));
            while ((i = s.indexOf("\n")) < 0 && o < e && r < t.byteLength) {
              a += s;
              o += s.length;
              r += 128;
              s += String.fromCharCode.apply(null, new Uint16Array(t.subarray(r, r + 128)));
            }
            return i > -1 && (n !== false && (t.pos += o + i + 1), a + s.slice(0, i));
          };
          const r = function (t, e, n, r) {
            const i = t[e + 3];
            const o = Math.pow(2, i - 128) / 255;
            n[r + 0] = t[e + 0] * o;
            n[r + 1] = t[e + 1] * o;
            n[r + 2] = t[e + 2] * o;
            n[r + 3] = 1;
          };
          const i = function (t, e, n, r) {
            const i = t[e + 3];
            const a = Math.pow(2, i - 128) / 255;
            n[r + 0] = o.GxU.toHalfFloat(Math.min(t[e + 0] * a, 65504));
            n[r + 1] = o.GxU.toHalfFloat(Math.min(t[e + 1] * a, 65504));
            n[r + 2] = o.GxU.toHalfFloat(Math.min(t[e + 2] * a, 65504));
            n[r + 3] = o.GxU.toHalfFloat(1);
          };
          const a = new Uint8Array(t);
          a.pos = 0;
          const s = function (t) {
            const r = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/;
            const i = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/;
            const o = /^\s*FORMAT=(\S+)\s*$/;
            const a = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/;
            const s = {
              valid: 0,
              string: "",
              comments: "",
              programtype: "RGBE",
              format: "",
              gamma: 1,
              exposure: 1,
              width: 0,
              height: 0
            };
            let l;
            let u;
            if (t.pos >= t.byteLength || !(l = n(t))) {
              return e(1, "no header found");
            }
            if (!(u = l.match(/^#\?(\S+)/))) {
              return e(3, "bad initial token");
            }
            s.valid |= 1;
            s.programtype = u[1];
            s.string += l + "\n";
            while (l = n(t), l !== false) {
              s.string += l + "\n";
              if (l.charAt(0) !== "#") {
                if (u = l.match(r)) {
                  s.gamma = parseFloat(u[1]);
                }
                if (u = l.match(i)) {
                  s.exposure = parseFloat(u[1]);
                }
                if (u = l.match(o)) {
                  s.valid |= 2;
                  s.format = u[1];
                }
                if (u = l.match(a)) {
                  s.valid |= 4;
                  s.height = parseInt(u[1], 10);
                  s.width = parseInt(u[2], 10);
                }
                if (s.valid & 2 && s.valid & 4) {
                  break;
                }
              } else {
                s.comments += l + "\n";
              }
            }
            if (s.valid & 2) {
              if (s.valid & 4) {
                return s;
              } else {
                return e(3, "missing image size specifier");
              }
            } else {
              return e(3, "missing format specifier");
            }
          }(a);
          if (s !== -1) {
            const t = s.width;
            const n = s.height;
            const l = function (t, n, r) {
              const i = n;
              if (i < 8 || i > 32767 || t[0] !== 2 || t[1] !== 2 || t[2] & 128) {
                return new Uint8Array(t);
              }
              if (i !== (t[2] << 8 | t[3])) {
                return e(3, "wrong scanline width");
              }
              const o = new Uint8Array(n * 4 * r);
              if (!o.length) {
                return e(4, "unable to allocate buffer space");
              }
              let a = 0;
              let s = 0;
              const l = i * 4;
              const u = new Uint8Array(4);
              const c = new Uint8Array(l);
              let h = r;
              while (h > 0 && s < t.byteLength) {
                if (s + 4 > t.byteLength) {
                  return e(1);
                }
                u[0] = t[s++];
                u[1] = t[s++];
                u[2] = t[s++];
                u[3] = t[s++];
                if (u[0] != 2 || u[1] != 2 || (u[2] << 8 | u[3]) != i) {
                  return e(3, "bad rgbe scanline format");
                }
                let n;
                let r = 0;
                while (r < l && s < t.byteLength) {
                  n = t[s++];
                  const i = n > 128;
                  if (i) {
                    n -= 128;
                  }
                  if (n === 0 || r + n > l) {
                    return e(3, "bad scanline data");
                  }
                  if (i) {
                    const e = t[s++];
                    for (let t = 0; t < n; t++) {
                      c[r++] = e;
                    }
                  } else {
                    c.set(t.subarray(s, s + n), r);
                    r += n;
                    s += n;
                  }
                }
                const f = i;
                for (let t = 0; t < f; t++) {
                  let e = 0;
                  o[a] = c[t + e];
                  e += i;
                  o[a + 1] = c[t + e];
                  e += i;
                  o[a + 2] = c[t + e];
                  e += i;
                  o[a + 3] = c[t + e];
                  a += 4;
                }
                h--;
              }
              return o;
            }(a.subarray(a.pos), t, n);
            if (l !== -1) {
              let e;
              let a;
              let u;
              switch (this.type) {
                case o.RQf:
                  u = l.length / 4;
                  const t = new Float32Array(u * 4);
                  for (let e = 0; e < u; e++) {
                    r(l, e * 4, t, e * 4);
                  }
                  e = t;
                  a = o.RQf;
                  break;
                case o.ix0:
                  u = l.length / 4;
                  const n = new Uint16Array(u * 4);
                  for (let t = 0; t < u; t++) {
                    i(l, t * 4, n, t * 4);
                  }
                  e = n;
                  a = o.ix0;
                  break;
                default:
                  console.error("THREE.RGBELoader: unsupported type: ", this.type);
              }
              return {
                width: t,
                height: n,
                data: e,
                header: s.string,
                gamma: s.gamma,
                exposure: s.exposure,
                type: a
              };
            }
          }
          return null;
        }
        setDataType(t) {
          this.type = t;
          return this;
        }
        load(t, e, n, r) {
          return super.load(t, function (t, n) {
            switch (t.type) {
              case o.RQf:
              case o.ix0:
                t.encoding = o.tgE;
                t.minFilter = o.k6q;
                t.magFilter = o.k6q;
                t.generateMipmaps = false;
                t.flipY = true;
            }
            if (e) {
              e(t, n);
            }
          }, n, r);
        }
      }
      var ae = "/world-of-omega/sustainability/clearspace/";
      var se = {
        earthAlbedo: {
          path: ae + "assets/textures/earth/albedo.jpg",
          priority: 1
        },
        earthData: {
          path: ae + "assets/textures/earth/data.jpg",
          priority: 1
        },
        landscapeColor: {
          path: ae + "assets/textures/landscape/mountains.jpg",
          priority: 2
        },
        landscapeBorder: {
          path: ae + "assets/textures/landscape/border.jpeg",
          priority: 2
        },
        landscapeMountains: {
          path: ae + "assets/textures/landscape/mountains.png",
          priority: 2
        },
        landscapeStars: {
          path: ae + "assets/textures/landscape/stars.jpg",
          priority: 2
        },
        fielding: {
          path: ae + "assets/images/fielding.jpg",
          priority: 2
        },
        moriba: {
          path: ae + "assets/images/moriba.jpg",
          priority: 2
        },
        wozniak: {
          path: ae + "assets/images/wozniak.jpg",
          priority: 2
        },
        starsBg: {
          path: ae + "assets/textures/stars-bg.jpg",
          priority: 2
        },
        rays: {
          path: ae + "assets/textures/rays2.jpg",
          priority: 2
        },
        perlin: {
          path: ae + "assets/textures/perlin.jpg",
          priority: 2
        },
        noise: {
          path: ae + "assets/textures/solid.jpg",
          priority: 2
        },
        smoke: {
          path: ae + "assets/textures/smoke.jpg",
          priority: 2
        },
        glow: {
          path: ae + "assets/textures/glow.jpg",
          priority: 2
        },
        envmap: {
          path: ae + "assets/textures/envmap0001.hdr",
          priority: 2,
          type: "envmap"
        },
        satellite: {
          path: ae + "assets/models/satellite.glb",
          priority: 2,
          type: "model"
        },
        satelliteLow: {
          path: ae + "assets/models/satellite-low.fbx",
          priority: 2,
          type: "model"
        },
        frame: {
          path: ae + "assets/models/frame.glb",
          priority: 2,
          type: "model"
        }
      };
      var le = n(348);
      function ue(t) {
        ue = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return ue(t);
      }
      function ce() {
        var t;
        var e;
        var n = typeof Symbol == "function" ? Symbol : {};
        var r = n.iterator || "@@iterator";
        var i = n.toStringTag || "@@toStringTag";
        function o(n, r, i, o) {
          var l = r && r.prototype instanceof s ? r : s;
          var u = Object.create(l.prototype);
          he(u, "_invoke", function (n, r, i) {
            var o;
            var s;
            var l;
            var u = 0;
            var c = i || [];
            var h = false;
            var f = {
              p: 0,
              n: 0,
              v: t,
              a: p,
              f: p.bind(t, 4),
              d: function (e, n) {
                o = e;
                s = 0;
                l = t;
                f.n = n;
                return a;
              }
            };
            function p(n, r) {
              s = n;
              l = r;
              e = 0;
              for (; !h && u && !i && e < c.length; e++) {
                var i;
                var o = c[e];
                var p = f.p;
                var d = o[2];
                if (n > 3) {
                  if (i = d === r) {
                    l = o[(s = o[4]) ? 5 : (s = 3, 3)];
                    o[4] = o[5] = t;
                  }
                } else if (o[0] <= p) {
                  if (i = n < 2 && p < o[1]) {
                    s = 0;
                    f.v = r;
                    f.n = o[1];
                  } else if (p < d && (i = n < 3 || o[0] > r || r > d)) {
                    o[4] = n;
                    o[5] = r;
                    f.n = d;
                    s = 0;
                  }
                }
              }
              if (i || n > 1) {
                return a;
              }
              h = true;
              throw r;
            }
            return function (i, c, d) {
              if (u > 1) {
                throw TypeError("Generator is already running");
              }
              if (h && c === 1) {
                p(c, d);
              }
              s = c;
              l = d;
              while ((e = s < 2 ? t : l) || !h) {
                if (!o) {
                  if (s) {
                    if (s < 3) {
                      if (s > 1) {
                        f.n = -1;
                      }
                      p(s, l);
                    } else {
                      f.n = l;
                    }
                  } else {
                    f.v = l;
                  }
                }
                try {
                  u = 2;
                  if (o) {
                    if (!s) {
                      i = "next";
                    }
                    if (e = o[i]) {
                      if (!(e = e.call(o, l))) {
                        throw TypeError("iterator result is not an object");
                      }
                      if (!e.done) {
                        return e;
                      }
                      l = e.value;
                      if (s < 2) {
                        s = 0;
                      }
                    } else {
                      if (s === 1 && (e = o.return)) {
                        e.call(o);
                      }
                      if (s < 2) {
                        l = TypeError("The iterator does not provide a '" + i + "' method");
                        s = 1;
                      }
                    }
                    o = t;
                  } else if ((e = (h = f.n < 0) ? l : n.call(r, f)) !== a) {
                    break;
                  }
                } catch (e) {
                  o = t;
                  s = 1;
                  l = e;
                } finally {
                  u = 1;
                }
              }
              return {
                value: e,
                done: h
              };
            };
          }(n, i, o), true);
          return u;
        }
        var a = {};
        function s() {}
        function l() {}
        function u() {}
        e = Object.getPrototypeOf;
        var c = [][r] ? e(e([][r]())) : (he(e = {}, r, function () {
          return this;
        }), e);
        var h = u.prototype = s.prototype = Object.create(c);
        function f(t) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(t, u);
          } else {
            t.__proto__ = u;
            he(t, i, "GeneratorFunction");
          }
          t.prototype = Object.create(h);
          return t;
        }
        l.prototype = u;
        he(h, "constructor", u);
        he(u, "constructor", l);
        l.displayName = "GeneratorFunction";
        he(u, i, "GeneratorFunction");
        he(h);
        he(h, i, "Generator");
        he(h, r, function () {
          return this;
        });
        he(h, "toString", function () {
          return "[object Generator]";
        });
        return (ce = function () {
          return {
            w: o,
            m: f
          };
        })();
      }
      function he(t, e, n, r) {
        var i = Object.defineProperty;
        try {
          i({}, "", {});
        } catch (t) {
          i = 0;
        }
        he = function (t, e, n, r) {
          function o(e, n) {
            he(t, e, function (t) {
              return this._invoke(e, n, t);
            });
          }
          if (e) {
            if (i) {
              i(t, e, {
                value: n,
                enumerable: !r,
                configurable: !r,
                writable: !r
              });
            } else {
              t[e] = n;
            }
          } else {
            o("next", 0);
            o("throw", 1);
            o("return", 2);
          }
        };
        he(t, e, n, r);
      }
      function fe(t, e, n, r, i, o, a) {
        try {
          var s = t[o](a);
          var l = s.value;
        } catch (t) {
          n(t);
          return;
        }
        if (s.done) {
          e(l);
        } else {
          Promise.resolve(l).then(r, i);
        }
      }
      function pe(t) {
        return function () {
          var e = this;
          var n = arguments;
          return new Promise(function (r, i) {
            var o = t.apply(e, n);
            function a(t) {
              fe(o, r, i, a, s, "next", t);
            }
            function s(t) {
              fe(o, r, i, a, s, "throw", t);
            }
            a(undefined);
          });
        };
      }
      function de(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, me(r.key), r);
        }
      }
      function me(t) {
        var e = function (t, e) {
          if (ue(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (ue(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (ue(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function ge(t, e, n) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.set(t, n);
      }
      function ve(t, e) {
        return t.get(be(t, e));
      }
      function ye(t, e, n) {
        t.set(be(t, e), n);
        return n;
      }
      function be(t, e, n) {
        if (typeof t == "function" ? t === e : t.has(e)) {
          if (arguments.length < 3) {
            return e;
          } else {
            return n;
          }
        }
        throw new TypeError("Private element is not present on this object");
      }
      o.l2R.enabled = true;
      var _e = new WeakMap();
      var we = new WeakMap();
      var xe = new WeakMap();
      var Se = new WeakMap();
      var Te = new WeakMap();
      var Me = new WeakMap();
      var Oe = new WeakMap();
      var Pe = new WeakMap();
      var Ee = new WeakMap();
      var Ce = new WeakMap();
      var Ae = new WeakMap();
      var Re = new WeakMap();
      var Le = new WeakMap();
      var De = function () {
        t = function t() {
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, t);
          ge(this, _e, undefined);
          ge(this, we, undefined);
          ge(this, xe, undefined);
          ge(this, Se, undefined);
          ge(this, Te, undefined);
          ge(this, Me, undefined);
          ge(this, Oe, undefined);
          ge(this, Pe, undefined);
          ge(this, Ee, undefined);
          ge(this, Ce, undefined);
          ge(this, Ae, undefined);
          ge(this, Re, undefined);
          ge(this, Le, undefined);
          ye(_e, this, []);
          ye(we, this, 0);
          this.progress = 0;
          ye(xe, this, false);
          ye(Se, this, new o.Tap());
          ye(Te, this, new o.$NF());
          ye(Me, this, new a());
          ye(Pe, this, new oe());
          ye(Oe, this, new Ft());
          ye(Ee, this, new Map());
          ye(Ce, this, new Map());
          ye(Ae, this, new Map());
          ye(Re, this, new Map());
          ye(Le, this, new Map());
        };
        e = [{
          key: "add",
          value: function () {
            var t = this;
            for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) {
              n[r] = arguments[r];
            }
            var i = function () {
              var r = a[o];
              var i = ve(_e, t).find(function (t) {
                return t.key === r.key;
              });
              if (i) {
                i.callbacks.push(r.callback);
                return 0;
              } else if (se[r.key] || r.path) {
                ve(_e, t).push({
                  key: r.key,
                  callbacks: [r.callback],
                  priority: se[r.key]?.priority || r.priority,
                  path: se[r.key]?.path || r.path,
                  size: null,
                  progress: 0,
                  type: r.type
                });
                return;
              } else {
                console.warn(`Manifest key ${r.key} not found`);
                return 0;
              }
            };
            for (var o = 0, a = n; o < a.length; o++) {
              i();
            }
          }
        }, {
          key: "getImages",
          value: function () {
            return ve(Ee, this).values();
          }
        }, {
          key: "getTexture",
          value: function (t) {
            if (ve(Ce, this).has(t)) {
              return ve(Ce, this).get(t);
            }
            console.error(`Loaded texture ${t} not found`);
          }
        }, {
          key: "getModel",
          value: function (t) {
            if (ve(Ae, this).has(t)) {
              return ve(Ae, this).get(t);
            }
            console.error(`Loaded model ${t} not found`);
          }
        }, {
          key: "getJSON",
          value: function (t) {
            if (ve(Re, this).has(t)) {
              return ve(Re, this).get(t);
            }
            console.error(`Loaded JSON ${t} not found`);
          }
        }, {
          key: "getRaw",
          value: function (t) {
            if (ve(Le, this).has(t)) {
              return ve(Le, this).get(t);
            }
            console.error(`Loaded raw ${t} not found`);
          }
        }, {
          key: "loadAssets",
          value: function () {
            var t = this;
            var e = arguments.length > 0 && arguments[0] !== undefined && arguments[0];
            var n = ve(_e, this);
            if (!ve(xe, this)) {
              ve(_e, this).sort(function (t, e) {
                return t.priority - e.priority;
              });
              ye(xe, this, true);
            }
            if (e) {
              var r = ve(_e, this).filter(function (t) {
                return t.priority === 1;
              });
              ve(_e, this).splice(0, r.length);
              n = r;
            }
            return Promise.all(n.map(function (e) {
              return t.loadAsset(e.key, e.path, e.type).then(function (t) {
                if (e == null) {
                  return undefined;
                } else {
                  return e.callbacks.forEach(function (e) {
                    if (e == null) {
                      return undefined;
                    } else {
                      return e(t);
                    }
                  });
                }
              });
            }));
          }
        }, {
          key: "loadAsset",
          value: function (t, e, n) {
            var r;
            if (n) {
              switch (n) {
                case "image":
                  r = this.loadImage(t, e);
                  break;
                case "texture":
                  r = this.loadTexture(t, e);
                  break;
                case "model":
                  r = this.loadModel(t, e);
                  break;
                case "envmap":
                  r = this.loadEnvMap(t, e);
                  break;
                case "json":
                  r = this.loadJSON(t, e);
                  break;
                case "fbx":
                  r = this.loadFBX(t, e);
                  break;
                default:
                  r = this.loadRaw(t, e);
              }
            } else {
              switch (e.split(".").pop().toLowerCase()) {
                case "jpg":
                case "jpeg":
                case "png":
                case "webp":
                  r = this.loadTexture(t, e);
                  break;
                case "hdr":
                  r = this.loadEnvMap(t, e);
                  break;
                case "gltf":
                case "glb":
                  r = this.loadModel(t, e);
                  break;
                case "fnt":
                case "json":
                  r = this.loadJSON(t, e);
                  break;
                case "fbx":
                  r = this.loadFBX(t, e);
                  break;
                default:
                  r = this.loadRaw(t, e);
              }
            }
            return r;
          }
        }, {
          key: "loadImage",
          value: (f = pe(ce().m(function t(e, n) {
            var r;
            var i = this;
            return ce().w(function (t) {
              while (true) {
                switch (t.n) {
                  case 0:
                    if (r = ve(Ee, this).get(e)) {
                      t.n = 2;
                      break;
                    }
                    t.n = 1;
                    return ve(Te, this).loadAsync(n, function (t) {
                      return i.assetProgress(t, e);
                    });
                  case 1:
                    r = t.v;
                    ve(Ee, this).set(e, r);
                  case 2:
                    return t.a(2, r);
                }
              }
            }, t, this);
          })), function (t, e) {
            return f.apply(this, arguments);
          })
        }, {
          key: "loadTexture",
          value: (h = pe(ce().m(function t(e, n) {
            var r;
            var i = this;
            return ce().w(function (t) {
              while (true) {
                switch (t.n) {
                  case 0:
                    if (r = ve(Ce, this).get(e)) {
                      t.n = 2;
                      break;
                    }
                    t.n = 1;
                    return ve(Se, this).loadAsync(n, function (t) {
                      return i.assetProgress(t, e);
                    });
                  case 1:
                    r = t.v;
                    ve(Ce, this).set(e, r);
                  case 2:
                    return t.a(2, r);
                }
              }
            }, t, this);
          })), function (t, e) {
            return h.apply(this, arguments);
          })
        }, {
          key: "loadEnvMap",
          value: (c = pe(ce().m(function t(e, n) {
            var r;
            var i = this;
            return ce().w(function (t) {
              while (true) {
                switch (t.n) {
                  case 0:
                    if (r = ve(Ce, this).get(e)) {
                      t.n = 2;
                      break;
                    }
                    t.n = 1;
                    return ve(Pe, this).loadAsync(n, function (t) {
                      return i.assetProgress(t, e);
                    });
                  case 1:
                    r = t.v;
                    ve(Ce, this).set(e, r);
                  case 2:
                    return t.a(2, r);
                }
              }
            }, t, this);
          })), function (t, e) {
            return c.apply(this, arguments);
          })
        }, {
          key: "loadModel",
          value: (u = pe(ce().m(function t(e, n) {
            var r;
            var i;
            var a;
            var s = this;
            return ce().w(function (t) {
              while (true) {
                switch (t.n) {
                  case 0:
                    if (r = ve(Ae, this).get(e)) {
                      t.n = 2;
                      break;
                    }
                    t.n = 1;
                    return ve(Me, this).loadAsync(n, function (t) {
                      return s.assetProgress(t, e);
                    });
                  case 1:
                    (i = t.v).scene.traverse(function (t) {
                      var e;
                      if (t.isMesh && (e = t.material) !== null && e !== undefined && e.map) {
                        t.material.map.encoding = o.tgE;
                        t.material.envMapIntensity = 0.5;
                      }
                    });
                    a = i.animations;
                    (r = i.scene).animations = a;
                    ve(Ae, this).set(e, r);
                  case 2:
                    return t.a(2, r);
                }
              }
            }, t, this);
          })), function (t, e) {
            return u.apply(this, arguments);
          })
        }, {
          key: "loadFBX",
          value: (l = pe(ce().m(function t(e, n) {
            var r;
            var i;
            var o = this;
            return ce().w(function (t) {
              while (true) {
                switch (t.n) {
                  case 0:
                    if (r = ve(Ae, this).get(e)) {
                      t.n = 2;
                      break;
                    }
                    t.n = 1;
                    return ve(Oe, this).loadAsync(n, function (t) {
                      return o.assetProgress(t, e);
                    });
                  case 1:
                    i = t.v;
                    r = i;
                    ve(Ae, this).set(e, r);
                  case 2:
                    return t.a(2, r);
                }
              }
            }, t, this);
          })), function (t, e) {
            return l.apply(this, arguments);
          })
        }, {
          key: "loadRaw",
          value: (s = pe(ce().m(function t(e, n) {
            var r;
            var i;
            var o;
            return ce().w(function (t) {
              while (true) {
                switch (t.n) {
                  case 0:
                    if (r = ve(Le, this).get(e)) {
                      t.n = 3;
                      break;
                    }
                    t.n = 1;
                    return fetch(n);
                  case 1:
                    i = t.v;
                    t.n = 2;
                    return i.text();
                  case 2:
                    o = t.v;
                    ve(Le, this).set(e, o);
                  case 3:
                    return t.a(2, r);
                }
              }
            }, t, this);
          })), function (t, e) {
            return s.apply(this, arguments);
          })
        }, {
          key: "loadJSON",
          value: (r = pe(ce().m(function t(e, n) {
            var r;
            var i;
            var o;
            return ce().w(function (t) {
              while (true) {
                switch (t.n) {
                  case 0:
                    if (r = ve(Re, this).get(e)) {
                      t.n = 3;
                      break;
                    }
                    t.n = 1;
                    return fetch(n);
                  case 1:
                    i = t.v;
                    t.n = 2;
                    return i.json();
                  case 2:
                    o = t.v;
                    ve(Re, this).set(e, o);
                  case 3:
                    return t.a(2, r);
                }
              }
            }, t, this);
          })), function (t, e) {
            return r.apply(this, arguments);
          })
        }, {
          key: "assetProgress",
          value: function (t, e) {
            var n;
            var r = ve(_e, this).find(function (t) {
              return t.key === e;
            });
            if (r) {
              if (!r.size) {
                r.size = t.total;
                ye(we, this, (n = ve(we, this), ++n));
              }
              r.progress = t.loaded / r.size;
              this.progress = ve(_e, this).map(function (t) {
                return t.progress;
              }).reduce(function (t, e) {
                return t + e;
              }, 0) / ve(we, this);
              i.z.emit(le.x.LOADER_PROGRESS, this.progress);
            }
          }
        }];
        if (e) {
          de(t.prototype, e);
        }
        if (n) {
          de(t, n);
        }
        Object.defineProperty(t, "prototype", {
          writable: false
        });
        return t;
        var t;
        var e;
        var n;
        var r;
        var s;
        var l;
        var u;
        var c;
        var h;
        var f;
      }();
      function Ie(t) {
        Ie = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Ie(t);
      }
      function je(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Ne(r.key), r);
        }
      }
      function ke(t, e, n) {
        if ((e = Ne(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Ne(t) {
        var e = function (t, e) {
          if (Ie(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Ie(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Ie(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function ze(t, e, n) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.set(t, n);
      }
      function Ue(t, e) {
        return t.get(Be(t, e));
      }
      function Fe(t, e, n) {
        t.set(Be(t, e), n);
        return n;
      }
      function Be(t, e, n) {
        if (typeof t == "function" ? t === e : t.has(e)) {
          if (arguments.length < 3) {
            return e;
          } else {
            return n;
          }
        }
        throw new TypeError("Private element is not present on this object");
      }
      var We = new WeakMap();
      var He = new WeakMap();
      var Ve = function () {
        t = function t() {
          var e = this;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, t);
          ze(this, We, undefined);
          ke(this, "play", function () {
            Fe(We, e, true);
            Ue(He, e).call(e);
          });
          ke(this, "pause", function () {
            Fe(We, e, false);
          });
          ze(this, He, function () {
            if (Ue(We, e)) {
              window.requestAnimationFrame(Ue(He, e));
              var t = Date.now();
              e.delta = t - e.current;
              e.elapsed += e.delta * (ad.animation ? 1 : 0);
              e.current = t;
              if (e.delta > 60) {
                e.delta = 60;
              }
              e.params.et = e.elapsed;
              e.params.dt = e.delta * 0.001;
              i.z.emit(le.q.TICK, e.params);
              i.z.emit(le.q.RENDER, e.params);
            }
          });
          i.z.register(this);
          this.current = Date.now();
          this.elapsed = 0;
          this.delta = 16;
          Fe(We, this, false);
          this.params = {
            et: 0,
            dt: 0
          };
        };
        if (e = [{
          key: "onAttach",
          value: function () {
            this.play();
          }
        }]) {
          je(t.prototype, e);
        }
        if (n) {
          je(t, n);
        }
        Object.defineProperty(t, "prototype", {
          writable: false
        });
        return t;
        var t;
        var e;
        var n;
      }();
      function Ge() {
        return {
          loader: new De(),
          ticker: new Ve()
        };
      }
      function qe(t) {
        qe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return qe(t);
      }
      function Xe(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Ye(r.key), r);
        }
      }
      function Ye(t) {
        var e = function (t, e) {
          if (qe(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (qe(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (qe(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Qe(t, e, n) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.set(t, n);
      }
      function Ke(t, e) {
        return t.get(function (t, e, n) {
          if (typeof t == "function" ? t === e : t.has(e)) {
            if (arguments.length < 3) {
              return e;
            } else {
              return n;
            }
          }
          throw new TypeError("Private element is not present on this object");
        }(t, e));
      }
      var Ze = new WeakMap();
      var Je = new WeakMap();
      var $e = new WeakMap();
      var tn = new WeakMap();
      var en = function () {
        t = function t() {
          var e;
          var n;
          var r;
          var a = this;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, t);
          Qe(this, Ze, function (t) {
            if (a.isTouch) {
              if (t.touches && t.touches.length > 0) {
                a.updateCoordinate(t.touches[0].clientX, t.touches[0].clientY);
              }
            } else {
              a.updateCoordinate(t.clientX, t.clientY);
            }
            if (!a.isTouch) {
              i.z.emit(le.q.MOUSE_MOVE, a.coordinates);
            }
          });
          Qe(this, Je, function () {
            if (a.isDown) {
              a.previousCoordinates.webgl.copy(a.coordinates.webgl);
              a.previousCoordinates.dom.copy(a.coordinates.dom);
              a.isDown = false;
              i.z.emit(le.q.POINTER_UP);
            }
          });
          Qe(this, $e, function (t) {
            if (!a.isDown) {
              switch (t.pointerType) {
                case "mouse":
                  a.isTouch = false;
                  break;
                case "touch":
                case "pen":
                  a.isTouch = true;
              }
              a.updateCoordinate(t.clientX, t.clientY);
              a.isDown = true;
              i.z.emit(le.q.POINTER_DOWN);
            }
          });
          Qe(this, tn, function () {
            if (!a.isTouch) {
              a.isDown = false;
              i.z.emit(le.q.POINTER_UP);
            }
          });
          e = this;
          r = function (t) {
            var e = t.dt;
            if (a.coordinates) {
              a.lerped.lerp(a.coordinates.webgl, e * 0.1);
            }
          };
          if ((n = Ye(n = "onTick")) in e) {
            Object.defineProperty(e, n, {
              value: r,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            e[n] = r;
          }
          i.z.register(this);
          this.isTouch = !!window.matchMedia("(pointer: coarse)").matches || typeof window.ontouchstart == "function" || !!(navigator.maxTouchPoints > 0) || !!(navigator.msMaxTouchPoints > 0);
          this.isDown = false;
          this.lerped = new o.I9Y(0, 0);
        };
        e = [{
          key: "onAttach",
          value: function () {
            this.coordinates = {
              webgl: new o.I9Y(),
              dom: new o.I9Y(ad.tools.viewport.width * 0.5, ad.tools.viewport.height * 0.5)
            };
            this.previousCoordinates = {
              webgl: this.coordinates.webgl.clone(),
              dom: this.coordinates.dom.clone()
            };
            ad.$app.addEventListener("mousemove", Ke(Ze, this));
            ad.$app.addEventListener("touchmove", Ke(Ze, this), {
              passive: true
            });
            ad.$app.addEventListener("pointerdown", Ke($e, this));
            ad.$app.addEventListener("mouseup", Ke(Je, this));
            ad.$app.addEventListener("touchend", Ke(Je, this));
            ad.$app.addEventListener("pointerleave", Ke(tn, this));
          }
        }, {
          key: "updateCoordinate",
          value: function (t, e) {
            this.previousCoordinates.dom.copy(this.coordinates.dom);
            this.previousCoordinates.webgl.copy(this.coordinates.webgl);
            this.coordinates.webgl.set(t / ad.tools.viewport.width * 2 - 1, -e / ad.tools.viewport.height * 2 + 1);
            this.coordinates.dom.set(t, e);
          }
        }];
        if (e) {
          Xe(t.prototype, e);
        }
        if (n) {
          Xe(t, n);
        }
        Object.defineProperty(t, "prototype", {
          writable: false
        });
        return t;
        var t;
        var e;
        var n;
      }();
      function nn(t) {
        nn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return nn(t);
      }
      function rn(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, an(r.key), r);
        }
      }
      function on(t, e, n) {
        if (e) {
          rn(t.prototype, e);
        }
        if (n) {
          rn(t, n);
        }
        Object.defineProperty(t, "prototype", {
          writable: false
        });
        return t;
      }
      function an(t) {
        var e = function (t, e) {
          if (nn(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (nn(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (nn(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var sn = on(function t() {
        (function (t, e) {
          if (!(t instanceof e)) {
            throw new TypeError("Cannot call a class as a function");
          }
        })(this, t);
        this._canvas = document.createElement("canvas");
        this._canvas.width = this._canvas.height = 256;
        this._ctx = this._canvas.getContext("2d");
        var e = this._ctx.getImageData(0, 0, 256, 256);
        e.data.forEach(function (t, n) {
          e.data[n] = Math.round(Math.random() * 255);
        });
        this._ctx.putImageData(e, 0, 0);
        this.texture = new o.GOR(this._canvas);
        this.texture.wrapS = this.texture.wrapT = o.GJx;
        this.texture.minFilter = o.k6q;
        this.texture.magFilter = o.k6q;
        this.nearestTexture = new o.GOR(this._canvas);
        this.nearestTexture.wrapS = this.nearestTexture.wrapT = o.GJx;
        this.nearestTexture.minFilter = o.hxR;
        this.nearestTexture.magFilter = o.hxR;
      });
      var ln = 768;
      var un = 1025;
      var cn = {
        mainColor: 0
      };
      var hn = {
        starsParticles: {
          count: 1000,
          sizeRange: [0.1, 1],
          opacityRange: [0.1, 1]
        },
        shootingStars: {
          count: 10
        },
        landscape: {
          bottomHaloColor: 2248047,
          bottomHaloSunColor: 16739876
        }
      };
      var fn = {
        uTime: {
          value: 0
        },
        uRatio: {
          value: 1
        },
        uCameraView: {
          value: new o.I9Y()
        },
        uGlobalBgColor: {
          value: new o.Pq0(0.021, 0.03, 0.048)
        }
      };
      function pn(t) {
        pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return pn(t);
      }
      function dn(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, mn(r.key), r);
        }
      }
      function mn(t) {
        var e = function (t, e) {
          if (pn(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (pn(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (pn(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function gn(t, e, n) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.set(t, n);
      }
      function vn(t, e) {
        return t.get(yn(t, e));
      }
      function yn(t, e, n) {
        if (typeof t == "function" ? t === e : t.has(e)) {
          if (arguments.length < 3) {
            return e;
          } else {
            return n;
          }
        }
        throw new TypeError("Private element is not present on this object");
      }
      var bn = new WeakMap();
      var _n = new WeakMap();
      var wn = function () {
        t = function t() {
          var e = this;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, t);
          gn(this, bn, undefined);
          gn(this, _n, function (t) {
            if (vn(bn, e)) {
              if (t[0].contentBoxSize) {
                var n = Array.isArray(t[0].contentBoxSize) ? t[0].contentBoxSize[0] : t[0].contentBoxSize;
                e.width = n.inlineSize;
                e.height = n.blockSize;
              } else {
                e.width = t[0].contentRect.width;
                e.height = t[0].contentRect.height;
              }
              e.dpr = Math.min(window.innerWidth < ln ? 2 : 1.5, window.devicePixelRatio);
              fn.uRatio.value = e.ratio = e.width / e.height;
              e.breakpoint = window.innerWidth < ln ? "mobile" : window.innerWidth < un ? "tablet" : "desktop";
              i.z.emit(le.q.RESIZE, e.infos);
              i.z.emit(le.q.AFTER_RESIZE, e.infos);
            }
          });
          i.z.register(this);
          var n = ad.$wrapper.getBoundingClientRect();
          this.width = Math.min(window.innerWidth, n.width);
          this.height = n.height;
          this.dpr = Math.min(window.innerWidth < ln ? 2 : 1.5, window.devicePixelRatio);
          this.ratio = this.width / this.height;
          this.breakpoint = window.innerWidth < ln ? "mobile" : window.innerWidth < un ? "tablet" : "desktop";
          this.isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        };
        if (e = [{
          key: "onAttach",
          value: function () {
            var t;
            var e;
            var n;
            e = this;
            n = true;
            (t = bn).set(yn(t, e), n);
            new ResizeObserver(vn(_n, this)).observe(ad.$wrapper);
          }
        }, {
          key: "infos",
          get: function () {
            return {
              width: this.width,
              height: this.height,
              dpr: this.dpr,
              ratio: this.ratio,
              device: this.breakpoint
            };
          }
        }]) {
          dn(t.prototype, e);
        }
        if (n) {
          dn(t, n);
        }
        Object.defineProperty(t, "prototype", {
          writable: false
        });
        return t;
        var t;
        var e;
        var n;
      }();
      function xn() {
        var t = new en();
        var e = new wn();
        return {
          mouse: t,
          noise: new sn(),
          viewport: e
        };
      }
      function Sn() {
        var t;
        var e;
        var n = typeof Symbol == "function" ? Symbol : {};
        var r = n.iterator || "@@iterator";
        var i = n.toStringTag || "@@toStringTag";
        function o(n, r, i, o) {
          var l = r && r.prototype instanceof s ? r : s;
          var u = Object.create(l.prototype);
          Tn(u, "_invoke", function (n, r, i) {
            var o;
            var s;
            var l;
            var u = 0;
            var c = i || [];
            var h = false;
            var f = {
              p: 0,
              n: 0,
              v: t,
              a: p,
              f: p.bind(t, 4),
              d: function (e, n) {
                o = e;
                s = 0;
                l = t;
                f.n = n;
                return a;
              }
            };
            function p(n, r) {
              s = n;
              l = r;
              e = 0;
              for (; !h && u && !i && e < c.length; e++) {
                var i;
                var o = c[e];
                var p = f.p;
                var d = o[2];
                if (n > 3) {
                  if (i = d === r) {
                    l = o[(s = o[4]) ? 5 : (s = 3, 3)];
                    o[4] = o[5] = t;
                  }
                } else if (o[0] <= p) {
                  if (i = n < 2 && p < o[1]) {
                    s = 0;
                    f.v = r;
                    f.n = o[1];
                  } else if (p < d && (i = n < 3 || o[0] > r || r > d)) {
                    o[4] = n;
                    o[5] = r;
                    f.n = d;
                    s = 0;
                  }
                }
              }
              if (i || n > 1) {
                return a;
              }
              h = true;
              throw r;
            }
            return function (i, c, d) {
              if (u > 1) {
                throw TypeError("Generator is already running");
              }
              if (h && c === 1) {
                p(c, d);
              }
              s = c;
              l = d;
              while ((e = s < 2 ? t : l) || !h) {
                if (!o) {
                  if (s) {
                    if (s < 3) {
                      if (s > 1) {
                        f.n = -1;
                      }
                      p(s, l);
                    } else {
                      f.n = l;
                    }
                  } else {
                    f.v = l;
                  }
                }
                try {
                  u = 2;
                  if (o) {
                    if (!s) {
                      i = "next";
                    }
                    if (e = o[i]) {
                      if (!(e = e.call(o, l))) {
                        throw TypeError("iterator result is not an object");
                      }
                      if (!e.done) {
                        return e;
                      }
                      l = e.value;
                      if (s < 2) {
                        s = 0;
                      }
                    } else {
                      if (s === 1 && (e = o.return)) {
                        e.call(o);
                      }
                      if (s < 2) {
                        l = TypeError("The iterator does not provide a '" + i + "' method");
                        s = 1;
                      }
                    }
                    o = t;
                  } else if ((e = (h = f.n < 0) ? l : n.call(r, f)) !== a) {
                    break;
                  }
                } catch (e) {
                  o = t;
                  s = 1;
                  l = e;
                } finally {
                  u = 1;
                }
              }
              return {
                value: e,
                done: h
              };
            };
          }(n, i, o), true);
          return u;
        }
        var a = {};
        function s() {}
        function l() {}
        function u() {}
        e = Object.getPrototypeOf;
        var c = [][r] ? e(e([][r]())) : (Tn(e = {}, r, function () {
          return this;
        }), e);
        var h = u.prototype = s.prototype = Object.create(c);
        function f(t) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(t, u);
          } else {
            t.__proto__ = u;
            Tn(t, i, "GeneratorFunction");
          }
          t.prototype = Object.create(h);
          return t;
        }
        l.prototype = u;
        Tn(h, "constructor", u);
        Tn(u, "constructor", l);
        l.displayName = "GeneratorFunction";
        Tn(u, i, "GeneratorFunction");
        Tn(h);
        Tn(h, i, "Generator");
        Tn(h, r, function () {
          return this;
        });
        Tn(h, "toString", function () {
          return "[object Generator]";
        });
        return (Sn = function () {
          return {
            w: o,
            m: f
          };
        })();
      }
      function Tn(t, e, n, r) {
        var i = Object.defineProperty;
        try {
          i({}, "", {});
        } catch (t) {
          i = 0;
        }
        Tn = function (t, e, n, r) {
          function o(e, n) {
            Tn(t, e, function (t) {
              return this._invoke(e, n, t);
            });
          }
          if (e) {
            if (i) {
              i(t, e, {
                value: n,
                enumerable: !r,
                configurable: !r,
                writable: !r
              });
            } else {
              t[e] = n;
            }
          } else {
            o("next", 0);
            o("throw", 1);
            o("return", 2);
          }
        };
        Tn(t, e, n, r);
      }
      function Mn(t, e, n, r, i, o, a) {
        try {
          var s = t[o](a);
          var l = s.value;
        } catch (t) {
          n(t);
          return;
        }
        if (s.done) {
          e(l);
        } else {
          Promise.resolve(l).then(r, i);
        }
      }
      function On() {
        return Pn.apply(this, arguments);
      }
      function Pn() {
        var t;
        t = Sn().m(function t() {
          var e;
          var r;
          var i;
          var o;
          var a;
          var s;
          var l;
          return Sn().w(function (t) {
            while (true) {
              switch (t.n) {
                case 0:
                  t.n = 1;
                  return n.e(40).then(n.bind(n, 80));
                case 1:
                  t.n = 2;
                  return n.e(849).then(n.bind(n, 613));
                case 2:
                  e = t.v.Pane;
                  r = new e();
                  t.n = 3;
                  return r.load();
                case 3:
                  t.n = 4;
                  return n.e(636).then(n.bind(n, 995));
                case 4:
                  i = t.v.Stats;
                  o = new i();
                  t.n = 5;
                  return o.load();
                case 5:
                  t.n = 6;
                  return n.e(636).then(n.bind(n, 330));
                case 6:
                  a = t.v.Scroll;
                  s = new a();
                  if ((l = new URLSearchParams(window.location.search)).has("skipIntro")) {
                    document.querySelector("#loader").remove();
                  }
                  if (l.has("hideUI")) {
                    Array.from(document.querySelectorAll("[data-webgl]")).forEach(function (t) {
                      return t.style.opacity = 0;
                    });
                  }
                  if (l.has("borders")) {
                    Array.from(document.querySelectorAll("[data-webgl]")).forEach(function (t) {
                      return t.style.border = "1px solid red";
                    });
                  }
                  return t.a(2, {
                    pane: r,
                    stats: o,
                    scroll: s
                  });
              }
            }
          }, t);
        });
        Pn = function () {
          var e = this;
          var n = arguments;
          return new Promise(function (r, i) {
            var o = t.apply(e, n);
            function a(t) {
              Mn(o, r, i, a, s, "next", t);
            }
            function s(t) {
              Mn(o, r, i, a, s, "throw", t);
            }
            a(undefined);
          });
        };
        return Pn.apply(this, arguments);
      }
      function En(t) {
        En = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return En(t);
      }
      function Cn(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, An(r.key), r);
        }
      }
      function An(t) {
        var e = function (t, e) {
          if (En(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (En(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (En(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Rn(t, e, n) {
        e = Dn(e);
        return function (t, e) {
          if (e && (En(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Ln() ? Reflect.construct(e, n || [], Dn(t).constructor) : e.apply(t, n));
      }
      function Ln() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Ln = function () {
          return !!t;
        })();
      }
      function Dn(t) {
        Dn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Dn(t);
      }
      function In(t, e) {
        In = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return In(t, e);
      }
      var jn = function (t) {
        function e() {
          var t;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          t = Rn(this, e, [45, ad.tools.viewport.ratio, 0.5, 150]);
          i.z.register(t);
          t.parallaxIntensity = 1;
          t.position.z = 50;
          t.baseFov = 45;
          window.camera = t;
          t._basePosition = t.position.clone();
          t._position = t._basePosition;
          t.mouse = {
            position: new o.I9Y(0, 0),
            target: new o.I9Y(0, 0)
          };
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            In(t, e);
          }
        })(e, t);
        n = e;
        r = [{
          key: "attachBasePosition",
          value: function (t) {
            this._position = t;
          }
        }, {
          key: "detachBasePosition",
          value: function () {
            this._position = this._basePosition;
          }
        }, {
          key: "onAttach",
          value: function () {
            var t;
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "MainCamera");
            }
          }
        }, {
          key: "onResize",
          value: function (t) {
            var e = t.ratio;
            this.aspect = e;
            this.updateFov();
            fn.uCameraView.value.set(this.getVisibleWidthAtZDepth(0), this.getVisibleHeightAtZDepth(0));
          }
        }, {
          key: "onMouseMove",
          value: function (t) {
            var e = t.webgl;
            this.mouse.target.copy(e);
          }
        }, {
          key: "updateFov",
          value: function (t = null) {
            this.baseFov = t || this.baseFov;
            this.fov = this.baseFov / Math.min(1, this.aspect * 1.5);
            this.updateProjectionMatrix();
          }
        }, {
          key: "getVisibleHeightAtZDepth",
          value: function (t) {
            if (t < this.position.z) {
              t -= this.position.z;
            } else {
              t += this.position.z;
            }
            var e = this.fov * Math.PI / 180;
            return Math.tan(e / 2) * 2 * Math.abs(t);
          }
        }, {
          key: "getVisibleWidthAtZDepth",
          value: function (t) {
            return this.getVisibleHeightAtZDepth(t) * this.aspect;
          }
        }, {
          key: "getHeightFromPixels",
          value: function (t) {
            return fn.uCameraView.value.y * t / ad.tools.viewport.height;
          }
        }, {
          key: "getWidthFromPixels",
          value: function (t) {
            return fn.uCameraView.value.x * t / ad.tools.viewport.width;
          }
        }, {
          key: "onTick",
          value: function (t) {
            var e = t.dt;
            if (!this.orbitControls && ad.animation) {
              this.mouse.position.lerp(this.mouse.target, e);
              this.position.copy(this._position);
              this.translateX(ad.tools.mouse.lerped.x * 0.1 * this.parallaxIntensity);
              this.translateY(ad.tools.mouse.lerped.y * 0.1 * this.parallaxIntensity);
            }
          }
        }];
        if (r) {
          Cn(n.prototype, r);
        }
        if (a) {
          Cn(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(o.ubm);
      function kn(t) {
        kn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return kn(t);
      }
      function Nn(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, zn(r.key), r);
        }
      }
      function zn(t) {
        var e = function (t, e) {
          if (kn(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (kn(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (kn(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Un(t, e, n) {
        e = Bn(e);
        return function (t, e) {
          if (e && (kn(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Fn() ? Reflect.construct(e, n || [], Bn(t).constructor) : e.apply(t, n));
      }
      function Fn() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Fn = function () {
          return !!t;
        })();
      }
      function Bn(t) {
        Bn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Bn(t);
      }
      function Wn(t, e) {
        Wn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Wn(t, e);
      }
      var Hn = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Un(this, e, [n])).fragmentShader = "precision highp float;\n\nvarying vec3 vNormal;\nvarying vec3 vPosition;\nvarying vec2 vUv;\n\n#define PI 3.141592\n\nuniform float uTime;\nuniform float uRatio;\nuniform sampler2D tNoise;\n\n\nvoid main() {\n\tvec3 intensity = vec3(1.);\n\n\tvec2 rUv = vUv;\n\trUv.x *= uRatio;\n\n\tintensity.rgb *= vec3(.9, .95, 1.05);\n\tintensity *= smoothstep(.8, .2, length(vUv - .5)) * .8 + .2;\n\tintensity -= smoothstep(.3, 0., vUv.y) * .1;\n\tintensity *= 1. + (texture2D(tNoise, rUv * 8. + floor(uTime * .03) * .1234651).rgb - .5) * .1;\n\n\tgl_FragColor = vec4(vec3(intensity) * .87, 1.);\n}\n";
          t.vertexShader = "precision highp float;\n\nvarying vec2 vUv;\nattribute vec2 uv;\nattribute vec3 position;\n\n\nvoid main(){\n\tvUv = uv;\n\tgl_Position = vec4(position, 1.0);\n}";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Wn(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Nn(n.prototype, r);
        }
        if (i) {
          Nn(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function Vn(t) {
        Vn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Vn(t);
      }
      function Gn(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, qn(r.key), r);
        }
      }
      function qn(t) {
        var e = function (t, e) {
          if (Vn(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Vn(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Vn(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Xn(t, e, n) {
        e = Qn(e);
        return function (t, e) {
          if (e && (Vn(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Yn() ? Reflect.construct(e, n || [], Qn(t).constructor) : e.apply(t, n));
      }
      function Yn() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Yn = function () {
          return !!t;
        })();
      }
      function Qn(t) {
        Qn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Qn(t);
      }
      function Kn(t, e) {
        Kn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Kn(t, e);
      }
      var Zn = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Xn(this, e, [n])).fragmentShader = "precision highp float;\n\nvarying vec3 vNormal;\nvarying vec3 vPosition;\nvarying vec2 vUv;\n\n#define PI 3.141592\n\nuniform float uTime;\nuniform float uRatio;\nuniform sampler2D tNoise;\nuniform vec3 uGlobalBgColor;\n\n\nvoid main() {\n\n\tgl_FragColor = vec4(uGlobalBgColor, 1.);\n}\n";
          t.vertexShader = "precision highp float;\n\nvarying vec2 vUv;\nattribute vec2 uv;\nattribute vec3 position;\n\n\nvoid main(){\n\tvUv = uv;\n\tgl_Position = vec4(position, 1.0);\n}";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Kn(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Gn(n.prototype, r);
        }
        if (i) {
          Gn(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function Jn(t) {
        Jn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Jn(t);
      }
      function $n(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, tr(r.key), r);
        }
      }
      function tr(t) {
        var e = function (t, e) {
          if (Jn(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Jn(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Jn(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function er(t, e, n) {
        e = rr(e);
        return function (t, e) {
          if (e && (Jn(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, nr() ? Reflect.construct(e, n || [], rr(t).constructor) : e.apply(t, n));
      }
      function nr() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (nr = function () {
          return !!t;
        })();
      }
      function rr(t) {
        rr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return rr(t);
      }
      function ir(t, e) {
        ir = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return ir(t, e);
      }
      var or = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = er(this, e, [n])).fragmentShader = "precision highp float;\n\nvarying vec2 vUv;\n\nuniform float uRatio;\nuniform float uHoldProgress;\nuniform vec3 uGlobalBgColor;\nuniform sampler2D tNearestNoise;\n\n\nvoid main() {\n\tvec2 rUv = vUv;\n\trUv.x *= uRatio;\n\n\tfloat noise = texture2D(tNearestNoise, vec2(rUv.x * .14, rUv.y * .07 + rUv.x * .015 + uHoldProgress * .002)).r;\n\tfloat disappearValue = smoothstep(noise, noise + .1, uHoldProgress * 1.1);\n\n\tgl_FragColor = vec4(uGlobalBgColor, disappearValue * uHoldProgress);\n}\n";
          t.vertexShader = "precision highp float;\n\nvarying vec2 vUv;\nattribute vec2 uv;\nattribute vec3 position;\n\n\nvoid main(){\n\tvUv = uv;\n\tgl_Position = vec4(position, 1.0);\n}";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            ir(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          $n(n.prototype, r);
        }
        if (i) {
          $n(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function ar(t) {
        ar = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return ar(t);
      }
      function sr(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, lr(r.key), r);
        }
      }
      function lr(t) {
        var e = function (t, e) {
          if (ar(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (ar(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (ar(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function ur(t, e, n) {
        e = hr(e);
        return function (t, e) {
          if (e && (ar(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, cr() ? Reflect.construct(e, n || [], hr(t).constructor) : e.apply(t, n));
      }
      function cr() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (cr = function () {
          return !!t;
        })();
      }
      function hr(t) {
        hr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return hr(t);
      }
      function fr(t, e) {
        fr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return fr(t, e);
      }
      var pr = function (t) {
        function e() {
          var t;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          t = ur(this, e);
          i.z.register(t);
          t.add(new o.$p8(5275903, 0.3));
          t.overlay = new o.eaF(new o.bdM(2, 2), new Hn({
            uniforms: {
              uTime: fn.uTime,
              uRatio: fn.uRatio,
              tNoise: {
                value: ad.tools.noise.texture
              }
            },
            blending: o.EdD,
            depthTest: false,
            depthWrite: false,
            transparent: true
          }));
          t.holdOverlay = new o.eaF(new o.bdM(2, 2), new or({
            uniforms: {
              uRatio: fn.uRatio,
              tNearestNoise: {
                value: ad.tools.noise.nearestTexture
              },
              uHoldProgress: {
                value: 0
              },
              uGlobalBgColor: fn.uGlobalBgColor
            },
            depthTest: false,
            depthWrite: false,
            transparent: true
          }));
          t.overlay.renderOrder = 200;
          t.holdOverlay.renderOrder = 200;
          t.background = new o.eaF(new o.bdM(2, 2), new Zn({
            uniforms: {
              uTime: fn.uTime,
              uGlobalBgColor: fn.uGlobalBgColor,
              uRatio: fn.uRatio,
              tNoise: {
                value: ad.tools.noise.texture
              }
            },
            blending: o.EZo,
            depthTest: false,
            depthWrite: false
          }));
          t.background.renderOrder = -200;
          t.add(t.overlay, t.background, t.holdOverlay);
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            fr(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          sr(n.prototype, r);
        }
        if (a) {
          sr(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(o.Z58);
      function dr(t) {
        dr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return dr(t);
      }
      function mr(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, gr(r.key), r);
        }
      }
      function gr(t) {
        var e = function (t, e) {
          if (dr(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (dr(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (dr(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function vr(t, e, n) {
        e = br(e);
        return function (t, e) {
          if (e && (dr(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, yr() ? Reflect.construct(e, n || [], br(t).constructor) : e.apply(t, n));
      }
      function yr() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (yr = function () {
          return !!t;
        })();
      }
      function br(t) {
        br = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return br(t);
      }
      function _r(t, e) {
        _r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return _r(t, e);
      }
      var wr = function (t) {
        function e() {
          var t;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          t = vr(this, e, [{
            antialias: true,
            powerPreference: "high-performance"
          }]);
          i.z.register(t);
          t.shadowMap.enabled = true;
          t.shadowMap.type = o.RyA;
          t.autoClear = false;
          t.setClearColor(395276);
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            _r(t, e);
          }
        })(e, t);
        n = e;
        if (r = [{
          key: "onAttach",
          value: function () {}
        }, {
          key: "onResize",
          value: function (t) {
            var e = t.width;
            var n = t.height;
            var r = t.dpr;
            this.setSize(e, n);
            this.setPixelRatio(r);
          }
        }]) {
          mr(n.prototype, r);
        }
        if (a) {
          mr(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(o.JeP);
      var xr = n(517);
      let Sr = 1234567;
      Math.PI;
      Math.PI;
      function Tr(t, e, n) {
        return Math.max(e, Math.min(n, t));
      }
      function Mr(t, e, n, r, i) {
        return r + (t - e) * (i - r) / (n - e);
      }
      function Or(t, e, n, r) {
        return function (t, e, n) {
          return (1 - n) * t + n * e;
        }(t, e, 1 - Math.exp(-n * r));
      }
      function Pr(t, e) {
        return t + Math.random() * (e - t);
      }
      function Er(t) {
        return t * (0.5 - Math.random());
      }
      function Cr(t) {
        if (t !== undefined) {
          Sr = t;
        }
        let e = Sr += 1831565813;
        e = Math.imul(e ^ e >>> 15, e | 1);
        e ^= e + Math.imul(e ^ e >>> 7, e | 61);
        return ((e ^ e >>> 14) >>> 0) / 4294967296;
      }
      var Ar = n(840);
      var Rr = n(652);
      function Lr(t) {
        Lr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Lr(t);
      }
      function Dr(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Ur(r.key), r);
        }
      }
      function Ir(t, e, n) {
        e = kr(e);
        return function (t, e) {
          if (e && (Lr(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, jr() ? Reflect.construct(e, n || [], kr(t).constructor) : e.apply(t, n));
      }
      function jr() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (jr = function () {
          return !!t;
        })();
      }
      function kr(t) {
        kr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return kr(t);
      }
      function Nr(t, e) {
        Nr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Nr(t, e);
      }
      function zr(t, e, n) {
        if ((e = Ur(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Ur(t) {
        var e = function (t, e) {
          if (Lr(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Lr(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Lr(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var Fr = function (t) {
        function e(t, n) {
          var r;
          var o;
          var a;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          zr(a = Ir(this, e), "hasEnter", undefined);
          zr(a, "hasEnterCenter", undefined);
          zr(a, "resize", function () {
            var t = a.el.getBoundingClientRect();
            a.start = t.top + window.scrollY - ad.tools.viewport.height;
            a.height = t.height;
            a.end = a.height + t.top + window.scrollY;
            a.webglStart = a.start + ad.tools.viewport.height * a.startOffset;
            a.webglEnd = a.end + ad.tools.viewport.height * a.endOffset;
            if (ad.tools.viewport.breakpoint !== a.oldBreakpoint && a.oldBreakpoint !== undefined) {
              setTimeout(function () {
                var t;
                var e;
                if ((t = a.domTimeline) !== null && t !== undefined && (e = t.kill) !== null && e !== undefined) {
                  e.call(t);
                }
                a.domTimeline = a.setupDomTimeline();
              }, 100);
            }
            a.oldBreakpoint = ad.tools.viewport.breakpoint;
          });
          zr(a, "onToggleLongpress", function (t) {
            var e;
            var n;
            if (t) {
              if (a.hasEnter) {
                a.leave(0, true);
              }
            } else {
              if (a.hasEnter) {
                a.enter(0, true);
              }
              if ((e = a.timeline) !== null && e !== undefined) {
                e.progress(a.lerpedProgressWebgl);
              }
              if ((n = a.domTimeline) !== null && n !== undefined) {
                n.progress(a.progress);
              }
            }
          });
          zr(a, "tick", function (t) {});
          a.el = t;
          a.isLastSection = a.isFirstSection = false;
          a.start = a.height = a.end = 0;
          a.hasEnter = a.hasEnterCenter = false;
          a.progressWebgl = 0;
          a.lerpedProgressWebgl = 0;
          a.progress = 0;
          a.timeline = null;
          a.domTimeline = null;
          a.stackedScroll = 0;
          i.z.on(le.q.RESIZE, a.resize);
          a.cancelAnimations = false;
          i.z.on(le.q.TOGGLE_ANIMATIONS, function () {
            return a.cancelAnimations = !a.cancelAnimations;
          });
          a.domSections = Array.from(a.el.querySelectorAll("section")).map(function (t) {
            return {
              element: t,
              component: Rr.d.get(t)
            };
          });
          a._dir = 0;
          a.isFirstSection = ((r = a.domSections[0]) === null || r === undefined || (r = r.component) === null || r === undefined ? undefined : r.isFirstSection) == 1;
          a.isLastSection = ((o = a.domSections[a.domSections.length - 1]) === null || o === undefined || (o = o.component) === null || o === undefined ? undefined : o.isLastSection) == 1;
          a.startOffset = 0;
          a.endOffset = 0;
          return a;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Nr(t, e);
          }
        })(e, t);
        n = e;
        r = [{
          key: "setupTimeline",
          value: function () {
            return xr.Ay.timeline({
              paused: true
            });
          }
        }, {
          key: "setupDomTimeline",
          value: function () {
            var t = xr.Ay.timeline({
              paused: true
            });
            var e = 0;
            this.domSections.forEach(function (n) {
              if (n.component && n.component.timeline) {
                var r = n.component.timeline;
                t.add(r, e);
                if (!n.component.isFirstSection) {
                  e += r.duration() - ad.tools.viewport.height;
                }
              } else {
                console.log("No timeline found for section", n.element);
              }
            });
            return t;
          }
        }, {
          key: "onAttach",
          value: function () {
            this.resize();
            this.timeline = this.setupTimeline();
            this.domTimeline = this.setupDomTimeline();
          }
        }, {
          key: "beforePreRender",
          value: function () {}
        }, {
          key: "afterPreRender",
          value: function () {}
        }, {
          key: "enter",
          value: function (t) {
            var e;
            if (!(arguments.length > 1) || arguments[1] === undefined || !arguments[1]) {
              if (this.hasEnter) {
                return;
              }
              this.hasEnter = true;
            }
            i.z.on(le.q.TICK, this.tick);
            if (!ad.webgl.sectionController.didFirstEnter) {
              ad.webgl.sectionController.didFirstEnter = true;
              if ((e = this.open) !== null && e !== undefined) {
                e.call(this);
              }
            }
            ad.webgl.sectionsGroup.add(this);
          }
        }, {
          key: "leave",
          value: function (t) {
            if (!(arguments.length > 1) || arguments[1] === undefined || !arguments[1]) {
              if (!this.hasEnter) {
                return;
              }
              this.hasEnter = false;
            }
            i.z.off(le.q.TICK, this.tick);
            ad.webgl.sectionsGroup.remove(this);
          }
        }, {
          key: "enterCenter",
          value: function (t) {
            this.hasEnterCenter ||= true;
          }
        }, {
          key: "leaveCenter",
          value: function (t) {
            this.hasEnterCenter &&= false;
          }
        }, {
          key: "updateProgress",
          value: function (t, e) {
            var n;
            if (!ad.animation) {
              if (!(Math.abs(this.stackedScroll - t) > 1000)) {
                return;
              }
              this.stackedScroll = t;
            }
            this.progressWebgl = Tr(Mr(t, this.webglStart + (this.isFirstSection ? ad.tools.viewport.height : 0), this.webglEnd - (this.isLastSection ? +ad.tools.viewport.height : 0), 0, 1), 0, 1);
            if (!isNaN(this.progressWebgl)) {
              this.lerpedProgressWebgl -= (this.lerpedProgressWebgl - this.progressWebgl) * 0.1;
            }
            this.lerpedProgressWebgl = this.progressWebgl;
            if (this.debugText) {
              this.debugText.innerHTML = `${this.progressWebgl.toFixed(2)}`;
            }
            if ((n = this.timeline) !== null && n !== undefined) {
              n.progress(this.lerpedProgressWebgl);
            }
            this._dir = e;
            if (t >= this.webglStart && t <= this.webglEnd && !this.hasEnter) {
              this.enter(e);
            } else if ((t < this.webglStart || t > this.webglEnd) && this.hasEnter) {
              this.leave(e);
            }
            if (t >= this.webglStart + ad.tools.viewport.height * 0.5 && t <= this.webglEnd - ad.tools.viewport.height * 0.5 && !this.hasEnterCenter) {
              this.enterCenter(e);
            } else if ((t < this.webglStart + ad.tools.viewport.height * 0.5 || t > this.webglEnd - ad.tools.viewport.height * 0.5) && this.hasEnterCenter) {
              this.leaveCenter(e);
            }
          }
        }, {
          key: "updateDOMProgress",
          value: function (t, e) {
            var n;
            this.progress = Tr(Mr(t, this.start + (this.isFirstSection ? ad.tools.viewport.height : 0), this.end - (this.isLastSection ? +ad.tools.viewport.height : 0), 0, 1), 0, 1);
            if (!this.cancelAnimations && (n = this.domTimeline) !== null && n !== undefined) {
              n.progress(this.progress);
            }
          }
        }];
        if (r) {
          Dr(n.prototype, r);
        }
        if (o) {
          Dr(n, o);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var o;
      }(o.YJl);
      function Br(t) {
        Br = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Br(t);
      }
      function Wr(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Hr(r.key), r);
        }
      }
      function Hr(t) {
        var e = function (t, e) {
          if (Br(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Br(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Br(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Vr(t, e, n) {
        e = qr(e);
        return function (t, e) {
          if (e && (Br(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Gr() ? Reflect.construct(e, n || [], qr(t).constructor) : e.apply(t, n));
      }
      function Gr() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Gr = function () {
          return !!t;
        })();
      }
      function qr(t) {
        qr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return qr(t);
      }
      function Xr(t, e) {
        Xr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Xr(t, e);
      }
      var Yr = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Vr(this, e, [n])).fragmentShader = "precision mediump float;\n\nvarying vec3 vNormal;\nvarying vec3 vPosition;\nvarying vec2 vUv;\n\n#define PI 3.141592\n\nuniform sampler2D tAlbedo;\nuniform sampler2D tData;\nuniform sampler2D tNoise;\n\nuniform vec3 uSunPosition;\nuniform vec3 uSunColor;\nuniform float uSunIntensity;\n\nuniform vec3 uLightsColor;\nuniform vec3 uSeaColor;\nuniform vec3 uSpecularColor;\nuniform vec3 uSunReflexionColor;\nuniform vec3 uSunsetColor;\nuniform vec3 uColorCorrection;\nuniform vec3 uSpecularReference;\nuniform vec3 uViewPos;\nuniform vec3 uInnerSpecColor;\nuniform vec3 uOuterSpecColor;\nuniform vec3 uGlobalBgColor;\n\nuniform float uLightIntensity;\nuniform float uEarthSpecular;\nuniform float uSeaSpecular;\nuniform float uShininess;\nuniform float uContrast;\nuniform float uSaturation;\nuniform float uLuminosity;\nuniform float uSunsetIntensity;\nuniform float uProgress;\nuniform float uProgress2;\nuniform float uOpacity;\nuniform float uSunReflexionIntensity;\nuniform float uCloudsColorFactor;\nuniform float uMinLambertian;\n\nuniform float uTime;\n\n#define SEA vec3(.118, .231, .459)\n\nvec3 czm_saturation(vec3 rgb, float adjustment) {\n    return mix(vec3(dot(rgb, vec3(0.2125, 0.7154, 0.0721))), rgb, adjustment);\n}\n\nvoid main() {\n\tvec3 pos = vPosition;\n\tvec3 normal = vNormal;\n\tvec3 light = uSunPosition;\n\tvec3 sunPos = uSpecularReference;\n\n\tvec3 data = texture2D(tData, vUv).rgb;\n\n\tfloat progress = uProgress * uProgress2;\n\tlight = mix(vec3(0., 0., -200.), light, progress);\n\n\tvec3 specularColor = uSpecularColor;\n\tvec3 diffuseColor = texture2D(tAlbedo, vUv).rgb;\n\n\tfloat seaMask = smoothstep(.4, .2, length(diffuseColor - SEA));\n\tfloat Ks = mix(uEarthSpecular, uSeaSpecular, seaMask);\n\n\t// normal.rg += (texture2D(tNoise, vUv * vec2(2., 1.) * 20.).rg - .5) * .05 * seaMask;\n\t// normal.rg += (texture2D(tAlbedo, vUv).rg - .5) * .01 * (1. - seaMask);\n\n\tnormal.r += (texture2D(tAlbedo, vUv + vec2(.0002, 0.)).r - texture2D(tAlbedo, vUv - vec2(.0002, 0.)).r) * .1;\n\tnormal.g += (texture2D(tAlbedo, vUv + vec2(0., .0005)).g - texture2D(tAlbedo, vUv - vec2(0., .0005)).g) * .1;\n\n\tvec3 N = normalize(normal);\n  \tvec3 L = normalize(light - pos);\n\n\tdiffuseColor = czm_saturation(diffuseColor * (1. + uContrast) - uContrast + uLuminosity, uSaturation);\n\tdiffuseColor = mix(diffuseColor, uSeaColor + data.b * vec3(.1, .2, .3) * 1.2, seaMask);\n\tdiffuseColor += (uColorCorrection - .5) * (1. - seaMask);\n\tdiffuseColor += (texture2D(tNoise, vUv * vec2(2., 1.) * 10.).b - .5) * .03 * (1. - seaMask);\n\n\tfloat unclampedLambertian = dot(N, L);\n  \tfloat lambertian = max(unclampedLambertian, uMinLambertian);\n\tfloat specular = 0.;\n\n\tvec3 R = reflect(-L, N);\n\tvec3 V = normalize(uViewPos);\n\n\tfloat specAngle = max(dot(R, V), 0.0);\n\tspecular = pow(specAngle, uShininess);\n\n\tfloat Kd = 1.;\n\n\tfloat poles = smoothstep(0.48, .43, abs(.5 - vUv.y));\n\n\tfloat t = uTime * .0000005;\n\tvec2 cloudsUv = vec2(vUv.x - t + sin(vUv.y * 100. + t * 2.) * .001, vUv.y + sin(vUv.x * 100. - t * 2.) * .004) * 6.;\n\tvec2 shadowDecay = -(normal.xz - normalize(uSunPosition.zy)) * .03;\n\tfloat cloudShadow = 1. - texture2D(tData, cloudsUv + shadowDecay).r * poles;\n\n\tKd *= cloudShadow;\n\tKs *= cloudShadow;\n\n\tgl_FragColor = vec4(\n\t\t(Kd * lambertian * uSunIntensity + .1) * diffuseColor * uSunColor + Ks * specular * uSpecularColor * uSunColor * uSunIntensity,\n\t\t1.\n\t);\n\n\tN.x *= 3.;\n\tN.y *= .88;\n\n\tvec3 sunL = normalize(sunPos - pos);\n\tfloat sunR = dot(sunL, N);\n\tfloat sunSpec = max(dot(reflect(-sunL, N), V), 0.0);\n\tsunSpec = smoothstep(.85, 1.03, sunSpec);\n\tvec3 sunSpecColor = mix(uOuterSpecColor, uInnerSpecColor, smoothstep(.65, 1., sunSpec));\n\n\n\t// gl_FragColor.rgb = mix(gl_FragColor, vec3(0.), cloudShadow);\n\n\tgl_FragColor.rgb += uSunReflexionColor * smoothstep(.5, 1., lambertian) * (seaMask * .8 + .2);\n\n\tfloat sunset = smoothstep(.8, .2, unclampedLambertian) * smoothstep(-.1, .2, unclampedLambertian);\n\tgl_FragColor.rgb = mix(gl_FragColor.rgb, uSunsetColor, sunset * uSunsetIntensity);\n\n\tfloat clouds = texture2D(tData, cloudsUv).r * poles;\n\tvec3 cloudsColor = vec3(1.) * .6 + .3;\n\tcloudsColor *= uCloudsColorFactor * vec3(.85, .9, 1.1) * smoothstep(0., .3, lambertian);\n\tgl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb + sunSpecColor * (smoothstep(.6, 1., sunSpec) * 2. + 1.), smoothstep(0., .8, sunSpec) * uSunReflexionIntensity);\n\tgl_FragColor.rgb = mix(gl_FragColor.rgb, cloudsColor, clouds);\n\n\tgl_FragColor.rgb = clamp(gl_FragColor.rgb, 0., 1.);\n\tfloat lightFactor = smoothstep(.0, 1., data.g) * smoothstep(.1 + texture2D(tNoise, vUv * 1.).r * .2, .0, lambertian) * uLightIntensity * progress;\n\tgl_FragColor.rgb += lightFactor * uLightsColor * texture2D(tNoise, vUv * .5 + t * 5.).r;\n\tgl_FragColor.rgb = mix(uGlobalBgColor, gl_FragColor.rgb, progress);\n\tgl_FragColor.rgb = mix(uGlobalBgColor, gl_FragColor.rgb, smoothstep(0., .15, lambertian) + lightFactor);\n\tgl_FragColor.rgb = mix(uGlobalBgColor, gl_FragColor.rgb, uOpacity);\n\n\t// gl_FragColor.rgb = vec3(poles, 0., 0.);\n//\tgl_FragColor.rgb = vec3(unclampedLambertian, 0., 0.);\n//\tif (sunSpec == 1.) {\n//\t\tgl_FragColor.rgb *= vec3(1., 0., 0.);\n//\t}\n//\tgl_FragColor = vec4(sunSpec, 0., 0., 1.);\n}\n";
          t.vertexShader = "precision mediump float;\n\nvarying vec3 vNormal;\nvarying vec3 vPosition;\nvarying vec2 vUv;\n\nuniform float curveIntensity;\n\nvoid main(){\n\tvUv = uv;\n\n\tvec4 vPos4 = modelViewMatrix * vec4(position, 1.0);\n\tvPosition = vec3(vPos4) / vPos4.w;\n\tvNormal = vec3(normalMatrix * normal);\n\n\tgl_Position = projectionMatrix * vPos4;\n}";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Xr(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Wr(n.prototype, r);
        }
        if (i) {
          Wr(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.BKk);
      function Qr(t) {
        Qr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Qr(t);
      }
      function Kr(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Zr(r.key), r);
        }
      }
      function Zr(t) {
        var e = function (t, e) {
          if (Qr(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Qr(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Qr(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Jr(t, e, n) {
        e = ti(e);
        return function (t, e) {
          if (e && (Qr(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, $r() ? Reflect.construct(e, n || [], ti(t).constructor) : e.apply(t, n));
      }
      function $r() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return ($r = function () {
          return !!t;
        })();
      }
      function ti(t) {
        ti = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return ti(t);
      }
      function ei(t, e) {
        ei = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return ei(t, e);
      }
      var ni = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Jr(this, e, [n])).fragmentShader = "precision highp float;\n\nuniform float uTime, uOpacity, uBlueHaloIntensity;\nuniform sampler2D tStars, tGrain;\nuniform vec2 uStarsOffset;\n\nvarying vec2 vUv, rUv;\n\nvoid main() {\n\tfloat time = uTime * .001;\n\tvec2 dUv = vUv * vec2(2., 1.);\n\tvec2 starsUv = (dUv) * 30.;\n\tvec3 stars = texture2D(tStars, starsUv).rgb;\n\n\tfloat redFactor = stars.r * (1. - stars.g) * (1. - stars.b) * (cos(time));\n\tfloat greenFactor = stars.g * (1. - stars.r) * (1. - stars.b) * (cos(time + 2.));\n\tfloat blueFactor = stars.b * (1. - stars.r) * (1. - stars.g) * (cos(time + 4.));\n\tfloat whiteFactor = stars.r * stars.g * stars.b;\n\n\n\tvec3 color = vec3(redFactor + greenFactor + blueFactor + whiteFactor);\n\tcolor = max(vec3(0.), color);\n\n\tgl_FragColor = vec4(color, (color.r + color.g + color.b) / 3.) * 2.5;\n\t// gl_FragColor = vec4(fract(vUv), 0., .5);\n}\n";
          t.vertexShader = "attribute vec3 position;\nattribute vec2 uv;\n\nuniform mat4 modelViewMatrix, projectionMatrix;\n\nvarying vec2 vUv, rUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);\n\n}\n";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            ei(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Kr(n.prototype, r);
        }
        if (i) {
          Kr(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function ri(t) {
        ri = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return ri(t);
      }
      function ii(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function oi(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            ii(Object(n), true).forEach(function (e) {
              ai(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            ii(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function ai(t, e, n) {
        if ((e = li(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function si(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, li(r.key), r);
        }
      }
      function li(t) {
        var e = function (t, e) {
          if (ri(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (ri(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (ri(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function ui(t, e, n) {
        e = hi(e);
        return function (t, e) {
          if (e && (ri(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, ci() ? Reflect.construct(e, n || [], hi(t).constructor) : e.apply(t, n));
      }
      function ci() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (ci = function () {
          return !!t;
        })();
      }
      function hi(t) {
        hi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return hi(t);
      }
      function fi(t, e) {
        fi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return fi(t, e);
      }
      function pi(t, e) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.add(t);
      }
      function di(t, e, n) {
        if (typeof t == "function" ? t === e : t.has(e)) {
          if (arguments.length < 3) {
            return e;
          } else {
            return n;
          }
        }
        throw new TypeError("Private element is not present on this object");
      }
      var mi = new WeakSet();
      var gi = function (t) {
        function e(t) {
          var n;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          pi(n = ui(this, e), mi);
          n._sun = t;
          i.z.register(n);
          n.baseConfig = {
            uLightIntensity: {
              value: 2
            },
            uEarthSpecular: {
              value: 0.02
            },
            uSeaSpecular: {
              value: 0.28
            },
            uContrast: {
              value: 0.3
            },
            uSaturation: {
              value: 0.5
            },
            uLuminosity: {
              value: 0.55
            },
            uShininess: {
              value: 50
            },
            uCloudsColorFactor: {
              value: 0.9
            },
            uColorCorrection: {
              value: new o.Q1f("#202050")
            },
            uMinLambertian: {
              value: -0.2
            }
          };
          n.geometry = di(mi, n, vi).call(n);
          n.material = di(mi, n, yi).call(n);
          n.mesh = new o.eaF(n.geometry, n.material);
          n.add(n.mesh);
          var r = ad.core.loader.getTexture("starsBg");
          r.wrapS = r.wrapT = o.GJx;
          n.stars = new o.eaF(new o.Gu$(80, 4, 8), new ni({
            uniforms: {
              uTime: fn.uTime,
              uStarsOffset: {
                value: new o.I9Y(0, 0)
              },
              tGrain: {
                value: ad.tools.noise.texture
              },
              tStars: {
                value: r
              },
              uOpacity: {
                value: 1
              }
            },
            side: 1,
            depthTest: false,
            depthWrite: false,
            blending: o.EZo
          }));
          n.stars.renderOrder = -10;
          n.stars.frustumCulled = false;
          n.mesh.add(n.stars);
          window.earth = n;
          return n;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            fi(t, e);
          }
        })(e, t);
        n = e;
        if (r = [{
          key: "applySunConfig",
          value: function (t) {
            var e = this;
            var n = t.sun;
            var r = t.config;
            var i = r === undefined ? {} : r;
            this._sun = n;
            this.material.uniforms.uSunPosition.value = this._sun.position;
            this.material.uniforms.uSpecularReference.value = this._sun.specularReference;
            this.material.uniforms.uSunColor.value = this._sun.color;
            this.material.uniforms.uSunIntensity = this._sun.intensity;
            this.material.uniforms.uSunReflexionColor.value = this._sun.reflexionColor;
            this.material.uniforms.uSunsetColor.value = this._sun.sunsetColor;
            this.material.uniforms.uSunsetIntensity = this._sun.sunsetIntensity;
            Object.keys(this.baseConfig).forEach(function (t) {
              e.material.uniforms[t].value = i[t] ? i[t].value : e.baseConfig[t].value;
            });
            this.material.needsUpdate = true;
          }
        }]) {
          si(n.prototype, r);
        }
        if (a) {
          si(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(o.B69);
      function vi() {
        return new o.Gu$(15, 32, 64);
      }
      function yi() {
        var t = new Yr({
          uniforms: oi(oi({}, fn), {}, {
            tAlbedo: {
              value: ad.core.loader.getTexture("earthAlbedo")
            },
            tData: {
              value: ad.core.loader.getTexture("earthData")
            },
            tNoise: {
              value: ad.tools.noise.texture
            },
            uSunPosition: {
              value: this._sun.position
            },
            uSpecularReference: {
              value: this._sun.specularReference
            },
            uSunColor: {
              value: this._sun.color
            },
            uSunIntensity: this._sun.intensity,
            uSunReflexionColor: {
              value: this._sun.reflexionColor
            },
            uSunReflexionIntensity: {
              value: 1
            },
            uSunsetColor: {
              value: this._sun.sunsetColor
            },
            uSunsetIntensity: this._sun.sunsetIntensity,
            uViewPos: {
              value: ad.webgl.camera._position
            },
            uLightsColor: {
              value: new o.Q1f(16765316)
            },
            uSeaColor: {
              value: new o.Q1f(201258)
            },
            uSpecularColor: {
              value: new o.Q1f(5395289)
            },
            uInnerSpecColor: {
              value: new o.Q1f(3158064)
            },
            uOuterSpecColor: {
              value: new o.Q1f(3158064)
            },
            uOpacity: {
              value: 1
            },
            uProgress: {
              value: 1
            },
            uProgress2: {
              value: 1
            }
          }, this.baseConfig)
        });
        t.uniforms.tAlbedo.value.wrapS = t.uniforms.tAlbedo.value.wrapT = o.GJx;
        t.uniforms.tData.value.wrapS = t.uniforms.tData.value.wrapT = o.GJx;
        return t;
      }
      function bi(t, e, n = false) {
        e.mapping = n ? o.uV5 : o.wfO;
        var r = new o.BdL(t);
        r.compileEquirectangularShader();
        var i = r.fromEquirectangular(e).texture;
        e.dispose();
        r.dispose();
        return i;
      }
      function _i(t, e, n) {
        var i = new o.ZLX(t.geometry, t.material, e.length);
        i.material.userData = t.material?.userData;
        i.userData = t.userData;
        i.name = "instance-" + t.name;
        e.forEach(function (t, e) {
          t.updateMatrixWorld();
          i.setMatrixAt(e, t.matrixWorld);
          t.traverse(function (t) {
            var e;
            var n;
            var r;
            var i;
            var o;
            var a;
            var s;
            var l;
            var u;
            if (t.material) {
              if ((n = t.material.map) !== null && n !== undefined) {
                n.dispose();
              }
              if ((r = t.material.normalMap) !== null && r !== undefined) {
                r.dispose();
              }
              if ((i = t.material.alphaMap) !== null && i !== undefined) {
                i.dispose();
              }
              if ((o = t.material.aoMap) !== null && o !== undefined) {
                o.dispose();
              }
              if ((a = t.material.specularMap) !== null && a !== undefined) {
                a.dispose();
              }
              if ((s = t.material.metalnessMap) !== null && s !== undefined) {
                s.dispose();
              }
              if ((l = t.material.emissiveMap) !== null && l !== undefined) {
                l.dispose();
              }
              t.material.dispose();
              if (t.material.uniforms) {
                Object.values(t.material.uniforms).forEach(function (t) {
                  var e;
                  if ((e = t.value) !== null && e !== undefined && e.isTexture) {
                    t.value.dispose();
                  }
                });
              }
              if ((u = t.userData) !== null && u !== undefined && u.uniforms) {
                Object.values(t.userData.uniforms).forEach(function (t) {
                  var e;
                  if ((e = t.value) !== null && e !== undefined && e.isTexture) {
                    t.value.dispose();
                  }
                });
              }
            }
            if ((e = t.geometry) !== null && e !== undefined) {
              e.dispose();
            }
          });
          t.removeFromParent();
        });
        n.add(i);
        return i;
      }
      function wi(t) {
        var e;
        var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var r = {};
        t.traverse(function (n) {
          e = n.name.replace(".", "");
          r[e] = [n];
          t.traverse(function (t) {
            if (n.name !== t.name && n.geometry && t.geometry && !t.instanceApplied && !n.instanceApplied && n.parent == t.parent && n.geometry.uuid === t.geometry.uuid) {
              t.instanceApplied = true;
              r[e].push(t);
            }
          });
          if (r[e].length <= 1) {
            delete r[e];
          }
        });
        for (var i in r) {
          var o = t.getObjectByName(i);
          if (o !== undefined) {
            if (n.indexOf(o.name) >= 0) {
              return;
            }
            _i(o, r[i], o.parent);
          }
        }
      }
      function xi(t) {
        xi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return xi(t);
      }
      function Si(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function Ti(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            Si(Object(n), true).forEach(function (e) {
              Mi(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            Si(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function Mi(t, e, n) {
        if ((e = Pi(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Oi(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Pi(r.key), r);
        }
      }
      function Pi(t) {
        var e = function (t, e) {
          if (xi(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (xi(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (xi(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Ei(t, e, n) {
        e = Ai(e);
        return function (t, e) {
          if (e && (xi(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Ci() ? Reflect.construct(e, n || [], Ai(t).constructor) : e.apply(t, n));
      }
      function Ci() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Ci = function () {
          return !!t;
        })();
      }
      function Ai(t) {
        Ai = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Ai(t);
      }
      function Ri(t, e) {
        Ri = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Ri(t, e);
      }
      var Li = function (t) {
        function e() {
          var t;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Ei(this, e)).uniforms = {
            uGlobalOpacity: {
              value: 1
            },
            uDisappearY: {
              value: 1
            },
            isGarbage: {
              value: 0
            },
            uDisappear: {
              value: 0
            },
            uWireframeProgress: {
              value: 0
            },
            uWireframeColor: {
              value: new o.Q1f("#777777")
            },
            tPerlin: {
              value: null
            },
            tNoise: {
              value: null
            },
            uNoiseScaleFactor: {
              value: 1
            },
            uGlobalBgColor: fn.uGlobalBgColor
          };
          t.init();
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Ri(t, e);
          }
        })(e, t);
        n = e;
        r = [{
          key: "init",
          value: function () {
            var t = this;
            this.model = ad.core.loader.getModel("satellite").getObjectByName("garbage");
            this.model.scale.set(1.25, 1.25, 1.25);
            var e = bi(ad.webgl.renderer, ad.core.loader.getTexture("envmap"));
            this.uniforms.tPerlin.value = ad.core.loader.getTexture("perlin");
            this.model.children[0].material.metalness = 0.2;
            this.model.children[0].material.aoMapIntensity = 1;
            this.model.children[0].material.envMap = e;
            this.model.children[0].material.envMapIntensity = 3;
            this.model.children[0].material.normalScale.set(0.2, 0.2);
            this.model.children[0].material.roughnessMap = this.model.children[0].material.normalMap;
            this.model.children[0].material.metalnessMap = this.model.children[0].material.normalMap;
            this.model.children[0].material.normalMapTransform;
            this.model.children[0].material.onBeforeCompile = function (e) {
              e.uniforms = Ti(Ti({}, e.uniforms), t.uniforms);
              e.fragmentShader = e.fragmentShader.replace("#include <clipping_planes_pars_fragment>", "\n\t\t\t#include <clipping_planes_pars_fragment>\n\t\t\t#include <sixty_disappear_pars_fragment>\n\t\t\t");
              e.fragmentShader = e.fragmentShader.replace("#include <dithering_fragment>", "\n\t\t\t#include <dithering_fragment>\n\t\t\t#include <sixty_disappear_fragment>\n\t\t\t");
            };
            wi(this.model);
            this.add(this.model);
            this.traverse(function (t) {
              return t.renderOrder = 5;
            });
          }
        }];
        if (r) {
          Oi(n.prototype, r);
        }
        if (i) {
          Oi(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.B69);
      function Di(t) {
        Di = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Di(t);
      }
      function Ii(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function ji(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            Ii(Object(n), true).forEach(function (e) {
              ki(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            Ii(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function ki(t, e, n) {
        if ((e = zi(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Ni(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, zi(r.key), r);
        }
      }
      function zi(t) {
        var e = function (t, e) {
          if (Di(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Di(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Di(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Ui(t, e, n) {
        e = Bi(e);
        return function (t, e) {
          if (e && (Di(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Fi() ? Reflect.construct(e, n || [], Bi(t).constructor) : e.apply(t, n));
      }
      function Fi() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Fi = function () {
          return !!t;
        })();
      }
      function Bi(t) {
        Bi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Bi(t);
      }
      function Wi(t, e) {
        Wi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Wi(t, e);
      }
      var Hi = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Ui(this, e, [n])).onBeforeCompile = function (t) {
            t.uniforms = ji(ji({}, t.uniforms), r);
            t.fragmentShader = "#define STANDARD\n#ifdef PHYSICAL\n\t#define IOR\n\t#define SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n\tuniform float ior;\n#endif\n#ifdef SPECULAR\n\tuniform float specularIntensity;\nuniform vec3 specularColor;\n#ifdef USE_SPECULARINTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n#endif\n\t#ifdef USE_SPECULARCOLORMAP\n\t\tuniform sampler2D specularColorMap;\n#endif\n#endif\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_IRIDESCENCE\n\tuniform float iridescence;\nuniform float iridescenceIOR;\nuniform float iridescenceThicknessMinimum;\nuniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\nuniform float sheenRoughness;\n#ifdef USE_SHEENCOLORMAP\n\t\tuniform sampler2D sheenColorMap;\n#endif\n\t#ifdef USE_SHEENROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n//#include <uv2_pars_fragment>\nvarying vec2 vUv2;\n//#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <sixty_disappear_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\n//\t#include <map_fragment>\n\tvec4 sampledDiffuseColor = texture2D( map, vUv2 );\n\tsampledDiffuseColor = mix(vec4(1.), sampledDiffuseColor, sampledDiffuseColor.a * step(vUv2.x, 1.) * step(0., vUv2.x) * step(vUv2.y, 1.) * step(0., vUv2.y));\n\tdiffuseColor *= sampledDiffuseColor;\n//\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n//\t#include <aomap_fragment>\n\t#ifdef USE_AOMAP\n\t\tfloat ambientOcclusion = ( texture2D( aoMap, vUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\t#endif\n\t#endif\n//\t#include <aomap_fragment>\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\t#include <transmission_fragment>\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\t#ifdef USE_SHEEN\n\t\tfloat sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n\toutgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;\n\t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\toutgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;\n\t#endif\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\t#include <sixty_disappear_fragment>\n}\n";
            t.vertexShader = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n//#include <uv2_pars_vertex>\nattribute vec2 uv2;\nvarying vec2 vUv2;\nuniform mat3 uv2Transform;\n//#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n//\t#include <uv2_vertex>\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n//\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n\t#endif\n}\n";
          };
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Wi(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Ni(n.prototype, r);
        }
        if (i) {
          Ni(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o._4j);
      function Vi(t) {
        Vi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Vi(t);
      }
      function Gi(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function qi(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            Gi(Object(n), true).forEach(function (e) {
              Xi(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            Gi(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function Xi(t, e, n) {
        if ((e = Qi(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Yi(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Qi(r.key), r);
        }
      }
      function Qi(t) {
        var e = function (t, e) {
          if (Vi(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Vi(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Vi(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Ki(t, e, n) {
        e = Ji(e);
        return function (t, e) {
          if (e && (Vi(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Zi() ? Reflect.construct(e, n || [], Ji(t).constructor) : e.apply(t, n));
      }
      function Zi() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Zi = function () {
          return !!t;
        })();
      }
      function Ji(t) {
        Ji = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Ji(t);
      }
      function $i(t, e) {
        $i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return $i(t, e);
      }
      var to = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Ki(this, e, [n])).uClosing = {
            value: 0
          };
          t.onBeforeCompile = function (e) {
            e.uniforms = qi(qi(qi({}, e.uniforms), r), {}, {
              uClosing: t.uClosing
            });
            e.fragmentShader = "#define STANDARD\n#ifdef PHYSICAL\n    #define IOR\n    #define SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n    uniform float ior;\n#endif\n#ifdef SPECULAR\n    uniform float specularIntensity;\nuniform vec3 specularColor;\n#ifdef USE_SPECULARINTENSITYMAP\n        uniform sampler2D specularIntensityMap;\n#endif\n    #ifdef USE_SPECULARCOLORMAP\n        uniform sampler2D specularColorMap;\n#endif\n#endif\n#ifdef USE_CLEARCOAT\n    uniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_IRIDESCENCE\n    uniform float iridescence;\nuniform float iridescenceIOR;\nuniform float iridescenceThicknessMinimum;\nuniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n    uniform vec3 sheenColor;\nuniform float sheenRoughness;\n#ifdef USE_SHEENCOLORMAP\n        uniform sampler2D sheenColorMap;\n#endif\n    #ifdef USE_SHEENROUGHNESSMAP\n        uniform sampler2D sheenRoughnessMap;\n#endif\n#endif\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n//#include <uv2_pars_fragment>\nvarying vec2 vUv2;\n//#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <sixty_disappear_pars_fragment>\n\nuniform sampler2D uLogoMap;\n\nvoid main() {\n    float isTip = step(vUv2.x, 0.);\n    #include <clipping_planes_fragment>\n    vec4 diffuseColor = vec4(diffuse, opacity);\n    ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n    vec3 totalEmissiveRadiance = emissive;\n    #include <logdepthbuf_fragment>\n//\t#include <map_fragment>\n\n    #ifdef SHOW_LOGO\n        vec4 logo = texture2D(uLogoMap, vUv2);\n        diffuseColor = mix(diffuseColor, logo, logo.a * step(vUv2.x, 1.) * step(vUv2.y, 1.));\n    #endif\n    //\t#include <map_fragment>\n    #include <color_fragment>\n    #include <alphamap_fragment>\n    #include <alphatest_fragment>\n//\t#include <roughnessmap_fragment>\n    float roughnessFactor = texture2D(normalMap, vUv).b;\n//\t#include <roughnessmap_fragment>\n    #include <metalnessmap_fragment>\n    #include <normal_fragment_begin>\n    #include <normal_fragment_maps>\n    #include <clearcoat_normal_fragment_begin>\n    #include <clearcoat_normal_fragment_maps>\n    #include <emissivemap_fragment>\n    #include <lights_physical_fragment>\n    #include <lights_fragment_begin>\n    #include <lights_fragment_maps>\n    #include <lights_fragment_end>\n//\t#include <aomap_fragment>\n    #ifdef USE_AOMAP\n            float ambientOcclusion = ( texture2D( aoMap, vUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n            reflectedLight.indirectDiffuse *= ambientOcclusion;\n        #if defined( USE_ENVMAP ) && defined( STANDARD )\n            float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n            reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n        #endif\n\t#endif\n//\t#include <aomap_fragment>\n    vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n    vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n    #include <transmission_fragment>\n    vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n    #ifdef USE_SHEEN\n        float sheenEnergyComp = 1.0 - 0.157 * max3(material.sheenColor);\n    outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;\n    #endif\n    #ifdef USE_CLEARCOAT\n        float dotNVcc = saturate(dot(geometry.clearcoatNormal, geometry.viewDir));\n    vec3 Fcc = F_Schlick(material.clearcoatF0, material.clearcoatF90, dotNVcc);\n    outgoingLight = outgoingLight * (1.0 - material.clearcoat * Fcc) + clearcoatSpecular * material.clearcoat;\n    #endif\n    #include <output_fragment>\n    #include <tonemapping_fragment>\n    #include <encodings_fragment>\n    #include <fog_fragment>\n    #include <premultiplied_alpha_fragment>\n    #include <dithering_fragment>\n    gl_FragColor.rgb -= isTip * .4;\n    // gl_FragColor.rgb = vec3(sin(vWorldPosition * 100.)) * 10.;\n    #include <sixty_disappear_fragment>\n\n}\n";
            e.vertexShader = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n#endif\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n//#include <uv2_pars_vertex>\nattribute vec2 uv2;\nvarying vec2 vUv2;\nuniform mat3 uv2Transform;\nuniform float uTime;\nuniform float uClosing;\n//#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n//\t#include <uv2_vertex>\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n//\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n//\tfloat start = (sin(instanceMatrix[0].x * 10. + instanceMatrix[0].z * 15.) * .5 + .5) * .5;\n//\ttransformed.y -= (smoothstep(start, start + .5, uClosing) * 1.6 - 1.) * smoothstep(0., 2., position.z);\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";
          };
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            $i(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Yi(n.prototype, r);
        }
        if (i) {
          Yi(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o._4j);
      function eo(t) {
        eo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return eo(t);
      }
      function no(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function ro(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            no(Object(n), true).forEach(function (e) {
              io(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            no(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function io(t, e, n) {
        if ((e = ao(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function oo(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, ao(r.key), r);
        }
      }
      function ao(t) {
        var e = function (t, e) {
          if (eo(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (eo(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (eo(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function so(t, e, n) {
        e = uo(e);
        return function (t, e) {
          if (e && (eo(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, lo() ? Reflect.construct(e, n || [], uo(t).constructor) : e.apply(t, n));
      }
      function lo() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (lo = function () {
          return !!t;
        })();
      }
      function uo(t) {
        uo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return uo(t);
      }
      function co(t, e) {
        co = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return co(t, e);
      }
      var ho = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = so(this, e, [n])).onBeforeCompile = function (t) {
            t.uniforms = ro(ro({}, t.uniforms), r);
            t.fragmentShader = "#define STANDARD\n#ifdef PHYSICAL\n\t#define IOR\n\t#define SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n\tuniform float ior;\n#endif\n#ifdef SPECULAR\n\tuniform float specularIntensity;\nuniform vec3 specularColor;\n#ifdef USE_SPECULARINTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n#endif\n\t#ifdef USE_SPECULARCOLORMAP\n\t\tuniform sampler2D specularColorMap;\n#endif\n#endif\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_IRIDESCENCE\n\tuniform float iridescence;\nuniform float iridescenceIOR;\nuniform float iridescenceThicknessMinimum;\nuniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\nuniform float sheenRoughness;\n#ifdef USE_SHEENCOLORMAP\n\t\tuniform sampler2D sheenColorMap;\n#endif\n\t#ifdef USE_SHEENROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n//#include <uv2_pars_fragment>\nvarying vec2 vUv2;\nvarying vec2 vUv;\n//#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <sixty_disappear_pars_fragment>\nvoid main() {\n    #include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n    vec3 totalEmissiveRadiance = emissive;\n    #include <logdepthbuf_fragment>\n//\t#include <map_fragment>\n\tvec4 sampledDiffuseColor = vec4(1.);\n\tdiffuseColor *= sampledDiffuseColor;\n//\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t//\t#include <aomap_fragment>\n\t#ifdef USE_AOMAP\n\t\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\t#endif\n\t#endif\n//\t#include <aomap_fragment>\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n    vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n    #include <transmission_fragment>\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n    #ifdef USE_SHEEN\n\t\tfloat sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n    outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;\n    #endif\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n    vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n    outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;\n    #endif\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\t#include <sixty_disappear_fragment>\n}\n";
            t.vertexShader = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n//#include <uv2_pars_vertex>\nattribute vec2 uv2;\nvarying vec2 vUv2;\nvarying vec2 vUv;\nuniform mat3 uv2Transform;\n//#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n    #include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n    #include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\tvUv = vUv2;\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n    #endif\n}\n";
          };
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            co(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          oo(n.prototype, r);
        }
        if (i) {
          oo(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o._4j);
      function fo(t) {
        fo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return fo(t);
      }
      function po(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function mo(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            po(Object(n), true).forEach(function (e) {
              go(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            po(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function go(t, e, n) {
        if ((e = yo(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function vo(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, yo(r.key), r);
        }
      }
      function yo(t) {
        var e = function (t, e) {
          if (fo(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (fo(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (fo(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function bo(t, e, n) {
        e = wo(e);
        return function (t, e) {
          if (e && (fo(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, _o() ? Reflect.construct(e, n || [], wo(t).constructor) : e.apply(t, n));
      }
      function _o() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (_o = function () {
          return !!t;
        })();
      }
      function wo(t) {
        wo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return wo(t);
      }
      function xo(t, e) {
        xo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return xo(t, e);
      }
      var So = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = bo(this, e, [n])).onBeforeCompile = function (t) {
            t.uniforms = mo(mo({}, t.uniforms), r);
            t.fragmentShader = "#define STANDARD\n#ifdef PHYSICAL\n    #define IOR\n    #define SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n    uniform float ior;\n#endif\n#ifdef SPECULAR\n    uniform float specularIntensity;\nuniform vec3 specularColor;\n#ifdef USE_SPECULARINTENSITYMAP\n        uniform sampler2D specularIntensityMap;\n#endif\n    #ifdef USE_SPECULARCOLORMAP\n        uniform sampler2D specularColorMap;\n#endif\n#endif\n#ifdef USE_CLEARCOAT\n    uniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_IRIDESCENCE\n    uniform float iridescence;\nuniform float iridescenceIOR;\nuniform float iridescenceThicknessMinimum;\nuniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n    uniform vec3 sheenColor;\nuniform float sheenRoughness;\n#ifdef USE_SHEENCOLORMAP\n        uniform sampler2D sheenColorMap;\n#endif\n    #ifdef USE_SHEENROUGHNESSMAP\n        uniform sampler2D sheenRoughnessMap;\n#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <sixty_disappear_pars_fragment>\n\nuniform sampler2D uLogoMap;\n\nvoid main() {\n    #include <clipping_planes_fragment>\n    vec4 diffuseColor = vec4(diffuse, opacity);\n    ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n    vec3 totalEmissiveRadiance = emissive;\n    #include <logdepthbuf_fragment>\n\t#include <map_fragment>\n    #include <color_fragment>\n    #include <alphamap_fragment>\n    #include <alphatest_fragment>\n    float roughnessFactor = .2;//(1. - texture2D(normalMap, vUv).b) * .2;\n//\t#include <roughnessmap_fragment>\n    #include <metalnessmap_fragment>\n    #include <normal_fragment_begin>\n    #include <normal_fragment_maps>\n    #include <clearcoat_normal_fragment_begin>\n    #include <clearcoat_normal_fragment_maps>\n    #include <emissivemap_fragment>\n    #include <lights_physical_fragment>\n    #include <lights_fragment_begin>\n    geometryNormal *= 5.;\n    geometryNormal += .5;\n    #include <lights_fragment_maps>\n    #include <lights_fragment_end>\n    //\t#include <aomap_fragment>\n    #ifdef USE_AOMAP\n\t\tfloat ambientOcclusion = ( texture2D( aoMap, vUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n    reflectedLight.indirectDiffuse *= ambientOcclusion;\n    #if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n        reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n    #endif\n\t#endif\n//\t#include <aomap_fragment>\n    vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n    vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n    #include <transmission_fragment>\n    vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n    #ifdef USE_SHEEN\n        float sheenEnergyComp = 1.0 - 0.157 * max3(material.sheenColor);\n    outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;\n    #endif\n    #ifdef USE_CLEARCOAT\n        float dotNVcc = saturate(dot(geometry.clearcoatNormal, geometry.viewDir));\n    vec3 Fcc = F_Schlick(material.clearcoatF0, material.clearcoatF90, dotNVcc);\n    outgoingLight = outgoingLight * (1.0 - material.clearcoat * Fcc) + clearcoatSpecular * material.clearcoat;\n    #endif\n\n    outgoingLight += sin((vUv.x * .2 + vUv.y * .2 + (normal.x + normal.y * 10.)) * 1.3) * .06;\n\n    #include <output_fragment>\n    #include <tonemapping_fragment>\n    #include <encodings_fragment>\n    #include <fog_fragment>\n    #include <premultiplied_alpha_fragment>\n    #include <dithering_fragment>\n    #include <sixty_disappear_fragment>\n}\n";
            t.vertexShader = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n//#include <uv2_pars_vertex>\nattribute vec2 uv2;\nvarying vec2 vUv2;\nuniform mat3 uv2Transform;\n//#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n//\t#include <uv2_vertex>\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n//\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n\t#endif\n}\n";
          };
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            xo(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          vo(n.prototype, r);
        }
        if (i) {
          vo(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o._4j);
      function To(t) {
        To = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return To(t);
      }
      function Mo(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Oo(r.key), r);
        }
      }
      function Oo(t) {
        var e = function (t, e) {
          if (To(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (To(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (To(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Po(t, e, n) {
        e = Co(e);
        return function (t, e) {
          if (e && (To(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Eo() ? Reflect.construct(e, n || [], Co(t).constructor) : e.apply(t, n));
      }
      function Eo() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Eo = function () {
          return !!t;
        })();
      }
      function Co(t) {
        Co = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Co(t);
      }
      function Ao(t, e) {
        Ao = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Ao(t, e);
      }
      var Ro = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Po(this, e, [n])).fragmentShader = "precision highp float;\n\nvarying vec2 vUv;\n\nuniform float uTime;\nuniform float uOpacity;\nuniform float uProgress;\nuniform float uLeaveProgress;\n\nuniform sampler2D tPerlin;\n\nvoid main() {\n\tvec2 cUv = vec2(vUv.x, smoothstep(.25, .65, vUv.y));\n\tvec2 nUv = cUv;\n\n\tfloat leaveNoise = texture2D(tPerlin, vUv * .5).r;\n\n\tnUv += (texture2D(tPerlin, cUv + uTime * .003).rg - .5) * .5;\n\n\tfloat perlin = texture2D(tPerlin,  vec2(nUv.x + uTime * .008, nUv.y)).r * texture2D(tPerlin, nUv * .2 - uTime * .007).r;\n\tperlin += .4;\n\n\tfloat alpha = smoothstep(.4, .2, abs(.5 - nUv.y));\n\talpha *= smoothstep(1. * uProgress, .7 * uProgress, distance(nUv, vec2(1., .5)));\n\n\tleaveNoise *= smoothstep(1., .0, vUv.x);\n\n\talpha *= perlin * uProgress * smoothstep(0., 0. + uLeaveProgress, leaveNoise);\n\n\tgl_FragColor = vec4(vec3(1.), alpha * uOpacity);\n}\n";
          t.vertexShader = "precision highp float;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec3 vPosition;\nvarying vec2 vUv;\n\nvoid main(){\n\tvUv = uv;\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Ao(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Mo(n.prototype, r);
        }
        if (i) {
          Mo(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function Lo(t) {
        Lo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Lo(t);
      }
      function Do(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Io(r.key), r);
        }
      }
      function Io(t) {
        var e = function (t, e) {
          if (Lo(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Lo(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Lo(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function jo(t, e, n) {
        e = No(e);
        return function (t, e) {
          if (e && (Lo(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, ko() ? Reflect.construct(e, n || [], No(t).constructor) : e.apply(t, n));
      }
      function ko() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (ko = function () {
          return !!t;
        })();
      }
      function No(t) {
        No = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return No(t);
      }
      function zo(t, e) {
        zo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return zo(t, e);
      }
      var Uo = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = jo(this, e, [n])).fragmentShader = "precision highp float;\n\nvarying vec3 vNormal;\nvarying vec3 vPosition;\nvarying vec2 vUv;\n\n#define PI 3.141592\n\nuniform sampler2D tMap;\n\nuniform vec3 uSunPosition;\nuniform vec3 uSunColor;\nuniform float uOpacity;\n\n\nvoid main() {\n\tgl_FragColor = vec4(texture2D(tMap, vUv).rgb * .3, 1.);\n\tgl_FragColor.rgb *= uOpacity;\n}\n";
          t.vertexShader = "precision highp float;\n\nvarying vec3 vNormal;\nvarying vec3 vPosition;\nvarying vec2 vUv;\n\nuniform float curveIntensity;\n\nvoid main(){\n\tvUv = uv;\n\n\tvec4 vPos4 = modelViewMatrix * vec4(position, 1.0);\n\tvPosition = vec3(vPos4) / vPos4.w;\n\tvNormal = vec3(normalMatrix * normal);\n\n\tgl_Position = projectionMatrix * vPos4;\n}";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            zo(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Do(n.prototype, r);
        }
        if (i) {
          Do(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.BKk);
      function Fo(t) {
        Fo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Fo(t);
      }
      function Bo(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Wo(r.key), r);
        }
      }
      function Wo(t) {
        var e = function (t, e) {
          if (Fo(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Fo(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Fo(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Ho(t, e, n) {
        e = Go(e);
        return function (t, e) {
          if (e && (Fo(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Vo() ? Reflect.construct(e, n || [], Go(t).constructor) : e.apply(t, n));
      }
      function Vo() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Vo = function () {
          return !!t;
        })();
      }
      function Go(t) {
        Go = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Go(t);
      }
      function qo(t, e) {
        qo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return qo(t, e);
      }
      var Xo = function (t) {
        function e(t) {
          var n;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (n = Ho(this, e, [{
            wireframe: true,
            blending: o.EZo,
            uniforms: t
          }])).fragmentShader = "precision highp float;\n\nvarying vec2 vUv;\nvarying vec3 vViewPosition;\n\nuniform float uOpacity;\nuniform float isGarbage;\n\n#include <sixty_disappear_pars_fragment>\n\nvoid main() {\n\tvec4 beforeChunkColor = vec4(mix(vec3(0.), uWireframeColor, uOpacity), 1.);\n\tgl_FragColor = beforeChunkColor;\n\t#include <sixty_disappear_fragment>\n\tgl_FragColor.rgb = vec3(length(gl_FragColor.rgb)) * (.6 - isGarbage * .2);\n\tgl_FragColor = mix(gl_FragColor, beforeChunkColor, isGarbage) * (1. - disappearValue);\n}\n";
          n.vertexShader = "precision highp float;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec3 vPosition;\nvarying vec3 vViewPosition;\nvarying vec2 vUv;\n\nvoid main(){\n\tvUv = uv;\n\n\tvec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n\tvViewPosition = -mvPosition.xyz;\n\tgl_Position = projectionMatrix * mvPosition;\n}\n";
          return n;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            qo(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Bo(n.prototype, r);
        }
        if (i) {
          Bo(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function Yo(t) {
        const e = new Map();
        const n = new Map();
        const r = t.clone();
        Qo(t, r, function (t, r) {
          e.set(r, t);
          n.set(t, r);
        });
        r.traverse(function (t) {
          if (!t.isSkinnedMesh) {
            return;
          }
          const r = t;
          const i = e.get(t);
          const o = i.skeleton.bones;
          r.skeleton = i.skeleton.clone();
          r.bindMatrix.copy(i.bindMatrix);
          r.skeleton.bones = o.map(function (t) {
            return n.get(t);
          });
          r.bind(r.skeleton, r.bindMatrix);
        });
        return r;
      }
      function Qo(t, e, n) {
        n(t, e);
        for (let r = 0; r < t.children.length; r++) {
          Qo(t.children[r], e.children[r], n);
        }
      }
      function Ko(t) {
        Ko = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Ko(t);
      }
      function Zo(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Jo(r.key), r);
        }
      }
      function Jo(t) {
        var e = function (t, e) {
          if (Ko(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Ko(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Ko(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function $o(t, e, n) {
        e = ea(e);
        return function (t, e) {
          if (e && (Ko(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, ta() ? Reflect.construct(e, n || [], ea(t).constructor) : e.apply(t, n));
      }
      function ta() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (ta = function () {
          return !!t;
        })();
      }
      function ea(t) {
        ea = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return ea(t);
      }
      function na(t, e) {
        na = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return na(t, e);
      }
      var ra = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = $o(this, e, [n])).fragmentShader = "precision highp float;\n\nvarying vec2 vUv;\nuniform float uTime;\n\nvoid main() {\n\tfloat d = length(vUv - .5);\n\tfloat t = uTime * .002;\n\tfloat x = smoothstep(.8, 1., abs(cos(t)));\n\n\tfloat alpha = smoothstep(.2, .1, d) * .6;\n\talpha += smoothstep(.5, .0, d);\n\n\tgl_FragColor = vec4(1.0, 0.0, 0.0, alpha * .25 * x);\n}\n";
          t.vertexShader = "precision highp float;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            na(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Zo(n.prototype, r);
        }
        if (i) {
          Zo(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function ia(t) {
        ia = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return ia(t);
      }
      function oa(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function aa(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            oa(Object(n), true).forEach(function (e) {
              sa(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            oa(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function sa(t, e, n) {
        if ((e = ua(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function la(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, ua(r.key), r);
        }
      }
      function ua(t) {
        var e = function (t, e) {
          if (ia(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (ia(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (ia(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function ca(t, e, n) {
        e = fa(e);
        return function (t, e) {
          if (e && (ia(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, ha() ? Reflect.construct(e, n || [], fa(t).constructor) : e.apply(t, n));
      }
      function ha() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (ha = function () {
          return !!t;
        })();
      }
      function fa(t) {
        fa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return fa(t);
      }
      function pa(t, e) {
        pa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return pa(t, e);
      }
      var da = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = ca(this, e, [n])).uClosing = {
            value: 0
          };
          t.onBeforeCompile = function (e) {
            e.defines.SHOW_LOGO = 1;
            e.uniforms = aa(aa(aa({}, e.uniforms), r), {}, {
              uClosing: t.uClosing
            });
            e.fragmentShader = "#define STANDARD\n#ifdef PHYSICAL\n    #define IOR\n    #define SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n    uniform float ior;\n#endif\n#ifdef SPECULAR\n    uniform float specularIntensity;\nuniform vec3 specularColor;\n#ifdef USE_SPECULARINTENSITYMAP\n        uniform sampler2D specularIntensityMap;\n#endif\n    #ifdef USE_SPECULARCOLORMAP\n        uniform sampler2D specularColorMap;\n#endif\n#endif\n#ifdef USE_CLEARCOAT\n    uniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_IRIDESCENCE\n    uniform float iridescence;\nuniform float iridescenceIOR;\nuniform float iridescenceThicknessMinimum;\nuniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n    uniform vec3 sheenColor;\nuniform float sheenRoughness;\n#ifdef USE_SHEENCOLORMAP\n        uniform sampler2D sheenColorMap;\n#endif\n    #ifdef USE_SHEENROUGHNESSMAP\n        uniform sampler2D sheenRoughnessMap;\n#endif\n#endif\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n//#include <uv2_pars_fragment>\nvarying vec2 vUv2;\n//#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <sixty_disappear_pars_fragment>\n\nuniform sampler2D uLogoMap;\n\nvoid main() {\n    float isTip = step(vUv2.x, 0.);\n    #include <clipping_planes_fragment>\n    vec4 diffuseColor = vec4(diffuse, opacity);\n    ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n    vec3 totalEmissiveRadiance = emissive;\n    #include <logdepthbuf_fragment>\n//\t#include <map_fragment>\n\n    #ifdef SHOW_LOGO\n        vec4 logo = texture2D(uLogoMap, vUv2);\n        diffuseColor = mix(diffuseColor, logo, logo.a * step(vUv2.x, 1.) * step(vUv2.y, 1.));\n    #endif\n    //\t#include <map_fragment>\n    #include <color_fragment>\n    #include <alphamap_fragment>\n    #include <alphatest_fragment>\n//\t#include <roughnessmap_fragment>\n    float roughnessFactor = texture2D(normalMap, vUv).b;\n//\t#include <roughnessmap_fragment>\n    #include <metalnessmap_fragment>\n    #include <normal_fragment_begin>\n    #include <normal_fragment_maps>\n    #include <clearcoat_normal_fragment_begin>\n    #include <clearcoat_normal_fragment_maps>\n    #include <emissivemap_fragment>\n    #include <lights_physical_fragment>\n    #include <lights_fragment_begin>\n    #include <lights_fragment_maps>\n    #include <lights_fragment_end>\n//\t#include <aomap_fragment>\n    #ifdef USE_AOMAP\n            float ambientOcclusion = ( texture2D( aoMap, vUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n            reflectedLight.indirectDiffuse *= ambientOcclusion;\n        #if defined( USE_ENVMAP ) && defined( STANDARD )\n            float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n            reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n        #endif\n\t#endif\n//\t#include <aomap_fragment>\n    vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n    vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n    #include <transmission_fragment>\n    vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n    #ifdef USE_SHEEN\n        float sheenEnergyComp = 1.0 - 0.157 * max3(material.sheenColor);\n    outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;\n    #endif\n    #ifdef USE_CLEARCOAT\n        float dotNVcc = saturate(dot(geometry.clearcoatNormal, geometry.viewDir));\n    vec3 Fcc = F_Schlick(material.clearcoatF0, material.clearcoatF90, dotNVcc);\n    outgoingLight = outgoingLight * (1.0 - material.clearcoat * Fcc) + clearcoatSpecular * material.clearcoat;\n    #endif\n    #include <output_fragment>\n    #include <tonemapping_fragment>\n    #include <encodings_fragment>\n    #include <fog_fragment>\n    #include <premultiplied_alpha_fragment>\n    #include <dithering_fragment>\n    gl_FragColor.rgb -= isTip * .4;\n    // gl_FragColor.rgb = vec3(sin(vWorldPosition * 100.)) * 10.;\n    #include <sixty_disappear_fragment>\n\n}\n";
            e.vertexShader = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n#endif\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n//#include <uv2_pars_vertex>\nattribute vec2 uv2;\nvarying vec2 vUv2;\nuniform mat3 uv2Transform;\nuniform float uTime;\nuniform float uClosing;\n//#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n//\t#include <uv2_vertex>\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n//\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n//\tfloat start = (sin(instanceMatrix[0].x * 10. + instanceMatrix[0].z * 15.) * .5 + .5) * .5;\n//\ttransformed.y -= (smoothstep(start, start + .5, uClosing) * 1.6 - 1.) * smoothstep(0., 2., position.z);\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";
          };
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            pa(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          la(n.prototype, r);
        }
        if (i) {
          la(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o._4j);
      function ma(t) {
        ma = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return ma(t);
      }
      function ga(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function va(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            ga(Object(n), true).forEach(function (e) {
              Sa(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            ga(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function ya(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Ta(r.key), r);
        }
      }
      function ba(t, e, n) {
        e = wa(e);
        return function (t, e) {
          if (e && (ma(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, _a() ? Reflect.construct(e, n || [], wa(t).constructor) : e.apply(t, n));
      }
      function _a() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (_a = function () {
          return !!t;
        })();
      }
      function wa(t) {
        wa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return wa(t);
      }
      function xa(t, e) {
        xa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return xa(t, e);
      }
      function Sa(t, e, n) {
        if ((e = Ta(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Ta(t) {
        var e = function (t, e) {
          if (ma(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (ma(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (ma(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      new o.Pq0();
      var Ma = function (t) {
        function e() {
          var t;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Sa(t = ba(this, e), "setWireframe", function (e) {
            t._isWireframe = e;
            t.uniforms.uWireframeProgress.value = e ? 1 : 0;
            t.model.visible = !e;
            t.wireframeModel.visible = e;
          });
          Sa(t, "activateThruster", function (e) {
            var n = xr.Ay.timeline();
            t.thruster.position.copy(t.thursterPos[e].pos);
            t.thruster.setRotationFromQuaternion(t.thursterPos[e].rot);
            n.to(t.thruster.material.uniforms.uProgress, {
              value: 1,
              duration: 0.1
            }, 0);
            n.to(t.thruster.material.uniforms.uLeaveProgress, {
              value: 3,
              duration: 0.45,
              ease: "power2.in"
            }, 0.3);
            n.set(t.thruster.material.uniforms.uProgress, {
              value: 0
            });
            n.set(t.thruster.material.uniforms.uLeaveProgress, {
              value: 0
            });
          });
          Sa(t, "resetAnims", function () {
            xr.Ay.set([t.camParts[0].rotation, t.camParts[1].rotation, t.camParts[2].rotation, t.camParts[4].rotation, t.camParts[5].rotation], {
              x: 0,
              y: 0,
              z: 0
            });
            xr.Ay.set(t.model.rotation, {
              x: 0,
              y: 0,
              z: 0
            });
            xr.Ay.set(t.wireframeModel.rotation, {
              x: 0,
              y: 0,
              z: 0
            });
            xr.Ay.set(t.thruster.material.uniforms.uProgress, {
              value: 0
            });
            xr.Ay.set(t.thruster.material.uniforms.uLeaveProgress, {
              value: 0
            });
          });
          Sa(t, "resetLegAnims", function () {
            t.legs.forEach(function (t) {
              t.bone1.quaternion.copy(t.bone1.baseQuaternion);
              t.bone2.quaternion.copy(t.bone2.baseQuaternion);
              t.bone3.quaternion.copy(t.bone3.baseQuaternion);
            });
          });
          Sa(t, "openLegs", function () {
            t.resetLegAnims();
            t.legs.forEach(function (t, e) {
              t.bone1.rotation.set(0.06, 0.11, 0.07);
              t.bone2.rotation.set(-0.35, 0.16, -0.44);
              t.bone3.rotation.set(-0.02, 0.11, -0.04);
            });
          });
          Sa(t, "createLegTimeline", function () {
            var e;
            if ((e = t.legTimeline) !== null && e !== undefined) {
              e.kill();
            }
            t.legTimeline = xr.Ay.timeline();
            t.legs.forEach(function (e, n) {
              var r = Math.random() * 2;
              t.legTimeline.fromTo(e.bone1.rotation, {
                x: 0.06,
                y: 0.11,
                z: 0.07
              }, {
                x: -0.41,
                y: 0.11,
                z: -0.41,
                duration: 8 - r
              }, r);
              t.legTimeline.fromTo(e.bone2.rotation, {
                x: -0.35,
                y: 0.16,
                z: -0.44
              }, {
                x: -0.98,
                y: 0.16,
                z: -0.7,
                duration: 6 - r
              }, 2 + r);
              t.legTimeline.fromTo(e.bone3.rotation, {
                x: -0.02,
                y: 0.11,
                z: -0.04
              }, {
                x: -0.54,
                y: 0.11,
                z: -0.5,
                duration: 4 - r
              }, 4 + r);
            });
            return t.legTimeline;
          });
          Sa(t, "initLegs", function () {
            var e = t.model.getObjectByName("Armature002");
            e.bone1 = e.getObjectByName("Bone001");
            e.bone2 = e.getObjectByName("Bone002");
            e.bone3 = e.getObjectByName("Bone003");
            e.glow = e.getObjectByName("Glow001");
            t.legs.push(e);
            e.remove(e.glow);
            for (var n = 0; n < 3; n++) {
              var r = Yo(e);
              r.bone1 = r.getObjectByName("Bone001");
              r.bone2 = r.getObjectByName("Bone002");
              r.bone3 = r.getObjectByName("Bone003");
              r.rotateY((n + 1) * Math.PI / 2);
              t.legs.push(r);
              t.model.add(r);
            }
            t.legs.forEach(function (t) {
              t.traverse(function (t) {
                return t.frustumCulled = false;
              });
              t.bone1.baseQuaternion = t.bone1.quaternion.clone();
              t.bone2.baseQuaternion = t.bone2.quaternion.clone();
              t.bone3.baseQuaternion = t.bone3.quaternion.clone();
            });
            t.legs[2].getObjectByName("leg").material = t.legMatLogo;
          });
          Sa(t, "applyShadow", function () {
            t.model.traverse(function (t) {
              t.castShadow = true;
              t.receiveShadow = true;
            });
          });
          Sa(t, "applyCustomChunk", function (e) {
            e.onBeforeCompile = function (e) {
              e.uniforms = va(va({}, e.uniforms), t.uniforms);
              e.fragmentShader = e.fragmentShader.replace("#include <clipping_planes_pars_fragment>", "\n\t\t\t#include <clipping_planes_pars_fragment>\n\t\t\t#include <sixty_disappear_pars_fragment>\n\t\t\t");
              e.fragmentShader = e.fragmentShader.replace("#include <dithering_fragment>", "\n\t\t\t#include <dithering_fragment>\n\t\t\t#include <sixty_disappear_fragment>\n\t\t\t");
            };
          });
          Sa(t, "setGlow", function (e) {
            t.glow.visible = e;
          });
          Sa(t, "initThrusters", function () {
            var e = ad.core.loader.getTexture("perlin");
            e.wrapS = e.wrapT = o.GJx;
            var n = new o.bdM(0.065, 0.04);
            var r = new Ro({
              uniforms: va(va({}, fn), {}, {
                tPerlin: {
                  value: e
                },
                uProgress: {
                  value: 1
                },
                uLeaveProgress: {
                  value: 0
                },
                uOpacity: {
                  value: 1
                }
              }),
              transparent: true
            });
            t.thruster = new o.eaF(n, r);
            t.add(t.thruster);
          });
          Sa(t, "initLightDot", function () {
            var e = t.model.getObjectByName("light-dot");
            t.lightDot = new o.eaF(new o.bdM(0.005, 0.005), new ra({
              uniforms: {
                uTime: fn.uTime
              },
              transparent: true
            }));
            t.lightDot.rotation.setFromQuaternion(e.quaternion);
            t.lightDot.position.copy(e.position);
            t.model.add(t.lightDot);
          });
          Sa(t, "initGlow", function () {
            t.uniforms.tNoise.value = ad.tools.noise.nearestTexture;
            var e = ad.core.loader.getTexture("glow");
            t.glow = new o.eaF(new o.bdM(0.8, 0.8), new Uo({
              uniforms: {
                tMap: {
                  value: e
                },
                uOpacity: {
                  value: 1
                }
              },
              side: 1,
              depthTest: false,
              depthWrite: false,
              blending: o.EZo
            }));
            t.glow.position.z += 0.2;
            t.glow.position.x -= 0.05;
            t.glow.renderOrder = 5;
          });
          i.z.register(t);
          o.vxI.sixty_disappear_pars_fragment = "uniform float uDisappearY;\nuniform float uDisappear;\nuniform float uGlobalOpacity;\nuniform float uWireframeProgress;\nuniform vec3 uWireframeColor;\nuniform vec3 uGlobalBgColor;\nuniform sampler2D tPerlin;\nuniform sampler2D tNoise;\nuniform float uNoiseScaleFactor;\n";
          o.vxI.sixty_disappear_fragment = "vec3 baseColor = gl_FragColor.rgb;\n\nfloat disappearProgressY = smoothstep(uDisappearY - .5, uDisappearY, vViewPosition.y);\nfloat disappearNoise = texture2D(tPerlin, vViewPosition.xy * 6.).r * .5 * (1. - disappearProgressY);\n\nfloat combinedProgressY = mix(disappearProgressY, disappearProgressY + disappearNoise, smoothstep(0., .1, disappearProgressY) * smoothstep(.9, 1., disappearProgressY));\n\nfloat noise = texture2D(tNoise, vec2(vUv.x * .2 * uNoiseScaleFactor, vUv.y * .2 * uNoiseScaleFactor + uDisappear * .01)).r * .9;\nfloat disappearValue = smoothstep(noise, noise + .1, uDisappear * 1.1);\n\ngl_FragColor.rgb = mix(baseColor, uGlobalBgColor, combinedProgressY);\n//gl_FragColor.rgb = mix(gl_FragColor.rgb, uWireframeColor, uWireframeProgress);\ngl_FragColor.rgb = mix(gl_FragColor.rgb, uGlobalBgColor, disappearValue);\ngl_FragColor.rgb = mix(uGlobalBgColor, gl_FragColor.rgb, uGlobalOpacity);\n//gl_FragColor.rgb = uGlobalBgColor;\n";
          t.shadowCaster = ["solarPanelStructure001", "solarPanelStructure002"];
          t.shadowReceiver = ["body", "leg001", "cam0", "cam1", "cam2", "cam3", "cam4", "cam5"];
          t.legs = [];
          t.legTimeline = null;
          t._position = t.position.clone();
          t._rotation = t.rotation.clone();
          t.uniforms = {
            uGlobalOpacity: {
              value: 1
            },
            uDisappearY: {
              value: 1
            },
            uDisappear: {
              value: 0
            },
            uWireframeProgress: {
              value: 0
            },
            uWireframeColor: {
              value: new o.Q1f("#202020")
            },
            tPerlin: {
              value: null
            },
            tNoise: {
              value: null
            },
            uNoiseScaleFactor: {
              value: 1
            },
            isGarbage: {
              value: 0
            },
            uGlobalBgColor: fn.uGlobalBgColor
          };
          t.thursterPos = {
            back: {
              pos: new o.Pq0(-0.1, -0.018, -0.03),
              rot: new o.PTz(1, 0, 0, 0)
            },
            top: {
              pos: new o.Pq0(0.11, 0.028, 0),
              rot: new o.PTz(0, 1, 0, 0)
            }
          };
          t._isWireframe = false;
          t._lightEnabled = false;
          t.init();
          window.satellite = t;
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            xa(t, e);
          }
        })(e, t);
        n = e;
        r = [{
          key: "startTimeline",
          value: function (_param, t = 0) {
            this.cameraTimeline(t);
          }
        }, {
          key: "stopTimeline",
          value: function () {
            this.tl.pause();
          }
        }, {
          key: "cameraTimeline",
          value: function () {
            var t;
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            if ((t = this.tl) !== null && t !== undefined) {
              t.kill();
            }
            this.tl = xr.Ay.timeline();
            this.tl.add("camera", e);
            this.tl.fromTo(this.camParts[0].rotation, {
              z: 0
            }, {
              z: 0.3,
              duration: 4
            }, "camera");
            this.tl.fromTo(this.camParts[2].rotation, {
              x: 0
            }, {
              x: -2,
              duration: 6
            }, "camera");
            this.tl.fromTo(this.camParts[1].rotation, {
              x: 0
            }, {
              x: 1.2,
              duration: 6
            }, "camera+=1");
            this.tl.fromTo(this.camParts[4].rotation, {
              x: 0
            }, {
              x: 0.5,
              duration: 2.5
            }, "camera+=6");
            this.tl.fromTo(this.camParts[5].rotation, {
              z: 0
            }, {
              z: -0.2,
              duration: 2.5
            }, "camera+=6");
            this.tl.call(function () {}, null, 50);
          }
        }, {
          key: "initMaterials",
          value: function () {
            var t = this;
            var e = bi(ad.webgl.renderer, ad.core.loader.getTexture("envmap"));
            var n = ad.core.loader.getTexture("perlin");
            n.wrapS = n.wrapT = o.GJx;
            this.uniforms.tPerlin.value = n;
            this.body = this.model.getObjectByName("body");
            this.bodyInner = this.model.getObjectByName("bodyInt");
            this.leg = this.model.getObjectByName("leg");
            this.camParts = [this.model.getObjectByName("cam0"), this.model.getObjectByName("cam1"), this.model.getObjectByName("cam2"), this.model.getObjectByName("cam3"), this.model.getObjectByName("cam4"), this.model.getObjectByName("cam5")];
            this.solarPanels = [this.model.getObjectByName("solarPanel"), this.model.getObjectByName("solarPanelStructure002")];
            this.thrusterLarge = this.model.getObjectByName("thrusterLarge");
            this.thrustersSmall = this.model.getObjectByName("thrusterTop");
            this.structureLeft = this.model.getObjectByName("solarPanelStructure001");
            this.structureRight = this.model.getObjectByName("solarPanelStructure");
            this.bodyStripe = this.model.getObjectByName("bodyStripe");
            this.structureLeft.rotation.x = Math.PI;
            this.structureRight.rotation.x = Math.PI;
            var r = this.body.material.map;
            r.minFilter = r.magFilter = o.k6q;
            r.generateMipmaps = false;
            var i = this.leg.material.normalMap;
            var a = this.body.material.aoMap;
            var s = this.solarPanels[0].material.map;
            var l = this.solarPanels[0].material.normalMap;
            this.body.material = new Hi({
              map: r,
              envMap: e,
              envMapIntensity: 1,
              aoMap: a,
              metalness: 0.4,
              roughness: 0.1
            }, this.uniforms);
            var u = new to({
              normalMap: i,
              envMap: e,
              envMapIntensity: 1,
              aoMap: a,
              aoMapIntensity: 0.3
            }, va(va({
              uLogoMap: {
                value: r
              },
              uClosing: {
                value: 0
              },
              uTime: fn.uTime
            }, this.uniforms), {}, {
              uNoiseScaleFactor: {
                value: 0.04
              }
            }));
            this.legMatLogo = new da({
              normalMap: i,
              envMap: e,
              envMapIntensity: 1,
              aoMap: a,
              aoMapIntensity: 0.3
            }, va(va({
              uLogoMap: {
                value: r
              },
              uClosing: {
                value: 0
              },
              uTime: fn.uTime
            }, this.uniforms), {}, {
              uNoiseScaleFactor: {
                value: 0.04
              }
            }), true);
            var c = new ho({
              map: null,
              aoMap: a,
              envMap: e,
              envMapIntensity: 1
            }, this.uniforms);
            var h = new So({
              map: s,
              normalMap: l,
              aoMap: a,
              envMap: e,
              envMapIntensity: 5,
              emissiveMap: s,
              emissive: 3158064,
              roughness: 0,
              metalness: 0.5
            }, va(va({}, this.uniforms), {}, {
              uNoiseScaleFactor: {
                value: 0.02
              }
            }));
            this.bodyInner.material.defines.USE_UV = 1;
            this.structureLeft.material.defines.USE_UV = 1;
            this.thrustersSmall.material.defines.USE_UV = 1;
            this.thrusterLarge.material.defines.USE_UV = 1;
            this.applyCustomChunk(this.bodyInner.material);
            this.applyCustomChunk(this.structureLeft.material);
            this.applyCustomChunk(this.thrustersSmall.material);
            this.applyCustomChunk(this.thrusterLarge.material);
            this.structureLeft.material.aoMapIntensity = 0.3;
            this.structureLeft.material.metalness = 0.1;
            this.bodyInner.material.metalness = 1;
            this.bodyInner.material.roughness = 0;
            this.bodyInner.material.envMapIntensity = 0.2;
            this.bodyInner.material.envMap = e;
            this.bodyStripe.material.metalness = 0;
            this.bodyStripe.material.roughness = 0.5;
            this.bodyStripe.material.envMapIntensity = 1;
            this.bodyStripe.material.envMap = e;
            this.thrusterLarge.material.metalness = 0.4;
            this.thrusterLarge.material.roughness = 0.2;
            this.thrustersSmall.material.metalness = 0.4;
            this.thrustersSmall.material.roughness = 0.2;
            this.legMat = u;
            this.leg.material = u;
            this.camParts.forEach(function (t) {
              t.material = c;
            });
            this.solarPanels.forEach(function (t) {
              t.material = h;
            });
            this.wireframeMaterial = new Xo(va(va({}, this.uniforms), {}, {
              uOpacity: {
                value: 1
              }
            }));
            this.wireframeModel.traverse(function (e) {
              if (e.isMesh) {
                e.material = t.wireframeMaterial;
              }
            });
            this.wireframeModel.visible = false;
            this.applyShadow();
            wi(this.model, ["solarPanelStructure"]);
          }
        }, {
          key: "init",
          value: function () {
            var t;
            this.model = ad.core.loader.getModel("satellite").getObjectByName("satellite");
            this.wireframeModel = ad.core.loader.getModel("satelliteLow");
            this.initMaterials();
            this.initLegs();
            this.initThrusters();
            this.initLightDot();
            this.initGlow();
            this.model.scale.set(1.4, 1.4, 1.4);
            this.wireframeModel.scale.set(1.4, 1.4, 1.4);
            this.wireframeModel.position.set(0, 0, 0);
            this.add(this.model, this.wireframeModel);
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "satellite");
            }
            this.renderOrder = 5;
          }
        }];
        if (r) {
          ya(n.prototype, r);
        }
        if (a) {
          ya(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(o.YJl);
      function Oa(t) {
        Oa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Oa(t);
      }
      function Pa(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Ea(r.key), r);
        }
      }
      function Ea(t) {
        var e = function (t, e) {
          if (Oa(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Oa(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Oa(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Ca(t, e, n) {
        e = Ra(e);
        return function (t, e) {
          if (e && (Oa(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Aa() ? Reflect.construct(e, n || [], Ra(t).constructor) : e.apply(t, n));
      }
      function Aa() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Aa = function () {
          return !!t;
        })();
      }
      function Ra(t) {
        Ra = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Ra(t);
      }
      function La(t, e) {
        La = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return La(t, e);
      }
      var Da = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Ca(this, e, [n])).fragmentShader = "precision highp float;\n\nuniform float uTime, uOpacity, uRatio, uBlueHaloIntensity;\nuniform sampler2D tStars, tGrain;\nuniform vec2 uStarsOffset;\n\nvarying vec2 vUv, rUv;\n\nvoid main() {\n\tfloat time = uTime * .001;\n\tvec2 dUv = vUv * vec2(uRatio, 1.);\n\t// vec2 starsUv = (rUv * vec2(uRatio, 1.)) * 3.;\n\t// vec3 stars = texture2D(tStars, starsUv).rgb;\n\n\tfloat grain = length(texture2D(tGrain, fract(dUv * 10.)).rgb);\n\n\t// float redFactor = stars.r * (1. - stars.g) * (1. - stars.b) * (cos(time));\n\t// float greenFactor = stars.g * (1. - stars.r) * (1. - stars.b) * (cos(time + 2.));\n\t// float blueFactor = stars.b * (1. - stars.r) * (1. - stars.g) * (cos(time + 4.));\n\t// float whiteFactor = stars.r * stars.g * stars.b;\n\n\n\t// vec3 color = vec3(redFactor + greenFactor + blueFactor + whiteFactor);\n\t// color = max(vec3(0.), color);\n\tvec3 color = vec3(0.);\n\tcolor.b += (.06 * vUv.x + .02) * uBlueHaloIntensity;\n\n\tgl_FragColor = vec4(vec3((color + grain * .02) * uOpacity), 1.);\n\t// gl_FragColor = vec4(fract(vUv), 0., 1.);\n}\n";
          t.vertexShader = "attribute vec3 position;\nattribute vec2 uv;\n\nuniform mat4 viewMatrix;\n\nvarying vec2 vUv, rUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position * 2., 1.0);\n\n}\n";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            La(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Pa(n.prototype, r);
        }
        if (i) {
          Pa(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function Ia(t) {
        Ia = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Ia(t);
      }
      function ja(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function ka(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            ja(Object(n), true).forEach(function (e) {
              Na(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            ja(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function Na(t, e, n) {
        if ((e = Ua(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function za(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Ua(r.key), r);
        }
      }
      function Ua(t) {
        var e = function (t, e) {
          if (Ia(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Ia(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Ia(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Fa(t, e, n) {
        e = Wa(e);
        return function (t, e) {
          if (e && (Ia(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Ba() ? Reflect.construct(e, n || [], Wa(t).constructor) : e.apply(t, n));
      }
      function Ba() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Ba = function () {
          return !!t;
        })();
      }
      function Wa(t) {
        Wa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Wa(t);
      }
      function Ha(t, e) {
        Ha = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Ha(t, e);
      }
      function Va(t, e) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.add(t);
      }
      function Ga(t, e, n) {
        if (typeof t == "function" ? t === e : t.has(e)) {
          if (arguments.length < 3) {
            return e;
          } else {
            return n;
          }
        }
        throw new TypeError("Private element is not present on this object");
      }
      var qa = new WeakSet();
      var Xa = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var r = n.mainColor;
          var o = r === undefined ? 0 : r;
          var a = n.topHaloColor;
          var s = a === undefined ? 0 : a;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Va(t = Fa(this, e), qa);
          i.z.register(t);
          t.mainColor = o;
          t.topHaloColor = s;
          t.geometry = Ga(qa, t, Ya).call(t);
          t.material = Ga(qa, t, Qa).call(t);
          t.renderOrder = -1000;
          window.sky = t;
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Ha(t, e);
          }
        })(e, t);
        n = e;
        if (r = [{
          key: "uniforms",
          get: function () {
            return this.material.uniforms;
          }
        }]) {
          za(n.prototype, r);
        }
        if (o) {
          za(n, o);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var o;
      }(o.eaF);
      function Ya() {
        return new o.bdM(1, 1);
      }
      function Qa() {
        var t = ad.core.loader.getTexture("starsBg");
        t.wrapS = t.wrapT = o.GJx;
        return new Da({
          uniforms: ka(ka({}, fn), {}, {
            uStarsOffset: {
              value: new o.I9Y(0, 0)
            },
            tGrain: {
              value: ad.tools.noise.texture
            },
            tStars: {
              value: t
            },
            uOpacity: {
              value: 1
            },
            uBlueHaloIntensity: {
              value: 1
            }
          }),
          depthTest: false,
          depthWrite: false
        });
      }
      function Ka(t) {
        Ka = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Ka(t);
      }
      function Za(t) {
        return function (t) {
          if (Array.isArray(t)) {
            return Ja(t);
          }
        }(t) || function (t) {
          if (typeof Symbol != "undefined" && t[Symbol.iterator] != null || t["@@iterator"] != null) {
            return Array.from(t);
          }
        }(t) || function (t, e) {
          if (t) {
            if (typeof t == "string") {
              return Ja(t, e);
            }
            var n = {}.toString.call(t).slice(8, -1);
            if (n === "Object" && t.constructor) {
              n = t.constructor.name;
            }
            if (n === "Map" || n === "Set") {
              return Array.from(t);
            } else if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
              return Ja(t, e);
            } else {
              return undefined;
            }
          }
        }(t) || function () {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
      }
      function Ja(t, e) {
        if (e == null || e > t.length) {
          e = t.length;
        }
        for (var n = 0, r = Array(e); n < e; n++) {
          r[n] = t[n];
        }
        return r;
      }
      function $a(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, is(r.key), r);
        }
      }
      function ts(t, e, n) {
        e = ns(e);
        return function (t, e) {
          if (e && (Ka(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, es() ? Reflect.construct(e, n || [], ns(t).constructor) : e.apply(t, n));
      }
      function es() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (es = function () {
          return !!t;
        })();
      }
      function ns(t) {
        ns = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return ns(t);
      }
      function rs(t, e) {
        rs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return rs(t, e);
      }
      function is(t) {
        var e = function (t, e) {
          if (Ka(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Ka(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Ka(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var os = function (t) {
        function e() {
          var t;
          var n;
          var r;
          var i;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          t = ts(this, e);
          n = t;
          i = function (e) {
            return t.garbages[e];
          };
          if ((r = is(r = "at")) in n) {
            Object.defineProperty(n, r, {
              value: i,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            n[r] = i;
          }
          t.garbages = [];
          t.init();
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            rs(t, e);
          }
        })(e, t);
        n = e;
        if (r = [{
          key: "init",
          value: function () {
            this.model = ad.core.loader.getModel("satellite").getObjectByName("smallGarbage001");
            this.model.material = new Xo({
              uOpacity: {
                value: 0
              },
              uGlobalBgColor: fn.uGlobalBgColor,
              isGarbage: {
                value: 1
              }
            });
            this.garbages.push(this.model);
            this.garbages.push(this.model.clone());
            this.garbages.push(this.model.clone());
            this.garbages.push(this.model.clone());
            this.add.apply(this, Za(this.garbages));
          }
        }]) {
          $a(n.prototype, r);
        }
        if (i) {
          $a(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.B69);
      function as(t) {
        as = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return as(t);
      }
      function ss(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, ls(r.key), r);
        }
      }
      function ls(t) {
        var e = function (t, e) {
          if (as(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (as(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (as(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function us(t, e, n) {
        e = hs(e);
        return function (t, e) {
          if (e && (as(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, cs() ? Reflect.construct(e, n || [], hs(t).constructor) : e.apply(t, n));
      }
      function cs() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (cs = function () {
          return !!t;
        })();
      }
      function hs(t) {
        hs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return hs(t);
      }
      function fs(t, e) {
        fs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return fs(t, e);
      }
      var ps = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = us(this, e, [n])).fragmentShader = "#define PI 3.14159265359\nprecision highp float;\n\nvarying vec2 vUv;\n\nuniform vec3 uInnerColor;\nuniform vec3 uOuterColor;\nuniform float uTime, uProgress, uOpacity;\n\nuniform sampler2D tRays;\n\nfloat pow2(float x) { return x*x; }\nfloat pow3(float x) { return x*x*x; }\nfloat pow4(float x) { return x*x*x*x; }\n\nvoid main() {\n\tvec2 cUv = vUv - .5;\n\tfloat len = length(cUv);\n\n\tfloat theta = uTime * .0001;\n\tvec2 rUv = (vec3(vUv - .5, 0.) * mat3(cos(theta), -sin(theta), 0., sin(theta), cos(theta), 0., 0., 0., .1) + .5).xy;\n\n\ttheta = -uTime * .00012;\n\tvec2 rUv2 = (vec3(vUv - .5, 0.) * mat3(cos(theta), -sin(theta), 0., sin(theta), cos(theta), 0., 0., 0., .1) + .5).xy;\n\n\tfloat rays = texture2D(tRays, (rUv - .5) * 2. + .5).r * texture2D(tRays, (rUv2 - .5) * 2. + .5).r;\n\n\tfloat glow = pow4(smoothstep(.2, 0., len)) * .5 + pow4(smoothstep(.5, 0., len)) * (rays + .5) * .6 + pow3(smoothstep(.5, .0, len)) * .05;\n\tfloat sun = pow2(smoothstep(.05, .01, len)) * 1.4;\n\n\t// glow *= max(0., 1. - sun);\n\n\tvec3 color = (glow + sun) * vec3(.8 + smoothstep(-.2, .5, len), .8, .5);\n\tfloat alpha = 1.;//raysI + sunI;\n\n\tgl_FragColor = vec4(color, alpha) * uOpacity;\n\tgl_FragColor.rgb = min(gl_FragColor.rgb, vec3(1.));\n}\n";
          t.vertexShader = "precision highp float;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main(){\n\tvUv = uv;\n\tmat4 mvMatrix = projectionMatrix * modelViewMatrix;\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            fs(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          ss(n.prototype, r);
        }
        if (i) {
          ss(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function ds(t) {
        ds = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return ds(t);
      }
      function ms(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, gs(r.key), r);
        }
      }
      function gs(t) {
        var e = function (t, e) {
          if (ds(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (ds(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (ds(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function vs(t, e, n) {
        e = bs(e);
        return function (t, e) {
          if (e && (ds(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, ys() ? Reflect.construct(e, n || [], bs(t).constructor) : e.apply(t, n));
      }
      function ys() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (ys = function () {
          return !!t;
        })();
      }
      function bs(t) {
        bs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return bs(t);
      }
      function _s(t, e) {
        _s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return _s(t, e);
      }
      var ws = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = vs(this, e, [n])).fragmentShader = "#define PI 3.14159265359\nprecision highp float;\n\nvarying vec2 vUv;\n\nuniform sampler2D tRays;\n\nuniform float uOpacity;\n\nvoid main() {\n\tvec2 cUv = vUv - .5;\n\tfloat len = length(cUv);\n\n\tfloat raysI = texture2D(tRays, (vUv - .5) * 3. + .5).r * smoothstep(.3, .0, len);\n\tvec3 rays = raysI * vec3(1., smoothstep(.4, 0., len) * .8, .2) * .5;\n\n\tgl_FragColor = vec4(rays, uOpacity);\n}\n";
          t.vertexShader = "precision highp float;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main(){\n\tvUv = uv;\n\tmat4 mvMatrix = projectionMatrix * modelViewMatrix;\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            _s(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          ms(n.prototype, r);
        }
        if (i) {
          ms(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function xs(t) {
        xs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return xs(t);
      }
      function Ss(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function Ts(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            Ss(Object(n), true).forEach(function (e) {
              Ms(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            Ss(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function Ms(t, e, n) {
        if ((e = Ps(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Os(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Ps(r.key), r);
        }
      }
      function Ps(t) {
        var e = function (t, e) {
          if (xs(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (xs(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (xs(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Es(t, e, n) {
        e = As(e);
        return function (t, e) {
          if (e && (xs(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Cs() ? Reflect.construct(e, n || [], As(t).constructor) : e.apply(t, n));
      }
      function Cs() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Cs = function () {
          return !!t;
        })();
      }
      function As(t) {
        As = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return As(t);
      }
      function Rs(t, e) {
        Rs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Rs(t, e);
      }
      var Ls = function (t) {
        function e() {
          var t;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          t = Es(this, e);
          i.z.register(t);
          t.geometry = t.createGeometry();
          t.material = t.createMaterial();
          t.raysMaterial = t.createRaysMaterial();
          t.mesh = new o.eaF(t.geometry, t.material);
          t.rays = new o.eaF(t.geometry, t.raysMaterial);
          t.rays.renderOrder = 0;
          t.add(t.mesh, t.rays);
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Rs(t, e);
          }
        })(e, t);
        n = e;
        if (r = [{
          key: "createGeometry",
          value: function () {
            return new o.bdM(40, 40);
          }
        }, {
          key: "createMaterial",
          value: function () {
            return new ps({
              uniforms: Ts(Ts({}, fn), {}, {
                tRays: {
                  value: ad.core.loader.getTexture("rays")
                },
                uOpacity: {
                  value: 1
                }
              }),
              blending: o.EZo
            });
          }
        }, {
          key: "createRaysMaterial",
          value: function () {
            return new ws({
              uniforms: Ts(Ts({}, fn), {}, {
                tRays: {
                  value: ad.core.loader.getTexture("rays")
                },
                uOpacity: {
                  value: 1
                }
              }),
              blending: o.EZo,
              depthTest: false,
              depthWrite: false
            });
          }
        }, {
          key: "onAttach",
          value: function () {
            var t;
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "SunObject");
            }
          }
        }]) {
          Os(n.prototype, r);
        }
        if (a) {
          Os(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(o.B69);
      function Ds(t) {
        Ds = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Ds(t);
      }
      function Is(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, js(r.key), r);
        }
      }
      function js(t) {
        var e = function (t, e) {
          if (Ds(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Ds(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Ds(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function ks(t, e, n) {
        e = zs(e);
        return function (t, e) {
          if (e && (Ds(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Ns() ? Reflect.construct(e, n || [], zs(t).constructor) : e.apply(t, n));
      }
      function Ns() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Ns = function () {
          return !!t;
        })();
      }
      function zs(t) {
        zs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return zs(t);
      }
      function Us(t, e) {
        Us = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Us(t, e);
      }
      var Fs = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = ks(this, e, [n])).fragmentShader = "precision highp float;\n\nvarying vec2 vUv;\n\nuniform float uOpacity;\nuniform float uOpenProgress;\nuniform float uSunLeaveProgress;\nuniform vec2 uSunLeavePosition;\nuniform vec3 uColor;\n\n#define SUNSET_COLOR vec3(1., .45, .1)\n\nfloat whiteHorizonEase(float x) {\n\treturn x * x * x;\n}\n\nvoid main() {\n\tfloat l = length(vUv - .5);\n\tfloat d = distance(vUv, uSunLeavePosition);\n\tfloat start = .2992;\n\tfloat end = .3012;\n\tvec3 color = uColor;\n\n\tfloat horizon = smoothstep(.305, .3, l) * smoothstep(.29, .3, l);\n\tfloat whiteHorizon = smoothstep(.3025, .3, l) * smoothstep(.29, .3, l);\n\tcolor += whiteHorizonEase(whiteHorizon) * (1. - uSunLeaveProgress) * .5;\n\n\tfloat alpha = smoothstep(start - .1, start, l) * smoothstep(end + .008, end, l);\n\n\tfloat alphaSunsetOffset = smoothstep(uSunLeaveProgress * .5, 0., d) * .05 * horizon + (smoothstep(.01 + uSunLeaveProgress * .1, 0., d) * alpha + .2) * uSunLeaveProgress;\n\n\tcolor += (min(alphaSunsetOffset, .8)) * SUNSET_COLOR * 3.;\n\tcolor += alpha * .1;\n\tcolor += horizon * .7 * uColor;\n\talpha = min(1., alpha);\n\talpha -= smoothstep(.0, .8, uSunLeaveProgress) * smoothstep(.3, .297, l);\n\tgl_FragColor = vec4(color, alpha * uOpacity * uOpenProgress) * (.7 - uSunLeaveProgress * .5);\n}\n";
          t.vertexShader = "precision highp float;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec3 vPosition;\nvarying vec2 vUv;\n\nuniform float curveIntensity;\n\nvoid main(){\n\tvUv = uv;\n\tmat4 mvMatrix = projectionMatrix * modelViewMatrix;\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";
          t.depthTest = false;
          t.depthWrite = false;
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Us(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Is(n.prototype, r);
        }
        if (i) {
          Is(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function Bs(t) {
        Bs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Bs(t);
      }
      function Ws(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function Hs(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            Ws(Object(n), true).forEach(function (e) {
              Vs(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            Ws(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function Vs(t, e, n) {
        if ((e = qs(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Gs(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, qs(r.key), r);
        }
      }
      function qs(t) {
        var e = function (t, e) {
          if (Bs(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Bs(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Bs(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Xs(t, e, n) {
        e = Qs(e);
        return function (t, e) {
          if (e && (Bs(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Ys() ? Reflect.construct(e, n || [], Qs(t).constructor) : e.apply(t, n));
      }
      function Ys() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Ys = function () {
          return !!t;
        })();
      }
      function Qs(t) {
        Qs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Qs(t);
      }
      function Ks(t, e) {
        Ks = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Ks(t, e);
      }
      function Zs(t, e) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.add(t);
      }
      function Js(t, e, n) {
        if (typeof t == "function" ? t === e : t.has(e)) {
          if (arguments.length < 3) {
            return e;
          } else {
            return n;
          }
        }
        throw new TypeError("Private element is not present on this object");
      }
      var $s = new WeakSet();
      var tl = function (t) {
        function e(t) {
          var n;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Zs(n = Xs(this, e), $s);
          n._sun = t;
          i.z.register(n);
          n.geometry = Js($s, n, el).call(n);
          n.material = Js($s, n, nl).call(n);
          n.mesh = new o.eaF(n.geometry, n.material);
          n.mesh.rotation.set(0, 0, -Math.PI * 0.5);
          n.renderOrder = -10;
          n.add(n.mesh);
          return n;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Ks(t, e);
          }
        })(e, t);
        n = e;
        if (r = [{
          key: "onAttach",
          value: function () {
            var t;
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "Atmosphere");
            }
          }
        }]) {
          Gs(n.prototype, r);
        }
        if (a) {
          Gs(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(o.B69);
      function el() {
        return new o.bdM(50, 50);
      }
      function nl() {
        return new Fs({
          uniforms: Hs(Hs({}, fn), {}, {
            uSunLeavePosition: {
              value: new o.I9Y(0.198, 0.5)
            },
            uSunLeaveProgress: {
              value: 0
            },
            uColor: {
              value: new o.Q1f("#1e4585")
            },
            uOpacity: {
              value: 1
            },
            uOpenProgress: {
              value: 1
            }
          }),
          blending: o.EZo,
          side: 0
        });
      }
      function rl(t) {
        rl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return rl(t);
      }
      function il(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, hl(r.key), r);
        }
      }
      function ol(t, e, n) {
        e = ul(e);
        return function (t, e) {
          if (e && (rl(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, al() ? Reflect.construct(e, n || [], ul(t).constructor) : e.apply(t, n));
      }
      function al() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (al = function () {
          return !!t;
        })();
      }
      function sl(t, e, n, r) {
        var i = ll(ul(r & 1 ? t.prototype : t), e, n);
        if (r & 2 && typeof i == "function") {
          return function (t) {
            return i.apply(n, t);
          };
        } else {
          return i;
        }
      }
      function ll() {
        ll = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
          var r = function (t, e) {
            while (!{}.hasOwnProperty.call(t, e) && (t = ul(t)) !== null);
            return t;
          }(t, e);
          if (r) {
            var i = Object.getOwnPropertyDescriptor(r, e);
            if (i.get) {
              return i.get.call(arguments.length < 3 ? t : n);
            } else {
              return i.value;
            }
          }
        };
        return ll.apply(null, arguments);
      }
      function ul(t) {
        ul = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return ul(t);
      }
      function cl(t, e) {
        cl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return cl(t, e);
      }
      function hl(t) {
        var e = function (t, e) {
          if (rl(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (rl(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (rl(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var fl = function (t) {
        function e(t, n) {
          var r;
          var a;
          var s;
          var l;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          r = ol(this, e, [t, n]);
          a = r;
          l = function (t) {
            t.dt;
            var e;
            var n;
            var i = t.et;
            if ((e = r.atmosphere) !== null && e !== undefined) {
              e.lookAt(r.wrapper.position.x, r.wrapper.position.y + 0.4, r.wrapper.position.z + 10);
            }
            if ((n = r.sun) !== null && n !== undefined) {
              n.lookAt(ad.webgl.camera._position);
            }
            if (ad.animation) {
              r.sunConfig.position.set(r.sunPositions.base.x + r.sunPositions.openPosition.x, r.sunPositions.base.y + r.sunPositions.openPosition.y, r.sunPositions.base.z + r.sunPositions.openPosition.z);
              r.cameraPosition.base.set(r.cameraPosition.tlPos.x + r.cameraPosition.idleOffset.x, r.cameraPosition.tlPos.y + r.cameraPosition.idleOffset.y, r.cameraPosition.tlPos.z + r.cameraPosition.idleOffset.z);
              if (r.satellite) {
                r.satellite.position.copy(r.satellite._position);
                r.satellite.rotation.copy(r.satellite._rotation);
                r.satelliteGarbageIdleWrapper.rotation.x = ad.tools.mouse.lerped.y * 0.0012;
                r.satelliteGarbageIdleWrapper.rotation.y = ad.tools.mouse.lerped.x * 0.0012;
                r.satellite.rotateY(ad.tools.mouse.lerped.y * 0.4 + Math.sin(i * 0.0001) * 0.3);
              }
              if (r.earthWrapper) {
                r.earthWrapper.rotation.x = -ad.tools.mouse.lerped.y * 0.1;
                r.earthWrapper.rotation.z = -ad.tools.mouse.lerped.x * 0.1;
              }
            }
          };
          if ((s = hl(s = "tick")) in a) {
            Object.defineProperty(a, s, {
              value: l,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            a[s] = l;
          }
          i.z.register(r);
          r.cameraPosition = {
            base: new o.Pq0(0, 0, 50),
            tlPos: new o.Pq0(0, 0, 50),
            idleOffset: new o.Pq0(0, 0, 0)
          };
          r.wrapper = new o.B69();
          r.planet = new o.B69();
          r.wrapper.position.set(2.8, -15.7, 37);
          r.wrapper.rotation.set(0, 0, -0.8);
          r.earthWrapper = new o.B69();
          r.satelliteLightW = new o.B69();
          r.satelliteLightW.position.set(0.25, -0.14, 48.8);
          r.satelliteWrapper = new o.B69();
          r.satelliteWrapper.rotation.set(0, 3.21, Math.PI * 0.435);
          r.garbageWrapper = new o.B69();
          r.satelliteGarbageWrapper = new o.B69();
          r.satelliteGarbageIdleWrapper = new o.B69();
          r.garbageWrapper.position.z = 48.8;
          r.garbageWrapper.position.set(-0.26, -0.3, 48.89);
          r.garbageWrapper.rotation.set(0.4, 0.2, -0.1);
          r.sunPositions = {
            base: new o.Pq0(15, 90, -200),
            openPosition: new o.Pq0(0, 0, 0)
          };
          r.sunConfig = {
            position: new o.Pq0(15, 90, -200),
            color: new o.Q1f(16251903),
            intensity: {
              value: 2
            },
            reflexionColor: new o.Q1f(16777215),
            sunsetColor: new o.Q1f(16777215),
            sunsetIntensity: {
              value: 0.04
            },
            specularReference: new o.Pq0(0, 10, -32)
          };
          r.cameraZOffset = 0;
          r.startOffset = 0;
          r.endOffset = -0.5;
          window.intro = r;
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            cl(t, e);
          }
        })(e, t);
        n = e;
        r = [{
          key: "setupTimeline",
          value: function () {
            var t = xr.Ay.timeline({
              paused: true
            });
            t.fromTo(this.sun.position, {
              x: 7.9,
              y: 12.1,
              z: -15
            }, {
              x: 16,
              y: -3,
              z: -15,
              duration: 1
            }, 0);
            t.fromTo(ad.webgl.sectionController.skyBackground.material.uniforms.uStarsOffset.value, {
              x: 0,
              y: 0
            }, {
              x: -0.1,
              y: 0.28,
              duration: 1
            }, 0);
            t.fromTo(this.sunPositions.base, {
              x: 15,
              y: 90
            }, {
              x: 22,
              y: -1,
              duration: 1
            }, 0);
            t.fromTo(this.sunConfig.specularReference, {
              x: 0,
              y: 10,
              z: -32
            }, {
              x: 4,
              y: 1,
              z: -32,
              duration: 1
            }, 0);
            t.fromTo(this.wrapper.position, {
              x: 2.8,
              y: -15.7,
              z: 37
            }, {
              x: 1.8,
              y: -15,
              z: 43,
              duration: 1
            }, 0);
            t.fromTo(this.wrapper.rotation, {
              x: 0
            }, {
              x: -0.5,
              duration: 1
            }, 0);
            t.fromTo(this.light.position, {
              y: Math.cos(Math.PI * 0.2) * 6.5,
              z: Math.sin(Math.PI * 0.2) * -6.5
            }, {
              y: Math.cos(Math.PI / 2) * 6.5,
              z: Math.sin(Math.PI / 2) * -6.5,
              duration: 1
            }, 0);
            t.fromTo(this.satellite.uniforms.uDisappearY, {
              value: 1
            }, {
              value: -1,
              duration: 0.3
            }, 0.7);
            t.fromTo(this.garbage.uniforms.uDisappearY, {
              value: 1
            }, {
              value: -1,
              duration: 0.3
            }, 0.7);
            t.fromTo(this.atmosphere.material.uniforms.uSunLeaveProgress, {
              value: 0
            }, {
              value: 1,
              duration: 0.25
            }, 0.7);
            t.fromTo(this.satellite.glow.material.uniforms.uOpacity, {
              value: 1
            }, {
              value: 0,
              duration: 0.18
            }, 0.7);
            t.fromTo(this.satellite.thruster.material.uniforms.uOpacity, {
              value: 1
            }, {
              value: 0,
              duration: 0.15
            }, 0.7);
            t.fromTo(this.sun.raysMaterial.uniforms.uOpacity, {
              value: 1
            }, {
              value: 0,
              duration: 0.06
            }, 0.78);
            t.fromTo(this.sun.raysMaterial.uniforms.uOpacity, {
              value: 0.5
            }, {
              value: 1,
              duration: 0.06
            }, 0.68);
            t.fromTo(this.cameraPosition.tlPos, {
              y: 0,
              z: 50
            }, {
              y: -0.1,
              z: 50.2,
              duration: 1
            }, 0);
            t.fromTo([this.earth.material.uniforms.uSunReflexionIntensity, this.atmosphere.material.uniforms.uOpacity, ad.webgl.sectionController.skyBackground.material.uniforms.uOpacity, this.sun.material.uniforms.uOpacity, this.earth.material.uniforms.uOpacity], {
              value: 1
            }, {
              value: 0,
              duration: 0.15
            }, 0.83);
            t.call(function () {}, null, 1);
            return t;
          }
        }, {
          key: "setupIdleTimeline",
          value: function () {
            var t = this;
            this.idleTimeline = xr.Ay.timeline({
              paused: true
            });
            this.idleTimeline.fromTo(this.cameraPosition.idleOffset, {
              y: 0,
              z: 0
            }, {
              y: -0.48,
              z: 9.600000000000001,
              duration: 450,
              ease: "power2.out"
            }, 0);
            this.idleTimeline.fromTo(this.satelliteGarbageWrapper.position, {
              x: 0
            }, {
              x: ad.tools.viewport.breakpoint === "mobile" ? -1.5 : -2,
              duration: 360,
              ease: "power2.out"
            }, 0);
            this.idleTimeline.fromTo(this.garbageWrapper.position, {
              x: -0.26,
              y: -0.3,
              z: 48.89
            }, {
              x: 0.09,
              y: -0.25,
              z: 48.77,
              duration: 20
            }, 0);
            this.idleTimeline.fromTo(this.garbageWrapper.rotation, {
              y: 0
            }, {
              y: -1.5,
              duration: 20
            }, 0);
            this.idleTimeline.add(this.satellite.createLegTimeline(), 12);
            this.idleTimeline.call(function () {
              return t.satellite.activateThruster("top");
            }, null, 3);
            this.idleTimeline.call(function () {
              return t.satellite.activateThruster("top");
            }, null, 10);
            this.idleTimeline.call(function () {
              return t.satellite.activateThruster("top");
            }, null, 15);
            this.idleTimeline.call(function () {
              return t.satellite.activateThruster("top");
            }, null, 20);
          }
        }, {
          key: "enter",
          value: function (t) {
            var n;
            var r;
            var i = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
            this.setupIdleTimeline();
            ad.webgl.camera.updateFov(30);
            ad.webgl.camera.attachBasePosition(this.cameraPosition.base);
            ad.webgl.sectionController.skyBackground.material.uniforms.uBlueHaloIntensity.value = 1;
            this.satellite._rotation.y = -Math.PI * 0.5;
            this.satellite.setWireframe(false);
            this.cameraPosition.idleOffset.set(0, 0, 0);
            this.earth.applySunConfig({
              sun: this.sunConfig
            });
            this.earthWrapper.add(this.earth);
            this.satelliteWrapper.add(this.satellite);
            this.garbageWrapper.add(this.garbage);
            if ((n = this.satellite) !== null && n !== undefined) {
              n.resetAnims();
            }
            if (ad.animation) {
              if ((r = this.idleTimeline) !== null && r !== undefined) {
                r.play(t < 0 ? 0.6 : 0);
              }
            }
            if (t < 0) {
              this.satellite.uniforms.uDisappearY.value = -1;
            }
            this.satellite.startTimeline(false, 5);
            return sl(e, "enter", this, 3)([t, i]);
          }
        }, {
          key: "leave",
          value: function (t) {
            var n;
            var r;
            var i;
            var o;
            var a = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
            if ((n = this.satellite) !== null && n !== undefined) {
              n.stopTimeline();
            }
            if ((r = this.satellite) !== null && r !== undefined) {
              r.resetLegAnims();
            }
            if ((i = this.satellite) !== null && i !== undefined) {
              i.resetAnims();
            }
            if ((o = this.idleTimeline) !== null && o !== undefined) {
              o.pause();
            }
            this.satellite.rotation.y = 0;
            ad.webgl.sectionController.skyBackground.material.uniforms.uStarsOffset.value.x = 0;
            ad.webgl.sectionController.skyBackground.material.uniforms.uStarsOffset.value.y = 0;
            this.satellite.uniforms.uDisappearY.value = 1;
            this.satellite.legMat.uClosing.value = 0;
            ad.webgl.camera.detachBasePosition();
            return sl(e, "leave", this, 3)([t, a]);
          }
        }, {
          key: "open",
          value: function () {
            var t = xr.Ay.timeline();
            t.fromTo(this.sunPositions.openPosition, {
              x: 7,
              y: -91
            }, {
              x: 0,
              y: 0,
              duration: 4
            }, 1.5);
            t.fromTo(this.atmosphere.material.uniforms.uOpenProgress, {
              value: 0
            }, {
              value: 1,
              duration: 4
            }, 1.5);
          }
        }, {
          key: "onAttach",
          value: function () {
            var t;
            this.earth = ad.webgl.sectionController.earth;
            this.satellite = ad.webgl.sectionController.satellite;
            this.garbage = ad.webgl.sectionController.garbage;
            this.sun = new Ls();
            this.atmosphere = new tl(this.sunConfig);
            this.light = new o.ZyN(16777215, 1.2);
            this.light.position.x = 1;
            this.light.castShadow = true;
            this.light.shadow.mapSize.width = 1024;
            this.light.shadow.mapSize.height = 1024;
            this.light.shadow.bias = -0.01;
            this.light.shadow.camera.near = 5.7;
            this.light.shadow.camera.far = 7;
            this.light.shadow.camera.left = -0.2;
            this.light.shadow.camera.right = 0.35;
            this.light.shadow.camera.top = -0.3;
            this.light.shadow.camera.bottom = 0.3;
            this.light.target = this.satellite;
            this.planet.add(this.earthWrapper, this.atmosphere);
            this.wrapper.add(this.planet);
            this.satelliteLightW.add(this.satelliteWrapper, this.light);
            this.satelliteGarbageIdleWrapper.add(this.satelliteLightW, this.garbageWrapper);
            this.satelliteGarbageWrapper.add(this.satelliteGarbageIdleWrapper);
            this.add(this.wrapper, this.sun, this.satelliteGarbageWrapper);
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "FirstSection");
            }
            sl(e, "onAttach", this, 3)([]);
          }
        }];
        if (r) {
          il(n.prototype, r);
        }
        if (a) {
          il(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(Fr);
      function pl(t) {
        pl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return pl(t);
      }
      function dl(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, xl(r.key), r);
        }
      }
      function ml(t, e, n) {
        e = bl(e);
        return function (t, e) {
          if (e && (pl(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, gl() ? Reflect.construct(e, n || [], bl(t).constructor) : e.apply(t, n));
      }
      function gl() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (gl = function () {
          return !!t;
        })();
      }
      function vl(t, e, n, r) {
        var i = yl(bl(r & 1 ? t.prototype : t), e, n);
        if (r & 2 && typeof i == "function") {
          return function (t) {
            return i.apply(n, t);
          };
        } else {
          return i;
        }
      }
      function yl() {
        yl = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
          var r = function (t, e) {
            while (!{}.hasOwnProperty.call(t, e) && (t = bl(t)) !== null);
            return t;
          }(t, e);
          if (r) {
            var i = Object.getOwnPropertyDescriptor(r, e);
            if (i.get) {
              return i.get.call(arguments.length < 3 ? t : n);
            } else {
              return i.value;
            }
          }
        };
        return yl.apply(null, arguments);
      }
      function bl(t) {
        bl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return bl(t);
      }
      function _l(t, e) {
        _l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return _l(t, e);
      }
      function wl(t, e, n) {
        if ((e = xl(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function xl(t) {
        var e = function (t, e) {
          if (pl(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (pl(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (pl(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var Sl = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          wl(r = ml(this, e, [t, n]), "tick", function (t) {
            var e = t.dt;
            t.et;
            if (ad.animation) {
              r.rotationWrapper.rotation.y = (r.rotationWrapper.rotation.y + e * 0.005) % (Math.PI * 2);
              r.satelliteLightWrapper.position.x += e * 0.08;
              if (r.earthWrapper) {
                r.earthWrapper.rotation.x = ad.tools.mouse.lerped.y * 0.2;
                r.earthWrapper.rotation.y = -ad.tools.mouse.lerped.x * 0.2;
              }
            }
          });
          wl(r, "onResize", function (t) {
            var e = t.ratio;
            r.resizeWrapper.position.z = e * 5.5;
            r.satelliteWrapper.position.z = -e * 2;
          });
          r.rotationWrapper = new o.B69();
          r.earthWrapper = new o.B69();
          r.resizeWrapper = new o.B69();
          r.satelliteWrapper = new o.B69();
          r.satelliteLightWrapper = new o.B69();
          r.satelliteWrapper.rotation.set(-0.1, 3.4, 0.4);
          r.satelliteLightWrapper.position.set(0, 0, 26);
          r.earthWrapper.rotation.set(0.4, -0.2, 1.1);
          r.earthRotationWrapper = new o.B69();
          r.sunConfig = {
            position: new o.Pq0(-24, 61, -4),
            color: new o.Q1f(12175560),
            intensity: {
              value: 2
            },
            reflexionColor: new o.Q1f("#044a6f"),
            sunsetColor: new o.Q1f("#ffeedb"),
            sunsetIntensity: {
              value: 0
            },
            specularReference: new o.Pq0(0, 10, -32)
          };
          r.earthConfig = {
            uEarthSpecular: {
              value: 0
            },
            uSeaSpecular: {
              value: 0
            },
            uMinLambertian: {
              value: 0.08
            }
          };
          r.startOffset = 0.5;
          r.endOffset = -0.5;
          window.topView = r;
          i.z.register(r);
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            _l(t, e);
          }
        })(e, t);
        n = e;
        r = [{
          key: "setupTimeline",
          value: function () {
            var t = xr.Ay.timeline({
              paused: true
            });
            t.fromTo(this.earthRotationWrapper.rotation, {
              x: Math.PI * 0.01
            }, {
              x: 0,
              duration: 0.3,
              ease: "power2.out"
            }, 0);
            t.fromTo(this.earthRotationWrapper.rotation, {
              y: -Math.PI * 0.01
            }, {
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            }, 0);
            t.fromTo(this.satelliteWrapper.position, {
              y: -0.8
            }, {
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            }, 0);
            t.fromTo(this.earth.material.uniforms.uOpacity, {
              value: 0
            }, {
              value: 1,
              duration: 0.1,
              immediateRender: false
            }, 0);
            t.fromTo(this.satellite.uniforms.uGlobalOpacity, {
              value: 0
            }, {
              value: 1,
              duration: 0.1,
              immediateRender: false
            }, 0);
            t.fromTo(this.sunConfig.position, {
              z: -4
            }, {
              z: -30,
              duration: 0.2,
              ease: "power2.inOut"
            }, 0.8);
            t.fromTo(this.earth.material.uniforms.uOpacity, {
              value: 1
            }, {
              value: 0,
              duration: 0.1,
              immediateRender: false
            }, 0.9);
            t.fromTo(this.satellite.uniforms.uGlobalOpacity, {
              value: 1
            }, {
              value: 0,
              duration: 0.2,
              immediateRender: false
            }, 0.8);
            t.fromTo(this.earthWrapper.position, {
              z: 0
            }, {
              z: -1,
              duration: 0.2,
              ease: "power2.inOut"
            }, 0.8);
            t.fromTo(this.earthRotationWrapper.rotation, {
              x: 0
            }, {
              x: -Math.PI * 0.01,
              duration: 0.4,
              ease: "power2.in"
            }, 0.6);
            t.fromTo(this.earthRotationWrapper.rotation, {
              y: 0
            }, {
              y: Math.PI * 0.01,
              duration: 0.4,
              ease: "power2.in"
            }, 0.6);
            t.fromTo(this.satelliteWrapper.position, {
              y: 0
            }, {
              y: 0.8,
              duration: 0.4,
              ease: "power2.in"
            }, 0.6);
            t.call(function () {}, null, 1);
            return t;
          }
        }, {
          key: "enter",
          value: function (t, n = false) {
            ad.webgl.camera.updateFov(18);
            this.satellite.resetLegAnims();
            this.rotationWrapper.rotation.y = 0;
            this.satellite.uniforms.uDisappearY.value = 1;
            this.satelliteLightWrapper.position.x = -2.8;
            this.satellite.setWireframe(false);
            this.earth.applySunConfig({
              sun: this.sunConfig,
              config: this.earthConfig
            });
            this.rotationWrapper.add(this.earth);
            this.earthRotationWrapper.add(this.rotationWrapper);
            this.satelliteWrapper.add(this.satellite);
            return vl(e, "enter", this, 3)([t, n]);
          }
        }, {
          key: "leave",
          value: function (t, n = false) {
            this.satellite.uniforms.uGlobalOpacity.value = 1;
            return vl(e, "leave", this, 3)([t, n]);
          }
        }, {
          key: "open",
          value: function () {
            xr.Ay.timeline();
          }
        }, {
          key: "onAttach",
          value: function () {
            var t;
            this.earth = ad.webgl.sectionController.earth;
            this.satellite = ad.webgl.sectionController.satellite;
            this.light = new o.ZyN(16777215, 0.4);
            this.light.position.set(-1, 0.2, 0.4);
            this.light.target = this.satelliteLightWrapper;
            this.satelliteLightWrapper.add(this.satelliteWrapper, this.light);
            this.earthWrapper.add(this.earthRotationWrapper);
            this.resizeWrapper.add(this.earthWrapper, this.satelliteLightWrapper);
            this.add(this.resizeWrapper);
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "TopView");
            }
            vl(e, "onAttach", this, 3)([]);
          }
        }];
        if (r) {
          dl(n.prototype, r);
        }
        if (a) {
          dl(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(Fr);
      function Tl(t) {
        Tl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Tl(t);
      }
      function Ml(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Ol(r.key), r);
        }
      }
      function Ol(t) {
        var e = function (t, e) {
          if (Tl(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Tl(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Tl(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Pl(t, e, n) {
        e = Cl(e);
        return function (t, e) {
          if (e && (Tl(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, El() ? Reflect.construct(e, n || [], Cl(t).constructor) : e.apply(t, n));
      }
      function El() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (El = function () {
          return !!t;
        })();
      }
      function Cl(t) {
        Cl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Cl(t);
      }
      function Al(t, e) {
        Al = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Al(t, e);
      }
      var Rl = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Pl(this, e, [n])).fragmentShader = "precision highp float;\n\nvarying vec2 vUv;\nvarying vec3 vPosition;\n\nuniform vec3 uHoverColor;\nuniform float uProgressY;\nuniform float uVisibleHeight;\n\nuniform float uOpacity;\n\nvoid main() {\n\tfloat d = abs(vPosition.y - (uProgressY * uVisibleHeight));\n\tvec3 color = mix(uHoverColor, vec3(1.), smoothstep(8., 11.5, d));\n\n\tfloat alpha = mix(.07, .55, smoothstep(12., 0., d));\n\n\tfloat centerOpacity = smoothstep(0.41, .47, vUv.y) * smoothstep(0.59, .53, vUv.y);\n\n\tgl_FragColor = vec4(color, alpha * uOpacity * centerOpacity);\n}\n";
          t.vertexShader = "precision highp float;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 modelMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec3 vPosition;\nvarying vec2 vUv;\n\nuniform float curveIntensity;\n\nvoid main(){\n\tvUv = uv;\n\n\tvPosition = (projectionMatrix * modelViewMatrix * vec4(position, 1.0)).xyz;\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Al(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Ml(n.prototype, r);
        }
        if (i) {
          Ml(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function Ll(t) {
        Ll = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Ll(t);
      }
      function Dl(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Il(r.key), r);
        }
      }
      function Il(t) {
        var e = function (t, e) {
          if (Ll(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Ll(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Ll(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function jl(t, e, n) {
        e = Nl(e);
        return function (t, e) {
          if (e && (Ll(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, kl() ? Reflect.construct(e, n || [], Nl(t).constructor) : e.apply(t, n));
      }
      function kl() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (kl = function () {
          return !!t;
        })();
      }
      function Nl(t) {
        Nl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Nl(t);
      }
      function zl(t, e) {
        zl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return zl(t, e);
      }
      var Ul = function (t) {
        function e() {
          var t;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = jl(this, e)).frameMaterial = t.createMaterial();
          i.z.register(t);
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            zl(t, e);
          }
        })(e, t);
        n = e;
        if (r = [{
          key: "createMaterial",
          value: function () {
            return new Rl({
              uniforms: {
                uHoverColor: {
                  value: new o.Q1f("#DA5635")
                },
                uProgressY: {
                  value: 0
                },
                uOpacity: {
                  value: 1
                },
                uVisibleHeight: {
                  value: 0
                }
              },
              transparent: true
            });
          }
        }, {
          key: "onAttach",
          value: function () {
            this.frame = ad.core.loader.getModel("frame");
            this.frame.rotation.y = -Math.PI / 2;
            this.frame.children[0].material = this.frameMaterial;
            this.add(this.frame);
          }
        }]) {
          Dl(n.prototype, r);
        }
        if (a) {
          Dl(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(o.YJl);
      function Fl(t) {
        Fl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Fl(t);
      }
      function Bl(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Wl(r.key), r);
        }
      }
      function Wl(t) {
        var e = function (t, e) {
          if (Fl(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Fl(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Fl(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Hl(t, e, n) {
        e = Gl(e);
        return function (t, e) {
          if (e && (Fl(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Vl() ? Reflect.construct(e, n || [], Gl(t).constructor) : e.apply(t, n));
      }
      function Vl() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Vl = function () {
          return !!t;
        })();
      }
      function Gl(t) {
        Gl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Gl(t);
      }
      function ql(t, e) {
        ql = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return ql(t, e);
      }
      var Xl = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Hl(this, e, [n])).fragmentShader = "precision highp float;\n\nvarying vec2 vUv;\n\nuniform vec3 uColor;\nuniform float uIntensity;\n\nuniform vec3 uSunPosition;\nuniform vec3 uSunColor;\nuniform vec3 uSunReflexionColor;\nuniform vec3 uSunsetColor;\n\nuniform float uSunIntensity;\nuniform float uSunsetIntensity;\nuniform float uProgress;\n\nfloat pow2(float x) {return x*x;}\n\nvoid main() {\n\tfloat l = length(vUv - .5);\n\n\tfloat unclampedSunIntensity = dot(vec2( vUv.y, 1. - vUv.x) - .5, normalize(uSunPosition.xy)) * 5.;\n\tfloat sunIntensity = max(0., unclampedSunIntensity);\n\tfloat intensity = pow2(smoothstep(.45 + sunIntensity * .05, .33, l) * smoothstep(.25, .33, l)) * uIntensity * .5 * (1. + smoothstep(0., .5, uProgress) * smoothstep(1., .5, uProgress) * 2.) * .2;\n\n\tintensity = smoothstep(.33, .3, l) * smoothstep(.27, .3, l) * uIntensity * .2 * (1. + sunIntensity * .5);\n\tintensity += smoothstep(.32, .3, l) * smoothstep(.25, .3, l) * uIntensity * .6 * (1. + sunIntensity * .5);\n\tvec3 sun = sunIntensity * uSunColor * uSunIntensity * .1;\n\n\tfloat whiteHorizon = smoothstep(.305, .29, l) * smoothstep(.25, .29, l);\n\n\tvec3 color = mix(uColor * sun, vec3(1.), whiteHorizon * whiteHorizon);\n\n\tcolor *= smoothstep(.2, 2., unclampedSunIntensity) * uSunReflexionColor * smoothstep(.5, .31, l) * smoothstep(.0, .31, l) * uSunIntensity * 15.;\n\n\tcolor *= intensity;\n\n\tgl_FragColor = vec4(color, 1.) * uProgress;\n\n//\tgl_FragColor = vec4((intensity), 0., 0, 1.);\n}\n";
          t.vertexShader = "precision highp float;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec3 vPosition;\nvarying vec2 vUv;\n\nuniform float curveIntensity;\n\nvoid main(){\n\tvUv = uv;\n\tmat4 mvMatrix = projectionMatrix * modelViewMatrix;\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            ql(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Bl(n.prototype, r);
        }
        if (i) {
          Bl(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function Yl(t) {
        Yl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Yl(t);
      }
      function Ql(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function Kl(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            Ql(Object(n), true).forEach(function (e) {
              Zl(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            Ql(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function Zl(t, e, n) {
        if ((e = $l(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Jl(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, $l(r.key), r);
        }
      }
      function $l(t) {
        var e = function (t, e) {
          if (Yl(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Yl(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Yl(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function tu(t, e, n) {
        e = nu(e);
        return function (t, e) {
          if (e && (Yl(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, eu() ? Reflect.construct(e, n || [], nu(t).constructor) : e.apply(t, n));
      }
      function eu() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (eu = function () {
          return !!t;
        })();
      }
      function nu(t) {
        nu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return nu(t);
      }
      function ru(t, e) {
        ru = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return ru(t, e);
      }
      function iu(t, e) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.add(t);
      }
      function ou(t, e, n) {
        if (typeof t == "function" ? t === e : t.has(e)) {
          if (arguments.length < 3) {
            return e;
          } else {
            return n;
          }
        }
        throw new TypeError("Private element is not present on this object");
      }
      var au = new WeakSet();
      var su = function (t) {
        function e(t) {
          var n;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          iu(n = tu(this, e), au);
          n._sun = t;
          i.z.register(n);
          n.geometry = ou(au, n, lu).call(n);
          n.material = ou(au, n, uu).call(n);
          n.mesh = new o.eaF(n.geometry, n.material);
          n.mesh.rotation.set(0, 0, -Math.PI * 0.5);
          n.add(n.mesh);
          return n;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            ru(t, e);
          }
        })(e, t);
        n = e;
        if (r = [{
          key: "applySunConfig",
          value: function (t) {
            this._sun = t;
            this.material.uniforms.uSunPosition.value = this._sun.position;
            this.material.uniforms.uSunColor.value = this._sun.color;
            this.material.uniforms.uSunIntensity = this._sun.intensity;
            this.material.uniforms.uSunReflexionColor.value = this._sun.reflexionColor;
            this.material.uniforms.uSunsetColor.value = this._sun.sunsetColor;
            this.material.uniforms.uSunsetIntensity = this._sun.sunsetIntensity;
          }
        }]) {
          Jl(n.prototype, r);
        }
        if (a) {
          Jl(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(o.B69);
      function lu() {
        return new o.bdM(50, 50);
      }
      function uu() {
        return new Xl({
          uniforms: Kl(Kl({}, fn), {}, {
            uSunPosition: {
              value: this._sun.position
            },
            uSunColor: {
              value: this._sun.color
            },
            uSunIntensity: this._sun.intensity,
            uSunReflexionColor: {
              value: this._sun.reflexionColor
            },
            uSunsetColor: {
              value: this._sun.sunsetColor
            },
            uSunsetIntensity: this._sun.sunsetIntensity,
            uColor: {
              value: new o.Q1f(11053311)
            },
            uIntensity: {
              value: 0.04
            },
            uProgress: {
              value: 1
            }
          }),
          blending: o.EZo,
          depthTest: false,
          depthWrite: false,
          side: 0
        });
      }
      function cu(t) {
        cu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return cu(t);
      }
      function hu(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, yu(r.key), r);
        }
      }
      function fu(t, e, n) {
        e = gu(e);
        return function (t, e) {
          if (e && (cu(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, pu() ? Reflect.construct(e, n || [], gu(t).constructor) : e.apply(t, n));
      }
      function pu() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (pu = function () {
          return !!t;
        })();
      }
      function du(t, e, n, r) {
        var i = mu(gu(r & 1 ? t.prototype : t), e, n);
        if (r & 2 && typeof i == "function") {
          return function (t) {
            return i.apply(n, t);
          };
        } else {
          return i;
        }
      }
      function mu() {
        mu = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
          var r = function (t, e) {
            while (!{}.hasOwnProperty.call(t, e) && (t = gu(t)) !== null);
            return t;
          }(t, e);
          if (r) {
            var i = Object.getOwnPropertyDescriptor(r, e);
            if (i.get) {
              return i.get.call(arguments.length < 3 ? t : n);
            } else {
              return i.value;
            }
          }
        };
        return mu.apply(null, arguments);
      }
      function gu(t) {
        gu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return gu(t);
      }
      function vu(t, e) {
        vu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return vu(t, e);
      }
      function yu(t) {
        var e = function (t, e) {
          if (cu(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (cu(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (cu(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var bu = function (t) {
        function e(t, n) {
          var r;
          var a;
          var s;
          var l;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          r = fu(this, e, [t, n]);
          a = r;
          l = function (t) {
            t.dt;
            if (ad.animation) {
              r.earthWrapper.rotation.x = ad.tools.mouse.lerped.y * 0.2;
              r.earthWrapper.rotation.y = -ad.tools.mouse.lerped.x * 0.2;
            }
          };
          if ((s = yu(s = "tick")) in a) {
            Object.defineProperty(a, s, {
              value: l,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            a[s] = l;
          }
          i.z.register(r);
          r.frame = new Ul();
          r.mainWrapper = new o.B69();
          r.frameWrapper = new o.B69();
          r.mainWrapper.position.set(16, 0, 20);
          r.earthRotationWrapper = new o.B69();
          r.earthWrapper = new o.B69();
          r.rotationWrapper = new o.B69();
          r.earthWrapper.add(r.earthRotationWrapper);
          r.rotationWrapper.add(r.earthWrapper);
          r.mainWrapper.add(r.rotationWrapper);
          r.frameWrapper.add(r.frame);
          r.frameWrapper.position.set(-0.8, -13.5, 0);
          r.sunConfig = {
            position: new o.Pq0(-105, 35, -122),
            color: new o.Q1f(16251903),
            intensity: {
              value: 2
            },
            reflexionColor: new o.Q1f(10664410),
            sunsetColor: new o.Q1f(16772827),
            sunsetIntensity: {
              value: 0.04
            },
            specularReference: new o.Pq0(0, 10, -32)
          };
          r.startOffset = 0.5;
          r.endOffset = -0.5;
          window.numbers = r;
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            vu(t, e);
          }
        })(e, t);
        n = e;
        r = [{
          key: "setupTimeline",
          value: function () {
            var t = xr.Ay.timeline({
              paused: true
            });
            t.fromTo([ad.webgl.sectionController.skyBackground.material.uniforms.uOpacity, this.earth.material.uniforms.uOpacity, this.frame.frameMaterial.uniforms.uOpacity], {
              value: 0
            }, {
              value: 1,
              duration: 0.3,
              immediateRender: false
            }, 0);
            t.fromTo([this.atmosphere.material.uniforms.uIntensity], {
              value: 0
            }, {
              value: 0.03,
              duration: 0.1,
              immediateRender: false
            }, 0);
            t.fromTo([this.atmosphere.material.uniforms.uProgress], {
              value: 0
            }, {
              value: 1,
              duration: 0.1,
              immediateRender: false
            }, 0);
            t.fromTo(this.frame.frameMaterial.uniforms.uProgressY, {
              value: -6
            }, {
              value: 6,
              duration: 1
            }, 0);
            t.fromTo(ad.webgl.sectionController.skyBackground.material.uniforms.uStarsOffset.value, {
              x: 0,
              y: 0
            }, {
              x: -0.4,
              y: 0.2,
              duration: 1
            }, 0);
            t.fromTo(this.mainWrapper.position, {
              x: 18
            }, {
              x: 16,
              duration: 0.4,
              ease: "power1.out"
            }, 0);
            t.fromTo(this.mainWrapper.position, {
              y: -5
            }, {
              y: 0,
              duration: 0.6,
              ease: "power1.out"
            }, 0);
            t.fromTo(this.earthWrapper.position, {
              x: 0.2,
              z: 0
            }, {
              x: -0.2,
              z: 3,
              duration: 0.85,
              ease: "power2.in"
            }, 0.15);
            t.fromTo(this.earthRotationWrapper.rotation, {
              y: -0.15,
              x: 0
            }, {
              y: 0.15,
              x: -0.2,
              duration: 1,
              ease: "none"
            }, 0);
            t.fromTo(this.mainWrapper.position, {
              x: 16
            }, {
              x: 8,
              duration: 0.4,
              ease: "power1.in"
            }, 0.6);
            t.fromTo(this.frameWrapper.position, {
              x: -0.8
            }, {
              x: -7,
              duration: 0.4,
              ease: "power1.in"
            }, 0.6);
            t.fromTo(this.sunConfig.position, {
              x: -105,
              y: 35,
              z: -122
            }, {
              x: -45,
              y: 35,
              z: -222,
              duration: 0.1
            }, 0.9);
            t.fromTo([ad.webgl.sectionController.skyBackground.material.uniforms.uOpacity, this.earth.material.uniforms.uOpacity, this.atmosphere.material.uniforms.uProgress, this.frame.frameMaterial.uniforms.uOpacity], {
              value: 1
            }, {
              value: 0,
              duration: 0.15,
              immediateRender: false
            }, 0.85);
            t.call(function () {}, null, 1);
            return t;
          }
        }, {
          key: "onResize",
          value: function () {
            this.frame.frameMaterial.uniforms.uVisibleHeight.value = ad.webgl.camera.getVisibleHeightAtZDepth(0);
          }
        }, {
          key: "enter",
          value: function (t, n = false) {
            ad.webgl.camera.updateFov(18);
            ad.webgl.sectionController.skyBackground.material.uniforms.uBlueHaloIntensity.value = 1;
            if (this.earth) {
              this.earth.applySunConfig({
                sun: this.sunConfig
              });
              this.earthRotationWrapper.add(this.earth);
            }
            return du(e, "enter", this, 3)([t, n]);
          }
        }, {
          key: "leave",
          value: function (t, n = false) {
            return du(e, "leave", this, 3)([t, n]);
          }
        }, {
          key: "open",
          value: function () {
            xr.Ay.timeline();
          }
        }, {
          key: "onAttach",
          value: function () {
            var t;
            this.earth = ad.webgl.sectionController.earth;
            this.atmosphere = new su(this.sunConfig);
            this.earthWrapper.add(this.atmosphere);
            this.add(this.mainWrapper, this.frameWrapper);
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "Numbers");
            }
            du(e, "onAttach", this, 3)([]);
          }
        }];
        if (r) {
          hu(n.prototype, r);
        }
        if (a) {
          hu(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(Fr);
      function _u(t) {
        _u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return _u(t);
      }
      function wu(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Cu(r.key), r);
        }
      }
      function xu(t, e, n) {
        e = Ou(e);
        return function (t, e) {
          if (e && (_u(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Su() ? Reflect.construct(e, n || [], Ou(t).constructor) : e.apply(t, n));
      }
      function Su() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Su = function () {
          return !!t;
        })();
      }
      function Tu(t, e, n, r) {
        var i = Mu(Ou(r & 1 ? t.prototype : t), e, n);
        if (r & 2 && typeof i == "function") {
          return function (t) {
            return i.apply(n, t);
          };
        } else {
          return i;
        }
      }
      function Mu() {
        Mu = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
          var r = function (t, e) {
            while (!{}.hasOwnProperty.call(t, e) && (t = Ou(t)) !== null);
            return t;
          }(t, e);
          if (r) {
            var i = Object.getOwnPropertyDescriptor(r, e);
            if (i.get) {
              return i.get.call(arguments.length < 3 ? t : n);
            } else {
              return i.value;
            }
          }
        };
        return Mu.apply(null, arguments);
      }
      function Ou(t) {
        Ou = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Ou(t);
      }
      function Pu(t, e) {
        Pu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Pu(t, e);
      }
      function Eu(t, e, n) {
        if ((e = Cu(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Cu(t) {
        var e = function (t, e) {
          if (_u(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (_u(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (_u(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var Au = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Eu(r = xu(this, e, [t, n]), "toggleAddGarbages", function (t) {
            r._garbagesToggle = t;
            if (t) {
              r.garbages.garbages.forEach(function (t, e) {
                r.garbagesItems[e].add(t);
              });
            } else {
              r.garbages.garbages.forEach(function (t, e) {
                r.garbagesItems[e].remove(t);
              });
            }
          });
          Eu(r, "tick", function (t) {
            t.dt;
            if (ad.animation) {
              r.rotation.x = ad.tools.mouse.lerped.y * 0.002;
              r.rotation.y = -ad.tools.mouse.lerped.x * 0.002;
              r.rotation.y = -ad.tools.mouse.lerped.x * 0.002;
            }
          });
          i.z.register(r);
          r.mainWrapper = new o.B69();
          r.satelliteWrapper = new o.B69();
          r.satelliteWrapper.position.set(1.5, 0, 45.6);
          r.satelliteWrapper.rotation.set(-0.4, Math.PI * 0.6, -0.2);
          r.mainWrapper.add(r.satelliteWrapper);
          r.garbagesWrapper = new o.B69();
          r.garbagesWrapper.position.z = 47.4;
          r.garbagesItems = [new o.B69(), new o.B69(), new o.B69(), new o.B69()];
          r.cameraPosition = new o.Pq0(0, 0, 50);
          r.satelliteProgressX = {
            value: 0
          };
          r.satelliteProgress = {
            value: 0
          };
          r.garbagesProgress = {
            value: 0
          };
          r.test = 0;
          r.endOffset = 0;
          r.startSatelliteX = 0;
          r._garbagesToggle = false;
          window.wireframe = r;
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Pu(t, e);
          }
        })(e, t);
        n = e;
        r = [{
          key: "setupTimeline",
          value: function () {
            var t = this;
            var e = xr.Ay.timeline({
              paused: true
            });
            e.fromTo(this.satelliteProgressX, {
              value: 0
            }, {
              value: 0,
              duration: 0.1,
              onUpdate: function () {
                t.satelliteWrapper.position.x = t.startSatelliteX;
              }
            }, 0);
            e.fromTo(this.satelliteProgressX, {
              value: 0
            }, {
              value: 1,
              duration: 0.3,
              ease: "power2.out",
              onUpdate: function () {
                t.satelliteWrapper.position.x = t.startSatelliteX + t.satelliteProgressX.value * (0.1 - t.startSatelliteX);
              }
            }, 0.1);
            e.fromTo(this.satelliteWrapper.position, {
              x: 1.5,
              y: 0,
              z: 45.6
            }, {
              x: 0.1,
              y: 0,
              z: 47,
              duration: 0.3,
              ease: "power2.out"
            }, 0.1);
            e.fromTo(this.satelliteWrapper.rotation, {
              y: Math.PI * 0.6
            }, {
              y: Math.PI,
              duration: 0.3,
              ease: "power2.out"
            }, 0.1);
            e.fromTo(this.satellite.uniforms.uDisappear, {
              value: 0
            }, {
              value: 1,
              duration: 0.05
            }, 0.2);
            e.call(function (e) {
              t.satellite.setWireframe(t._dir > 0);
            }, null, 0.25);
            e.fromTo(this.satellite.uniforms.uDisappear, {
              value: 1
            }, {
              value: 0,
              duration: 0.05,
              immediateRender: false
            }, 0.25);
            e.fromTo(this.satelliteWrapper.rotation, {
              x: -0.4,
              z: -0.2
            }, {
              x: -1,
              z: -1,
              duration: 0.76
            }, 0.24);
            e.fromTo(this.satelliteWrapper.rotation, {
              y: Math.PI
            }, {
              y: Math.PI * 2,
              duration: 0.6,
              ease: "power2.inOut"
            }, 0.4);
            e.fromTo(this.cameraPosition, {
              z: 50
            }, {
              z: 51,
              duration: 0.1,
              ease: "sine.inOut"
            }, 0.27);
            e.fromTo(this.cameraPosition, {
              z: 51
            }, {
              z: 50,
              duration: 0.1,
              ease: "sine.inOut",
              immediateRender: false
            }, 0.45);
            e.fromTo(this.satelliteProgress, {
              value: 0
            }, {
              value: 1,
              duration: 0.6,
              ease: "power1.inOut",
              onUpdate: function () {
                t.satelliteWrapper.position.set(0.1 - Math.sin(t.satelliteProgress.value * Math.PI * 2) * 0.05, Math.sin(t.satelliteProgress.value * Math.PI) * -0.5 + t.satelliteProgress.value * 1.1, 47);
                t.garbagesItems[3].position.set(0.14 - Math.sin(t.satelliteProgress.value * Math.PI * 2) * 0.05, Math.sin(t.satelliteProgress.value * Math.PI) * -0.25 - 0.21 - t.satelliteProgress.value * 0.4, 0);
              }
            }, 0.4);
            e.fromTo(this.garbagesProgress, {
              value: 0
            }, {
              value: 1,
              duration: 0.75,
              onUpdate: function () {
                var e = 1 + (t.cameraPosition.z - 50) * 1.5;
                t.garbagesItems[2].position.set(0.33 - Math.cos(-t.garbagesProgress.value * Math.PI * 2 + Math.PI * 1.5) * 0.2 * e, -0.09 - t.garbagesProgress.value * 0.5 * e, t.garbagesProgress.value * 2 - 0.16);
                t.garbagesItems[1].position.set(Math.cos(-t.garbagesProgress.value * Math.PI * 2 + Math.PI / 2) * 0.2 * e - 0.48, 0.79 - Math.cos(t.garbagesProgress.value * Math.PI * 2 + Math.PI / 2) * 0.4 - t.garbagesProgress.value * 0.8 + t.satelliteProgress.value * e, t.garbagesProgress.value * 5 - 6);
                t.garbagesItems[0].position.set(Math.cos(t.garbagesProgress.value * Math.PI * 2) * 0.2 * e - 0.5, 0.11 - Math.cos(t.garbagesProgress.value * Math.PI * 2) * 0.05 - t.garbagesProgress.value * 0.5 + t.satelliteProgress.value * e, -0.6);
              }
            }, 0.25);
            e.call(function () {
              if (t._dir > 0) {
                t.toggleAddGarbages(true);
              } else {
                t.toggleAddGarbages(false);
              }
            }, null, 0.25);
            e.fromTo(this.garbages.model.material.uniforms.uOpacity, {
              value: 0
            }, {
              value: 1,
              duration: 0.1
            }, 0.25);
            e.fromTo(this.garbagesItems[3].position, {
              x: 0.33,
              y: -0.23
            }, {
              x: 0.14,
              y: -0.21,
              duration: 0.17,
              ease: "power2.out"
            }, 0.17);
            e.fromTo(this.garbagesItems[3].rotation, {
              x: 0.5,
              y: 0.4
            }, {
              x: 5,
              y: 7,
              duration: 0.83
            }, 0.17);
            e.fromTo(this.garbagesItems[2].rotation, {
              x: -0.5,
              y: 0.1,
              z: 0
            }, {
              x: -5,
              y: 9,
              z: 2,
              duration: 0.83
            }, 0.17);
            e.fromTo(this.garbagesItems[1].rotation, {
              x: -0.5,
              y: 0.1,
              z: 0
            }, {
              x: -2,
              y: -9,
              z: 6,
              duration: 0.83
            }, 0.17);
            e.fromTo(this.garbagesItems[0].rotation, {
              x: 1,
              y: 0.1,
              z: 1.5
            }, {
              x: -9,
              y: -1,
              z: 7,
              duration: 0.83
            }, 0.17);
            e.fromTo(this.garbages.model.material.uniforms.uOpacity, {
              value: 1
            }, {
              value: 0,
              duration: 0.1,
              immediateRender: false
            }, 0.9);
            e.call(function () {}, null, 1);
            return e;
          }
        }, {
          key: "onResize",
          value: function () {
            var t = Math.abs(Math.tan(o.cj9.degToRad(18) / 2) * 4.399999999999999) * 2 * ad.tools.viewport.ratio;
            var e = new o.NRn().setFromObject(this.satelliteWrapper).getSize(new o.Pq0());
            this.startSatelliteX = t / 2 + e.x / 2 + 0.5;
          }
        }, {
          key: "enter",
          value: function (t, n = false) {
            ad.webgl.camera.updateFov(18);
            ad.webgl.camera.attachBasePosition(this.cameraPosition);
            this.onResize();
            this.satellite.resetLegAnims();
            this.satellite.wireframeMaterial.uniforms.uOpacity.value = 1;
            this.garbages.model.material.uniforms.uOpacity.value = this._garbagesToggle ? 1 : 0;
            this.satellite.uniforms.uGlobalOpacity.value = 1;
            this.satellite.uniforms.uDisappearY.value = 1;
            this.satelliteWrapper.add(this.satellite);
            if (n) {
              this.toggleAddGarbages(true);
            }
            if (t < 0) {
              this.satellite.setWireframe(true);
              this.toggleAddGarbages(true);
            }
            this.satellite.setGlow(false);
            return Tu(e, "enter", this, 3)([t, n]);
          }
        }, {
          key: "leave",
          value: function (t, n = false) {
            ad.webgl.camera.detachBasePosition();
            this.satellite.setGlow(true);
            this.satellite.setWireframe(false);
            return Tu(e, "leave", this, 3)([t, n]);
          }
        }, {
          key: "open",
          value: function () {
            xr.Ay.timeline();
          }
        }, {
          key: "onAttach",
          value: function () {
            var t;
            var n = this;
            this.garbages = ad.webgl.sectionController.garbages;
            this.satellite = ad.webgl.sectionController.satellite;
            this.garbagesItems.forEach(function (t) {
              n.garbagesWrapper.add(t);
            });
            this.add(this.mainWrapper, this.garbagesWrapper);
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "Wireframe");
            }
            Tu(e, "onAttach", this, 3)([]);
          }
        }];
        if (r) {
          wu(n.prototype, r);
        }
        if (a) {
          wu(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(Fr);
      function Ru(t) {
        Ru = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Ru(t);
      }
      function Lu(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Du(r.key), r);
        }
      }
      function Du(t) {
        var e = function (t, e) {
          if (Ru(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Ru(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Ru(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Iu(t, e, n) {
        e = ku(e);
        return function (t, e) {
          if (e && (Ru(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, ju() ? Reflect.construct(e, n || [], ku(t).constructor) : e.apply(t, n));
      }
      function ju() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (ju = function () {
          return !!t;
        })();
      }
      function ku(t) {
        ku = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return ku(t);
      }
      function Nu(t, e) {
        Nu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Nu(t, e);
      }
      var zu = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Iu(this, e, [n])).fragmentShader = "precision highp float;\n\nuniform float uFade1;\nuniform float uFade2;\n\nvarying float vOpacity;\nvarying float vSeed;\n\nvoid main() {\n\tfloat smoothCircle = smoothstep(.5 * vOpacity, .2 * vOpacity, length(gl_PointCoord - .5));\n\n\tvec3 color = vec3(1.);\n\n\tfloat randomFade = smoothstep(0., vSeed, uFade1 * uFade2);\n\n\t// gl_FragColor = vec4(color, 1.);\n\tgl_FragColor = vec4(color, randomFade * smoothCircle * vOpacity);\n}\n";
          t.vertexShader = "#define PI 3.14159265359\n\nattribute vec3 position;\nattribute float aSize;\nattribute float aOpacity;\nattribute float aSeed;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nuniform vec2 uViewSize;\nuniform float uOffsetY;\nuniform float uScrollHeight;\nuniform float uProgressY;\nuniform float uRotationAngle;\n\nvarying float vOpacity;\nvarying float vSeed;\n\nvec2 rotation2d(vec2 position, float angle, vec2 center) {\n  vec2 u = position - center;\n  vec2 v;\n  v.x = u.x * cos(angle) - u.y * sin(angle);\n  v.y = u.x * sin(angle) + u.y * cos(angle);\n  return v + center;\n}\n\nvoid main() {\n  vec3 pos = position;\n\n  pos.xy *= uViewSize.xy * .5;\n  pos.y += (uProgressY * uScrollHeight + uOffsetY) * max(aSeed, .8);\n\n  pos.xy = (fract(pos.xy / uViewSize) - .5) * uViewSize * (1. - sin(uRotationAngle));\n  pos.xy = rotation2d(pos.xy, uRotationAngle * max(aSeed, .8), vec2(0.));\n\n  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);\n\n  gl_PointSize = aSize * (300.0 / length(mvPosition));\n  gl_Position = projectionMatrix * mvPosition;\n\n  vOpacity = aOpacity;\n  vSeed = aSeed;\n}\n";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Nu(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Lu(n.prototype, r);
        }
        if (i) {
          Lu(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function Uu(t) {
        Uu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Uu(t);
      }
      function Fu(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function Bu(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            Fu(Object(n), true).forEach(function (e) {
              Wu(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            Fu(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function Wu(t, e, n) {
        if ((e = qu(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Hu(t) {
        return function (t) {
          if (Array.isArray(t)) {
            return Vu(t);
          }
        }(t) || function (t) {
          if (typeof Symbol != "undefined" && t[Symbol.iterator] != null || t["@@iterator"] != null) {
            return Array.from(t);
          }
        }(t) || function (t, e) {
          if (t) {
            if (typeof t == "string") {
              return Vu(t, e);
            }
            var n = {}.toString.call(t).slice(8, -1);
            if (n === "Object" && t.constructor) {
              n = t.constructor.name;
            }
            if (n === "Map" || n === "Set") {
              return Array.from(t);
            } else if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
              return Vu(t, e);
            } else {
              return undefined;
            }
          }
        }(t) || function () {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
      }
      function Vu(t, e) {
        if (e == null || e > t.length) {
          e = t.length;
        }
        for (var n = 0, r = Array(e); n < e; n++) {
          r[n] = t[n];
        }
        return r;
      }
      function Gu(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, qu(r.key), r);
        }
      }
      function qu(t) {
        var e = function (t, e) {
          if (Uu(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Uu(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Uu(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Xu(t, e, n) {
        e = Qu(e);
        return function (t, e) {
          if (e && (Uu(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Yu() ? Reflect.construct(e, n || [], Qu(t).constructor) : e.apply(t, n));
      }
      function Yu() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Yu = function () {
          return !!t;
        })();
      }
      function Qu(t) {
        Qu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Qu(t);
      }
      function Ku(t, e) {
        Ku = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Ku(t, e);
      }
      function Zu(t, e) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.add(t);
      }
      function Ju(t, e, n) {
        if (typeof t == "function" ? t === e : t.has(e)) {
          if (arguments.length < 3) {
            return e;
          } else {
            return n;
          }
        }
        throw new TypeError("Private element is not present on this object");
      }
      var $u = new WeakSet();
      var tc = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var r = n.count;
          var o = r === undefined ? 1000 : r;
          var a = n.sizeRange;
          var s = a === undefined ? [0.5, 1] : a;
          var l = n.opacityRange;
          var u = l === undefined ? [0.5, 1] : l;
          var c = n.uniforms;
          var h = c === undefined ? {} : c;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Zu(t = Xu(this, e), $u);
          i.z.register(t);
          t.count = o;
          t.sizeRange = s;
          t.opacityRange = u;
          t.frustumCulled = false;
          t.geometry = Ju($u, t, ec).call(t);
          t.material = Ju($u, t, nc).call(t, {
            uniforms: h
          });
          t.renderOrder = -1;
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Ku(t, e);
          }
        })(e, t);
        n = e;
        if (r = [{
          key: "uniforms",
          get: function () {
            return this.material.uniforms;
          }
        }]) {
          Gu(n.prototype, r);
        }
        if (o) {
          Gu(n, o);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var o;
      }(o.ONl);
      function ec() {
        var t = new o.LoY();
        var e = [];
        for (var n = 0; n < this.count * 6; n += 6) {
          e[n + 0] = Er(2);
          e[n + 1] = Er(2);
          e[n + 2] = 0;
          e[n + 3] = Pr.apply(undefined, Hu(this.sizeRange));
          e[n + 4] = Pr.apply(undefined, Hu(this.opacityRange));
          e[n + 5] = Cr(n);
        }
        var r = new o.eB$(new Float32Array(e), 6);
        t.setAttribute("position", new o.eHs(r, 3, 0));
        t.setAttribute("aSize", new o.eHs(r, 1, 3));
        t.setAttribute("aOpacity", new o.eHs(r, 1, 4));
        t.setAttribute("aSeed", new o.eHs(r, 1, 5));
        return t;
      }
      function nc(t) {
        var e = t.uniforms;
        return new zu({
          uniforms: Bu(Bu({}, fn), {}, {
            uFade1: {
              value: 0
            },
            uFade2: {
              value: 0
            },
            uViewSize: fn.uCameraView,
            uProgressY: {
              value: 0
            },
            uRotationAngle: {
              value: 0
            },
            uOffsetY: {
              value: 0
            },
            uScrollHeight: {
              value: 0
            }
          }, e),
          depthTest: false,
          depthWrite: false,
          blending: o.bCz,
          blendSrc: o.ie2,
          blendDst: o.hdd
        });
      }
      function rc(t) {
        rc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return rc(t);
      }
      function ic(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, oc(r.key), r);
        }
      }
      function oc(t) {
        var e = function (t, e) {
          if (rc(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (rc(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (rc(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function ac(t, e, n) {
        e = lc(e);
        return function (t, e) {
          if (e && (rc(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, sc() ? Reflect.construct(e, n || [], lc(t).constructor) : e.apply(t, n));
      }
      function sc() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (sc = function () {
          return !!t;
        })();
      }
      function lc(t) {
        lc = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return lc(t);
      }
      function uc(t, e) {
        uc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return uc(t, e);
      }
      var cc = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = ac(this, e, [n])).fragmentShader = "precision highp float;\n\nuniform float uProgress;\nuniform float uFade;\nuniform float uFadeY;\nuniform float uTime;\n\nvarying vec2 vUv;\nvarying float vSeed;\nvarying float vProgressOffset;\nvarying vec3 vPosition;\n\n#define STAR_WIDTH .1\n\nvoid main() {\n\tfloat t = uTime * .0001 * max(abs(vSeed), .2);\n\n\tvec3 color = vec3(1.);\n\n\tfloat randomStarProgress = smoothstep(0., .5, fract((t - vProgressOffset + uProgress * .4)));\n\n\tfloat starProgress = smoothstep(.0, .1, randomStarProgress) * smoothstep(.9, .8, randomStarProgress);\n\tfloat star = smoothstep(randomStarProgress, .1 + randomStarProgress, vUv.x) * smoothstep(randomStarProgress + STAR_WIDTH, randomStarProgress - .01 + STAR_WIDTH, vUv.x) * smoothstep(.3, .5, vUv.y) * smoothstep(.7, .5, vUv.y) * .7 * starProgress * 2.;\n\n\tfloat glowProgress = smoothstep(0., .1, randomStarProgress) * smoothstep(.9, .8, randomStarProgress);\n\n\tfloat glow = smoothstep(randomStarProgress - .5, randomStarProgress, vUv.x) * smoothstep(randomStarProgress + STAR_WIDTH + .005, randomStarProgress + STAR_WIDTH - .005, vUv.x) * glowProgress * 2.;\n\tglow *= smoothstep(0. + (1. - vUv.x) * .5, 1., vUv.y) * smoothstep(1. - (1. - vUv.x) * .5, 0., vUv.y);\n\n\tfloat randomFade = smoothstep(0., 1. * vSeed, uFade);\n\tfloat sideFade = smoothstep(0., .1, vUv.x) * smoothstep(1., .98, vUv.x);\n\n\tfloat alpha = (star + glow) * randomFade * sideFade;\n\n\talpha *= step(uFadeY, vPosition.y);\n\n\t// gl_FragColor = vec4(color, 1.);\n\tgl_FragColor = vec4(color, alpha) * .6;\n}\n";
          t.vertexShader = "#define PI 3.14159265359\n\nattribute vec3 position;\nattribute vec2 uv;\n\nattribute float aSeed;\nattribute float aProgressOffset;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 modelMatrix;\n\nuniform vec2 uCameraView;\nuniform float uRotationAngle;\n\nvarying vec2 vUv;\nvarying float vSeed;\nvarying float vProgressOffset;\nvarying vec3 vPosition;\n\nmat2 rotation2d(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n\n  return mat2(c, -s, s, c);\n}\n\nvoid main() {\n  vec3 pos = position;\n\n  pos.x *= uCameraView.x;\n\n  pos.y += uCameraView.y * .5 * sin(aSeed * 124.5 * cos(aSeed * 457.5));\n  pos.xy *= rotation2d(aSeed * PI + uRotationAngle * max(aSeed, .8));\n\n  vPosition = (modelMatrix * vec4(pos, 1.0)).xyz;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n\n  vUv = uv;\n  vSeed = aSeed;\n  vProgressOffset = aProgressOffset;\n}\n";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            uc(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          ic(n.prototype, r);
        }
        if (i) {
          ic(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function hc(t) {
        hc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return hc(t);
      }
      function fc(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function pc(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            fc(Object(n), true).forEach(function (e) {
              dc(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            fc(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function dc(t, e, n) {
        if ((e = yc(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function mc(t, e) {
        return function (t) {
          if (Array.isArray(t)) {
            return t;
          }
        }(t) || function (t, e) {
          var n = t == null ? null : typeof Symbol != "undefined" && t[Symbol.iterator] || t["@@iterator"];
          if (n != null) {
            var r;
            var i;
            var o;
            var a;
            var s = [];
            var l = true;
            var u = false;
            try {
              o = (n = n.call(t)).next;
              if (e === 0) {
                if (Object(n) !== n) {
                  return;
                }
                l = false;
              } else {
                for (; !(l = (r = o.call(n)).done) && (s.push(r.value), s.length !== e); l = true);
              }
            } catch (t) {
              u = true;
              i = t;
            } finally {
              try {
                if (!l && n.return != null && (a = n.return(), Object(a) !== a)) {
                  return;
                }
              } finally {
                if (u) {
                  throw i;
                }
              }
            }
            return s;
          }
        }(t, e) || function (t, e) {
          if (t) {
            if (typeof t == "string") {
              return gc(t, e);
            }
            var n = {}.toString.call(t).slice(8, -1);
            if (n === "Object" && t.constructor) {
              n = t.constructor.name;
            }
            if (n === "Map" || n === "Set") {
              return Array.from(t);
            } else if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
              return gc(t, e);
            } else {
              return undefined;
            }
          }
        }(t, e) || function () {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
      }
      function gc(t, e) {
        if (e == null || e > t.length) {
          e = t.length;
        }
        for (var n = 0, r = Array(e); n < e; n++) {
          r[n] = t[n];
        }
        return r;
      }
      function vc(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, yc(r.key), r);
        }
      }
      function yc(t) {
        var e = function (t, e) {
          if (hc(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (hc(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (hc(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function bc(t, e, n) {
        e = wc(e);
        return function (t, e) {
          if (e && (hc(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, _c() ? Reflect.construct(e, n || [], wc(t).constructor) : e.apply(t, n));
      }
      function _c() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (_c = function () {
          return !!t;
        })();
      }
      function wc(t) {
        wc = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return wc(t);
      }
      function xc(t, e) {
        xc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return xc(t, e);
      }
      function Sc(t, e) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.add(t);
      }
      function Tc(t, e, n) {
        if (typeof t == "function" ? t === e : t.has(e)) {
          if (arguments.length < 3) {
            return e;
          } else {
            return n;
          }
        }
        throw new TypeError("Private element is not present on this object");
      }
      var Mc = new WeakSet();
      var Oc = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var r = n.count;
          var o = r === undefined ? 50 : r;
          var a = n.initialSize;
          var s = a === undefined ? [0.8, 0.25] : a;
          var l = n.uniforms;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Sc(t = bc(this, e), Mc);
          i.z.register(t);
          t.count = o;
          t.geometry = Tc(Mc, t, Pc).call(t, {
            initialSize: s
          });
          t.material = Tc(Mc, t, Ec).call(t, {
            uniforms: l
          });
          t.position.z = 0.1;
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            xc(t, e);
          }
        })(e, t);
        n = e;
        if (r = [{
          key: "onAttach",
          value: function () {
            var t;
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "ShootingStars");
            }
          }
        }, {
          key: "uniforms",
          get: function () {
            return this.material.uniforms;
          }
        }]) {
          vc(n.prototype, r);
        }
        if (o) {
          vc(n, o);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var o;
      }(o.eaF);
      function Pc(t) {
        var e = t.initialSize;
        var n = new o.LoY();
        var r = [];
        var i = [];
        var a = mc(e, 2);
        var s = a[0] * 0.5;
        var l = a[1] * 0.5;
        for (var u = 0; u < this.count; u++) {
          var c = u * 4;
          var h = c * 7;
          var f = Cr(u) * 2 - 1;
          var p = Cr(u * 448.3);
          var d = h;
          r[d++] = -s;
          r[d++] = l;
          r[d++] = 0;
          r[d++] = 0;
          r[d++] = 1;
          r[d++] = f;
          r[d++] = p;
          r[d++] = s;
          r[d++] = l;
          r[d++] = 0;
          r[d++] = 1;
          r[d++] = 1;
          r[d++] = f;
          r[d++] = p;
          r[d++] = -s;
          r[d++] = -l;
          r[d++] = 0;
          r[d++] = 0;
          r[d++] = 0;
          r[d++] = f;
          r[d++] = p;
          r[d++] = s;
          r[d++] = -l;
          r[d++] = 0;
          r[d++] = 1;
          r[d++] = 0;
          r[d++] = f;
          r[d++] = p;
          i.push(c, c + 2, c + 1);
          i.push(c + 2, c + 3, c + 1);
        }
        var m = new o.eB$(new Float32Array(r), 7);
        n.setAttribute("position", new o.eHs(m, 3, 0, false));
        n.setAttribute("uv", new o.eHs(m, 2, 3, false));
        n.setAttribute("aSeed", new o.eHs(m, 1, 5, false));
        n.setAttribute("aProgressOffset", new o.eHs(m, 1, 6, false));
        n.setIndex(i);
        return n;
      }
      function Ec(t) {
        var e = t.uniforms;
        return new cc({
          uniforms: pc(pc({}, fn), e),
          depthTest: false,
          depthWrite: false,
          blending: o.EZo
        });
      }
      function Cc(t) {
        Cc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Cc(t);
      }
      function Ac(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Rc(r.key), r);
        }
      }
      function Rc(t) {
        var e = function (t, e) {
          if (Cc(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Cc(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Cc(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Lc(t, e, n) {
        e = Ic(e);
        return function (t, e) {
          if (e && (Cc(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Dc() ? Reflect.construct(e, n || [], Ic(t).constructor) : e.apply(t, n));
      }
      function Dc() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Dc = function () {
          return !!t;
        })();
      }
      function Ic(t) {
        Ic = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Ic(t);
      }
      function jc(t, e) {
        jc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return jc(t, e);
      }
      var kc = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Lc(this, e, [n])).fragmentShader = "precision highp float;\n\nuniform sampler2D tLandscapeMountains;\nuniform sampler2D tLandscapeBorder;\nuniform sampler2D tLandscapeStars;\nuniform sampler2D tNoise;\n\nuniform float uWindowRatio;\nuniform float uMountainsYParallax;\nuniform float uDarkenIntensity;\nuniform float uProgress;\nuniform float uTime;\nuniform float uRatio;\nuniform float uMask;\nuniform float uFade;\nuniform float uZoomX;\nuniform float uTopOpacityOffset;\nuniform float uMountainsScale;\n\nuniform vec2 uScaleOffset;\n\nuniform vec3 uSky1;\nuniform vec3 uSky2;\nuniform vec3 uSky3;\nuniform vec3 uStarsColor;\nuniform vec2 uDecay;\nuniform vec3 uGlobalBgColor;\n\nvarying vec2 vUv;\n\n#define MOUNTAINS_COLOR vec3(.18, .31, .48)\n#define BORDER_COLOR vec3(.07, .1, .16) * .3\n#define PI 3.1415926535897932384626433832795\n\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract( sin( sn ) * c );\n}\n\nfloat pow2(float x) {return x * x;}\nvoid main() {\n\tvec2 landScapeUv = vec2(vUv.x * (1. - uZoomX) + uZoomX * .5 , vUv.y);\n\n\tvec2 center = vec2(0.5);\n\tvec2 behindMountainsUv = (landScapeUv - center) * uMountainsScale + center;\n\tbehindMountainsUv.y -= (1. - uMountainsScale) * 0.3;\n\n\tfloat noise = texture2D(tNoise, vUv * 10.).r;\n\tvec4 mountains = texture2D(tLandscapeMountains, vec2(behindMountainsUv.x, (uMountainsYParallax * .28 + behindMountainsUv.y * uWindowRatio) * (1. - uZoomX)) - uDecay).rgba;\n//\tmountains.a += step(vUv.y, .14);\n\tfloat mask = smoothstep(.65, 1., texture2D(tLandscapeBorder, vec2(landScapeUv.x * (1. - uScaleOffset.x) + (uScaleOffset.x * .5), landScapeUv.y * (1. - uScaleOffset.y) + (uScaleOffset.y * .5)) - uDecay * .5).r);\n\n\tvec2 dUv = vUv + (rand(vUv) - .5) * .01;\n\tvec3 skyColor = mix(uSky1, mix(uSky3, uSky2, dUv.x), dUv.y + .1);\n\tskyColor += skyColor * (1. - smoothstep(0.1, .9, dUv.y)) * 1.2;\n\n\tfloat skyFade = 1. - (smoothstep(1. - 1. * uTopOpacityOffset, 1., vUv.y));\n\n\tvec3 mountainsColor = mix(vec3(0., 0., 0.), mountains.rgb, smoothstep(-1. + uDarkenIntensity * .7, 1., vUv.y));\n\tfloat mountainsBorderAlpha = max(mask, mountains.a);\n\n\tvec2 sUv = vUv;\n\tsUv.x *= uRatio;\n\tfloat theta = uProgress * .3 * length(sUv);\n\tsUv = vec2(mat3(\n\t\tcos(theta), -sin(theta), 0.,\n\t\tsin(theta), cos(theta), 0.,\n\t\t0., 0., 1.\n\t) * vec3(sUv, 0.));\n\n\tfloat stars1 = texture2D(tLandscapeStars, vec2(sUv.x + (uProgress + .2) * .075 + .61, sUv.y + (uProgress + .2 * .1) * .05) * 4.).r;\n\tfloat stars2 = texture2D(tLandscapeStars, vec2(sUv.x + (uProgress + .2 * .1) * 0.045, sUv.y + (uProgress + .2 * .1) * .0035) * 4.).r;\n\n\tfloat stars = stars1 + stars2;\n\n\tskyColor += mix(uStarsColor * stars, vec3(stars), noise);\n\n\tvec3 color = mix(mountainsColor, uGlobalBgColor, mask);\n\tcolor = mix(skyColor, color, mountainsBorderAlpha);\n\tfloat alpha = mix(.8, 1., mountainsBorderAlpha);\n\n\tcolor -= uMask * vUv.y * .2;\n\tgl_FragColor = vec4(color, alpha);\n\tgl_FragColor.a *= mix(skyFade, 1., mountainsBorderAlpha) * uFade;\n\t// gl_FragColor.a *= smoothstep(0., .1, vUv.y);\n}\n";
          t.vertexShader = "attribute vec3 position;\nattribute vec2 uv;\n\nuniform vec2 uSize;\nuniform vec2 uViewSize;\nuniform float uProgressY;\nuniform float uScrollHeight;\nuniform float uOffsetY;\nuniform float uRatioDiff;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec3 pos = position;\n\n  // float scrollHeight = uScrollHeight / uViewSize.y;\n  float scrollHeight = uScrollHeight / uViewSize.y * uSize.y * 2.;\n\n  pos.xy *= uSize;\n  pos.y += (uProgressY * scrollHeight) - scrollHeight + uSize.y * .1 + uRatioDiff;\n\n  gl_Position = vec4(pos, 1.0);\n\n  vUv = uv;\n\n}\n";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            jc(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Ac(n.prototype, r);
        }
        if (i) {
          Ac(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function Nc(t) {
        Nc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Nc(t);
      }
      function zc(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function Uc(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            zc(Object(n), true).forEach(function (e) {
              Fc(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            zc(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function Fc(t, e, n) {
        if ((e = Wc(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Bc(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Wc(r.key), r);
        }
      }
      function Wc(t) {
        var e = function (t, e) {
          if (Nc(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Nc(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Nc(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Hc(t, e, n) {
        e = Gc(e);
        return function (t, e) {
          if (e && (Nc(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Vc() ? Reflect.construct(e, n || [], Gc(t).constructor) : e.apply(t, n));
      }
      function Vc() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Vc = function () {
          return !!t;
        })();
      }
      function Gc(t) {
        Gc = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Gc(t);
      }
      function qc(t, e) {
        qc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return qc(t, e);
      }
      function Xc(t, e) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.add(t);
      }
      function Yc(t, e, n) {
        if (typeof t == "function" ? t === e : t.has(e)) {
          if (arguments.length < 3) {
            return e;
          } else {
            return n;
          }
        }
        throw new TypeError("Private element is not present on this object");
      }
      var Qc = new WeakSet();
      var Kc = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var r = n.uniforms;
          var o = r === undefined ? {} : r;
          var a = n.bottomHaloColor;
          var s = a === undefined ? 16777215 : a;
          var l = n.bottomHaloSunColor;
          var u = l === undefined ? 16777215 : l;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Xc(t = Hc(this, e), Qc);
          i.z.register(t);
          t.geometry = Yc(Qc, t, Zc).call(t);
          t.material = Yc(Qc, t, Jc).call(t, {
            uniforms: o,
            bottomHaloColor: s,
            bottomHaloSunColor: u
          });
          t.textureRatio = 1;
          window.landscape = t;
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            qc(t, e);
          }
        })(e, t);
        n = e;
        if (r = [{
          key: "onAttach",
          value: function () {
            var t;
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "Landscape");
            }
          }
        }, {
          key: "onResize",
          value: function (t) {
            var e = t.ratio;
            var n = t.width;
            t.height;
            this.uniforms.uWindowRatio.value = n / (n * 0.225) / e;
          }
        }, {
          key: "onAfterResize",
          value: function (t) {
            var e = t.ratio;
            var n = t.device;
            this.uniforms.uSize.value.x = 2;
            this.uniforms.uSize.value.y = e * 2 / e;
            this.uniforms.uZoomX.value = n === "mobile" ? 0.4 : 0;
          }
        }, {
          key: "uniforms",
          get: function () {
            return this.material.uniforms;
          }
        }]) {
          Bc(n.prototype, r);
        }
        if (o) {
          Bc(n, o);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var o;
      }(o.eaF);
      function Zc() {
        return new o.bdM(1, 1);
      }
      function Jc(t) {
        var e = t.uniforms;
        return new kc({
          uniforms: Uc(Uc({}, fn), {}, {
            uSize: {
              value: new o.I9Y(2, 2)
            },
            uZoomX: {
              value: 0
            },
            uProgressY: {
              value: 0
            },
            uOffsetY: {
              value: 0
            },
            uScrollHeight: {
              value: 0
            },
            uSky1: {
              value: new o.Q1f("#92a4b8")
            },
            uSky2: {
              value: new o.Q1f("#054089")
            },
            uSky3: {
              value: new o.Q1f("#001d42")
            },
            uStarsColor: {
              value: new o.Q1f("#69a4ff")
            },
            uScaleOffset: {
              value: new o.I9Y(0.4, 0.05)
            },
            uRatioDiff: {
              value: 0
            },
            uDarkenIntensity: {
              value: 0
            },
            uWindowRatio: {
              value: 0
            },
            uMountainsYParallax: {
              value: 0
            },
            uTopOpacityOffset: {
              value: 1
            },
            uProgress: {
              value: 0
            },
            uMask: {
              value: 0
            },
            uFade: {
              value: 1
            },
            uDecay: {
              value: new o.I9Y(0, 0)
            },
            uMountainsScale: {
              value: 1
            }
          }, e),
          transparent: true
        });
      }
      function $c(t) {
        $c = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return $c(t);
      }
      function th(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function eh(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            th(Object(n), true).forEach(function (e) {
              uh(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            th(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function nh(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, ch(r.key), r);
        }
      }
      function rh(t, e, n) {
        e = sh(e);
        return function (t, e) {
          if (e && ($c(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, ih() ? Reflect.construct(e, n || [], sh(t).constructor) : e.apply(t, n));
      }
      function ih() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (ih = function () {
          return !!t;
        })();
      }
      function oh(t, e, n, r) {
        var i = ah(sh(r & 1 ? t.prototype : t), e, n);
        if (r & 2 && typeof i == "function") {
          return function (t) {
            return i.apply(n, t);
          };
        } else {
          return i;
        }
      }
      function ah() {
        ah = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
          var r = function (t, e) {
            while (!{}.hasOwnProperty.call(t, e) && (t = sh(t)) !== null);
            return t;
          }(t, e);
          if (r) {
            var i = Object.getOwnPropertyDescriptor(r, e);
            if (i.get) {
              return i.get.call(arguments.length < 3 ? t : n);
            } else {
              return i.value;
            }
          }
        };
        return ah.apply(null, arguments);
      }
      function sh(t) {
        sh = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return sh(t);
      }
      function lh(t, e) {
        lh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return lh(t, e);
      }
      function uh(t, e, n) {
        if ((e = ch(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function ch(t) {
        var e = function (t, e) {
          if ($c(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if ($c(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if ($c(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var hh = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          uh(r = rh(this, e, [t, n]), "tick", function () {
            ad.animation;
          });
          i.z.register(r);
          ad.core.loader.add({
            key: "landscapeBorder"
          }, {
            key: "landscapeMountains"
          }, {
            key: "landscapeStars"
          });
          r.config = hn;
          r.textureUniforms = {
            tLandscapeBorder: {
              value: null
            },
            tLandscapeMountains: {
              value: null
            },
            tLandscapeStars: {
              value: null
            },
            tNoise: {
              value: null
            }
          };
          r.sectionUniforms = {
            uViewSize: fn.uCameraView,
            uScrollHeight: {
              value: 0
            }
          };
          r.starsParticles = new tc(eh(eh({}, r.config.starsParticles), {}, {
            uniforms: eh(eh({}, r.sectionUniforms), {}, {
              uFade2: {
                value: 1
              }
            })
          }));
          r.shootingStars = new Oc(eh(eh({}, r.config.shootingStars), {}, {
            uniforms: {
              uProgress: {
                value: 0
              },
              uFade: {
                value: 0
              },
              uRotationAngle: {
                value: 0
              },
              uFadeY: {
                value: -8
              }
            }
          }));
          r.landscape = new Kc(eh({
            uniforms: eh(eh({}, r.textureUniforms), r.sectionUniforms)
          }, r.config.landscape));
          r.add(r.shootingStars, r.landscape);
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            lh(t, e);
          }
        })(e, t);
        n = e;
        r = [{
          key: "setupTimeline",
          value: function () {
            var t = xr.Ay.timeline({
              paused: true
            });
            t.to(this.starsParticles.uniforms.uFade1, {
              value: 1,
              duration: 0.1
            }, 0);
            t.to(this.starsParticles.uniforms.uProgressY, {
              value: 1,
              duration: 1,
              ease: "power2.inOut"
            }, 0);
            t.to([this.starsParticles.uniforms.uRotationAngle, this.shootingStars.uniforms.uRotationAngle], {
              value: -Math.PI * 0.3,
              duration: 1,
              ease: "power2.inOut"
            }, 0);
            t.fromTo(this, {
              landscapeProgressY: 0.725
            }, {
              landscapeProgressY: 0.975,
              duration: 0.333,
              ease: "power2.out"
            }, 0);
            t.fromTo(this, {
              landscapeProgressY: 0.975
            }, {
              landscapeProgressY: 1.225,
              duration: 0.333,
              ease: "power2.inOut"
            }, 0.67);
            t.fromTo(this.shootingStars.material.uniforms.uFadeY, {
              value: -6
            }, {
              value: 8,
              duration: 0.333
            }, 0.67);
            t.fromTo(this.landscape.uniforms.uTopOpacityOffset, {
              value: 1
            }, {
              value: 0,
              duration: 0.333
            }, 0);
            t.fromTo(this.landscape.uniforms.uScaleOffset.value, {
              x: 0.4,
              y: 0.05
            }, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "power2.inOut"
            }, 0.2);
            t.fromTo(this.landscape.uniforms.uMountainsScale, {
              value: 1
            }, {
              value: 1.15,
              duration: 0.5,
              ease: "power2.inOut"
            }, 0.2);
            t.fromTo(this.landscape.uniforms.uMountainsYParallax, {
              value: 1
            }, {
              value: 0,
              duration: 0.45,
              ease: "power2.inOut"
            }, 0);
            t.fromTo(this.landscape.uniforms.uDarkenIntensity, {
              value: 1
            }, {
              value: 0.2,
              duration: 0.5
            }, 0.1);
            t.fromTo(this.landscape.uniforms.uProgress, {
              value: 0
            }, {
              value: 1,
              duration: 1,
              ease: "power2.inOut"
            }, 0);
            t.fromTo(this.landscape.uniforms.uMask, {
              value: 0
            }, {
              value: 1,
              duration: 0.2,
              ease: "power2.inOut"
            }, 0.4);
            t.to(this.shootingStars.uniforms.uFade, {
              value: 1,
              duration: 0.1
            }, 0.3);
            t.to(this.shootingStars.uniforms.uProgress, {
              value: 1,
              duration: 0.7,
              ease: "power2.inOut"
            }, 0.3);
            t.to(this.shootingStars.uniforms.uFade, {
              value: 0,
              duration: 0.1
            }, 0.75);
            t.to(this.starsParticles.uniforms.uFade1, {
              value: 0,
              duration: 0.2
            }, 0.55);
            t.to(this.landscape.uniforms.uDarkenIntensity, {
              value: 1,
              duration: 0.2
            }, 0.8);
            t.to(this.landscape.uniforms.uFade, {
              value: 0,
              duration: 0.2
            }, 0.8);
            return t;
          }
        }, {
          key: "enter",
          value: function (t, n = false) {
            ad.webgl.camera.updateFov(18);
            return oh(e, "enter", this, 3)([t, n]);
          }
        }, {
          key: "onResize",
          value: function (t) {
            var e = t.device;
            this._isMobile = e == "mobile" ? 1 : 0;
          }
        }, {
          key: "landscapeProgressY",
          get: function () {
            return this.landscape.uniforms.uProgressY.value;
          },
          set: function (t) {
            this.landscape.uniforms.uProgressY.value = t;
          }
        }, {
          key: "onAfterResize",
          value: function () {
            this.sectionUniforms.uScrollHeight.value = ad.webgl.camera.getHeightFromPixels(this.height);
            this.starsParticles.uniforms.uOffsetY.value = -this.sectionUniforms.uViewSize.value.y * 0.5 - fn.uCameraView.value.y * 0.5;
          }
        }, {
          key: "onAttach",
          value: function () {
            var t;
            this.textureUniforms.tLandscapeBorder.value = ad.core.loader.getTexture("landscapeBorder");
            this.textureUniforms.tLandscapeMountains.value = ad.core.loader.getTexture("landscapeMountains");
            this.textureUniforms.tLandscapeStars.value = ad.core.loader.getTexture("landscapeStars");
            this.textureUniforms.tNoise.value = ad.core.loader.getTexture("noise");
            this.textureUniforms.tLandscapeStars.value.wrapS = this.textureUniforms.tLandscapeStars.value.wrapT = o.GJx;
            this.textureUniforms.tNoise.value.wrapS = this.textureUniforms.tNoise.value.wrapT = o.GJx;
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "SkyView");
            }
            oh(e, "onAttach", this, 3)([]);
          }
        }];
        if (r) {
          nh(n.prototype, r);
        }
        if (a) {
          nh(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(Fr);
      function fh(t) {
        fh = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return fh(t);
      }
      function ph(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, dh(r.key), r);
        }
      }
      function dh(t) {
        var e = function (t, e) {
          if (fh(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (fh(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (fh(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function mh(t, e, n) {
        e = vh(e);
        return function (t, e) {
          if (e && (fh(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, gh() ? Reflect.construct(e, n || [], vh(t).constructor) : e.apply(t, n));
      }
      function gh() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (gh = function () {
          return !!t;
        })();
      }
      function vh(t) {
        vh = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return vh(t);
      }
      function yh(t, e) {
        yh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return yh(t, e);
      }
      var bh = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = mh(this, e, [n])).fragmentShader = "precision highp float;\n\nvarying vec3 vColor;\nvarying float vProgress;\nvarying vec3 vPosition;\n\nuniform float uLeaveProgress;\n\nvoid main() {\n\tfloat a = smoothstep(.5, .0, length(gl_PointCoord.xy - .5)) * vProgress * .7;\n\tvec3 color = vec3(1.) + smoothstep(.6, .0, length(gl_PointCoord.xy - .2)) * .5;\n\n\tif(a < .01) discard;\n\n\tfloat leaveProgress = 1. - uLeaveProgress;\n\tfloat leaveDistance = abs(distance(vPosition, vec3(-12, 6, 0)));\n\tfloat leaveAlpha = smoothstep(leaveProgress * 25. + 5., leaveProgress * 25., leaveDistance);\n\n\tgl_FragColor = vec4(color, vColor.r * a * leaveAlpha);\n}\n";
          t.vertexShader = "#define PI 3.14159265359\n\nattribute vec3 position;\nattribute float aColor;\nattribute float aSpeed;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 modelMatrix;\nuniform float uTime;\nuniform float uProgress;\n\nvarying float vProgress;\nvarying vec3 vColor;\nvarying vec3 vPosition;\n\nvoid main() {\n  vec3 pos = position;\n  vProgress = uProgress;\n\n  float theta = pos.x + uTime * .00001 * (.5 + aSpeed * 5.) + uProgress;\n  float phi = pos.y;\n  float radius = pos.z * uProgress + 15.;\n\n  pos = vec3(\n    cos(theta) * cos(phi),\n    sin(phi),\n    sin(theta) * cos(phi)\n  ) * radius;\n\n\tfloat angle = (sin(aColor * 23.6) * .5 + .5) * PI;\n\n\tpos = (mat4(\n\t\tcos(angle), -sin(angle), 0., 0.,\n\t\tsin(angle), cos(angle), 0., 0.,\n\t\t0., 0., 1., 0.,\n\t\t0., 0., 0., 1.\n\t) * vec4(pos, 0.)).xyz;\n\n  vColor = vec3(.6 + sin(position.x * 100.20) * .4);\n\n  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);\n  vPosition = (modelMatrix * vec4(pos, 1.0)).xyz;\n\n  gl_PointSize = (250.0 / length(mvPosition));\n  gl_Position = projectionMatrix * mvPosition;\n}\n";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            yh(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          ph(n.prototype, r);
        }
        if (i) {
          ph(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function _h(t) {
        _h = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return _h(t);
      }
      function wh(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function xh(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            wh(Object(n), true).forEach(function (e) {
              Sh(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            wh(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function Sh(t, e, n) {
        if ((e = Mh(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Th(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Mh(r.key), r);
        }
      }
      function Mh(t) {
        var e = function (t, e) {
          if (_h(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (_h(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (_h(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Oh(t, e, n) {
        e = Eh(e);
        return function (t, e) {
          if (e && (_h(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Ph() ? Reflect.construct(e, n || [], Eh(t).constructor) : e.apply(t, n));
      }
      function Ph() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Ph = function () {
          return !!t;
        })();
      }
      function Eh(t) {
        Eh = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Eh(t);
      }
      function Ch(t, e) {
        Ch = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Ch(t, e);
      }
      function Ah(t, e) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.add(t);
      }
      function Rh(t, e, n) {
        if (typeof t == "function" ? t === e : t.has(e)) {
          if (arguments.length < 3) {
            return e;
          } else {
            return n;
          }
        }
        throw new TypeError("Private element is not present on this object");
      }
      var Lh = new WeakSet();
      var Dh = function (t) {
        function e() {
          var t;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Ah(t = Oh(this, e), Lh);
          i.z.register(t);
          t.count = 4000;
          t.frustumCulled = false;
          t.geometry = Rh(Lh, t, Ih).call(t);
          t.material = Rh(Lh, t, jh).call(t);
          t.renderOrder = 1;
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Ch(t, e);
          }
        })(e, t);
        n = e;
        if (r = [{
          key: "uniforms",
          get: function () {
            return this.material.uniforms;
          }
        }]) {
          Th(n.prototype, r);
        }
        if (o) {
          Th(n, o);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var o;
      }(o.ONl);
      function Ih() {
        var t = new o.LoY();
        var e = [];
        for (var n = 0; n < this.count * 5; n += 5) {
          e[n + 0] = Cr(n + 0) * Math.PI * 2;
          e[n + 1] = (Cr(n + 1) - 0.5) * Math.PI;
          e[n + 2] = Cr(n + 2) * 2 + (Cr(n * 7 + 20) > 0.6 ? Cr(n * 8 + 27) * 20 : 0) + 2;
          e[n + 3] = Cr(n + 3);
          e[n + 4] = Cr(n * 7 + 30);
        }
        var r = new o.eB$(new Float32Array(e), 5);
        t.setAttribute("position", new o.eHs(r, 3, 0));
        t.setAttribute("aColor", new o.eHs(r, 1, 3));
        t.setAttribute("aSpeed", new o.eHs(r, 1, 4));
        return t;
      }
      function jh() {
        return new bh({
          uniforms: xh(xh({}, fn), {}, {
            uProgress: {
              value: 0
            },
            uLeaveProgress: {
              value: 0
            }
          }),
          depthWrite: false,
          blending: o.bCz,
          blendSrc: o.ie2,
          blendDst: o.hdd
        });
      }
      function kh(t) {
        kh = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return kh(t);
      }
      function Nh(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, zh(r.key), r);
        }
      }
      function zh(t) {
        var e = function (t, e) {
          if (kh(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (kh(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (kh(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Uh(t, e, n) {
        e = Bh(e);
        return function (t, e) {
          if (e && (kh(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Fh() ? Reflect.construct(e, n || [], Bh(t).constructor) : e.apply(t, n));
      }
      function Fh() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Fh = function () {
          return !!t;
        })();
      }
      function Bh(t) {
        Bh = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Bh(t);
      }
      function Wh(t, e) {
        Wh = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Wh(t, e);
      }
      var Hh = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Uh(this, e, [n])).fragmentShader = "precision highp float;\n\nvarying vec2 vUv;\n\nuniform vec3 uColor;\nuniform float uIntensity;\n\nuniform vec3 uSunPosition;\nuniform vec3 uSunColor;\nuniform vec3 uSunReflexionColor;\nuniform vec3 uSunsetColor;\n\nuniform float uSunIntensity;\nuniform float uSunsetIntensity;\nuniform float uProgress;\n\nfloat pow2(float x) {return x*x;}\n\nvoid main() {\n\tfloat l = length(vUv - .5);\n\n\tfloat unclampedSunIntensity = dot(vec2( vUv.y, 1. - vUv.x), normalize(uSunPosition.xy)) * 5.;\n\tunclampedSunIntensity = (unclampedSunIntensity + 1.) * .5;\n\tfloat sunIntensity = max(0., unclampedSunIntensity);\n\tfloat intensity = pow2(smoothstep(.45 + sunIntensity * .05, .33, l) * smoothstep(.25, .33, l)) * uIntensity * .5 * (1. + smoothstep(0., .5, uProgress) * smoothstep(1., .5, uProgress) * 2.);\n\n\tintensity = smoothstep(.34, .31, l) * smoothstep(.27, .31, l) * uIntensity * .2 * (1. + sunIntensity * .5);\n\tintensity += smoothstep(.325, .31, l) * smoothstep(.25, .31, l) * uIntensity * .6 * (1. + sunIntensity * .5);\n\tvec3 sun = sunIntensity * uSunColor * uSunIntensity * .1;\n\n\tvec3 color = uColor * .15;\n\n\tvec3 haloIntensity = smoothstep(0., 2., sunIntensity) * uSunReflexionColor * smoothstep(.5, .31, l) * smoothstep(.0, .31, l) * uSunIntensity;\n\n\tcolor *= haloIntensity * mix(15., 75., smoothstep(.33, .21, l));\n\tcolor += intensity * haloIntensity * smoothstep(.33, .3, l) * .5;\n\n\tcolor *= smoothstep(.34 + smoothstep(.1, 2., sunIntensity) * .05, .31, l);\n\n\tgl_FragColor = vec4(color, 1.) * uProgress;\n//\tgl_FragColor = vec4(unclampedSunIntensity, 0., 0., 1.);\n}\n";
          t.vertexShader = "precision highp float;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec3 vPosition;\nvarying vec2 vUv;\n\nuniform float curveIntensity;\n\nvoid main(){\n\tvUv = uv;\n\tmat4 mvMatrix = projectionMatrix * modelViewMatrix;\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Wh(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Nh(n.prototype, r);
        }
        if (i) {
          Nh(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function Vh(t) {
        Vh = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Vh(t);
      }
      function Gh(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function qh(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            Gh(Object(n), true).forEach(function (e) {
              Xh(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            Gh(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function Xh(t, e, n) {
        if ((e = Qh(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Yh(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Qh(r.key), r);
        }
      }
      function Qh(t) {
        var e = function (t, e) {
          if (Vh(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Vh(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Vh(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Kh(t, e, n) {
        e = Jh(e);
        return function (t, e) {
          if (e && (Vh(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Zh() ? Reflect.construct(e, n || [], Jh(t).constructor) : e.apply(t, n));
      }
      function Zh() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Zh = function () {
          return !!t;
        })();
      }
      function Jh(t) {
        Jh = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Jh(t);
      }
      function $h(t, e) {
        $h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return $h(t, e);
      }
      function tf(t, e) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.add(t);
      }
      function ef(t, e, n) {
        if (typeof t == "function" ? t === e : t.has(e)) {
          if (arguments.length < 3) {
            return e;
          } else {
            return n;
          }
        }
        throw new TypeError("Private element is not present on this object");
      }
      var nf = new WeakSet();
      var rf = function (t) {
        function e(t) {
          var n;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          tf(n = Kh(this, e), nf);
          n._sun = t;
          i.z.register(n);
          n.geometry = ef(nf, n, of).call(n);
          n.material = ef(nf, n, af).call(n);
          n.mesh = new o.eaF(n.geometry, n.material);
          n.mesh.rotation.set(0, 0, -Math.PI * 0.5);
          n.add(n.mesh);
          return n;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            $h(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          Yh(n.prototype, r);
        }
        if (a) {
          Yh(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(o.B69);
      function of() {
        return new o.bdM(50, 50);
      }
      function af() {
        return new Hh({
          uniforms: qh(qh({}, fn), {}, {
            uSunPosition: {
              value: this._sun.position
            },
            uSunColor: {
              value: this._sun.color
            },
            uSunIntensity: this._sun.intensity,
            uSunReflexionColor: {
              value: this._sun.reflexionColor
            },
            uSunsetColor: {
              value: this._sun.sunsetColor
            },
            uSunsetIntensity: this._sun.sunsetIntensity,
            uColor: {
              value: new o.Q1f(11053311)
            },
            uIntensity: {
              value: 0.04
            },
            uProgress: {
              value: 1
            }
          }),
          blending: o.EZo,
          depthTest: false,
          depthWrite: false,
          side: 0
        });
      }
      function sf(t) {
        sf = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return sf(t);
      }
      function lf(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function uf(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            lf(Object(n), true).forEach(function (e) {
              vf(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            lf(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function cf(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, yf(r.key), r);
        }
      }
      function hf(t, e, n) {
        e = mf(e);
        return function (t, e) {
          if (e && (sf(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, ff() ? Reflect.construct(e, n || [], mf(t).constructor) : e.apply(t, n));
      }
      function ff() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (ff = function () {
          return !!t;
        })();
      }
      function pf(t, e, n, r) {
        var i = df(mf(r & 1 ? t.prototype : t), e, n);
        if (r & 2 && typeof i == "function") {
          return function (t) {
            return i.apply(n, t);
          };
        } else {
          return i;
        }
      }
      function df() {
        df = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
          var r = function (t, e) {
            while (!{}.hasOwnProperty.call(t, e) && (t = mf(t)) !== null);
            return t;
          }(t, e);
          if (r) {
            var i = Object.getOwnPropertyDescriptor(r, e);
            if (i.get) {
              return i.get.call(arguments.length < 3 ? t : n);
            } else {
              return i.value;
            }
          }
        };
        return df.apply(null, arguments);
      }
      function mf(t) {
        mf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return mf(t);
      }
      function gf(t, e) {
        gf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return gf(t, e);
      }
      function vf(t, e, n) {
        if ((e = yf(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function yf(t) {
        var e = function (t, e) {
          if (sf(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (sf(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (sf(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var bf = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          vf(r = hf(this, e, [t, n]), "onTick", function (t) {
            var e = t.dt;
            if (ad.animation) {
              r.earthWrapper.rotation.y += e * -0.05 + ad.webgl.sectionController.velocity * 0.000015;
            }
          });
          i.z.register(r);
          r.mainWrapper = new o.B69();
          r.earthWrapper = new o.B69();
          r.mainWrapper.scale.setScalar(0.25);
          r.atmosphereWrapper = new o.B69();
          r.earthWrapper.rotation.set(0, 0, 0.4101524);
          r.sunConfig = {
            position: new o.Pq0(-300, 302, 472),
            color: new o.Q1f(16251903),
            intensity: {
              value: 1.2
            },
            reflexionColor: new o.Q1f(4934475),
            sunsetColor: new o.Q1f(16772827),
            sunsetIntensity: {
              value: 0.04
            },
            specularReference: new o.Pq0(0, 10, -32)
          };
          r.atmosphereReflexionColor = new o.Q1f(925476);
          r.endOffset = -0.5;
          window.hud = r;
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            gf(t, e);
          }
        })(e, t);
        n = e;
        r = [{
          key: "setupTimeline",
          value: function () {
            var t = xr.Ay.timeline({
              paused: true
            });
            t.set(this.mainWrapper.position, {
              y: -16
            });
            t.set(this.mainWrapper.position, {
              y: 0
            }, 0.33);
            t.fromTo(this.satellites.material.uniforms.uProgress, {
              value: 0
            }, {
              value: 1,
              duration: 0.3,
              ease: "power2.inOut"
            }, 0.33);
            t.fromTo(this.atmosphere.material.uniforms.uIntensity, {
              value: 0.04
            }, {
              value: 0.8,
              duration: 0.3,
              ease: "power2.inOut"
            }, 0.33);
            t.fromTo([this.earth.material.uniforms.uOpacity, this.atmosphere.material.uniforms.uProgress], {
              value: 0
            }, {
              value: 1,
              duration: 0.2,
              ease: "none"
            }, 0.33);
            t.fromTo(this.sunConfig.position, {
              x: -300,
              y: 302,
              z: 472
            }, {
              x: -120,
              y: 72,
              z: -408,
              duration: 0.25,
              ease: "power2.inOut"
            }, 0.7);
            t.fromTo(this.earthWrapper.position, {
              z: 0
            }, {
              z: -25,
              duration: 0.55
            }, 0.45);
            t.fromTo(this.earthWrapper.rotation, {
              x: 0
            }, {
              x: -0.35,
              duration: 0.55
            }, 0.45);
            t.fromTo([this.earth.material.uniforms.uOpacity, this.atmosphere.material.uniforms.uProgress], {
              value: 1
            }, {
              value: 0,
              duration: 0.25
            }, 0.7);
            t.fromTo(this.satellites.material.uniforms.uLeaveProgress, {
              value: 0
            }, {
              value: 1,
              duration: 0.5
            }, 0.5);
            t.call(function () {}, null, 1);
            return t;
          }
        }, {
          key: "enter",
          value: function (t, n = false) {
            ad.webgl.camera.updateFov(18);
            if (t > 0) {
              this.earth.material.uniforms.uOpacity.value = 1;
            }
            this.earth.material.uniforms.uLuminosity.value = 0.32;
            this.earth.applySunConfig({
              sun: this.sunConfig,
              config: {
                uColorCorrection: {
                  value: new o.Q1f("#44447d")
                }
              }
            });
            this.earthWrapper.add(this.earth);
            return pf(e, "enter", this, 3)([t, n]);
          }
        }, {
          key: "leave",
          value: function (t, n = false) {
            return pf(e, "leave", this, 3)([t, n]);
          }
        }, {
          key: "open",
          value: function () {
            xr.Ay.timeline();
          }
        }, {
          key: "onAttach",
          value: function () {
            var t;
            this.earth = ad.webgl.sectionController.earth;
            this.atmosphere = new rf(uf(uf({}, this.sunConfig), {}, {
              reflexionColor: this.atmosphereReflexionColor
            }));
            this.satellites = new Dh();
            this.atmosphereWrapper.add(this.atmosphere);
            this.earthWrapper.add(this.satellites);
            this.mainWrapper.add(this.earthWrapper, this.atmosphereWrapper);
            this.add(this.mainWrapper);
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "Hud");
            }
            pf(e, "onAttach", this, 3)([]);
          }
        }];
        if (r) {
          cf(n.prototype, r);
        }
        if (a) {
          cf(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(Fr);
      function _f(t) {
        _f = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return _f(t);
      }
      function wf(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, xf(r.key), r);
        }
      }
      function xf(t) {
        var e = function (t, e) {
          if (_f(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (_f(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (_f(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Sf(t, e, n) {
        e = Mf(e);
        return function (t, e) {
          if (e && (_f(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Tf() ? Reflect.construct(e, n || [], Mf(t).constructor) : e.apply(t, n));
      }
      function Tf() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Tf = function () {
          return !!t;
        })();
      }
      function Mf(t) {
        Mf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Mf(t);
      }
      function Of(t, e) {
        Of = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Of(t, e);
      }
      var Pf = function (t) {
        function e() {
          var t;
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (t = Sf(this, e, [n])).fragmentShader = "precision highp float;\n\nvarying vec2 vUv;\n\nuniform float uOpacity;\nuniform float uSunLeaveProgress;\nuniform vec2 uSunLeavePosition;\nuniform vec3 uColor;\n\nvoid main() {\n\tfloat l = length(vUv - .5);\n\tfloat d = distance(vUv, uSunLeavePosition);\n\tfloat start = .2992;\n\tfloat end = .3012;\n\tfloat horizonDistance = distance(vUv, vec2(.196, 0.49));\n\tvec3 color = uColor;\n\n\tfloat horizon = smoothstep(.305, .3, l) * smoothstep(.25, .3, l);\n\n\tfloat alpha = smoothstep(start - .1, start, l) * smoothstep(end + .05, end, l) * .1;\n\talpha += smoothstep(end + .01, end, l) * 1.;\n\talpha += horizon * .5;\n\n\tcolor += smoothstep(.31, .3, l) * smoothstep(.2, .3, l) * .4;\n\tcolor += smoothstep(.305, .3, l) * smoothstep(.28, .3, l) * .15;\n\n\t// color += alpha * .1;\n\t// color += horizon * .7 * uColor;\n\tgl_FragColor = vec4(color, alpha * uOpacity * .6);\n}\n";
          t.vertexShader = "precision highp float;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec3 vPosition;\nvarying vec2 vUv;\n\nuniform float curveIntensity;\n\nvoid main(){\n\tvUv = uv;\n\tmat4 mvMatrix = projectionMatrix * modelViewMatrix;\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";
          t.depthTest = false;
          t.depthWrite = false;
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Of(t, e);
          }
        })(e, t);
        n = e;
        if (r) {
          wf(n.prototype, r);
        }
        if (i) {
          wf(n, i);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var i;
      }(o.D$Q);
      function Ef(t) {
        Ef = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Ef(t);
      }
      function Cf(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function Af(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e] ?? {};
          if (e % 2) {
            Cf(Object(n), true).forEach(function (e) {
              Rf(t, e, n[e]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
          } else {
            Cf(Object(n)).forEach(function (e) {
              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
          }
        }
        return t;
      }
      function Rf(t, e, n) {
        if ((e = Df(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Lf(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Df(r.key), r);
        }
      }
      function Df(t) {
        var e = function (t, e) {
          if (Ef(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Ef(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Ef(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function If(t, e, n) {
        e = kf(e);
        return function (t, e) {
          if (e && (Ef(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, jf() ? Reflect.construct(e, n || [], kf(t).constructor) : e.apply(t, n));
      }
      function jf() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (jf = function () {
          return !!t;
        })();
      }
      function kf(t) {
        kf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return kf(t);
      }
      function Nf(t, e) {
        Nf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Nf(t, e);
      }
      function zf(t, e) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.add(t);
      }
      function Uf(t, e, n) {
        if (typeof t == "function" ? t === e : t.has(e)) {
          if (arguments.length < 3) {
            return e;
          } else {
            return n;
          }
        }
        throw new TypeError("Private element is not present on this object");
      }
      var Ff = new WeakSet();
      var Bf = function (t) {
        function e(t) {
          var n;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          zf(n = If(this, e), Ff);
          n._sun = t;
          i.z.register(n);
          n.geometry = Uf(Ff, n, Wf).call(n);
          n.material = Uf(Ff, n, Hf).call(n);
          n.mesh = new o.eaF(n.geometry, n.material);
          n.mesh.rotation.set(0, 0, -Math.PI * 0.5);
          n.renderOrder = -10;
          n.add(n.mesh);
          return n;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Nf(t, e);
          }
        })(e, t);
        n = e;
        if (r = [{
          key: "onAttach",
          value: function () {
            var t;
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "Atmosphere");
            }
          }
        }]) {
          Lf(n.prototype, r);
        }
        if (a) {
          Lf(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(o.B69);
      function Wf() {
        return new o.bdM(50, 50);
      }
      function Hf() {
        return new Pf({
          uniforms: Af(Af({}, fn), {}, {
            uSunLeavePosition: {
              value: new o.I9Y(0.198, 0.5)
            },
            uSunLeaveProgress: {
              value: 0
            },
            uColor: {
              value: new o.Q1f(3760009)
            },
            uOpacity: {
              value: 1
            }
          }),
          blending: o.bCz,
          blendSrc: o.ie2,
          blendDst: o.OuU,
          side: 0
        });
      }
      function Vf(t) {
        Vf = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Vf(t);
      }
      function Gf(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, qf(r.key), r);
        }
      }
      function qf(t) {
        var e = function (t, e) {
          if (Vf(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Vf(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Vf(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Xf(t, e, n) {
        e = Zf(e);
        return function (t, e) {
          if (e && (Vf(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Yf() ? Reflect.construct(e, n || [], Zf(t).constructor) : e.apply(t, n));
      }
      function Yf() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Yf = function () {
          return !!t;
        })();
      }
      function Qf(t, e, n, r) {
        var i = Kf(Zf(r & 1 ? t.prototype : t), e, n);
        if (r & 2 && typeof i == "function") {
          return function (t) {
            return i.apply(n, t);
          };
        } else {
          return i;
        }
      }
      function Kf() {
        Kf = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
          var r = function (t, e) {
            while (!{}.hasOwnProperty.call(t, e) && (t = Zf(t)) !== null);
            return t;
          }(t, e);
          if (r) {
            var i = Object.getOwnPropertyDescriptor(r, e);
            if (i.get) {
              return i.get.call(arguments.length < 3 ? t : n);
            } else {
              return i.value;
            }
          }
        };
        return Kf.apply(null, arguments);
      }
      function Zf(t) {
        Zf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Zf(t);
      }
      function Jf(t, e) {
        Jf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Jf(t, e);
      }
      var $f = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          r = Xf(this, e, [t, n]);
          i.z.register(r);
          r.mainWrapper = new o.B69();
          r.earthWrapper = new o.B69();
          r.atmosphereW = new o.B69();
          r.garbageW = new o.B69();
          r.satelliteW = new o.B69();
          r.satelliteLightW = new o.B69();
          r.satelliteGarbageW = new o.B69();
          r.satelliteGarbageSecondW = new o.B69();
          r.atmosphereW.scale.setScalar(0.96);
          r.mainWrapper.position.set(0, -16.6, 38.3);
          r.earthWrapper.rotation.set(0, 0, 1);
          r.satelliteLightW.position.set(0.39, -0.04, 1.28);
          r.satelliteW.rotation.set(1.74, 0.4, -0.46);
          r.sunConfig = {
            position: new o.Pq0(50, 270, -280),
            color: new o.Q1f(16251903),
            intensity: {
              value: 1
            },
            reflexionColor: new o.Q1f(10664410),
            sunsetColor: new o.Q1f(16772827),
            sunsetIntensity: {
              value: 0.04
            },
            specularReference: new o.Pq0(0, 10, -32)
          };
          r.startOffset = 0.5;
          r.earthStartY = -30;
          window.clean = r;
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Jf(t, e);
          }
        })(e, t);
        n = e;
        r = [{
          key: "setupTimeline",
          value: function () {
            var t = this;
            var e = xr.Ay.timeline({
              paused: true
            });
            e.set([this.earth.material.uniforms.uOpacity, this.atmosphere.material.uniforms.uProgress], {
              value: 0
            }, 0);
            e.to([this.earth.material.uniforms.uOpacity, this.atmosphere.material.uniforms.uProgress], {
              value: 1,
              duration: 0.3
            }, 0);
            e.fromTo(ad.webgl.sectionController.skyBackground.material.uniforms.uStarsOffset.value, {
              x: 0,
              y: 0
            }, {
              x: 0,
              y: -0.3,
              duration: 0.3,
              ease: "power1.out"
            }, 0);
            e.fromTo(ad.webgl.sectionController.skyBackground.material.uniforms.uStarsOffset.value, {
              x: 0,
              y: -0.3
            }, {
              x: -0.8,
              y: 0.2,
              duration: 0.6,
              ease: "power2.inOut",
              immediateRender: false
            }, 0.3);
            e.fromTo(this.mainWrapper.position, {
              x: 4,
              y: -20
            }, {
              x: 4,
              y: -16,
              z: 38.3,
              ease: "power1.out",
              duration: 0.4
            }, 0);
            e.fromTo(this.earthWrapper.rotation, {
              x: 0.25
            }, {
              x: 0,
              duration: 0.3,
              ease: "power1.out"
            }, 0);
            e.fromTo(ad.webgl.sectionController.skyBackground.material.uniforms.uOpacity, {
              value: 0
            }, {
              value: 1,
              duration: 0.1,
              immediateRender: false
            }, 0);
            e.to(this.mainWrapper.position, {
              x: 8.1,
              y: -14.53,
              z: 36.15,
              duration: 0.6,
              ease: "power2.inOut"
            }, 0.4);
            e.fromTo(this.earthWrapper.rotation, {
              x: 0,
              y: 0,
              z: 1
            }, {
              x: -0.05,
              y: 0,
              z: 0.95,
              duration: 0.6,
              ease: "power2.inOut",
              immediateRender: false
            }, 0.3);
            e.fromTo(this.satelliteGarbageW.position, {
              x: -4,
              y: -2,
              z: 47.23
            }, {
              x: 0,
              y: -0.17,
              z: 48,
              duration: 0.6,
              ease: "power2.inOut"
            }, 0.3);
            e.call(function () {
              var e;
              if (t._dir > 0) {
                t.idleTimeline.play(0);
                if ((e = t.satellite) !== null && e !== undefined) {
                  e.resetAnims();
                }
                t.satellite.startTimeline(false, 5);
              } else {
                t.idleTimeline.pause();
                t.idleTimeline.progress(0);
                t.satellite.stopTimeline();
                t.satellite.resetAnims();
              }
            }, null, 0.5);
            e.call(function () {}, null, 1);
            return e;
          }
        }, {
          key: "createIdleTimeline",
          value: function () {
            var t = xr.Ay.timeline({
              paused: true
            });
            t.fromTo(this.satelliteLightW.position, {
              x: 0.3,
              y: 0,
              z: 1.36
            }, {
              x: -0.6,
              y: -1,
              z: -8,
              duration: 120
            }, 0);
            t.fromTo(this.garbageW.position, {
              x: -0.13,
              y: -0.28,
              z: -0.76
            }, {
              x: -1.01,
              y: -1.24,
              z: -11,
              duration: 120
            }, 0);
            return t;
          }
        }, {
          key: "enter",
          value: function (t, n = false) {
            ad.webgl.camera.updateFov(30);
            this.satellite.openLegs();
            this.satellite.uniforms.uDisappearY.value = 1;
            this.garbage.uniforms.uDisappearY.value = 1;
            this.satellite.uniforms.uGlobalOpacity.value = 1;
            ad.webgl.sectionController.skyBackground.material.uniforms.uBlueHaloIntensity.value = 0.3;
            this.satellite.setWireframe(false);
            this.satellite.bodyInner.material.envMapIntensity = 1;
            this.satellite.setGlow(true);
            this.earth.applySunConfig({
              sun: this.sunConfig
            });
            this.earthWrapper.add(this.earth);
            this.garbageW.add(this.garbage);
            this.satelliteW.add(this.satellite);
            return Qf(e, "enter", this, 3)([t, n]);
          }
        }, {
          key: "leave",
          value: function (t, n = false) {
            this.satellite.bodyInner.material.envMapIntensity = 0.2;
            this.satellite.resetLegAnims();
            return Qf(e, "leave", this, 3)([t, n]);
          }
        }, {
          key: "open",
          value: function () {
            xr.Ay.timeline();
          }
        }, {
          key: "onAttach",
          value: function () {
            var t;
            this.earth = ad.webgl.sectionController.earth;
            this.atmosphere = new Bf(this.sunConfig);
            this.atmosphere.scale.set(1.04, 1.04, 1.04);
            this.satellite = ad.webgl.sectionController.satellite;
            this.garbage = ad.webgl.sectionController.garbage;
            this.light = new o.ZyN(16777215, 1.1);
            this.light.position.set(-1, 1.5, 1);
            this.light.castShadow = true;
            this.light.shadow.mapSize.width = 1024;
            this.light.shadow.mapSize.height = 1024;
            this.light.shadow.bias = -0.01;
            this.light.shadow.camera.near = 1.7;
            this.light.shadow.camera.far = 2.2;
            this.light.shadow.camera.left = -0.2;
            this.light.shadow.camera.right = 0.35;
            this.light.shadow.camera.top = -0.3;
            this.light.shadow.camera.bottom = 0.25;
            this.light.target = this.satellite;
            this.atmosphereW.add(this.atmosphere);
            this.satelliteLightW.add(this.light, this.satelliteW);
            this.mainWrapper.add(this.atmosphereW, this.earthWrapper);
            this.satelliteGarbageW.add(this.garbageW, this.satelliteLightW);
            this.satelliteGarbageSecondW.add(this.satelliteGarbageW);
            this.add(this.mainWrapper, this.satelliteGarbageSecondW);
            this.idleTimeline = this.createIdleTimeline();
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "Clean");
            }
            Qf(e, "onAttach", this, 3)([]);
          }
        }, {
          key: "onResize",
          value: function (t) {
            var e = t.width;
            this.satelliteGarbageSecondW.position.set(0, e >= 1024 ? 0 : -0.1, e >= 1024 ? 0 : -1);
          }
        }];
        if (r) {
          Gf(n.prototype, r);
        }
        if (a) {
          Gf(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(Fr);
      function tp(t) {
        tp = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return tp(t);
      }
      function ep(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function np(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, ip(r.key), r);
        }
      }
      function rp(t, e, n) {
        if ((e = ip(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function ip(t) {
        var e = function (t, e) {
          if (tp(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (tp(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (tp(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function op(t, e, n) {
        (function (t, e) {
          if (e.has(t)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
          }
        })(t, e);
        e.set(t, n);
      }
      function ap(t, e) {
        return t.get(lp(t, e));
      }
      function sp(t, e, n) {
        t.set(lp(t, e), n);
        return n;
      }
      function lp(t, e, n) {
        if (typeof t == "function" ? t === e : t.has(e)) {
          if (arguments.length < 3) {
            return e;
          } else {
            return n;
          }
        }
        throw new TypeError("Private element is not present on this object");
      }
      var up;
      var cp = 0;
      var hp = 0;
      var fp = 0;
      var pp = 0;
      var dp = 0;
      var mp = 0;
      var gp = new WeakMap();
      var vp = new WeakMap();
      var yp = new WeakMap();
      var bp = new WeakMap();
      var _p = new WeakMap();
      var wp = new WeakMap();
      var xp = new WeakMap();
      var Sp = new WeakMap();
      var Tp = new WeakMap();
      var Mp = new WeakMap();
      var Op = new WeakMap();
      var Pp = new WeakMap();
      var Ep = new WeakMap();
      var Cp = new WeakMap();
      var Ap = new WeakMap();
      var Rp = function () {
        t = function t() {
          var e = this;
          var n = (arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}).selector;
          var a = n === undefined ? "webgl" : n;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, t);
          op(this, gp, undefined);
          op(this, vp, undefined);
          op(this, yp, undefined);
          op(this, bp, undefined);
          op(this, _p, undefined);
          op(this, wp, undefined);
          op(this, xp, undefined);
          op(this, Sp, 0);
          op(this, Tp, 0);
          op(this, Mp, 0);
          op(this, Op, function (t) {
            sp(Sp, e, Math.max(-30, Math.min(30, t.deltaY)));
            e.triggerNearestSnapPoint();
          });
          op(this, Pp, function (t) {
            window.addEventListener("pointermove", ap(Ep, e));
            window.addEventListener("pointerup", ap(Cp, e));
            e.down = true;
          });
          op(this, Ep, function (t) {
            sp(Mp, e, ap(Tp, e));
            sp(Tp, e, t.clientY);
            sp(Sp, e, ap(Mp, e) - ap(Tp, e));
            e.triggerNearestSnapPoint();
          });
          op(this, Cp, function (t) {
            window.removeEventListener("pointermove", ap(Ep, e));
            window.removeEventListener("pointerup", ap(Cp, e));
            e.down = false;
          });
          op(this, Ap, function (t) {
            var n = window.scrollY;
            sp(yp, e, e.targetScroll);
            e.targetScroll = n;
            sp(wp, e, ap(_p, e));
            sp(_p, e, ap(yp, e) - e.targetScroll);
            sp(bp, e, (ap(_p, e) - ap(wp, e)) * ap(gp, e));
            sp(gp, e, Math.sign(n - ap(vp, e)));
          });
          rp(this, "triggerNearestSnapPoint", function () {
            clearTimeout(e.gnspId);
            e.gnspId = setTimeout(e.getNearestSnapPoint, 700);
          });
          rp(this, "getNearestSnapPoint", function () {
            cp = e.targetScroll;
            dp = Infinity;
            e.gnspId = null;
            up = e.snaped.length;
            fp = 0;
            for (; fp < up; fp++) {
              if ((pp = Math.abs(cp - e.snaped[fp].top)) < dp && mp !== fp) {
                hp = fp;
                dp = pp;
              }
            }
            if ((!(hp < mp) || ap(gp, e) === -1) && (mp != 0 || ap(gp, e) !== -1) && !e.snaped[hp].cancel) {
              mp = hp;
              Ar.c.scrollTo(e.snaped[hp].top, {
                duration: 2.5,
                lerp: 0.05
              });
            }
          });
          i.z.register(this);
          this.targetScroll = 0;
          this.ghostScroll = 0;
          this.down = false;
          this.selector = a;
          this.earthWrappers = [];
          this.gnspId = null;
          this.sections = Array.from(document.querySelectorAll(`[data-${this.selector}]`)).map(function (t, n) {
            var i = new r[t.dataset[e.selector]](t, n);
            if (i.earthWrapper) {
              e.earthWrappers.push(i.earthWrapper);
            }
            return i;
          });
          sp(gp, this, 1);
          sp(xp, this, sp(vp, this, this.targetScroll = window.scrollY));
          ad.core.loader.add({
            key: "smoke"
          }, {
            key: "frame"
          }, {
            key: "rays"
          }, {
            key: "perlin"
          }, {
            key: "starsBg"
          }, {
            key: "noise"
          }, {
            key: "satellite"
          }, {
            key: "satelliteLow"
          }, {
            key: "envmap"
          }, {
            key: "earthAlbedo"
          }, {
            key: "earthData"
          }, {
            key: "glow"
          });
          this.sunConfig = {
            position: new o.Pq0(15, 90, -200),
            color: new o.Q1f(16251903),
            intensity: {
              value: 2
            },
            reflexionColor: new o.Q1f(10664410),
            sunsetColor: new o.Q1f(16772827),
            sunsetIntensity: {
              value: 0.04
            },
            specularReference: new o.Pq0(0, 10, -32)
          };
          this.snaped = Array.from(document.querySelectorAll("[data-snap]")).map(function (t) {
            return {
              el: t,
              cancel: t.dataset.snap === "cancel"
            };
          });
          this.didFirstEnter = false;
        };
        e = [{
          key: "velocity",
          get: function () {
            return (this.targetScroll - ap(vp, this)) * ap(gp, this);
          }
        }, {
          key: "beforePreRender",
          value: function () {
            this.sections.forEach(function (t) {
              t.frustumCulled = false;
              ad.webgl.sectionsGroup.add(t);
            });
            this.satellite.model.visible = true;
            this.satellite.wireframeModel.visible = true;
          }
        }, {
          key: "afterPreRender",
          value: function () {
            this.sections.forEach(function (t) {
              t.frustumCulled = true;
              if (!t.hasEnter) {
                ad.webgl.sectionsGroup.remove(t);
              }
            });
            this.satellite.setWireframe(this.satellite._isWireframe);
          }
        }, {
          key: "open",
          value: function () {
            return xr.Ay.timeline();
          }
        }, {
          key: "onAttach",
          value: function () {
            var t;
            this.earth = new gi(this.sunConfig);
            this.satellite = new Ma();
            this.garbage = new Li();
            this.garbages = new os();
            document.addEventListener("scroll", ap(Ap, this), {
              passive: true
            });
            this.skyBackground = new Xa(function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e] ?? {};
                if (e % 2) {
                  ep(Object(n), true).forEach(function (e) {
                    rp(t, e, n[e]);
                  });
                } else if (Object.getOwnPropertyDescriptors) {
                  Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
                } else {
                  ep(Object(n)).forEach(function (e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                  });
                }
              }
              return t;
            }({}, cn));
            ad.webgl.sectionsGroup.add(this.skyBackground);
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "SectionController");
            }
            this.open();
            window.addEventListener("wheel", ap(Op, this));
            if (ad.tools.viewport.breakpoint === "mobile") {
              window.addEventListener("pointerdown", ap(Pp, this));
            }
          }
        }, {
          key: "onAfterResize",
          value: function () {
            var t = this;
            this.sections.forEach(function (e) {
              e.updateProgress(ap(vp, t), ap(gp, t));
              e.updateDOMProgress(ap(xp, t), ap(gp, t));
            });
            this.snaped.forEach(function (t) {
              t.top = Math.round(t.el.getBoundingClientRect().top + window.scrollY);
            });
          }
        }, {
          key: "onTick",
          value: function (t) {
            var e = this;
            t.et;
            var n = t.dt;
            sp(Sp, this, ap(Sp, this) * 0.87);
            sp(vp, this, Or(ap(vp, this), this.targetScroll, 1, n));
            sp(xp, this, Or(ap(xp, this), this.targetScroll, 2, n));
            this.sections.forEach(function (t) {
              t.updateProgress(ap(vp, e), ap(gp, e));
              t.updateDOMProgress(ap(xp, e), ap(gp, e));
            });
          }
        }, {
          key: "currentScroll",
          get: function () {
            return ap(vp, this);
          }
        }, {
          key: "globalProgress",
          get: function () {
            return this.sections.reduce(function (t, e) {
              return t + e.progress;
            }, 0);
          }
        }];
        if (e) {
          np(t.prototype, e);
        }
        if (n) {
          np(t, n);
        }
        Object.defineProperty(t, "prototype", {
          writable: false
        });
        return t;
        var t;
        var e;
        var n;
      }();
      function Lp(t) {
        Lp = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Lp(t);
      }
      function Dp(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          if (e) {
            r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            });
          }
          n.push.apply(n, r);
        }
        return n;
      }
      function Ip(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Fp(r.key), r);
        }
      }
      function jp(t, e, n) {
        e = Np(e);
        return function (t, e) {
          if (e && (Lp(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, kp() ? Reflect.construct(e, n || [], Np(t).constructor) : e.apply(t, n));
      }
      function kp() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (kp = function () {
          return !!t;
        })();
      }
      function Np(t) {
        Np = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Np(t);
      }
      function zp(t, e) {
        zp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return zp(t, e);
      }
      function Up(t, e, n) {
        if ((e = Fp(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Fp(t) {
        var e = function (t, e) {
          if (Lp(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Lp(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Lp(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var Bp = function (t) {
        function e() {
          var t;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Up(t = jp(this, e), "toggleAddGarbages", function (e) {
            if (e) {
              t.garbages.garbages.forEach(function (e, n) {
                t.garbagesItems[n].add(e);
              });
            } else {
              t.garbages.garbages.forEach(function (e, n) {
                t.garbagesItems[n].remove(e);
              });
            }
          });
          i.z.register(t);
          t.garbagesW = new o.B69();
          t.satelliteWrapper = new o.YJl();
          t.satelliteRotationWrapper = new o.YJl();
          t.satelliteWrapper.position.set(-0.4, 0, 40);
          t.satelliteWrapper.rotation.set(-0.7, -3, -0.84);
          t.garbageProgress = {
            value: 0
          };
          t.garbagesItems = [new o.B69(), new o.B69(), new o.B69(), new o.B69()];
          return t;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            zp(t, e);
          }
        })(e, t);
        n = e;
        r = [{
          key: "openTimeline",
          value: function () {
            var t = xr.os.timeline();
            t.fromTo(this.skyBackground.material.uniforms.uOpacity, {
              value: 0
            }, {
              value: 1,
              duration: 0.5,
              immediateRender: false
            }, 0);
            t.fromTo(this.satellite.wireframeMaterial.uniforms.uOpacity, {
              value: 0
            }, {
              value: 1,
              duration: 0.5,
              immediateRender: false
            }, 0);
            t.fromTo(this.garbages.model.material.uniforms.uOpacity, {
              value: 0
            }, {
              value: 1,
              duration: 0.5,
              immediateRender: false
            }, 0);
            return t;
          }
        }, {
          key: "createIdleTimeline",
          value: function () {
            this.idleTimeline = xr.os.timeline({
              paused: true
            });
            this.idleTimeline.fromTo(this.satelliteWrapper.position, {
              x: -0.8,
              y: 0.8,
              z: 40
            }, {
              x: 1,
              y: -1,
              z: 42,
              duration: 120
            }, 0);
            this.idleTimeline.fromTo(this.garbagesItems[0].position, {
              x: -1,
              y: -0.6,
              z: 42
            }, {
              x: 1,
              y: 0,
              z: 45,
              duration: 120
            }, 0);
            this.idleTimeline.fromTo(this.garbagesItems[1].position, {
              x: 1.5,
              y: 0,
              z: 45
            }, {
              x: -0.8,
              y: 0.6,
              z: 43,
              duration: 120
            }, 0);
            this.idleTimeline.fromTo(this.garbagesItems[2].position, {
              x: 0.6,
              y: 1.2,
              z: 45
            }, {
              x: -0.2,
              y: -0.6,
              z: 46,
              duration: 120
            }, 0);
            this.idleTimeline.fromTo(this.garbagesItems[3].position, {
              x: 0.8,
              y: -0.5,
              z: 46
            }, {
              x: -0.8,
              y: 0.4,
              z: 41,
              duration: 120
            }, 0);
          }
        }, {
          key: "enter",
          value: function () {
            ad.webgl.camera.updateFov(18);
            this.satellite.uniforms.uDisappearY.value = 1;
            this.satellite.uniforms.uDisappear.value = 0;
            this.satellite.uniforms.uGlobalOpacity.value = 1;
            this.garbages.model.material.uniforms.uOpacity.value = 0;
            this.satellite.wireframeMaterial.uniforms.uOpacity.value = 0;
            this.skyBackground.material.uniforms.uOpacity.value = 0;
            this.satellite.setWireframe(true);
            ad.webgl.scene.holdOverlay.material.uniforms.uHoldProgress.value = 0;
            this.satelliteRotationWrapper.add(this.satellite);
            this.toggleAddGarbages(true);
            this.idleTimeline.play(0);
            ad.webgl.scene.add(this);
          }
        }, {
          key: "leave",
          value: function () {
            ad.webgl.scene.holdOverlay.material.uniforms.uHoldProgress.value = 1;
            ad.webgl.scene.remove(this);
            this.garbages.model.material.uniforms.uOpacity.value = 1;
          }
        }, {
          key: "attachScene",
          value: function () {
            var t;
            var e = this;
            this.satellite = ad.webgl.sectionController.satellite;
            this.garbages = ad.webgl.sectionController.garbages;
            this.skyBackground = new Xa(function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e] ?? {};
                if (e % 2) {
                  Dp(Object(n), true).forEach(function (e) {
                    Up(t, e, n[e]);
                  });
                } else if (Object.getOwnPropertyDescriptors) {
                  Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
                } else {
                  Dp(Object(n)).forEach(function (e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                  });
                }
              }
              return t;
            }({}, cn));
            this.skyBackground.material.uniforms.uBlueHaloIntensity.value = 0;
            this.garbagesItems.forEach(function (t) {
              e.garbagesW.add(t);
            });
            this.satelliteWrapper.add(this.satelliteRotationWrapper);
            this.add(this.satelliteWrapper, this.skyBackground, this.garbagesW);
            this.createIdleTimeline();
            if ((t = ad.debug) !== null && t !== undefined) {
              t.pane.addToMapping(this, "LongPress");
            }
          }
        }];
        if (r) {
          Ip(n.prototype, r);
        }
        if (a) {
          Ip(n, a);
        }
        Object.defineProperty(n, "prototype", {
          writable: false
        });
        return n;
        var n;
        var r;
        var a;
      }(o.YJl);
      function Wp(t) {
        Wp = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Wp(t);
      }
      function Hp(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Gp(r.key), r);
        }
      }
      function Vp(t, e, n) {
        if ((e = Gp(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Gp(t) {
        var e = function (t, e) {
          if (Wp(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Wp(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Wp(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var qp = function () {
        t = function t() {
          var e = this;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, t);
          Vp(this, "createTimeline", function () {
            e.timeline = xr.os.timeline({
              paused: true
            });
            e.timeline.fromTo(ad.webgl.scene.holdOverlay.material.uniforms.uHoldProgress, {
              value: 0
            }, {
              value: 1,
              duration: 1.4
            }, 2.5);
            e.timeline.add(e.scene.openTimeline(), e.togglePosition + 0.01);
            e.tlDuration = e.timeline.totalDuration();
          });
          Vp(this, "runLongPress", function () {
            var t;
            if ((t = e.progressTl) !== null && t !== undefined) {
              t.kill();
            }
            e.progressTl = xr.os.timeline();
            var n = (1 - e.mainProgress.value) * e.tlDuration;
            var r = e.mainProgress.value * e.tlDuration > e.togglePosition;
            e.progressTl.to(e.mainProgress, {
              value: 1,
              duration: n,
              onUpdate: function () {
                e.timeline.progress(e.mainProgress.value);
                if (!r && e.mainProgress.value * e.tlDuration > e.togglePosition) {
                  r = true;
                  i.z.emit(le.q.TOGGLE_LONGPRESS, true);
                  e.scene.enter();
                }
              }
            });
          });
          Vp(this, "resetLongPress", function () {
            var t;
            if ((t = e.progressTl) !== null && t !== undefined) {
              t.kill();
            }
            e.progressTl = xr.os.timeline();
            var n = e.mainProgress.value * e.tlDuration;
            var r = n < e.togglePosition;
            e.progressTl.to(e.mainProgress, {
              value: 0,
              duration: n,
              onUpdate: function () {
                e.timeline.progress(e.mainProgress.value);
                if (!r && e.mainProgress.value * e.tlDuration < e.togglePosition) {
                  r = true;
                  e.scene.leave();
                  i.z.emit(le.q.TOGGLE_LONGPRESS, false);
                }
              }
            });
          });
          Vp(this, "onScroll", function () {
            if (Math.abs(e.storedScroll - window.scrollY) > 50) {
              clearTimeout(e.runTm);
              document.removeEventListener("scroll", e.onScroll);
            }
          });
          i.z.register(this);
          this.scene = new Bp();
          this.mainProgress = {
            value: 0
          };
          this.progressTl = null;
          this.timeline = null;
          this.tlDuration = 0;
          this.holding = false;
          this.attached = false;
          this.runTm = null;
          this.t = 0;
          this.cursor = document.querySelector(".cursor-w");
          this._cursor = Rr.d.get(this.cursor);
          this.storedScroll = 0;
          this.togglePosition = 3.9;
          window.longpress = this;
        };
        if (e = [{
          key: "onPointerDown",
          value: function () {
            var t = this;
            if (this.attached) {
              this.holding = true;
              if (ad.tools.viewport.isTouch) {
                this.storedScroll = window.scrollY;
                document.addEventListener("scroll", this.onScroll, {
                  passive: true
                });
                this.runTm = setTimeout(function () {
                  document.removeEventListener("scroll", t.onScroll);
                  t.runLongPress();
                }, 500);
              } else {
                this.runLongPress();
              }
            }
          }
        }, {
          key: "onPointerUp",
          value: function () {
            if (this.holding && this.attached) {
              this.holding = false;
              clearTimeout(this.runTm);
              this.resetLongPress();
            }
          }
        }, {
          key: "onReady",
          value: function () {
            this.scene.attachScene();
            this.createTimeline();
            this.attached = true;
          }
        }]) {
          Hp(t.prototype, e);
        }
        if (n) {
          Hp(t, n);
        }
        Object.defineProperty(t, "prototype", {
          writable: false
        });
        return t;
        var t;
        var e;
        var n;
      }();
      function Xp(t) {
        Xp = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Xp(t);
      }
      function Yp(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Qp(r.key), r);
        }
      }
      function Qp(t) {
        var e = function (t, e) {
          if (Xp(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Xp(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Xp(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var Kp = function () {
        t = function t() {
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, t);
          i.z.register(this);
          this.renderer = new wr();
          this.scene = new pr();
          this.camera = new jn();
          this.sectionsGroup = new o.YJl();
          this.sectionController = new Rp();
          this.longpress = new qp();
          this.preRendered = false;
          this.isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
          this.incrementFunc = this.isAndroid ? function (t) {
            return t % 60000;
          } : function (t) {
            return t;
          };
          this.scene.add(this.sectionsGroup);
          window.webgl = this;
        };
        e = [{
          key: "onAttach",
          value: function () {
            ad.$wrapper.prepend(this.renderer.domElement);
          }
        }, {
          key: "onReady",
          value: function () {
            var t = new o.nWS(1, 1);
            this.sectionController.beforePreRender();
            this.renderer.setRenderTarget(t);
            this.renderer.render(this.scene, this.camera);
            this.renderer.setRenderTarget(null);
            this.sectionController.afterPreRender();
          }
        }, {
          key: "onResize",
          value: function () {}
        }, {
          key: "noscroll",
          set: function (t) {
            document.querySelector("html").classList.toggle("no-scroll", t);
          }
        }, {
          key: "onTick",
          value: function (t) {
            var e = t.et;
            fn.uTime.value = this.incrementFunc(e);
          }
        }, {
          key: "onRender",
          value: function () {
            this.renderer.clear();
            this.renderer.render(this.scene, this.camera);
          }
        }];
        if (e) {
          Yp(t.prototype, e);
        }
        if (n) {
          Yp(t, n);
        }
        Object.defineProperty(t, "prototype", {
          writable: false
        });
        return t;
        var t;
        var e;
        var n;
      }();
      function Zp(t) {
        Zp = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Zp(t);
      }
      function Jp() {
        var t;
        var e;
        var n = typeof Symbol == "function" ? Symbol : {};
        var r = n.iterator || "@@iterator";
        var i = n.toStringTag || "@@toStringTag";
        function o(n, r, i, o) {
          var l = r && r.prototype instanceof s ? r : s;
          var u = Object.create(l.prototype);
          $p(u, "_invoke", function (n, r, i) {
            var o;
            var s;
            var l;
            var u = 0;
            var c = i || [];
            var h = false;
            var f = {
              p: 0,
              n: 0,
              v: t,
              a: p,
              f: p.bind(t, 4),
              d: function (e, n) {
                o = e;
                s = 0;
                l = t;
                f.n = n;
                return a;
              }
            };
            function p(n, r) {
              s = n;
              l = r;
              e = 0;
              for (; !h && u && !i && e < c.length; e++) {
                var i;
                var o = c[e];
                var p = f.p;
                var d = o[2];
                if (n > 3) {
                  if (i = d === r) {
                    l = o[(s = o[4]) ? 5 : (s = 3, 3)];
                    o[4] = o[5] = t;
                  }
                } else if (o[0] <= p) {
                  if (i = n < 2 && p < o[1]) {
                    s = 0;
                    f.v = r;
                    f.n = o[1];
                  } else if (p < d && (i = n < 3 || o[0] > r || r > d)) {
                    o[4] = n;
                    o[5] = r;
                    f.n = d;
                    s = 0;
                  }
                }
              }
              if (i || n > 1) {
                return a;
              }
              h = true;
              throw r;
            }
            return function (i, c, d) {
              if (u > 1) {
                throw TypeError("Generator is already running");
              }
              if (h && c === 1) {
                p(c, d);
              }
              s = c;
              l = d;
              while ((e = s < 2 ? t : l) || !h) {
                if (!o) {
                  if (s) {
                    if (s < 3) {
                      if (s > 1) {
                        f.n = -1;
                      }
                      p(s, l);
                    } else {
                      f.n = l;
                    }
                  } else {
                    f.v = l;
                  }
                }
                try {
                  u = 2;
                  if (o) {
                    if (!s) {
                      i = "next";
                    }
                    if (e = o[i]) {
                      if (!(e = e.call(o, l))) {
                        throw TypeError("iterator result is not an object");
                      }
                      if (!e.done) {
                        return e;
                      }
                      l = e.value;
                      if (s < 2) {
                        s = 0;
                      }
                    } else {
                      if (s === 1 && (e = o.return)) {
                        e.call(o);
                      }
                      if (s < 2) {
                        l = TypeError("The iterator does not provide a '" + i + "' method");
                        s = 1;
                      }
                    }
                    o = t;
                  } else if ((e = (h = f.n < 0) ? l : n.call(r, f)) !== a) {
                    break;
                  }
                } catch (e) {
                  o = t;
                  s = 1;
                  l = e;
                } finally {
                  u = 1;
                }
              }
              return {
                value: e,
                done: h
              };
            };
          }(n, i, o), true);
          return u;
        }
        var a = {};
        function s() {}
        function l() {}
        function u() {}
        e = Object.getPrototypeOf;
        var c = [][r] ? e(e([][r]())) : ($p(e = {}, r, function () {
          return this;
        }), e);
        var h = u.prototype = s.prototype = Object.create(c);
        function f(t) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(t, u);
          } else {
            t.__proto__ = u;
            $p(t, i, "GeneratorFunction");
          }
          t.prototype = Object.create(h);
          return t;
        }
        l.prototype = u;
        $p(h, "constructor", u);
        $p(u, "constructor", l);
        l.displayName = "GeneratorFunction";
        $p(u, i, "GeneratorFunction");
        $p(h);
        $p(h, i, "Generator");
        $p(h, r, function () {
          return this;
        });
        $p(h, "toString", function () {
          return "[object Generator]";
        });
        return (Jp = function () {
          return {
            w: o,
            m: f
          };
        })();
      }
      function $p(t, e, n, r) {
        var i = Object.defineProperty;
        try {
          i({}, "", {});
        } catch (t) {
          i = 0;
        }
        $p = function (t, e, n, r) {
          function o(e, n) {
            $p(t, e, function (t) {
              return this._invoke(e, n, t);
            });
          }
          if (e) {
            if (i) {
              i(t, e, {
                value: n,
                enumerable: !r,
                configurable: !r,
                writable: !r
              });
            } else {
              t[e] = n;
            }
          } else {
            o("next", 0);
            o("throw", 1);
            o("return", 2);
          }
        };
        $p(t, e, n, r);
      }
      function td(t, e, n, r, i, o, a) {
        try {
          var s = t[o](a);
          var l = s.value;
        } catch (t) {
          n(t);
          return;
        }
        if (s.done) {
          e(l);
        } else {
          Promise.resolve(l).then(r, i);
        }
      }
      function ed(t) {
        return function () {
          var e = this;
          var n = arguments;
          return new Promise(function (r, i) {
            var o = t.apply(e, n);
            function a(t) {
              td(o, r, i, a, s, "next", t);
            }
            function s(t) {
              td(o, r, i, a, s, "throw", t);
            }
            a(undefined);
          });
        };
      }
      function nd(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, id(r.key), r);
        }
      }
      function rd(t, e, n) {
        if ((e = id(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function id(t) {
        var e = function (t, e) {
          if (Zp(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Zp(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Zp(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var od = function () {
        function t() {
          var e = this;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, t);
          rd(this, "toogleAnimation", function (t) {
            e.animation = t;
          });
        }
        e = t;
        n = [{
          key: "init",
          value: (s = ed(Jp().m(function t() {
            var e;
            var n;
            var r;
            var o = arguments;
            return Jp().w(function (t) {
              while (true) {
                switch (t.n) {
                  case 0:
                    e = o.length > 0 && o[0] !== undefined && o[0];
                    n = new URLSearchParams(window.location.search);
                    r = n.has("debug") && e;
                    this.$app = document.body;
                    this.$wrapper = document.getElementById("canvas-wrapper");
                    this.core = Ge();
                    this.tools = xn();
                    this.webgl = new Kp();
                    if (!r) {
                      t.n = 2;
                      break;
                    }
                    t.n = 1;
                    return On();
                  case 1:
                    this.debug = t.v;
                  case 2:
                    i.z.on(le.q.TOGGLE_ANIMATIONS, this.toogleAnimation);
                    this.animation = true;
                    t.n = 3;
                    return this.beforeLoad();
                  case 3:
                    t.n = 4;
                    return this.load();
                  case 4:
                    return t.a(2);
                }
              }
            }, t, this);
          })), function () {
            return s.apply(this, arguments);
          })
        }, {
          key: "beforeLoad",
          value: (a = ed(Jp().m(function t() {
            return Jp().w(function (t) {
              while (true) {
                if (t.n === 0) {
                  return t.a(2);
                }
              }
            }, t);
          })), function () {
            return a.apply(this, arguments);
          })
        }, {
          key: "load",
          value: (o = ed(Jp().m(function t() {
            var e;
            return Jp().w(function (t) {
              while (true) {
                switch (t.n) {
                  case 0:
                    t.n = 1;
                    return this.core.loader.loadAssets();
                  case 1:
                    i.z.emit(le.q.ATTACH);
                    i.z.emit(le.q.RESIZE, this.tools.viewport.infos);
                    i.z.emit(le.q.AFTER_RESIZE, this.tools.viewport.infos);
                    i.z.emit(le.q.READY);
                    if ((e = this.debug) !== null && e !== undefined) {
                      e.pane.init();
                    }
                  case 2:
                    return t.a(2);
                }
              }
            }, t, this);
          })), function () {
            return o.apply(this, arguments);
          })
        }];
        r = [{
          key: "getInstance",
          value: function () {
            t.instance ||= new t();
            return t.instance;
          }
        }];
        if (n) {
          nd(e.prototype, n);
        }
        if (r) {
          nd(e, r);
        }
        Object.defineProperty(e, "prototype", {
          writable: false
        });
        return e;
        var e;
        var n;
        var r;
        var o;
        var a;
        var s;
      }();
      rd(od, "instance", undefined);
      var ad = od.getInstance();
    },
